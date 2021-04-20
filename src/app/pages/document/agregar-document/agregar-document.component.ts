import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Documento } from 'src/app/core/models/documento';
import { TipoDocumento } from 'src/app/core/models/tipo-documento';
import { DocumentService } from 'src/app/core/services/document.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UploadService } from 'src/app/core/services/upload.service';

@Component({
  selector: 'app-agregar-document',
  templateUrl: './agregar-document.component.html',
  styleUrls: ['./agregar-document.component.css']
})
export class AgregarDocumentComponent implements OnInit {

  public documento: Documento;

  constructor(
    private tokenService: TokenService,
    private toastr: ToastrService,
    private router: Router,
    private documentoService: DocumentService,
    private uploadService: UploadService
  ) {
    this.documento = new Documento("","", new TipoDocumento(""));
  }

  ngOnInit(): void {
  }

  onCreate(): void {
    this.documento.tipoDocumento.id = 2;
    console.log(this.documento)
    this.documentoService.addDocumento(this.tokenService.getToken(),this.documento).subscribe(
      data => {
        // SUBIDA DE DOCUMENTOS
        console.log(data.documento.id);
        this.uploadService.addImagenes('documentos/upload',this.filesToUpload,
            this.tokenService.getToken(), 'imagenes', data.documento.id).subscribe(
                                          (res) => {
                                            console.log(res)
                                            this.toastr.success('Documento Creado', 'OK', {
                                              timeOut: 3000, positionClass: 'toast-top-center'
                                            });
                                            this.router.navigate(['/documentos/listar']);

                                          },
                                          (err) => console.error("Sucedio un error")
                                        );
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // this.router.navigate(['/']);
      }
    );
  }

  public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }

}
