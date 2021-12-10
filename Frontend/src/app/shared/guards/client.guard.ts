import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ClientGuard implements CanActivate {
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      const isAuthenticated = !!this.tokenStorageService.getToken();
      if (!isAuthenticated) {
        // redirige al usuario a la pagina de login
        this.router.navigate(['/sign-in']);
        return false;
      } else {
        if (this.tokenStorageService.getUser().roles == 0) {
          return true
        } else {
          this.router.navigate(['/sign-in']);
          return false
        }
  
      }
    }
}
