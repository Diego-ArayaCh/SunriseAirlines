import { Component, OnInit } from '@angular/core';
import { AeropuertoService } from 'src/app/services/aeropuerto.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ver-aeropuerto',
  templateUrl: './ver-aeropuerto.component.html',
  styleUrls: ['./ver-aeropuerto.component.css']
})
export class VerAeropuertoComponent implements OnInit {

  aeroP:any[] = [];
  p: any = 1;
  collection: any[] = this.aeroP;  
    constructor(private aeropuertoS: AeropuertoService, private toast: ToastrService, private router: Router) {
     
     }
  
    obtenerAeropuerto(){
      this.aeropuertoS.get().subscribe(aeropuertos =>{
        this.aeroP=aeropuertos.reverse();
        this.collection=this.aeroP;
      }, err => {
  
        console.log(err);
      });
      
    }
  
    estadoAerop(id:any, aero:any) {
  
      if (aero.estado == 1) {
        aero.estado = 0;
      }else{
        aero.estado = 1;
      }
      this.aeropuertoS.update(id, aero).subscribe(data => {
  
  
        if (aero.estado == 1) {
          this.toast.success('The state of the Airplane was changed','Airplane enabled');
        }else{
          this.toast.error('The state of the Airplane was changed','Airplane disabled');
        }
       
       
        this.obtenerAeropuerto();
      }, err => {
  
        console.log(err);
  
      });
    }
  
    editMode(id:any) {
      this.router.navigate(['airport/edit/'+id]);
    }
  
    ngOnInit(): void {
    this.obtenerAeropuerto();
  
    }
  

}
