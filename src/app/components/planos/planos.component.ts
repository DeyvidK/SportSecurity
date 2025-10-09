import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planos',
  imports: [RouterModule],
  templateUrl: './planos.component.html',
  styleUrl: './planos.component.css'
})
export class PlanosComponent {
 constructor(private router: Router) {}

irParaAgendamento() {
    this.router.navigate(['/agendamento']); // ⚡ coloque a rota correta do seu AgendamentoComponent
  }
}
