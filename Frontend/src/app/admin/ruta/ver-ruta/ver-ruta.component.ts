import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RutaService } from '../../../services/ruta.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ver-ruta',
  templateUrl: './ver-ruta.component.html',
  styleUrls: ['./ver-ruta.component.css']
})
export class VerRutaComponent implements OnInit {
  rutas: any = [];
  p: any = 1;
  collection: any[] = this.rutas;  
  constructor(private _rutaService: RutaService, private _toastr:ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.obtenerRutas(); 
  }
  obtenerRutas(): void {


    this._rutaService.get().subscribe(data => {

      console.log(data);
      this.rutas = data;
      this.collection = this.rutas.reverse();
    }, err => {

      console.log(err);

    });


  }
  actualizarEstado(id:any, ruta:any) {

    if (ruta.estado == 1) {
      ruta.estado = 0;
    }else{
      ruta.estado = 1;
    }
    this._rutaService.editState(id, ruta).subscribe(data => {


      if (ruta.estado == 1) {
        this._toastr.success('The state of route was changed','Route enabled');
      }else{
        this._toastr.error('The state of route was changed','Route disabled');
      }
     
     
      this.obtenerRutas();
    }, err => {

      console.log(err);

    });
  }
}
