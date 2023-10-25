const express = require('express');
const mysql = require('mysql2/promise');
const { body, validationResult } = require('express-validator');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

/** Middleware to cors configs */
app.use(( req, res, next ) => {
    res.header("Access-Control-Allow-Origin", "*" );
    res.header("Access-Control-Allow-Methods", "POST, GET" ); 
    app.use(cors());

    next();
});

// #######################################
// ### Configurações do banco de dados ###
// #######################################
const dbConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: process.env.CONNECTION_LIMIT,
};

// Middleware para conectar ao banco de dados antes de cada requisição
const connectToDatabase = async (req, res, next) => {
    try {
        const connection = await mysql.createPool(dbConfig).getConnection();
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
        req.db = connection;
        next();
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error);
        res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
    }
};

// Middleware para tratar erros de validação
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

// Configurações de segurança
app.use(helmet());

// Configuração de limite de taxa
const limiter = rateLimit({
    windowMs: process.env.LT_WINDOW_MS,
    max: process.env.LT_MAX
});
app.use(limiter);

// Configuração de desaceleração
const speedLimiter = slowDown({
    windowMs: process.env.SD_WINDOW_MS,
    delayAfter: process.env.SD_DELAY_AFTER,
    delayMs: process.env.SD_DELAY_MS
});
app.use(speedLimiter);

// Configuração do logger
app.use(morgan('tiny'));

// ###########################
// ### Definição das Rotas ###
// ###########################

// Para recuperar o req.body no formato json
app.use(express.json());

/** Rota para login */
app.post('/reint/v1/login', handleValidationErrors, connectToDatabase, async (req, res) => {
    const { username, password } = req.query;
    try {
        // Busca usuário pelo username
        const [rows] = await req.db.execute(`SELECT * FROM user WHERE username = '${username}'`);
        if (!rows.length) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }
        const user = rows[0];

        // Verifica se a password está correta
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'password incorreta' });
        }

        // Gera token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Retorna o token
        res.json({ token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    } finally {
        req.db.release();
    }
});

/** Rota para registrar novo usuário */
app.post('/reint/v1/register', [
    body('username').notEmpty().withMessage('O campo username é obrigatório'),
    body('password').notEmpty().withMessage('O campo password é obrigatório')
], handleValidationErrors, connectToDatabase, async (req, res) => {
    const { username, password } = req.body;
    var salt = bcrypt.genSaltSync(10);
    const encryptPass = bcrypt.hashSync(password, salt);

    try {
        const [usernameExist] = await req.db.execute(`SELECT id FROM user WHERE username = '${username}'`);
        if (usernameExist[0]) {
            console.log('O username informado já está em uso');
            res.status(501).json({ error: 'O username informado já está em uso' });
            req.db.release();
            return
        }

        await req.db.execute(`INSERT INTO user (id, username, password) VALUES ( null, '${username}', '${encryptPass}')`);
        res.sendStatus(201);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    } finally {
        req.db.release();
    }
});

// Middleware para tratar erros
const handleErrors = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
};

// Tratamento de erros global
app.use(handleErrors);

// #################################
// ### Inicialização do servidor ###
// #################################
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
