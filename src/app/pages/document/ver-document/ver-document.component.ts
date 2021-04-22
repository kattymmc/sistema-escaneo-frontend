import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Documento } from 'src/app/core/models/documento';
import { DocumentService } from 'src/app/core/services/document.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { PdfMakeWrapper, Img } from 'pdfmake-wrapper';
import { LoaderService } from '../../../core/services/loader.service';


@Component({
  selector: 'app-ver-document',
  templateUrl: './ver-document.component.html',
  styleUrls: ['./ver-document.component.css']
})
export class VerDocumentComponent implements OnInit {

  documento: Documento = null;
  token: string;


  constructor(
    private documentoService: DocumentService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private uploadService: UploadService,
    public loaderService: LoaderService
  ) {
    loaderService.isLoading.next(true);
   }

  ngOnInit(): void {
    setTimeout(() => {
      const id = this.activatedRoute.snapshot.params.id;
      this.documentoService.getDocumentoById(this.tokenService.getToken(), id).subscribe(
        data => {
          this.documento = data;
          this.loaderService.isLoading.next(false);
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.router.navigate(['/documentos/listar']);
        }
      );
    })
  }

  cargarDocumento(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.documentoService.getDocumentoById(this.tokenService.getToken(), id).subscribe(
      data => {
        this.documento = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  eliminarImagen(id: number) {
    this.uploadService.deleteImagenById(id, this.tokenService.getToken()).subscribe(
      data => {
        this.toastr.success('Imagen Eliminada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarDocumento();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  async procesarImagen(id: number, name: string) {
    let blob1 = await fetch('http://169.57.99.220:32135/api/uploads/img/' + name).then(r => r.blob())
      .then(blobFile => {
        let file = new File([blobFile], name, { type: "image/*" });

        this.uploadService.procesarImagen(file).subscribe(
          data => {
            console.log('Imagen procesada con exito')

            let blob2 = fetch('https://image-processing-python.herokuapp.com/api/retornar?file=' + name).then(r => r.blob())
              .then(blobFile => {
                let file2 = new File([blobFile], name, { type: "image/*" });
                console.log(file2);
                this.uploadService.updateImagen(id, file2, this.tokenService.getToken()).subscribe(
                  data => {
                    console.log("Imagen actualizada con exito");
                    this.cargarDocumento();
                  },
                  err => {
                    console.error("No se pudo actualizar")
                  }
                );
              });

          },
          err => {
            console.error('No se pudo procesar la imagen')
          }
        );
      }
      );
  }

  async generatePdf(){
    this.loaderService.isLoading.next(true);
    const pdf = new PdfMakeWrapper();

    for(let i = 0; i<this.documento.imagenes.length; i++){

      pdf.add( await new Img(`http://169.57.99.220:32135/api/uploads/img/${this.documento.imagenes[i].nombre}`).width(550).build());
    }

    this.loaderService.isLoading.next(false);
    pdf.create().open();
  }
}
