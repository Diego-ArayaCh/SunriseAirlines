import { Component, Injectable, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Loader } from '@googlemaps/js-api-loader';
import { styles } from './mapstyles';
import { ActivatedRoute, Router } from '@angular/router';
import { waitForAsync } from '@angular/core/testing';
import { TokenStorageService } from 'src/app/services/token-storage.service';
declare function ejecutarAnimacion(): any;

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  private usuarioOriginal!:any;
  private _usuarios:any[]=[]
  private map!: google.maps.Map;
  id!: string | null;
  lat: string = '';
  lng: string = '';
  public archivos: any = [];
  public previsualizacion: string = '';
  usuarioForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    fech_nacimiento: new FormControl('', Validators.required),
    tel_trabajo: new FormControl('', Validators.required),
    tel_celular: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),
    contrasenna1: new FormControl('', Validators.required),
    contrasenna2: new FormControl('', Validators.required),
    imagen: new FormControl(),
    sennas: new FormControl('', Validators.required),
    direccion: new FormControl(),
  });
  constructor(
    private aRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private _usuarioService: UsuarioService,
    private router: Router, 
    private token:TokenStorageService
  ) {
    
   
  }

  ngOnInit(): void {
    ejecutarAnimacion();
    this.obtenerUsuario();
    
  }

  mapa() {
    let loader = new Loader({
      apiKey: 'AIzaSyBrSzQLopheNl98oKL3xPgWCdQMK03ZPgA',
    });

    loader.load().then(() => {
      var informacion = new google.maps.InfoWindow({});

      var location = { lat: +this.lat, lng: +this.lng };

      this.map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: location,
          zoom: 10,
          mapTypeControl: false,
          styles: styles,
        }
      );

      const marker = new google.maps.Marker({
        map: this.map,
      });
      this.map.setCenter(location);
      marker.setPosition(location);
      this.lat = location.lat.toString();
      this.lng = location.lng.toString();

      var textoMensaje =
        '<h4>You are here!</h4>' +
        '<p><b>LNG: </b>' +
        location.lng +
        '</p>' +
        '<p><b>LAT: </b>' +
        location.lat +
        '</p>';

      informacion.setContent(textoMensaje);

      marker.setIcon('../../../../assets/images/pin.png');

      marker.addListener('click', () => {
        informacion.open(this.map, marker);
      });

      this.map.addListener('click', (mapsMouseEvent: any) => {
        let lngLat = JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2);
        location = JSON.parse(lngLat);

        this.map.setCenter(location);
        marker.setPosition(location);

        this.lat = location.lat.toString();
        this.lng = location.lng.toString();

        var textoMensaje =
          '<h4>You are here!</h4>' +
          '<p><b>LNG: </b>' +
          location.lng +
          '</p>' +
          '<p><b>LAT: </b>' +
          location.lat +
          '</p>';

        informacion.setContent(textoMensaje);

        marker.setIcon('../../../../assets/images/pin.png');

        marker.addListener('click', () => {
          informacion.open(this.map, marker);
        });
      });
    });
  }
  enviar() {
    if (this.previsualizacion == '') {
      this.toastr.error('Please choose an image for the customer', 'Error');
      return;
    }
    if (this.lat == '' && this.lng == '') {
      this.toastr.error('Please choose an location for the customer', 'Error');
      return;
    }

    this.usuarioForm.get('imagen')?.setValue(this.previsualizacion);

    //se construye el objeto dirección
    const direccion = {
      sennas: this.usuarioForm.get('sennas')?.value,
      latitud: this.lat,
      longitud: this.lng,
    };
    this.usuarioForm.get('direccion')?.setValue(direccion);
    
    if (this.usuarioForm.valid) {
      //se setea el objeto dirección
      var usuario = this.usuarioForm.value;
      usuario.pwd = this.usuarioForm.get("contrasenna1")?.value
      if (this.id !== null) {
        this._usuarioService.getUsernames().subscribe((data) => {

          this._usuarios = data
    
        });
    
        var exist:any = false;
      if (this.usuarioOriginal.usuario != usuario.usuario) {
        console.log(this.usuarioOriginal.usuario+" "+usuario.usuario)
         exist = this.validarExisteUsuario(usuario.usuario);
      }
     
   
     
      
      if (exist) {
        
        this.toastr.error('Username not available','Error');
        return;
      }
      console.log("Sí")
      console.log(this.id)
        this._usuarioService.editProfile(this.id, usuario).subscribe((data) => {
          this.toastr.success('User updated', 'Success');
          this.usuarioForm.reset();
          this.router.navigate(['/admin/customer/overview-customer']);
        });
      } else {
        this.toastr.error('User not exist', 'Error');
      }
    } else {
      this.toastr.error('Form invalid', 'Error');
    }
  }

  obtenerImagen(event: any) {
    const imagen = event.target.files[0];
    this.extraerBase64(imagen).then((imagen: any) => {
      this.previsualizacion = imagen.base;
    });
    this.archivos.push(imagen);
  }

  async validarExisteUsuario(usernameNew: string):Promise<boolean> {
    var e = false;
    await this._usuarioService.getUsernames().subscribe( (data) => {
  
      
     
        
       for (let index = 0; index < data.length; index++) {
         const element = data[index];
         console.log(element)
         if (element == usernameNew) {
          
           e =  true
         }
       }
          
        
      
       
          
          
       
        
        
     
    })
  
  
  return e;
  
  
  }
  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (error) {}
    });
  obtenerUsuario() {
   this.id= this.token.getUser().user._id
    if (this.id != null) {
      this._usuarioService.getById(this.id).subscribe((data) => {
        this.lat = data.direccion.latitud;
        this.lng = data.direccion.longitud;
        this.previsualizacion = data.imagen;

        var fecha = new Date(data.fech_nacimiento)
          .toLocaleDateString()
          .split('/');
        var formatDate =
          fecha[2] +
          '-' +
          (fecha[1].length == 2 ? '' : '0') +
          fecha[1] +
          '-' +
          (fecha[0].length == 2 ? '' : '0') +
          fecha[0];
          this.usuarioOriginal = data;
        this.usuarioForm.setValue({
          nombre: data.nombre,
         
          apellidos: data.apellidos,
          correo: data.correo,
          fech_nacimiento: formatDate,
          tel_trabajo: data.tel_trabajo,
          tel_celular: data.tel_celular,
          usuario: data.usuario,
          contrasenna1: data.pwd,
          contrasenna2: data.pwd,
          imagen: null,
          sennas: data.direccion.sennas,
          direccion: data.direccion,
        });

        this.mapa();
      });
    }else{
      this.toastr.error("User not found in the database")
    }
  }
}
