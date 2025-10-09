import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { LoginComponent } from '../login/login.component';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  imports: [LoginComponent, CadastroComponent,NgIf,RouterModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent implements OnInit {
  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('registerDialog') registerDialog!: ElementRef<HTMLDialogElement>;

  user: any = null;

  constructor(private auth: AuthService) {}

  ngOnInit() {
  const user = this.auth.getLoggedUser();
  if (user && user.nome) {
    // pega só o primeiro nome (antes do espaço)
    const primeiroNome = user.nome.split(' ')[0];
    this.user = { ...user, nome: primeiroNome };
  } else {
    this.user = null;
  }
}


  modalOpen(event: Event) {
    event.preventDefault();
    this.dialogRef.nativeElement.showModal();
  }

  closeModal() {
    this.dialogRef.nativeElement.close();
  }

  abrirLogin() {
    this.fecharCadastro();
    setTimeout(() => this.dialogRef.nativeElement.showModal(), 50);
  }

  abrirCadastro() {
    this.dialogRef.nativeElement.close();
    setTimeout(() => this.registerDialog.nativeElement.showModal(), 50);
  }

  fecharCadastro() {
    this.registerDialog.nativeElement.close();
  }

  logout() {
    this.auth.logout();
    window.location.reload();
  }
}
