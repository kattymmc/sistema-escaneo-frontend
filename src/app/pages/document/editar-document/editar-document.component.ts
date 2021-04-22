import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Img, PdfMakeWrapper } from 'pdfmake-wrapper';
import { Documento } from 'src/app/core/models/documento';
import { TipoDocumento } from 'src/app/core/models/tipo-documento';
import { DocumentService } from 'src/app/core/services/document.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { LoaderService } from '../../../core/services/loader.service';


@Component({
  selector: 'app-editar-document',
  templateUrl: './editar-document.component.html',
  styleUrls: ['./editar-document.component.css']
})
export class EditarDocumentComponent implements OnInit {

  public filesToUpload: Array<File>;
  documento: Documento = null;
  public tipodocumentos: TipoDocumento[];
  seleccionado: number;

  constructor(
    private documentoService: DocumentService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private uploadService: UploadService,
    private router: Router,
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
          this.seleccionado = this.documento.tipoDocumento.id;
          this.loaderService.isLoading.next(false);
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.router.navigate(['/documentos/listar']);
        }
      );
      this.cargarTipoDocumentos();
    })
  }

  onUpdate(): void {
    this.loaderService.isLoading.next(true);
    const id = this.activatedRoute.snapshot.params.id;
    const doc = new Documento(this.documento.codigoDoc, this.documento.descripcion, new TipoDocumento(this.seleccionado));
    this.documentoService.updateDocumento(this.tokenService.getToken(), id, doc).subscribe(
      data => {
        this.uploadService.addImagenes('documentos/upload', this.filesToUpload,
        this.tokenService.getToken(), 'imagenes', data.documento.id).subscribe(
          (res) => {
            console.log(res)
            this.toastr.success('Documento Creado', 'OK', {
              timeOut: 3000, positionClass: 'toast-top-center'
            });
            this.loaderService.isLoading.next(false);
            this.router.navigate(['/documentos/listar']);

            },
            (err) => console.error("Sucedio un error")
          );
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        // this.router.navigate(['/']);
      }
    );
  }

  cargarTipoDocumentos(): void {
    this.documentoService.getTipoDocumentos(this.tokenService.getToken()).subscribe(
      data => {
        this.tipodocumentos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarDocumento(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.documentoService.getDocumentoById(this.tokenService.getToken(), id).subscribe(
      data => {
        this.documento = data;
        this.loaderService.isLoading.next(false);
      },
      err => {
        console.log(err);
      }
    );
  }

  eliminarImagen(id: number) {
    this.loaderService.isLoading.next(true);
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
    this.loaderService.isLoading.next(true);
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

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

  async generatePdf() {
    const pdf = new PdfMakeWrapper();

    for (let i = 0; i < this.documento.imagenes.length; i++) {

      pdf.add(await new Img(`http://169.57.99.220:32135/api/uploads/img/${this.documento.imagenes[i].nombre}`).width(550).build());
    }

    this.loaderService.isLoading.next(false);
    pdf.create().open();
  }

}
