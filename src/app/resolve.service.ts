import { Injectable } from '@angular/core';
import { ProyectosService } from './service/proyectos.service';
import { ImageProcessingService } from './service/image-processing.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { Proyectos } from './model/proyectos.model';

@Injectable({
  providedIn: 'root'
})
export class ResolveService implements Resolve<Proyectos>{

  constructor(private service: ProyectosService,
    private imagenService: ImageProcessingService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Proyectos>{

      const id= route.paramMap.get("id");
  
      if(id){
  return this.service.getProyecto(id)
  .pipe(
    map(p => this.imagenService.createImages(p))
  )
      }else{
        return of(this.getProductDetails());
      }
    }
  
    getProductDetails(){
      return{
        
          id: 0,
          titulo: "",
          direccionUrl: "",
          descripcion: "",
          proyectoImages: []
        
      }
    }
}
