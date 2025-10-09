import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/components/home/home.component';
import { PerfilComponent } from './app/components/perfil/perfil.component';
import { AgendamentoComponent } from './app/components/agendamento/agendamento.component';
import { LgpdComponent } from './app/components/lgpd/lgpd.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'agendamento', component: AgendamentoComponent},
  { path: 'politica-privacidade', component: LgpdComponent}
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(FormsModule)
  ]
}).catch(err => console.error(err));
