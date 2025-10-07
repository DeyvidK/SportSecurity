import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  imports: [],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  @Output() close = new EventEmitter<void>();
  @Output() openLogin = new EventEmitter<void>();

  fechar() {
    this.close.emit();
  }

  abrirLogin(event: Event) {
    event.preventDefault();
    this.close.emit();    // fecha cadastro
    this.openLogin.emit(); // abre login
  }

  onSubmit(event: Event, nome: string, email: string, senha: string) {
    event.preventDefault();
    console.log('Cadastro:', nome, email, senha);
    this.close.emit(); // fecha o modal após cadastro (apenas para teste)
  }
}
