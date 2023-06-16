import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Proyectos } from '../model/proyectos.model';
import { FileHandle } from '../model/file-handle.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

   constructor(private sanitizer: DomSanitizer) { }

   public createImages(proyecto: Proyectos){
     const proyectoImages: any[] = proyecto.proyectoImages;

     const productImagesToFileHandle: FileHandle[] = [];

     for (let i = 0; i < proyectoImages.length; i++){
      const imageFileData = proyectoImages[i];

       const imageBlob=this.dataURItoBlob(imageFileData.picByte, imageFileData.type);

        const imageFile = new File([imageBlob] , imageFileData.name, {type:imageFileData.type});

     const finalFileHandle : FileHandle ={
       file: imageFile,
       url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      productImagesToFileHandle.push(finalFileHandle);
   }

   proyecto.proyectoImages = productImagesToFileHandle;
   return proyecto;
   }

  public dataURItoBlob(picBytes:any, imageType:any){
   const byteString = window.atob(picBytes);
   const arrayBuffer = new ArrayBuffer(byteString.length);
   const int8Array = new Uint8Array(arrayBuffer);

   for(let i = 0; i < byteString.length; i++){
     int8Array[i] = byteString.charCodeAt(i);
   }

   const blob = new Blob([int8Array], { type: imageType });
   return blob;
  }
}
