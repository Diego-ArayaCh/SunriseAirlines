import { Component, OnInit,  } from '@angular/core';
declare function ejecutarAnimacion():any;

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor() {  }

  ngOnInit(): void {
    ejecutarAnimacion();
  }
  
 public enviarCorreo(): void {
  let tokenMail: string = "0aa67570-b8b5-4857-80f7-f9251194f278";
  

 }


}
