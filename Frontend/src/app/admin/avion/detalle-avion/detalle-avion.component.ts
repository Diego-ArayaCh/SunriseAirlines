import { Component, OnInit, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AvionService } from 'src/app/services/avion.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-detalle-avion',
  templateUrl: './detalle-avion.component.html',
  styleUrls: ['./detalle-avion.component.css']
})
export class DetalleAvionComponent implements OnInit {

  public archivos:any=[];
  public previsualizacion:string='';

  avion:any={};

  constructor(private sanitizer: DomSanitizer, private avionS: AvionService, private router: Router, private aRouter:ActivatedRoute) { }
//formulario
  avionForm = new FormGroup({
    modelo: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    anho: new FormControl('', [Validators.required, Validators.max(new Date().getFullYear()), Validators.min(1990)]),
    marca: new FormControl('', Validators.required),
    cant_filas: new FormControl('', [Validators.required, Validators.min(5)]), 
    cant_af: new FormControl('', [Validators.required, Validators.min(6)]),
     imagen: new FormControl('', Validators.required),
     estado: new FormControl('', [Validators.required, Validators.min(0)]),
     cant_pasa: new FormControl('',),
     _id: new FormControl('',)
  });



  ngOnInit(): void {
    this.aRouter.params.subscribe((params) => {
      this.avionS.getById(params['id']).subscribe((data) => {
        data.cant_pasa=0;
        delete data.__v; 
        this.previsualizacion=data.imagen;
        this.avion = data;
        this.avionForm.setValue(this.avion);
      });
    });
  }
  


}
