import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AeropuertoService } from 'src/app/services/aeropuerto.service';
import { AvionService } from 'src/app/services/avion.service';
import { VueloService } from 'src/app/services/vuelo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RutaService } from 'src/app/services/ruta.service';
import * as moment from 'moment';
import { BccrService } from '../../services/bccr.service';

declare function ejecutarAnimacion(): any;
declare function counterActivate(): any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private _aeropuertoService: AeropuertoService,
    private _rutaService: RutaService,
    private vueloService: VueloService,
    private avionService: AvionService,
    private usuarioService: UsuarioService, 
    private bccr: BccrService 
  ) { }
  public modoColonesRT2=false;
    public modoColonesRT1=false;
    public modoColonesOW=false;
    compraColon:number=0;
    cambiarRT1=()=>{
      this.modoColonesRT1=!this.modoColonesRT1;
    }
    cambiarOW=()=>{
      this.modoColonesOW=!this.modoColonesOW;
    }
    cambiarRT2=()=>{
      this.modoColonesRT2=!this.modoColonesRT2;
    }
    calculoMoneda(precio:any){
      var precioF  = new Intl.NumberFormat('de-DE').format(
        precio * this.compraColon
      );
        return "₡"+precioF
    }
    fecha: any = Date.now();
  tipoBusqueda = "";
  _aeropuertoInicio: any = [];
  _aeropuertoDestino: any = [];
  _rutasDescuento: any = [];
  _vuelosBusqueda_OneWay: any = [];
  _vuelosBusqueda_RoundTrip1: any = [];
  _vuelosBusqueda_RoundTrip2: any = [];
  v_NumRutas: any = '---';
  v_NumAviones: any = '---';
  v_NumClientes: any = '---';
  v_NumVuelos: any = '---';
  p: any = 1;

  precioDolar: any = '0';

  itemsForm = new FormGroup({
    inicio: new FormControl('', Validators.required),
    destino: new FormControl('', Validators.required),
    fechaInicio: new FormControl('', Validators.required),
    fechaFinal: new FormControl('', Validators.required),
    selectRoundTrip: new FormControl(''),
    selectOneWay: new FormControl(''),
  });

  ngOnInit(): void {
   this.fecha = new Date();
    this.fecha = moment(this.fecha, 'D/M/YYYY').format('YYYY-MM-DD');
   
    ejecutarAnimacion();
    this._aeropuertoService.get().subscribe((data) => {
      this._aeropuertoInicio = data;
      this._aeropuertoDestino = data;
    });
    this.bccr.get().subscribe((data: any) => {
      this.compraColon = data.compra;
     
    });
    this.rutasDescuento();
    this.contar_NumeroRutas();
    this.contar_NumeroAviones();
    this.contar_NumeroClientes();
    this.contar_NumeroVuelos();
  }

  consultar() {
    this.toastr.info("You must be logged")

  }
  buscarVuelo() {


    this._vuelosBusqueda_OneWay = [];
    this._vuelosBusqueda_RoundTrip1 = [];
    this._vuelosBusqueda_RoundTrip2 = [];
    if (this.itemsForm.get("selectOneWay")?.value && !this.itemsForm.get("selectRoundTrip")?.value) {
      //ONE_WAY

      if (this.itemsForm.get("inicio")?.valid && this.itemsForm.get("destino")?.valid && this.itemsForm.get("fechaInicio")?.valid) {
        //Realizar filtro

        this.vueloService.get().subscribe((data) => {

          for (var vuelo of data) {
            if (vuelo.estado == 1) {
            var busqueda = this.itemsForm.value
            var fecha = new Date(vuelo.horario_id.fecha).toLocaleDateString();
            vuelo.horario_id.fecha = moment(fecha, 'D/M/YYYY')
              .add(1, 'days') //fecha inicio
              .format('D/M/YYYY');




            var fechaForm = new Date(busqueda.fechaInicio).toLocaleDateString();
            var auxFechaInicio = moment(fechaForm, 'D/M/YYYY')
              .add(1, 'days') //fecha incio Búsqueda
              .format('D/M/YYYY');


            if (vuelo.ruta_id.inicio._id == busqueda.inicio._id
              && vuelo.ruta_id.destino._id == busqueda.destino._id
              && vuelo.horario_id.fecha == auxFechaInicio) {

              vuelo.horario_id.fecha = vuelo.horario_id.fecha + " " + vuelo.horario_id.hora_sal
              vuelo.ruta_id.descuento = vuelo.ruta_id.descuento * 100;
              this._vuelosBusqueda_OneWay.push(vuelo);
            }


          }
        }

        })





        this.tipoBusqueda = "One Trip"
        //Abre modal
        let modal: HTMLElement = document.getElementsByName('modal')[0] as HTMLElement;
        modal.click();

      } else {
        //rechazar y mostrar mensaje en modal 
        this.toastr.error("Form Invalid", "Error")
      }
    } else {
      if (this.itemsForm.get("selectOneWay")?.value && this.itemsForm.get("selectRoundTrip")?.value) {
        //ROUND_TRIP
        if (this.itemsForm.get("inicio")?.valid
          && this.itemsForm.get("destino")?.valid
          && this.itemsForm.get("fechaInicio")?.valid
          && this.itemsForm.get("fechaFinal")?.valid) {
          //Realizar filtro

          this.vueloService.get().subscribe((data) => {

            for (var vuelo of data) {
              if (vuelo.estado == 1) {
              var busqueda = this.itemsForm.value
              var fecha = new Date(vuelo.horario_id.fecha).toLocaleDateString();
              vuelo.horario_id.fecha = moment(fecha, 'D/M/YYYY')
                .add(1, 'days') //fecha inicio
                .format('D/M/YYYY');




              var fechaInicio = new Date(busqueda.fechaInicio).toLocaleDateString();
              var auxFechaInicio = moment(fechaInicio, 'D/M/YYYY')
                .add(1, 'days')               //fecha incio Búsqueda
                .format('D/M/YYYY');


              var fechaDestino = new Date(busqueda.fechaFinal).toLocaleDateString();
              var auxFechaDestino = moment(fechaDestino, 'D/M/YYYY')
                .add(1, 'days') //fecha incio Búsqueda
                .format('D/M/YYYY');



              if (vuelo.ruta_id.inicio._id == busqueda.inicio._id
                && vuelo.ruta_id.destino._id == busqueda.destino._id
                && vuelo.horario_id.fecha == auxFechaInicio) {

                vuelo.horario_id.fecha = vuelo.horario_id.fecha + " " + vuelo.horario_id.hora_sal
                vuelo.ruta_id.descuento = vuelo.ruta_id.descuento * 100;
                this._vuelosBusqueda_RoundTrip1.push(vuelo);
              }

              if (vuelo.ruta_id.inicio._id == busqueda.destino._id
                && vuelo.ruta_id.destino._id == busqueda.inicio._id
                && vuelo.horario_id.fecha == auxFechaDestino) {
                vuelo.horario_id.fecha = vuelo.horario_id.fecha + " " + vuelo.horario_id.hora_sal
                vuelo.ruta_id.descuento = vuelo.ruta_id.descuento * 100;
                this._vuelosBusqueda_RoundTrip2.push(vuelo);

              }

            }

          }
          })




          this.tipoBusqueda = "RoundTrip"

          //Abre modal
          let modal: HTMLElement = document.getElementsByName('modal')[0] as HTMLElement;
          modal.click();

        } else {
          //rechazar y mostrar mensaje en modal
          this.toastr.error("Form Invalid", "Error")
        }
      } else {
        this.toastr.error("Please select one way or round trip before of request", "Error")
      }
    }





  }
  seleccion_RoundTrip() {
    this.itemsForm.get('selectRoundTrip')?.setValue(true);
    this.itemsForm.get('selectOneWay')?.setValue(true);
  }
  seleccion_OneWay() {
    this.itemsForm.get('selectRoundTrip')?.setValue(false);
    this.itemsForm.get('selectOneWay')?.setValue(true);
  }
  rutasDescuento() {
    this._rutaService.get().subscribe((data) => {
      for (const item of data) {
        if (item.descuento != 0 && item.estado != 0) {
          item.descuento = item.descuento * 100;
          if (this._rutasDescuento.length < 4) {
            this._rutasDescuento.push(item);
          }
        }
      }
    });
  }
  contar_NumeroRutas() {
    this._rutaService.get().subscribe((item) => {
      var cantidad: any = 0;
      for (const i of item) {
        cantidad++;
      }
      this.v_NumRutas = cantidad;
    });
  }
  contar_NumeroAviones() {
    this.avionService.get().subscribe((item) => {
      var cantidad: any = 0;
      for (const i of item) {
        cantidad++;
      }
      this.v_NumAviones = cantidad;
    });
  }
  contar_NumeroClientes() {
    this.usuarioService.get().subscribe((item) => {
      var cantidad: any = 0;
      for (const i of item) {
        cantidad++;
      }
      this.v_NumClientes = cantidad;
    });
  }
  contar_NumeroVuelos() {
    this.vueloService.getSencillo().subscribe((item) => {
      var cantidad: any = 0;
      for (const i of item) {
        if (i.estado == 1) {
          cantidad++;
        }
      }
      this.v_NumVuelos = cantidad;
    });
  }


//////////////////////////////////////////////////////
// CAMBIAR MONEDA DE LAS TABLAS

//   _vuelosBusqueda_OneWay: any = [];
//   _vuelosBusqueda_RoundTrip1: any = [];
//   _vuelosBusqueda_RoundTrip2: any = [];
esColones_OneWay: string = 'false';
esColones_RoundWay1: string = 'false';
esColones_RoundWay2: string = 'false';

cambiarMoneda_OneWay() {
  if (this.esColones_OneWay == 'false') {
    this.monedaColones_OneWay();
    this.esColones_OneWay = 'true';
  } else if (this.esColones_OneWay == 'true') {
    this.monedaDolares_OneWay();
    this.esColones_OneWay = 'false';
  }
}
monedaColones_OneWay() {
  this._vuelosBusqueda_OneWay = []; //se limpia el arreglo que carga la tabla en dolares

  this._rutaService.get().subscribe((data) => {
    for (const item of data) {
      if (item.descuento != 0) {
        //Se aplica el descuento al precio, si es que tiene uno.
        item.precio_trayecto =
          item.precio_trayecto - item.precio_trayecto * item.descuento;

        //Conversion a COLONES por medio del API del BCCR
        item.precio_trayecto = new Intl.NumberFormat('de-DE').format(
          item.precio_trayecto * this.precioDolar
        );

        //Se le da el icono que se va mostrar en la tabla
        item.precio_trayecto = '₡' + item.precio_trayecto;

        //Se pasa de decimas a % de 100 el descuento
        item.descuento = item.descuento * 100;

        this._vuelosBusqueda_OneWay.push(item);
      }
    }
  });
}
monedaDolares_OneWay() {
  this._vuelosBusqueda_OneWay = []; //se limpia el arreglo que carga la tabla en dolares
  this._rutaService.get().subscribe((data) => {
    for (const item of data) {
      if (item.descuento != 0) {
        item.duracion = item.precio_trayecto; //utilizo este campo para guardar el precio real
        item.precio_trayecto =
          item.precio_trayecto - item.precio_trayecto * item.descuento;
        item.precio_trayecto = '$' + item.precio_trayecto;
        item.descuento = item.descuento * 100;
        this._vuelosBusqueda_OneWay.push(item);
      }
    }
  });
}

cambiarMoneda_RoundWay1() {
  if (this.esColones_RoundWay1 == 'false') {
    this.monedaColones_RoundWay1();
    this.esColones_RoundWay1 = 'true';
  } else if (this.esColones_RoundWay1 == 'true') {
    this.monedaDolares_RoundWay1();
    this.esColones_RoundWay1 = 'false';
  }
}
monedaColones_RoundWay1() {
  this._vuelosBusqueda_RoundTrip1 = []; //se limpia el arreglo que carga la tabla en dolares

  this._rutaService.get().subscribe((data) => {
    for (const item of data) {
      if (item.descuento != 0) {
        //Se aplica el descuento al precio, si es que tiene uno.
        item.precio_trayecto =
          item.precio_trayecto - item.precio_trayecto * item.descuento;

        //Conversion a COLONES por medio del API del BCCR
        item.precio_trayecto = new Intl.NumberFormat('de-DE').format(
          item.precio_trayecto * this.precioDolar
        );

        //Se le da el icono que se va mostrar en la tabla
        item.precio_trayecto = '₡' + item.precio_trayecto;

        //Se pasa de decimas a % de 100 el descuento
        item.descuento = item.descuento * 100;

        this._vuelosBusqueda_RoundTrip1.push(item);
      }
    }
  });
}
monedaDolares_RoundWay1() {
  this._vuelosBusqueda_RoundTrip1 = []; //se limpia el arreglo que carga la tabla en dolares
  this._rutaService.get().subscribe((data) => {
    for (const item of data) {
      if (item.descuento != 0) {
        item.duracion = item.precio_trayecto; //utilizo este campo para guardar el precio real
        item.precio_trayecto =
          item.precio_trayecto - item.precio_trayecto * item.descuento;
        item.precio_trayecto = '$' + item.precio_trayecto;
        item.descuento = item.descuento * 100;
        this._vuelosBusqueda_RoundTrip1.push(item);
      }
    }
  });
}

cambiarMoneda_RoundWay2() {
  if (this.esColones_RoundWay2 == 'false') {
    this.monedaColones_RoundWay2();
    this.esColones_RoundWay2 = 'true';
  } else if (this.esColones_RoundWay2 == 'true') {
    this.monedaDolares_RoundWay2();
    this.esColones_RoundWay2 = 'false';
  }
}
monedaColones_RoundWay2() {
  this._vuelosBusqueda_RoundTrip2 = []; //se limpia el arreglo que carga la tabla en dolares

  this._rutaService.get().subscribe((data) => {
    for (const item of data) {
      if (item.descuento != 0) {
        //Se aplica el descuento al precio, si es que tiene uno.
        item.precio_trayecto =
          item.precio_trayecto - item.precio_trayecto * item.descuento;

        //Conversion a COLONES por medio del API del BCCR
        item.precio_trayecto = new Intl.NumberFormat('de-DE').format(
          item.precio_trayecto * this.precioDolar
        );

        //Se le da el icono que se va mostrar en la tabla
        item.precio_trayecto = '₡' + item.precio_trayecto;

        //Se pasa de decimas a % de 100 el descuento
        item.descuento = item.descuento * 100;

        this._vuelosBusqueda_RoundTrip2.push(item);
      }
    }
  });
}
monedaDolares_RoundWay2() {
  this._vuelosBusqueda_RoundTrip2 = []; //se limpia el arreglo que carga la tabla en dolares
  this._rutaService.get().subscribe((data) => {
    for (const item of data) {
      if (item.descuento != 0) {
        item.duracion = item.precio_trayecto; //utilizo este campo para guardar el precio real
        item.precio_trayecto =
          item.precio_trayecto - item.precio_trayecto * item.descuento;
        item.precio_trayecto = '$' + item.precio_trayecto;
        item.descuento = item.descuento * 100;
        this._vuelosBusqueda_RoundTrip2.push(item);
      }
    }
  });
}


}
