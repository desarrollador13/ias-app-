import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeviciosTecnicoService {
	private host:string='http://localhost:3001/api/v1/'

  constructor(private http: HttpClient) { }

  obtenerTecnico(url:string|any) {
    return this.http.get(this.host+url);
  }

  registrarServicio(url:string|any, data) {
  	return this.http.post(this.host+url, data);
  }

  calcularHoras(url:string|any) {
  	return this.http.get(this.host+url);
  }
}
