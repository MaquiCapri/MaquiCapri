import { FileHandle } from "./file-handle.model";

export class Proyectos {
    id!: number;
    titulo: string;
    direccionUrl: string;
    descripcion: string;
    proyectoImages: FileHandle[]; 

      constructor(id: number, titulo: string, direccionUrl: string, descripcion: string,  proyectoImages: []) {
          this.id = id;
          this.titulo = titulo;
          this.direccionUrl = direccionUrl;
          this.descripcion = descripcion;
       this. proyectoImages =  proyectoImages;
      }
}
