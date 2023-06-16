import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Proyectos } from 'src/app/model/proyectos.model';
import { ImageProcessingService } from 'src/app/service/image-processing.service';
import { ProyectosService } from 'src/app/service/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectos: Proyectos[]=[];
 
  constructor(private router: Router,
    private imagenService: ImageProcessingService,
    private service: ProyectosService
    ) { }

  ngOnInit(): void {
    this.getAllProyects();
  }
  
  irDetalles(){
     this.router.navigate(['detalleProyecto']);
  }

  getAllProyects(){
       this.service.getAllProyects()
       .pipe(
        map((x: Proyectos[],i) => x.map((proyectos: Proyectos) => this.imagenService.createImages(proyectos)))
      )
       .subscribe(
         data=>{
           this.proyectos = data;
         })
     }

     irInicio(){
    this.router.navigate(['']);

     }
}
