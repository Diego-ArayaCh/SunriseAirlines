import { Component, OnInit } from '@angular/core';
import { VueloService } from '../../../services/vuelo.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-ver-vuelo',
  templateUrl: './ver-vuelo.component.html',
  styleUrls: ['./ver-vuelo.component.css'],
})
export class VerVueloComponent implements OnInit {
  constructor(
    private vueloService: VueloService,
    private toastr: ToastrService
  ) {}
  vuelos: any = [];
  p: any = 1;

  listarVuelos() {
    this.vueloService.get().subscribe((vuelo) => {
      for (const item of vuelo) {
        var date = new Date(item.horario_id.fecha);
        var fecha = date.toLocaleDateString();
        item.horario_id.fecha = moment(fecha, 'D/M/YYYY')
        .add(1, 'days')
        
        .format('D/M/YYYY')+ ' ' + item.horario_id.hora_sal;
        //Se da formato a la fecha y se le concatena la hora de salida, para llamar solo 1 campo en el HTML
      
      }
      var vuelosAuxiliares = [];
      for (const item of vuelo) {
        if (item.estado == 1) {
          vuelosAuxiliares.push(item);
        }
      }
      this.vuelos = vuelo.reverse();
    });
  }

  ngOnInit(): void {
    this.listarVuelos();
  }

  updateState(id: string, estadoActual: any): void {
    if (estadoActual == 0) {
      var activo = { estado: 1 };
      this.vueloService.editState(id, activo).subscribe((res: any) => {
        this.listarVuelos();
        this.toastr.success(
          'The state of the flight was changed',
          'Flight activated'
        );
      });
    } else {
      var desactivo = { estado: 0 };
      this.vueloService.editState(id, desactivo).subscribe((res: any) => {
        this.listarVuelos();
        this.toastr.error(
          'The state of the flight was changed',
          'Flight deactivate'
        );
      });
    }
  }

  delete(id: string): void {
    if (confirm('Are you sure about delete this flight?')) {
      this.vueloService.delete(id).subscribe((res: any) => {
        this.vuelos = this.vuelos.filter((post: any) => post._id !== id);
      });
    }
  }

  verVuelo(id: string) {}
}
