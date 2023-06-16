import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from 'src/app/model/file-handle.model';
import { Proyectos } from 'src/app/model/proyectos.model';
import { ProyectosService } from 'src/app/service/proyectos.service';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {

  proyectos: Proyectos = {
    id: 0,
    titulo: "",
    direccionUrl: "",
    descripcion: "",
    proyectoImages: []
  }
  constructor(private sanitizer: DomSanitizer,
    private snack: MatSnackBar, private router: Router,
    private service: ProyectosService,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    
     //para editar
     this.proyectos = this.activatedRoute.snapshot.data['proyectos'];
  
  }

 

  volverLista() {
    this.router.navigate(['lista']);
  }

  //te redirecciona a otra pagina pero actualizada
  redirectToOtherPage() {
    const otherPageUrl = '/lista';
    this.router.navigateByUrl(otherPageUrl, { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(otherPageUrl);
    });
  }


// para imagen
  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

    }
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.proyectos.proyectoImages.push(fileHandle);
    }
  }
  //guardar producto
  addProduct(productForm: NgForm) {
    const productFormData = this.prepareFormData(this.proyectos);
    this.service.addProyect(productFormData).subscribe(
      (response: Proyectos) => {
        this.snack.open('Se guardó correctamente', 'Aceptar', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
        })
        productForm.reset();
        this.proyectos.proyectoImages = [];
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.snack.open('Verifique que todo este completado correctamente', 'Aceptar', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
        })
      })
  }

  //para imagen
  prepareFormData(proyectos: Proyectos): FormData {
    const formData = new FormData();

    formData.append(
      'proyectos',
      new Blob([JSON.stringify(proyectos)], { type: 'application/json' })
    );

    for (var i = 0; i < proyectos.proyectoImages.length; i++) {
      formData.append(
        'imageFile',
        proyectos.proyectoImages[i].file,
        proyectos.proyectoImages[i].file.name
      );
    }
    return formData;
  }


  //para imagen
    removeImages(i: number) {
      this.proyectos.proyectoImages.splice(i, 1);
    }
   //para imagen
     fileDropped(fileHandle: FileHandle) {
       this.proyectos.proyectoImages.push(fileHandle);
     }
   

}

// prueba cuando no hay imagen
// addProduct(productForm: NgForm){
//   this.service.addProyect(this.proyectos).subscribe(
//     data=>{
//       this.proyectos = data;
//     })
// }

  //para arrastrar  imagen
  // onFileSelected(event){
  //     console.log(event);

  //    if (event.target.files) {
  //      const file = event.target.files[0];

  //      const fileHandle: FileHandle = {
  //        file: file,
  //        url: this.sanitizer.bypassSecurityTrustUrl(
  //          window.URL.createObjectURL(file)
  //        )
  //      }
  //      this.proyectos.proyectoImages.push(fileHandle);
  // }
  //  }