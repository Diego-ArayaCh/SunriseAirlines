import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  user!: any;
  constructor(private token: TokenStorageService,
    private router: Router,
    private _usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    // if (this.token.getUser().roles == 0 || this.token.getToken() == null) {
    //   this.router.navigate(['/offers'])
    //   return;
    // }
    this._usuarioService.getById(this.token.getUser().user._id).subscribe(
      (data) => {

        this.user = data;
      });
    



  }


  logout(): void {
    this.token.signOut();
    this.router.navigate(['/'])
  }

}
