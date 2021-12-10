import { Component, OnInit } from '@angular/core';
declare function ejecutarAnimacion(): any;
import { ToastrService } from 'ngx-toastr';
import { BccrService } from '../../services/bccr.service';
import { AeropuertoService } from 'src/app/services/aeropuerto.service';
import { AvionService } from 'src/app/services/avion.service';
import { VueloService } from 'src/app/services/vuelo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RutaService } from 'src/app/services/ruta.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css'],
})
export class OfertasComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private _aeropuertoService: AeropuertoService,
    private _rutaService: RutaService,
    private vueloService: VueloService,
    private avionService: AvionService,
    private usuarioService: UsuarioService,
    private bccr: BccrService //private indicadoresEconomicosBCCR: indicadoresEconomicosBCCR
  ) {}

  _rutasDescuento: any = [];
  precioDolar: any = '0';
  esColones: string = 'false';
  p: any = 1;

  ngOnInit(): void {
    ejecutarAnimacion();
    this.bccr.get().subscribe((data: any) => {
      this.precioDolar = data.compra;
      console.log(data);
    });
    this.rutasDescuento();
  }

  rutasDescuento() {
    this.vueloService.get().subscribe((data) => {
      for (const item of data) {
        if (item.ruta_id.descuento != 0) {
          item.ruta_id.duracion = item.ruta_id.precio_trayecto; //utilizo este campo para guardar el precio real
          item.ruta_id.precio_trayecto =
            item.ruta_id.precio_trayecto -
            item.ruta_id.precio_trayecto * item.ruta_id.descuento;
          item.ruta_id.precio_trayecto = '$' + item.ruta_id.precio_trayecto;
          item.ruta_id.descuento = item.ruta_id.descuento * 100;
          this._rutasDescuento.push(item);
        }
      }
    });
  }

  cambiarMoneda() {
    if (this.esColones == 'false') {
      this.monedaColones();
      this.esColones = 'true';
    } else if (this.esColones == 'true') {
      this.monedaDolares();
      this.esColones = 'false';
    }
  }

  monedaColones() {
    this._rutasDescuento = []; //se limpia el arreglo que carga la tabla en dolares

    this.vueloService.get().subscribe((data) => {
      for (const item of data) {
        if (item.ruta_id.descuento != 0) {
          //Se aplica el descuento al precio, si es que tiene uno.
          item.ruta_id.precio_trayecto =
            item.ruta_id.precio_trayecto - item.ruta_id.precio_trayecto * item.ruta_id.descuento;

          //Conversion a COLONES por medio del API del BCCR
          item.ruta_id.precio_trayecto = new Intl.NumberFormat('de-DE').format(
            item.ruta_id.precio_trayecto * this.precioDolar
          );

          //Se le da el icono que se va mostrar en la tabla
          item.ruta_id.precio_trayecto = '₡' + item.ruta_id.precio_trayecto;

          //Se pasa de decimas a % de 100 el descuento
          item.ruta_id.descuento = item.ruta_id.descuento * 100;

          this._rutasDescuento.push(item);
        }
      }
    });
  }

  monedaDolares() {
    this._rutasDescuento = []; //se limpia el arreglo que carga la tabla en dolares
    this.vueloService.get().subscribe((data) => {
      for (const item of data) {
        if (item.ruta_id.descuento != 0) {
          item.ruta_id.duracion = item.ruta_id.precio_trayecto; //utilizo este campo para guardar el precio real
          item.ruta_id.precio_trayecto =
            item.ruta_id.precio_trayecto -
            item.ruta_id.precio_trayecto * item.ruta_id.descuento;
          item.ruta_id.precio_trayecto = '$' + item.ruta_id.precio_trayecto;
          item.ruta_id.descuento = item.ruta_id.descuento * 100;
          this._rutasDescuento.push(item);
        }
      }
    });
  }
}
