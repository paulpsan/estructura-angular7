import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable()
export class FileService {
  constructor(private _http: HttpClient) {}

  subirImagen(archivo: File, tipo: string, data) {
    return new Promise((resolve, reject) => {
      const url = environment.url + 'upload/' + tipo + '/' + data._id;
      const uploadData = new FormData();
      uploadData.append('avatar', archivo, archivo.name);
      this._http.put(url, uploadData).subscribe(
        resp => {
          resolve(resp);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  subirFile(archivo: File, direccion) {
    return new Promise((resolve, reject) => {
      const url = environment.url + 'upload/' + direccion;
      const formData = new FormData();
      formData.append('documento', archivo, archivo.name);
      this._http.post(url, formData).subscribe(
        resp => {
          resolve(resp);
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
