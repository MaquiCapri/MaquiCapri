import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyectos } from '../model/proyectos.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProyectosService {
  URL = 'http://localhost:8890/proyecto/'; 

  constructor(private http: HttpClient) { }

   addProyect(proyectos: FormData){
     return this.http.post<Proyectos>(this.URL + 'crear', proyectos);
 }

  public getAllProyects(){
    return this.http.get<Proyectos[]>(this.URL + 'trae');
  }

  public getProyecto(id: any):Observable<Proyectos>{
    return this.http.get<Proyectos>(this.URL + `traer/${id}`);
   }
   
   eliminarProyecto(id: number): Observable<any>{
    return this.http.delete<any>(this.URL + 'eliminar/' + id)
  }

  // prueba para sin imagen
  // addProyect(proyectos: Proyectos){
  //      return this.http.post<Proyectos>(this.URL + 'crear', proyectos);
  //    }
}
