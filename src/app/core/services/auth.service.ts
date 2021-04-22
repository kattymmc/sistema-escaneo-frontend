import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../models/login-usuario';
import { JwtDTO } from '../models/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = '/api/';

  constructor(private httpClient: HttpClient) { }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'autenticacion', loginUsuario);
  }
}
