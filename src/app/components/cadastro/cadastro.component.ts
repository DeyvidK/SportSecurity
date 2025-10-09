import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../service/auth.service'; 
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cadastro',
  imports: [FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})

export class CadastroComponent {
  @Output() close = new EventEmitter<void>();
  @Output() openLogin = new EventEmitter<void>();
  lgpdAceito: boolean = false;

  constructor(private auth: AuthService) {}

  onSubmit(event: Event, nome: string, email: string, senha: string) {
    event.preventDefault();

    const ok = this.auth.registerUser(nome, email, senha);
   
  if (!this.lgpdAceito) {
          alert('Você precisa aceitar a Política de Privacidade para se cadastrar.');
          return;
      }

    if (ok) {
      
      alert('Cadastro realizado com sucesso!');
      this.close.emit();
      this.openLogin.emit(); // volta pro login
    } else {
      alert('Email já cadastrado!');
    }
  }

  fechar() {
    this.close.emit();
  }

  abrirLogin(event: Event) {
    event.preventDefault();
    this.close.emit();
    this.openLogin.emit();
  }
}
