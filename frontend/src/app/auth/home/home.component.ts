import { Component, OnDestroy, OnInit } from '@angular/core';
import { AhLoginService } from '../services/ah-login.service';
import { ShGeneralService } from 'src/app/shared/services/sh-general.service';
import { Subject, takeUntil } from 'rxjs';
import { ShSessionService } from 'src/app/shared/services/sh-session.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject<void>;

  public username: string = '';

  public password: string = '';

  constructor ( private title: Title, private ah_login: AhLoginService, private sh_general: ShGeneralService, private sh_session: ShSessionService,  private router: Router ) { 
    this.title.setTitle('Login | AutismApp');
  };
  
  ngOnInit(): void {
    this.sh_session.clearSessionData('auth');
  };

  public submitLogin(){
    if ( !this.username || !this.password ) {
      return this.sh_general.notify('warning', 'Por favor, preencha os campos de usuário e senha para prosseguir');
    } else {
      return this.reqLogin( this.username, this.password );
    }
  };

  private reqLogin( user: string, pass: string ) {
    const username = user;
    const password = pass;

    this.ah_login.reqLogin( username, password ).pipe(takeUntil( this.unsubscribe )).subscribe({
      next: token => {
        this.sh_session.setSessionData( 'auth', token );

        this.router.navigate( ['/user'] );
        return this.sh_general.notify('success', 'Olá, seja bem vindo(a) ao MindSpace!' );
      },
      error: Error => {
        return this.sh_general.notify('error', 'Usuário não autenticado!' ); 
      }
    });
  };

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  };

}
