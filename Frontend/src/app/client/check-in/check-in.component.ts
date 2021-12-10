import { Component, OnInit } from '@angular/core';
declare function ejecutarAnimacion(): any;
import { ReservaService } from 'src/app/services/reserva.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {

  constructor(
    private reservaService: ReservaService,
    private tokenStorageService: TokenStorageService,
    private router: Router, ) { }


    vuelos: any[]=[];
    p: any = 1;
    
  ngOnInit(): void {
    ejecutarAnimacion();
    const idUser = this.tokenStorageService.getUser().user._id;
    this.reservaService.getCheckIn(idUser).subscribe((data=>{
      console.log(data);
      data.forEach((reserva: any)=>{
      let llegada=reserva.vuelo_id_1.horario_id.hora_sal
      let fecha=reserva.vuelo_id_1.horario_id.fecha.substring(0, 10);
      fecha+=' '+llegada;
      //console.log(fecha);
      
      let horaV1= moment(fecha, 'YYYY-MM-DD h:mm').add(1, 'days');
      
      console.log(horaV1)
      let ahora = moment();
      console.log(ahora);
      let date1 = new Date(horaV1.format('LLL'));
      let date2 = new Date(ahora.format('LLL'));
      let difference = Math.abs(date1.getTime() - date2.getTime());
      let hourDifference = difference  / 1000 / 3600;
      hourDifference-=24;
      console.log(hourDifference);//moment.duration(horaV1.diff(ahora)).asHours()
        if(hourDifference>=0&&hourDifference<=24&&(reserva.proceso==0)){
          let vuelo1 = reserva.vuelo_id_1;
          vuelo1.reserva=reserva._id;
          vuelo1.takeoff=horaV1.subtract(1, 'days').format('DD/MM/YYYY HH:mm');
          this.vuelos.push(vuelo1);
        }
      //   let llegada2=reserva.vuelo_id_2.horario_id.hora_sal
      // let fecha2=reserva.vuelo_id_12.horario_id.fecha.substring(0, 9);
      // fecha2+=','+llegada2;
      // const horaV2= moment(fecha, 'YYYY-MM-DD,h:mm')
      //   if(moment(ahora).isAfter(horaV2)){
      //     let vuelo2 = reserva.vuelo_id_2;
      //     vuelo2.reserva=reserva._id;
      //     this.vuelos.push(vuelo2);
       // }
      })
    }));
    
  }

}
