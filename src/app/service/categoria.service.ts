import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url = 'http://localhost:8890/category/'; 

  constructor(private http: HttpClient) { }


}
