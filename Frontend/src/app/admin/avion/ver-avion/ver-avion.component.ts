import { Component, OnInit } from '@angular/core';
import { AvionService } from 'src/app/services/avion.service';
import { ToastrService } from 'ngx-toastr';
//import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-avion',
  templateUrl: './ver-avion.component.html',
  styleUrls: ['./ver-avion.component.css']
})
export class VerAvionComponent implements OnInit {

  
avioncitos:any[] = [];
p: any = 1;
collection: any[] = this.avioncitos;  
  constructor(private avionS: AvionService, private toast: ToastrService, private router: Router) {
   
   }

  obtenerAvioncitos(){
    this.avionS.get().subscribe(aviones =>{
      this.avioncitos=aviones.reverse();
      this.collection=this.avioncitos;
    }, err => {

      console.log(err);
    });
    
  }

  estadoAvion(id:any, avion:any) {

    if (avion.estado == 1) {
      avion.estado = 0;
    }else{
      avion.estado = 1;
    }
    this.avionS.updateState(id, avion).subscribe(data => {


      if (avion.estado == 1) {
        this.toast.success('The state of the Airplane was changed','Airplane enabled');
      }else{
        this.toast.error('The state of the Airplane was changed','Airplane disabled');
      }
     
     
      this.obtenerAvioncitos();
    }, err => {

      console.log(err);

    });
  }

  editMode(id:any) {
    this.router.navigate(['airplane/edit/'+id]);
  }

  ngOnInit(): void {
  this.obtenerAvioncitos();

  }

}
