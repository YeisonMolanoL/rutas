import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = "AuthToken"
const USERNAME_KEY = "AuthUsername"
const AUTHORITIES_KEY = "AuthAuthorithies"

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  roles: Array<string>

  constructor(private route: Router) { }

  public setToken(token: string): void{
    window.sessionStorage.removeItem(TOKEN_KEY)
    window.sessionStorage.setItem(TOKEN_KEY, " "+token)
  }

  public getToken(): string{
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public setUserName(userName: string): void{
    window.sessionStorage.removeItem(USERNAME_KEY)
    window.sessionStorage.setItem(USERNAME_KEY, userName)
  }

  public getUsername(): string{
    return sessionStorage.getItem(USERNAME_KEY)!;
  }

  public setAuthorities(authorities: Array<string>): void{
    window.sessionStorage.removeItem(AUTHORITIES_KEY)
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities))
  }

  public getAuthorities(): Array<string>{
    this.roles = Array<string>()
    if(sessionStorage.getItem(AUTHORITIES_KEY)){
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach((authority: { authority: string; }) => {
        this.roles.push(authority.authority)  
      });
    }
    return this.roles;
  }

  public logOut(): void{
    window.sessionStorage.clear();
    this.route.navigate(['/'])
  }
}
