import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AvionService } from 'src/app/services/avion.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-crear-avion',
  templateUrl: './crear-avion.component.html',
  styleUrls: ['./crear-avion.component.css']
})
export class CrearAvionComponent implements OnInit {
//variables de formulario
avionForm = new FormGroup({
  modelo: new FormControl(null, [Validators.required, Validators.minLength(3)]),
  anho: new FormControl('', [Validators.required, Validators.max(new Date().getFullYear()), Validators.min(1950)]),
  marca: new FormControl('', Validators.required),
  cant_filas: new FormControl('', [Validators.required, Validators.min(5)]), 
  cant_af: new FormControl('6', [Validators.required, Validators.min(6)]),
   imagen: new FormControl('', Validators.required),
   estado: new FormControl("1", [Validators.required, Validators.min(0)]),
   cant_pasa: new FormControl('',)
});


public archivos:any=[];
public previsualizacion:string='';


reloadCurrentRoute() {
  const currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
}
//Combo de marcas
listaMarcas=environment.listaMarcas;

  constructor(private sanitizer: DomSanitizer, private avionS: AvionService, private router: Router) { }

  ngOnInit(): void {
  }

submitForm(): void {
  this.avionForm.get('cant_pasa')?.setValue(parseInt(this.avionForm.get('cant_af')?.value)*parseInt(this.avionForm.get('cant_filas')?.value));
  this.avionForm.get('imagen')?.setValue(this.previsualizacion);
  if (this.avionForm.valid) {
    this.avionS.create(this.avionForm.value).subscribe((data) => {
      this.reloadCurrentRoute();
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
