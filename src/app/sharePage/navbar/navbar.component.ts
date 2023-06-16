import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ocultar1 = true;
  isLogged = false;

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

 
  irLogin() {
    this.router.navigate(['login']);
    this.isLogged = true;
  }

  // onlogOut(): void {
  //   this.tokenService.logOut();
  //   window.location.reload();
  //   this.isLogged = false;
  // }

  ocultar() {
    this.ocultar1 = false;
  }

  // mostrar() {
  //   this.ocultar1 = true;
  //   // console.log(this.ocultar1)
  // }
}
