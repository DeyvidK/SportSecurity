import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { CorpoComponent } from './components/main/corpo/corpo.component';
import { DescricaoComponent } from './components/descricao/descricao.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CabecalhoComponent,CorpoComponent,DescricaoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SportSecury';
}
