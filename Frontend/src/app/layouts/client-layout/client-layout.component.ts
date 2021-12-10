import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
declare function navMovil():any;
declare function counterActivate():any;
declare function closeNav():any;
@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent implements OnInit {

  constructor(private token: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.token.getUser().roles==1 || this.token.getToken()==null) {
      this.router.navigate(['/about-us'])
      return;
    }
  }

  ngAfterViewInit(): void{

    navMovil();
    counterActivate();
  }

  close(){
    closeNav();
  }
  logout(): void {
    this.token.signOut();
    this.router.navigate(['/'])
  }
}

