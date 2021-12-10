import { Component, OnInit, Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { styles } from './mapstyles';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AeropuertoService } from 'src/app/services/aeropuerto.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-crear-aeropuerto',
  templateUrl: './crear-aeropuerto.component.html',
  styleUrls: ['./crear-aeropuerto.component.css'],
})
export class CrearAeropuertoComponent implements OnInit {
  private map!: google.maps.Map;
  constructor(
    private toastr: ToastrService,
    private aeropuertoS: AeropuertoService,
    private router: Router
  ) {}

  //formulario
  aeropForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    pais: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required),
    latitud: new FormControl('', Validators.required),
    longitud: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    estado: new FormControl('', [Validators.required]),
  });
  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  submitForm() {
    if (this.aeropForm.valid) {
      this.aeropuertoS.create(this.aeropForm.value).subscribe((data) => {
        this.reloadCurrentRoute();
      });
    }
  }
  ngOnInit(): void {
    this.aeropForm.get('estado')?.setValue(1);
    let loader = new Loader({
      apiKey: 'AIzaSyBrSzQLopheNl98oKL3xPgWCdQMK03ZPgA',
    });

    loader.load().then(() => {
      console.log('loaded gmaps');
      var informacion = new google.maps.InfoWindow({});

      var location = { lat: 9.996182, lng: -84.210243 };

      this.map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: location,
          zoom: 6,
          mapTypeControl: false,
          styles: styles,
        }
      );

      const marker = new google.maps.Marker({
        map: this.map,
      });

      this.map.addListener('click', (mapsMouseEvent: any) => {
        let lngLat = JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2);
        location = JSON.parse(lngLat);

        this.map.setCenter(location);
        marker.setPosition(location);
        this.aeropForm.get('latitud')?.setValue(location.lat.toString());
        this.aeropForm.get('longitud')?.setValue(location.lng.toString());
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
}
