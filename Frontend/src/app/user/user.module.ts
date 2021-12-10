import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { InicioComponent } from '../user/inicio/inicio.component';
import { ContactoComponent } from '../user/contacto/contacto.component';
import { AcercaDeComponent } from '../user/acerca-de/acerca-de.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  declarations: [
    InicioComponent,
    ContactoComponent,
    AcercaDeComponent,
    OfertasComponent,
    InicioSesionComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
