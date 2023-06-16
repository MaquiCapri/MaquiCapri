import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Proyectos } from 'src/app/model/proyectos.model';
import { ImageProcessingService } from 'src/app/service/image-processing.service';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lista-proyectos',
  templateUrl: './lista-proyectos.component.html',
  styleUrls: ['./lista-proyectos.component.css']
})
export class ListaProyectosComponent implements OnInit {
  // paginacion
  displayedColumns: string[] = ['titulo', 'direccionUrl', 'descripcion', 'editar', 'eliminar'];
  dataSource!: MatTableDataSource<any>;
  proyectos: Proyectos[] = [];
  // productDetails: Producto[] = [];

  // ocultar: true;

  showAlert = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router,
    public param: ActivatedRoute,
    private snack: MatSnackBar,
    private service: ProyectosService,
    private imagenService: ImageProcessingService,
    private imagesDialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllProyect();
    this.ngAfterViewInit();
    this.cargarProducto();
  }

  getAllProyect() {
    this.service.getAllProyects()
           .pipe(
             map((x: Proyectos[],i) => x.map((producto: Proyectos) => this.imagenService.createImages(producto)))
           )
      .subscribe(
        (resp: Proyectos[]) => {
          this.proyectos = resp;
          this.dataSource = new MatTableDataSource(this.proyectos);

          //     console.log(resp);
        }, (error: HttpErrorResponse) => {
          console.log(error);
        });
  };


  //paginacion
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  //paginacion
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarProducto(): void {
    this.service.getAllProyects().subscribe(data => { this.proyectos = data; });
  }

  eliminarProducto(id: number) {
      const snackBar = this.imagesDialog.open(AlertDialogComponent);
      snackBar.afterClosed().subscribe(data => {
       console.log("valor respues",data);
     //  id != undefined
       if (data) {
         this.service.eliminarProyecto(id).subscribe(
           data => {
              this.cargarProducto();
             this.snack.open('Se eliminó correctamente','Aceptar',{
                 verticalPosition: 'top',
                horizontalPosition: 'center',
              });
              this.reloadPage();
                  return;
              })
       }
      });
  }

  //te redirecciona a la misma pagina actualizada
  reloadPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }

  irCrear() {
    this.router.navigate(['crear']);
  }

  irHome() {
    this.router.navigate(['']);
  }

  resetPage() {
    this.router.navigate(['/']);
  }

  editProyectDetails(id: number) {
    console.log(id)
    this.router.navigate(['crear', { id: id }]);
  }

}
