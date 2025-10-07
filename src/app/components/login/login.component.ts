import { Component, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() close = new EventEmitter<void>();
  @Output() openRegister = new EventEmitter<void>();

  fechar() {
    this.close.emit();
  }
  
  abrirCadastro(event: Event) {
    event.preventDefault();
    this.close.emit();        // fecha login
    this.openRegister.emit(); // abre cadastro
  }
  onSubmit(event: Event, email: string, password: string) {
    event.preventDefault();
    console.log('Login:', email, password);
    this.close.emit();
  }
}


