import { Component, NgModule, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  imports: [NgIf,FormsModule,NgFor],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  user: any = null;
  nome: string = '';
  email: string = '';
  senha: string = '';

  // Lista de veículos
  veiculos: any[] = [];
  novoVeiculo = {
    marca: '',
    modelo: '',
    placa: '',
    ano: '',
  };

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.getLoggedUser();

    if (this.user) {
      this.nome = this.user.nome;
      this.email = this.user.email;
      this.senha = this.user.senha;
    }

    const veiculosSalvos = localStorage.getItem('veiculos_' + this.email);
    this.veiculos = veiculosSalvos ? JSON.parse(veiculosSalvos) : [];
  }

  salvarPerfil() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const idx = usuarios.findIndex((u: any) => u.email === this.user.email);

    if (idx !== -1) {
      usuarios[idx] = { nome: this.nome, email: this.email, senha: this.senha };
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarios[idx]));
      alert('Perfil atualizado com sucesso!');
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
    localStorage.setItem('veiculos_' + this.email, JSON.stringify(this.veiculos));
    this.novoVeiculo = { marca: '', modelo: '', placa: '', ano: '' };
  }

  removerVeiculo(i: number) {
    this.veiculos.splice(i, 1);
    localStorage.setItem('veiculos_' + this.email, JSON.stringify(this.veiculos));
  }
}
