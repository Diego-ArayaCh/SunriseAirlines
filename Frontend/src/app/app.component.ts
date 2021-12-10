import { Component } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 //En este component se usa user como usuario
  private roles!: number;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  usuario: string = '';
  constructor(private tokenStorageService: TokenStorageService) {}
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    //console.log(this.isLoggedIn, 'this.isLoggedIn');
    if (this.isLoggedIn) {
      const { user } = this.tokenStorageService.getUser();
      this.roles = user.rol;
      this.usuario = user.usuario;
      //console.log(this.roles)
      this.showAdminBoard = this.roles===1;
      this.showModeratorBoard =  this.roles===0;
      
    }
  }

  get isUserAuthenticated(): any {
    return this.tokenStorageService.getToken;
  }
  get userNameValue(): any {
    const { user } = this.tokenStorageService.getUser();
    return user.usuario;
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }




  
}
