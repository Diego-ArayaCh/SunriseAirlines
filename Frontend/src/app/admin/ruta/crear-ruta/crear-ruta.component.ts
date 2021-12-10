import { Component, Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {RutaService} from 'src/app/services/ruta.service';
import {AeropuertoService} from 'src/app/services/aeropuerto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forEach } from 'lodash';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-crear-ruta',
  templateUrl: './crear-ruta.component.html',
  styleUrls: ['./crear-ruta.component.css'],
})
export class CrearRutaComponent implements OnInit {
  constructor(private toastr: ToastrService , private _rutaService: RutaService, private _aeropuertoService: AeropuertoService) {}

  //Listas de los combos
  _aeropuertoInicio: any = [];
  _aeropuertoDestino: any = [];
  rutaForm = new FormGroup({
    inicio: new FormControl('',Validators.required),
    destino: new FormControl('', Validators.required),
    duracion: new FormControl('', Validators.required),
    precio_trayecto: new FormControl('', Validators.required), 
    descuento: new FormControl('', Validators.required),
    horarios: new FormControl(),
    date: new FormControl(),
    time: new FormControl(),
  
    
     
  });
  // _aeropuertoInicio = [
  //   {
  //     _id: '1',
  //     nombre: 'Costa Rica',
  //   },
  //   {
  //     _id: '2',
  //     nombre: 'Estados Unidos',
  //   },
  // ];
  // _aeropuertoFinal = [
  //   {
  //     _id: '1',
  //     nombre: 'Costa Rica',
  //   },
  //   {
  //     _id: '2',
  //     nombre: 'Estados Unidos',
  //   },
  // ];
  // //Variables que poseen la seleccion del usuario
  // _aeropuertoInicioSelec: any = '---';
  // _aeropuertoFinalSelec: any = '---';

  // //Lista de horarios fabricados
  _horariosCreados: any[] = [];

  p_Horario: any = 1;

  // selectChange_Inicio(event: any) {
  //   //Almacena el ID de la seleccion
  //   //Pero primero valida que la seleccion sea diferente  al otro combo
  //   this.validaSeleccionDiferente_Inicio(event.target.value);
  // }
  // selectChange_Final(event: any) {
  //   //Almacena el ID de la seleccion
  //   //Pero primero valida que la seleccion sea diferente  al otro combo
  //   this.validaSeleccionDiferente_Final(event.target.value);
  // }

  // validaSeleccionDiferente_Inicio(valor: any) {
  //   //Este metodo valida que el combo seleccionado
  //   //sea distinto al otro seleccionado
  //   //si ya tuviera una seleccion o no
  //   if (
  //     this._aeropuertoInicioSelec == '---' &&
  //     this._aeropuertoFinalSelec != '---'
  //   ) {
  //     if (this._aeropuertoFinalSelec != valor) {
  //       //Setea el valor debido que es diferente seleccion
  //       this._aeropuertoInicioSelec = valor;
  //     } else {
  //       this.toastr.warning('The selection need to be different', 'Attention');
  //     }
  //   } else if (
  //     this._aeropuertoInicioSelec == '---' &&
  //     this._aeropuertoFinalSelec == '---'
  //   ) {
  //     this._aeropuertoInicioSelec = valor;
  //   } else {
  //     this.toastr.warning('The selection need to be different', 'Attention');
  //   }
  // }
  // validaSeleccionDiferente_Final(valor: any) {
  //   //Este metodo valida que el combo seleccionado
  //   //sea distinto al otro seleccionado
  //   //si ya tuviera una seleccion
  //   if (
  //     this._aeropuertoInicioSelec != '---' &&
  //     this._aeropuertoFinalSelec == '---'
  //   ) {
  //     if (this._aeropuertoInicioSelec != valor) {
  //       //Setea el valor debido que es diferente seleccion
  //       this._aeropuertoFinalSelec = valor;
  //     } else {
  //       this.toastr.warning('The selection need to be different', 'Attention');
  //     }
  //   } else if (
  //     this._aeropuertoInicioSelec == '---' &&
  //     this._aeropuertoFinalSelec == '---'
  //   ) {
  //     this._aeropuertoFinalSelec = valor;
  //   } else {
  //     this.toastr.warning('The selection need to be different', 'Attention');
  //   }
  // }

  borrarHorarioCreado(element: any): void {
    this._horariosCreados.forEach( (item, index) => {
      if(item === element) this._horariosCreados.splice(index,1);
    });

    this.toastr.warning("Shedule removed");

  }

  ngOnInit(): void {

    this._aeropuertoService.get().subscribe( data => {
      for (const aero of data) {
        if (aero.estado == 1) {
          this._aeropuertoInicio.push(aero)
          this._aeropuertoDestino.push(aero)
        }
        
    
      }
     

    });

  }
  agregarHorarios(){
    console.log(this.rutaForm.get('date')?.value)
      if (this.rutaForm.get('date')?.value == "" || this.rutaForm.get('date')?.value==null) {
        this.toastr.error("The date is required","Error")
        return;
      }
      if (this.rutaForm.get('time')?.value == "" || this.rutaForm.get('time')?.value==null) {
        this.toastr.error("The time is required","Error")
        return;
      }

      var horario = {
        fecha: this.rutaForm.get('date')?.value,
        hora_sal: this.rutaForm.get('time')?.value,
        fechaVisual:this.rutaForm.get('date')?.value
      }
     

      var fecha = new Date(horario.fecha).toLocaleDateString();
      horario.fechaVisual = moment(fecha, 'D/M/YYYY')
      .add(1, 'days')
      
      .format('D/M/YYYY');
     
     var flag:boolean = false;
      this._horariosCreados.forEach((element: any) => {
       if (element.fecha == horario.fecha && element.hora_sal == horario.hora_sal) {
        
        flag = true;
       }
     });

if (!flag) {
  this._horariosCreados.push(horario);
  this.toastr.success("Shedule added")
}else{
  this.toastr.error("the schedule already exists","Error")
}
     
  }
  enviar(){
    if(this.rutaForm.get('inicio')?.value == this.rutaForm.get('destino')?.value){
        this.toastr.error("The airports must be different","Error")
        return;
    }






    if (this._horariosCreados.length ==0) {
      this.toastr.error("Schedules are required", "Error")
      return;
    }
    this.rutaForm.get('horaios')?.setValue(this._horariosCreados);
    if (this.rutaForm.valid) {
      if (this.rutaForm.get('descuento')?.value >=1) {
        this.toastr.error("The discount must be less","Error")
        return;
      }
      //se setea el objeto dirección
      var ruta = this.rutaForm.value
     
      ruta.horarios = this._horariosCreados;
      this._rutaService.create(ruta).subscribe((data) => {
        this.toastr.success('Route created','Success');
        this.rutaForm.reset();
     });
    
    
    this._horariosCreados = [];
    }else{
      this.toastr.error('Form invalid','Error');
 
      }
}

}
