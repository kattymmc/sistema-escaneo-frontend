import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Documento } from '../models/documento'; 
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private urlEndPoint: string = '/api/';

  constructor(private _http: HttpClient) { }

  getDocumentos(token): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', token);
    return this._http.get(this.urlEndPoint+'documentos', {headers: headers});
  }

}
