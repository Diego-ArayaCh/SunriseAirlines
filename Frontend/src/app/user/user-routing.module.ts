import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from '../user/inicio/inicio.component';
import { ContactoComponent } from '../user/contacto/contacto.component';
import { AcercaDeComponent } from '../user/acerca-de/acerca-de.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './registro/registro.component';



const routes: Routes = [
  {
    path: '', component: InicioComponent,
    children:[
      {path: 'home', component: InicioComponent },
    ],
  },
  {path: 'about-us', component: AcercaDeComponent },
  {path: 'contact', component: ContactoComponent },
  {path: 'offers', component: OfertasComponent },
  {path: 'sign-in', component: InicioSesionComponent },
  {path: 'sign-up', component: RegistroComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
