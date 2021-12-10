import { Injectable, Component, OnInit } from '@angular/core';
import { VueloService } from '../../../services/vuelo.service';
import { RutaService } from 'src/app/services/ruta.service';
import { AvionService } from 'src/app/services/avion.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-crear-vuelo',
  templateUrl: './crear-vuelo.component.html',
  styleUrls: ['./crear-vuelo.component.css'],
})
export class CrearVueloComponent implements OnInit {
  constructor(
    private vueloService: VueloService,
    private rutaService: RutaService,
    private avionService: AvionService,
    private toastr: ToastrService
  ) {}

//Variables para el paginador
  p_Avion: any = 1;
  p_Ruta: any = 1;
  p_Horario: any = 1;

  //Arreglos que llenan las tablas, segun la seleccion
  //del usuario
  aviones: any = [];
  rutas: any = [];
  horarios: any = [];

  //Campos que se van ingresar en la BD
  _idAvion: any = null;
  _idRuta: any = null;
  _idHorario: any = null;

  //Contenido de etiquetas, para hacerlas que cambien dinamicamente
  //segun la seleccion del usuario
  avionSeleccionado: string = 'Airplane not selected!';
  rutaSeleccionado: string = 'Route not selected!';
  horarioSeleccionado: string = 'Schedule not selected!';

  ngOnInit(): void {
    this.listaRutas();
  }

  //Boton de creacion final del VUELO
  submitForm() {
    if (
      this.avionSeleccionado != 'Airplane not selected!' &&
      this.rutaSeleccionado != 'Route not selected!' &&
      this.horarioSeleccionado != 'Schedule not selected!'
    ) {
      var _idHorario_Local: any = this._idHorario;
      this.rutaService.getById(this._idRuta).subscribe((ruta) => {
        var duracion: any = '';
        var horaSal: any = '';
        var fecSal: any = '';
        duracion = ruta.duracion;
        for (const item of ruta.horarios) {
          if (item._id == _idHorario_Local) {
            //obtener la hora de salida.
            horaSal = item.hora_sal;
            fecSal=item.fecha;
          }
        }

        var date = new Date(fecSal);
        fecSal = date.toLocaleDateString();
        
        fecSal = moment(fecSal, 'D/M/YYYY')
        .add(1, 'days')
        
        .format('D/M/YYYY')
        var h = Math.floor(duracion / 60);
        var m = duracion % 60;
        horaSal = horaSal + ':00';
        var _HoraLLegada = '';
        _HoraLLegada = moment(fecSal+" "+horaSal, 'D/M/YYYY HH:mm:ss')
          .add(h, 'hours')
          .add(m, 'minutes')
          .format('D/M/YYYY HH:mm');

        //Aca va el metodo de guardar en la base de datos
        var valores = {
          avion_id: this._idAvion,
          ruta_id: this._idRuta,
          horario_id: this._idHorario,
          hora_lleg: _HoraLLegada,
        };

        this.vueloService.create(valores).subscribe((data) => {
          this.avionSeleccionado = 'Airplane not selected!';
          this.rutaSeleccionado = 'Route not selected!';
          this.horarioSeleccionado = 'Schedule not selected!';
          this.aviones = [];
          this.horarios = [];
          this._idAvion = '';
          this._idRuta = '';
          this._idHorario = '';
          this.toastr.success('The flight was successfully saved', 'Attention');
        });
      });
    } else {
      this.toastr.error(
        'Please check if you selected all the information needed!',
        'Attention'
      );
    }
  }

  //Contenido de las tablas segun seleccion
  // Llaman al GET y se filtran aca con un IF
  listaAviones_Marca(marca: string) {
    var avionMarca: any = [];
    this.avionService.get().subscribe((avion) => {
      for (const item of avion) {
        if(item.estado==1){
          if (item.marca == marca) {
            avionMarca.push(item);
          }
        }
      }
      this.aviones = avionMarca;
    });
  }
  listaRutas() {
    this.rutaService.get().subscribe((ruta) => {
      var rutasAux:any=[];
      for (const item of ruta) {
        if(item.estado==1){
          rutasAux.push(item);
        }
      }
      this.rutas = rutasAux.reverse();
    });
  }
  listaRuta_Horario(rutaID: any) {
    this.rutaService.getById(rutaID).subscribe((ruta) => {
      for (const item of ruta.horarios) {
        var date = new Date(item.fecha);
        var fecha = date.toLocaleDateString();
        item.fecha = moment(fecha, 'D/M/YYYY')
        .add(1, 'days')
        
        .format('D/M/YYYY');
      }
      this.horarios = ruta.horarios;
    });
  }

  //Botones de seleccion de tablas
  //LLenan el campo por si decide eso el usuario, enviar esas
  //variables a la DB
  selectAvion(id: string) {
    this._idAvion = id;
    this.avionService.getById(id).subscribe((avion) => {
      this.avionSeleccionado = avion.marca + ' ' + avion.modelo;
    });
  }

  selectRuta(id: string) {
    this._idRuta = id;
    this.rutaService.getById(id).subscribe((ruta) => {
      this.rutaSeleccionado =
        ruta.inicio.nombre + ' >>> ' + ruta.destino.nombre;
    });
    this.listaRuta_Horario(id);
  }

  selectHorario(id: string) {
    this._idHorario = id;
    this.rutaService.getById(this._idRuta).subscribe((ruta) => {
      for (const item of ruta.horarios) {
        var date = new Date(item.fecha);
        var fecha = date.toLocaleDateString();
        item.fecha = moment(fecha, 'D/M/YYYY')
        .add(1, 'days')
        
        .format('D/M/YYYY');
      }
      for (const item of ruta.horarios) {
        if (item._id == id) {
          this.horarioSeleccionado = item.fecha + ' at ' + item.hora_sal;
          //obtener la hora de salida.
        }
      }
    });
  }

  ////////////////////// SELECT ITEM //////////////////////////////
  mySelect = '1';
  selectedValue: any;
  MarcasAviones = [
    {
      id: 'Airbus',
      name: 'Airbus',
    },
    {
      id: 'Boeing',
      name: 'Boeing',
    },
  ];

  selectChange(event: any) {
    this.listaAviones_Marca(event.target.value);
  }
}
