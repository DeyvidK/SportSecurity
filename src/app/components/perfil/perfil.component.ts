import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NgIf, FormsModule, NgFor, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  user: any = null;
  nome: string = '';
  email: string = '';
  senha: string = '';

  veiculos: any[] = [];
  novoVeiculo = { marca: '', modelo: '', placa: '', ano: '' };

  constructor(private auth: AuthService) {}

  ngOnInit() {
    // 🔹 Tenta recuperar o usuário logado
    this.user = this.auth.getLoggedUser
      ? this.auth.getLoggedUser()
      : null;

    // 🔹 Se ainda não tiver o usuário (ex: login acabou de acontecer)
    if (!this.user) {
      const storedUser = localStorage.getItem('usuarioLogado');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    }

    // 🔹 Carrega dados do usuário
    if (this.user) {
      this.nome = this.user.nome;
      this.email = this.user.email;
      this.senha = this.user.senha;

      // 🔹 Carrega veículos salvos para esse usuário
      const key = 'veiculos_' + this.email.toLowerCase();
      const veiculosSalvos = localStorage.getItem(key);
      this.veiculos = veiculosSalvos ? JSON.parse(veiculosSalvos) : [];
      console.log('🚗 Veículos carregados:', this.veiculos);
    } else {
      console.warn('⚠️ Nenhum usuário logado encontrado no perfil.');
    }
  }

  salvarPerfil() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const idx = usuarios.findIndex((u: any) => u.email === this.user.email);

    if (idx !== -1) {
      usuarios[idx] = { nome: this.nome, email: this.email, senha: this.senha };
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarios[idx]));
      alert('Perfil atualizado com sucesso!');
    } else {
      alert('Usuário não encontrado!');
    }
  }

  adicionarVeiculo() {
    if (
      !this.novoVeiculo.marca ||
      !this.novoVeiculo.modelo ||
      !this.novoVeiculo.placa ||
      !this.novoVeiculo.ano
    ) {
      alert('Preencha todos os campos do veículo.');
      return;
    }

    this.veiculos.push({ ...this.novoVeiculo });

    const key = 'veiculos_' + this.email.toLowerCase();
    localStorage.setItem(key, JSON.stringify(this.veiculos));

    console.log('💾 Veículo salvo em:', key);
    this.novoVeiculo = { marca: '', modelo: '', placa: '', ano: '' };
  }

  removerVeiculo(i: number) {
    this.veiculos.splice(i, 1);
    const key = 'veiculos_' + this.email.toLowerCase();
    localStorage.setItem(key, JSON.stringify(this.veiculos));
    console.log('❌ Veículo removido da chave:', key);
  }
}
