import { Component, Injectable, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../../services/token-storage.service';

import { Router } from '@angular/router';
import { forEach } from 'lodash';
declare function ejecutarAnimacion(): any;
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  usuarioForm = new FormGroup({

    usuario: new FormControl('', Validators.required),
    pwd: new FormControl('', Validators.required)


  });
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles!: number;
  constructor(private tokenStorage: TokenStorageService, private sanitizer: DomSanitizer, private toastr: ToastrService, private _usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    ejecutarAnimacion();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      if (this.roles == 1 && this.isLoggedIn) {
        this.router.navigate(['/admin'])

      } else if (this.roles == 0 && this.isLoggedIn) {
        this.router.navigate(['/client'])
      }

    }
  }
  enviar(): void {

    if (this.usuarioForm.valid) {

      const usuario = this.usuarioForm.value;
      
      try {
        this._usuarioService.signIn(usuario).subscribe(
          (data) => {
  
           
            if (data.success === true) {
              console.log(data.success, 'data.success');
              data.roles = data.user.rol; //esta es la razón del getUser().roles
              this.tokenStorage.saveToken(data.token);
              this.tokenStorage.saveUser(data);
              this.isLoginFailed = false;
              this.isLoggedIn = true;
              this.roles = this.tokenStorage.getUser().roles;
              if (this.roles === 0) {
                this.router.navigate(['/client']);
              }
              if (this.roles === 1) {
                this.router.navigate(['/admin']);
              }
              console.log(this.roles, 'this.roles');
            } else {
              this.toastr.error(data.msg,"ERROR")
              this.errorMessage = data.msg;
              this.isLoginFailed = true;
             
            }
          },
          (err) => {
            
            this.errorMessage = err.msg;
            this.isLoginFailed = true;
           
           
          }
        );
      } catch (error) {
        
      }
      
    }
  }
}
