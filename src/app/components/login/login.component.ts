import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() close = new EventEmitter<void>();
  @Output() openRegister = new EventEmitter<void>();

  constructor(private auth: AuthService) {}

onSubmit(event: Event, email: string, senha: string) {
  event.preventDefault();

  const user: any = this.auth.login(email, senha); // 👈 define o tipo manualmente

  if (user) {
    alert(`Bem-vindo, ${user.nome}!`);
    this.close.emit();
    window.location.reload();
  } else {
    alert('Email ou senha incorretos!');
  }
}


  fechar() {
    this.close.emit();
  }

  abrirCadastro(event: Event) {
    event.preventDefault();
    this.close.emit();
    this.openRegister.emit();
  }
}
