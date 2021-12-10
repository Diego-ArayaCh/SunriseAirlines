import { Component, OnInit, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AvionService } from 'src/app/services/avion.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-editar-avion',
  templateUrl: './editar-avion.component.html',
  styleUrls: ['./editar-avion.component.css']
})
export class EditarAvionComponent implements OnInit {
  public archivos:any=[];
  public previsualizacion:string='';

  listaMarcas=environment.listaMarcas;

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
  
  submitForm(){
    this.avionForm.get('cant_pasa')?.setValue(parseInt(this.avionForm.get('cant_af')?.value)*parseInt(this.avionForm.get('cant_filas')?.value));
    this.avionForm.get('imagen')?.setValue(this.previsualizacion);
    if (this.avionForm.valid) {
      this.avionS.update(this.avion._id ,this.avionForm.value).subscribe((data) => {
        this.router.navigate(['admin/airplane/overview-airplane']);
      });
    }
  }

  obtenerImagen(event:any){

    const imagen = event.target.files[0];
    
    this.extraerBase64(imagen).then((imagen: any) =>{
      this.previsualizacion = imagen.base;
      console.log(imagen.base);
    });
    
    
    this.archivos.push(imagen);
      }
    
    
    
    extraerBase64 = async($event:any) => new Promise((resolve, reject) => {
    
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          
          base: reader.result
    
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
        
    
    
    
      }
    
    } catch (error) {
     
    }
    
    
    
    
    
    })
    
}
