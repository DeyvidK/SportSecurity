import { Component,ViewChild, ElementRef} from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { CadastroComponent } from '../cadastro/cadastro.component';

@Component({
  selector: 'app-cabecalho',
  imports: [LoginComponent,CadastroComponent],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {
  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('registerDialog') registerDialog!: ElementRef<HTMLDialogElement>;

  modalOpen(event: Event) {
    event.preventDefault(); // impede o link de recarregar a página
    this.dialogRef.nativeElement.showModal(); // abre o dialog
  }

  closeModal() {
    this.dialogRef.nativeElement.close(); // fecha o dialog
  }

  abrirCadastro() { this.registerDialog.nativeElement.showModal(); }
  fecharCadastro() { this.registerDialog.nativeElement.close(); }
}
