import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [NgIf,NgFor,RouterModule],
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.css'
})
export class AgendamentoComponent implements OnInit {
  agendamentos: any[] = [];
  veiculos: any[] = [];
  user: any = null;

  ngOnInit() {
    // 🔹 Pega o usuário logado
    const storedUser = localStorage.getItem('usuarioLogado');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    // 🔹 Monta a chave dos veículos do usuário (igual ao perfil)
    if (this.user?.email) {
      const key = 'veiculos' + this.user.email;
      const storedVeiculos = localStorage.getItem(key);
      if (storedVeiculos) {
        this.veiculos = JSON.parse(storedVeiculos);
      }
    }

    // 🔹 Carrega agendamentos existentes
    const storedAgendamentos = localStorage.getItem('agendamentos');
    if (storedAgendamentos) {
      this.agendamentos = JSON.parse(storedAgendamentos);
    }
  }

  onSubmit(event: Event, data: string, hora: string, veiculoSelecionado: string) {
    event.preventDefault();

    if (!veiculoSelecionado) {
      alert('Selecione um veículo para agendar a revisão.');
      return;
    }

    const novoAgendamento = {
      usuario: this.user?.nome || 'Usuário não identificado',
      veiculo: veiculoSelecionado,
      data,
      hora
    };

    this.agendamentos.push(novoAgendamento);
    localStorage.setItem('agendamentos', JSON.stringify(this.agendamentos));

  }
removerAgendamento(agendamento: any) {
  // Filtra todos os agendamentos exceto o que será removido
  this.agendamentos = this.agendamentos.filter(a => a !== agendamento);

  // Atualiza o localStorage
  localStorage.setItem('agendamentos', JSON.stringify(this.agendamentos));

}


}

