import { DocumentService } from './../../../core/services/document.service';
import { Documento } from './../../../core/models/documento';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.css']
})
export class ListDocumentComponent implements OnInit {

  documentos: Documento[];
  searchText;

  constructor(
    private documentoService: DocumentService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public loaderService: LoaderService
  ) {
    loaderService.isLoading.next(true);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.cargarDocumentos();
    })
  }

  cargarDocumentos(): void {
    this.documentoService.getDocumentos(this.tokenService.getToken()).subscribe(
      data => {
        this.documentos = data;
        this.loaderService.isLoading.next(false);
      },
      err => {
        console.log(err);
      }
    );
  }

  eliminarDocumento(id: number) {
    this.loaderService.isLoading.next(true);
    this.documentoService.deleteDocumentoById(this.tokenService.getToken(), id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarDocumentos();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

}
