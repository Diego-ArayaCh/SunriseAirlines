import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { AvionService } from 'src/app/services/avion.service';
import { VueloService } from 'src/app/services/vuelo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RutaService } from 'src/app/services/ruta.service';
import { ReservaService } from 'src/app/services/reserva.service';

import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';

declare function ejecutarAnimacion(): any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  @ViewChild('mychart') mychart: any;
  canvas: any;
  ctx: any;

  v_NumRutas: any = '---';
  v_NumAviones: any = '---';
  v_NumClientes: any = '---';
  v_NumVuelos: any = '---';
  v_ListaTopVuelos: any = [];

  constructor(
    private vueloService: VueloService,
    private avionService: AvionService,
    private usuarioService: UsuarioService,
    private rutaService: RutaService,
    private reservaService: ReservaService
  ) {}

  contar_NumeroRutas() {
    this.rutaService.get().subscribe((item) => {
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

  calcular_TopVuelos() {
    //Aca se debe de llenar la lista llamada: v_ListaTopVuelos
    //Una vez esta se llene con el top de vuelos, se va a
    //cargar la tabla en el front
    this.reservaService.get().subscribe((item) => {
      const vuelos = [];
      const vuelosConCantidad = [];
      const vuelosTop5 = [];

      for (const i of item) {
        if (i.vuelo_id_1 != '' || i.vuelo_id_1 != null)
          vuelos.push(i.vuelo_id_1);
        if (i.vuelo_id_2 != '' || i.vuelo_id_2 != null)
          vuelos.push(i.vuelo_id_2);
      }

      for (const i of vuelos) {
        var cant = 0;
        for (const j of vuelos) {
          if (i == j) {
            cant++;
          }
        }
        vuelosConCantidad.push({ vuelo: i, cantidad: cant });
      }

      vuelosConCantidad.sort(function (a, b) {
        if (a.cantidad > b.cantidad) {
          return 1;
        }
        if (a.cantidad < b.cantidad) {
          return -1;
        }
        return 0;
      });

      vuelosTop5.push(vuelosConCantidad[vuelosConCantidad.length-1]);
      vuelosTop5.push(vuelosConCantidad[vuelosConCantidad.length-2]);
      vuelosTop5.push(vuelosConCantidad[vuelosConCantidad.length-3]);
      vuelosTop5.push(vuelosConCantidad[vuelosConCantidad.length-4]);
      vuelosTop5.push(vuelosConCantidad[vuelosConCantidad.length-5]);
     // this.v_ListaTopVuelos= vuelosTop5
    });
  }

  ngOnInit(): void {
    ejecutarAnimacion();
    //Campos dinamicos que se llenan desde la BD
    this.contar_NumeroRutas();
    this.contar_NumeroAviones();
    this.contar_NumeroClientes();
    this.contar_NumeroVuelos();
    this.calcular_TopVuelos();
  }

  ngAfterViewInit() {
    //Variables para el grafico de la parte superior del dashboard
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    //Se debe remplazar con las ganancias de 12 meses
    var dataDB = [150, 150, 300, 475, 700, 689, 720, 150, 900, 300, 475, 340];
    new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: [
          'Jan.',
          'Feb.',
          'Mar.',
          'Apr.',
          'May',
          'Jun.',
          'Jul.',
          'Aug.',
          'Sep.',
          'Oct.',
          'Nov.',
          'Dec.',
        ],
        datasets: [
          {
            label: "Last year's income",
            data: dataDB,
            backgroundColor: ['rgba(9, 197, 171, .2)'],
            borderColor: ['rgba(33, 37, 41, .7)'],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Values in thousands of dollars',
                fontColor: '#C7C7CC',
                fontSize: 11,
              },
            },
          ],
        },
      },
    });
  }
}
