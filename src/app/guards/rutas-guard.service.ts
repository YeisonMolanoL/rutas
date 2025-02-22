import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class RutasGuardService implements CanActivate{
  realRol: string

  constructor(private tService: TokenService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol'];
    const roles = this.tService.getAuthorities()
    this.realRol = 'user'
    roles.forEach(rol =>{
      if(rol === 'ROLE_ADMIN'){
        this.realRol = 'admin'
      }
    });
    if(!this.tService.getToken() || expectedRol.indexOf(this.realRol) === -1){
      this.router.navigate(['/'])
      return false
    }
    return true
  }
}
