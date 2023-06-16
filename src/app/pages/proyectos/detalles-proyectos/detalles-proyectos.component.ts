import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Proyectos } from 'src/app/model/proyectos.model';
import { ImageProcessingService } from 'src/app/service/image-processing.service';
import { ProyectosService } from 'src/app/service/proyectos.service';

@Component({
  selector: 'app-detalles-proyectos',
  templateUrl: './detalles-proyectos.component.html',
  styleUrls: ['./detalles-proyectos.component.css']
})
export class DetallesProyectosComponent implements OnInit {
  proyectos: Proyectos[]=[];

  constructor(private imagenService: ImageProcessingService,
    private service: ProyectosService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllProyects();
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

  irProyectos(){
    this.router.navigate(['proyectos']);

  }

}
