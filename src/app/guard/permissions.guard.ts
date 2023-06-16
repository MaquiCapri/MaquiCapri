import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {

  constructor( private router: Router,
    private tokenService: TokenService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
   const token = this.tokenService.getToken();
   if(token){
    return true;
    
   }

   this.router.navigate(['login']);
    return false;
   
  }
  

}
