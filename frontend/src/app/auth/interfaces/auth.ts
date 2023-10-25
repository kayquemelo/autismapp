export interface Login {
    username: string,
    password: string
}

export interface Logged {
    message: string,
    token: string,
    uuid: string,
    username: string
}
