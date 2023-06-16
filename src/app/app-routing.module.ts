import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pagesLogin/login/login.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { CurriculumComponent } from './pages/about-me/curriculum/curriculum.component';
import { DetallesProyectosComponent } from './pages/proyectos/detalles-proyectos/detalles-proyectos.component';
import { CrearProyectoComponent } from './pages/lista-proyectos/crear-proyecto/crear-proyecto.component';
import { ListaProyectosComponent } from './pages/lista-proyectos/lista-proyectos.component';
import { ResolveService } from './resolve.service';
import { PermissionsGuard } from './guard/permissions.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'proyectos', component:ProyectosComponent },
  { path: 'about', component:AboutMeComponent },
  { path: 'curriculum', component:CurriculumComponent },
  { path: 'detalleProyecto', component:DetallesProyectosComponent },
  { path: 'crear', component:CrearProyectoComponent, canActivate:[PermissionsGuard],
  resolve:{
    proyectos: ResolveService
  } },
    // { path: 'crear/:id', component: CrearProductoComponent },},
  { path: 'lista', component:ListaProyectosComponent,  canActivate:[PermissionsGuard]},

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
