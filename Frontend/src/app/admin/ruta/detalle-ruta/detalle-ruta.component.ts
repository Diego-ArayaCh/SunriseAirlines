import { Component, Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {RutaService} from 'src/app/services/ruta.service';
import {AeropuertoService} from 'src/app/services/aeropuerto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forEach } from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-detalle-ruta',
  templateUrl: './detalle-ruta.component.html',
  styleUrls: ['./detalle-ruta.component.css'],
})
export class DetalleRutaComponent implements OnInit {
 
  constructor(private aRoute: ActivatedRoute ,private router: Router, private toastr: ToastrService , private _rutaService: RutaService, private _aeropuertoService: AeropuertoService) {}

  //Listas de los combos
  id!: string | null;
  _aeropuertoInicio: any = [];
  _aeropuertoDestino: any = [];
  selectedInicio: any = null;
  rutaForm = new FormGroup({
    inicio: new FormControl('',Validators.required),
    destino: new FormControl('', Validators.required),
    duracion: new FormControl('', Validators.required),
    precio_trayecto: new FormControl('', Validators.required), 
    descuento: new FormControl('', Validators.required),
    horarios: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl(''),
  
    
     
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
    this.id = this.aRoute.snapshot.paramMap.get('id');
    this.obtenerRuta();
    this.cargarCombos();
   
  
    

  }

  obtenerRuta(){
    var ruta:any;
    if(this.id !== null) {

      this._rutaService.getById(this.id).subscribe( data => {
        data.horarios.forEach((element:any) => {

          var fecha = new Date(element.fecha).toLocaleDateString();
         
          
          
  
          
         
          element.fechaVisual = moment(fecha, 'D/M/YYYY')
            
            
            .format('D/M/YYYY');
            this._horariosCreados.push(element);


         
        });
        
        this.rutaForm.setValue({
          inicio: data.inicio._id,
     destino: data.destino._id,
    duracion: data.duracion,
    precio_trayecto: data.precio_trayecto, 
    descuento: data.descuento,
    horarios: '',
    date: '',
    time: '',
        });
       
        ruta = data;
       });
     
       
    }
  }
  cargarCombos(){
    this._aeropuertoService.get().subscribe( data => {
      this._aeropuertoInicio= data;
      this._aeropuertoDestino = data;
     
     
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
        hora_sal: this.rutaForm.get('time')?.value
      }
      var fecha = new Date(horario.fecha).toLocaleDateString();
      horario.fecha = fecha;
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
    
    if (this.rutaForm.valid) {
      //se setea el objeto dirección
      var ruta = this.rutaForm.value
     
      ruta.horarios = this._horariosCreados;
      this._aeropuertoInicio.forEach((element:any) => {
        if (element._id == ruta.inicio._id) {
          ruta.inicio = element
        }
        if (element._id == ruta.destino._id) {
          ruta.destino = element
        }
        
      });
     
     

    if (this.id != null) {
      this._rutaService.edit(this.id,ruta).subscribe((data) => {
        this.toastr.success('Route updated','Success');
        this.rutaForm.reset();
        this.router.navigate(["/admin/route/overview-route"])
     });
    }


     
    
    
    this._horariosCreados = [];
    }else{
      this.toastr.error('Form invalid','Error');
      console.log(this.rutaForm)
      }
}

}
