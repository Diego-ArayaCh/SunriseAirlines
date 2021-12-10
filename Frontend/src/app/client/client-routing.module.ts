import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReservaComponent } from './reserva/reserva.component';
import { CheckInComponent } from './check-in/check-in.component';
import { HistoricoComponent } from './historico/historico.component';
import { EscogerAsientoComponent } from './escoger-asiento/escoger-asiento.component';


const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    children: [{ path: '/client-home', component: InicioComponent }],
  },
  { path: 'offers', component: OfertasComponent },
  { path: 'profile', component: PerfilComponent },
  { path: 'purchase-flight', component: ReservaComponent },
  { path: 'check-in', component: CheckInComponent },
  { path: 'purchases', component: HistoricoComponent },
  { path: 'flight-seats/:id', component: EscogerAsientoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
