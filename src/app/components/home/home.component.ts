import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { PlanosComponent } from "../planos/planos.component";
import { DescricaoComponent } from "../descricao/descricao.component";
import { CorpoComponent } from "../main/corpo/corpo.component";
import { CabecalhoComponent } from "../cabecalho/cabecalho.component";

@Component({
  selector: 'app-home',
  imports: [FooterComponent, PlanosComponent, DescricaoComponent, CorpoComponent, CabecalhoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
