import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxPayPalModule } from 'ngx-paypal';
import { ClientRoutingModule } from './client-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReservaComponent } from './reserva/reserva.component';
import { CheckInComponent } from './check-in/check-in.component';
import { HistoricoComponent } from './historico/historico.component';
import { EscogerAsientoComponent } from './escoger-asiento/escoger-asiento.component';


@NgModule({
  declarations: [
    InicioComponent,
    OfertasComponent,
    PerfilComponent,
    ReservaComponent,
    CheckInComponent,
    HistoricoComponent,
    EscogerAsientoComponent,
  
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxPayPalModule
  ]
})
export class ClientModule { }
