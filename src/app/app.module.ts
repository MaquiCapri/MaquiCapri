import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ListaProyectosComponent } from './pages/lista-proyectos/lista-proyectos.component';
import { FooterComponent } from './sharePage/footer/footer.component';
import { NavbarComponent } from './sharePage/navbar/navbar.component';
import { LoginComponent } from './pagesLogin/login/login.component';
import { DetallesProyectosComponent } from './pages/proyectos/detalles-proyectos/detalles-proyectos.component';
import { CurriculumComponent } from './pages/about-me/curriculum/curriculum.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrearProyectoComponent } from './pages/lista-proyectos/crear-proyecto/crear-proyecto.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AlertDialogComponent } from './pages/lista-proyectos/alert-dialog/alert-dialog.component';
import { PermissionsGuard } from './guard/permissions.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProyectosComponent,
    AboutMeComponent,
    ListaProyectosComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    DetallesProyectosComponent,
    CurriculumComponent,
    CrearProyectoComponent,
    AlertDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    HttpClientModule

  ],
  providers: [
    PermissionsGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
