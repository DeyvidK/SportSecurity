import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule],
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.css'
})
export class AgendamentoComponent implements OnInit {
  agendamentos: any[] = [];
  veiculos: any[] = [];
  user: any = null;

  ngOnInit() {
    // 🔹 Carrega o usuário logado (direto do localStorage)
    const storedUser = localStorage.getItem('usuarioLogado');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    // 🔹 Garante que encontrou o usuário antes de continuar
    if (this.user?.email) {
      // 🔹 Usa a MESMA chave do perfil (com underline)
      const key = 'veiculos_' + this.user.email.toLowerCase();
      const storedVeiculos = localStorage.getItem(key);
      if (storedVeiculos) {
        this.veiculos = JSON.parse(storedVeiculos);
        console.log('🚗 Veículos carregados no agendamento:', this.veiculos);
      } else {
        console.warn('⚠️ Nenhum veículo encontrado para o usuário:', this.user.email);
      }
    } else {
      console.warn('⚠️ Nenhum usuário logado encontrado no agendamento.');
    }

    // 🔹 Carrega agendamentos existentes (independente de usuário)
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
      email: this.user?.email || '',
      veiculo: veiculoSelecionado,
      data,
      hora
    };

    // 🔹 Salva o agendamento no localStorage
    this.agendamentos.push(novoAgendamento);
    localStorage.setItem('agendamentos', JSON.stringify(this.agendamentos));

    alert('✅ Revisão agendada com sucesso!');
  }

  removerAgendamento(agendamento: any) {
    this.agendamentos = this.agendamentos.filter(a => a !== agendamento);
    localStorage.setItem('agendamentos', JSON.stringify(this.agendamentos));
    console.log('🗑️ Agendamento removido:', agendamento);
  }
}
