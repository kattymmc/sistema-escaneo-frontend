import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private urlEndPoint: string = 'http://169.57.99.220:32135/api/';
  private urlHeroku: string = 'https://image-processing-python.herokuapp.com/api/';

  constructor(private _http: HttpClient){  }

  addImagenes(url: string, files: Array<File>, token: string, name: string, idDoc) {
      let formData = new FormData();
      formData.append('id', idDoc);
      for(var i = 0; i<files.length; i++){
        formData.append(name, files[i], files[i].name);
      }
      console.log(formData.getAll('imagenes'));
      console.log(formData.getAll('id'));
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
                                     //.set('Content-Type', 'application/json');
      return this._http.post(this.urlEndPoint+url, formData, {headers: headers});
    }

    getImagenes(nombre:string, token: string){
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this._http.get(this.urlEndPoint+'uploads/img/' + nombre, {headers: headers});
    }

    deleteImagenById(id: number, token: string){
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this._http.delete(this.urlEndPoint+'uploads/img/' + id, {headers: headers});
    }

    updateImagen(id: number,  file: File, token: string){
      let formData = new FormData();
      formData.append('imagen', file);
      console.log(token);
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this._http.put(this.urlEndPoint+'documentos/upload/' + id, formData, {headers: headers});
    }

    procesarImagen(file: File){
      let formData = new FormData();
      formData.append("file", file, file.name);
     // console.log(formData.getAll('file'));
      return this._http.post(this.urlHeroku+'procesar', formData);
    }

    getImagenProcesada(nombre:string){
      return this._http.get(this.urlHeroku+'retornar?file='+nombre);
    }
}
