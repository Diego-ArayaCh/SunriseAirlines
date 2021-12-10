import { Component, OnInit, Injectable} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AvionService } from 'src/app/services/avion.service';
import { VueloService } from 'src/app/services/vuelo.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { Router, ActivatedRoute } from '@angular/router';
declare function ejecutarAnimacion(): any;
// interface IAsientos
//   {"fil":Number,
//   "num":Number,
//   "est": boolean}




@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-escoger-asiento',
  templateUrl: './escoger-asiento.component.html',
  styleUrls: ['./escoger-asiento.component.css']
})
export class EscogerAsientoComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private reservaS: ReservaService,
    private vueloS : VueloService,
    private avionS : AvionService,
    private router: Router,
    private aRouter: ActivatedRoute,
  ) { }


reserva: any={};

avion: any={};
//asientos:IAsientos[]=[]
//asientosVista:Array<IAsientos[]>=[];
vuelo:any={};
numFilas:number=0;
numAF:number=0;

encabezado:any[]=[];

contador:number=0;

asientoEscogido:any='';

 numeroFilas_Vuelo: any = '';
 asientosVuelo: any = [];
 asientos: any = [];

obtenerDatos(){
  let id=this.aRouter.snapshot.paramMap.get('id')+'';
  console.log(id);
  this.reservaS.getById(id).subscribe((data)=>{
    this.reserva=data;
    console.log(data);
    this.vueloS.getById(data.vuelo_id_1._id).subscribe((data) => {
      this.vuelo=data;
      for (let index = 0; index < data.avion_id.cant_af; index++) {
        this.asientosVuelo.push({ numFil: index + 1 });
      }

      //                     ---ASIENTOS----   ---ASIENTOS----
      //                            0                1
      //ArregloDeArreglos  [ [{ }, { } ,{ }], [{ }, { } ,{ }] ]
      //                       0    1     2     0    1     2
      var contador = 0;
      var asientosAux: any = [];
      var asientosFila: any = [];

      // for (let i = 0; i < data.avion_id.cant_filas; i++) {
      //   for (let j = 0; j < data.avion_id.cant_af; j++) {
      //     asientosFila.push(data.asientos[contador]);
      //     contador++;
      //   }
      //   asientosAux.push(asientosFila);
      //   asientosFila = [];
      // }
      //Metodo que funciona
      data.asientos.forEach((asi: any)=> {
        if(contador<data.avion_id.cant_af){
              asientosFila.push(asi);
              contador++;
        }else{
          console.log(asientosFila)
              asientosAux.push(asientosFila);
              asientosFila=[];
              asientosFila.push(asi);
              contador=1;
        };
      });

      this.asientos = asientosAux;

      console.log(this.asientos);
      this.encabezado = Array(this.numAF).fill(1).map((x, i) => i + 1);  
    });
  });
  
  
  //this.reserva.vuelo_id;
}
escogerAsiento(){
  this.asientoEscogido= document.querySelector('input[name=seleccion]:checked');// as NodeListOf<HTMLElement>;
  if(this.asientoEscogido==null){
    alert('Choose a seat');
    return;
  }
  
  this.reserva.num_asiento=this.asientoEscogido.value
  console.log(this.reserva);
  this.reservaS.checkIn(this.reserva._id,this.    reserva).subscribe((data)=>{
    console.log(data);
     this.router.navigate(['/client/check-in']);
  });
  
 
}

  ngOnInit(): void {
    this.obtenerDatos();
    ejecutarAnimacion();
    // this.vuelo=this.vueloS.getById('61959d5601b9367d8b45d93b').subscribe((data) => {
    //   this.avion=data.avion_id;
    //   this.numFilas=Number(this.avion.cant_filas);
    //   this.numAF=Number(this.avion.cant_af);
    //   this.asientos=this.vuelo.asientos;
    //   console.log(this.vuelo);
    //     }); //this.reserva.vuelo_id;
      
    // console.log(this.vuelo);
    // let arrayAsi:IAsientos[]=[];
    // this.asientos.forEach(asi => {
    //   if(this.contador>=this.numAF){
    //     arrayAsi.push(asi);
    //     this.contador++;
    //   }else{
    //     this.asientosVista.push(arrayAsi);
    //     arrayAsi=[];
    //     arrayAsi.push(asi)
    //     this.contador=1;
    //   }
    // });
  }

}
