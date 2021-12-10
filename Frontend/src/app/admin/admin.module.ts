import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InicioComponent } from '../admin/inicio/inicio.component';

import { CrearAvionComponent } from './avion/crear-avion/crear-avion.component';
import { EditarAvionComponent } from './avion/editar-avion/editar-avion.component';
import { VerAvionComponent } from './avion/ver-avion/ver-avion.component';

import { CrearAeropuertoComponent } from './aeropuerto/crear-aeropuerto/crear-aeropuerto.component';
import { EditarAeropuertoComponent } from './aeropuerto/editar-aeropuerto/editar-aeropuerto.component';
import { VerAeropuertoComponent } from './aeropuerto/ver-aeropuerto/ver-aeropuerto.component';

import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { VerClienteComponent } from './cliente/ver-cliente/ver-cliente.component';

import { CrearVueloComponent } from './vuelo/crear-vuelo/crear-vuelo.component';
import { EditarVueloComponent } from './vuelo/editar-vuelo/editar-vuelo.component';
import { VerVueloComponent } from './vuelo/ver-vuelo/ver-vuelo.component';

import { CrearRutaComponent } from './ruta/crear-ruta/crear-ruta.component';
import { EditarRutaComponent } from './ruta/editar-ruta/editar-ruta.component';
import { VerRutaComponent } from './ruta/ver-ruta/ver-ruta.component';
import { DetalleUsuarioComponent } from './cliente/detalle-usuario/detalle-usuario.component';
import { DetalleRutaComponent } from './ruta/detalle-ruta/detalle-ruta.component';
import { DetalleAeropuertoComponent } from './aeropuerto/detalle-aeropuerto/detalle-aeropuerto.component';
import { DetalleAvionComponent } from './avion/detalle-avion/detalle-avion.component';



@NgModule({
  declarations: [
    InicioComponent,
    CrearAvionComponent,
    EditarAvionComponent,
    VerAvionComponent,
    CrearAeropuertoComponent,
    EditarAeropuertoComponent,
    VerAeropuertoComponent,
    CrearClienteComponent,
    EditarClienteComponent,
    VerClienteComponent,
    CrearVueloComponent,
    EditarVueloComponent,
    VerVueloComponent,
    CrearRutaComponent,
    EditarRutaComponent,
    VerRutaComponent,
    DetalleUsuarioComponent,
    DetalleRutaComponent,
    DetalleAeropuertoComponent,
    DetalleAvionComponent,
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    AdminRoutingModule, 
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
