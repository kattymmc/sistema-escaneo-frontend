import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Documento } from 'src/app/core/models/documento';
import { TokenService } from 'src/app/core/services/token.service';
import { DocumentService } from './../../../core/services/document.service';

@Component({
  selector: 'app-editar-document',
  templateUrl: './editar-document.component.html',
  styleUrls: ['./editar-document.component.css']
})
export class EditarDocumentComponent implements OnInit {

  documento: Documento = null;

  constructor(
    private documentoService: DocumentService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.documentoService.getDocumentoById(this.tokenService.getToken(),id).subscribe(
      data => {
        this.documento = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/documentos/listar']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.documentoService.updateDocumento(this.tokenService.getToken(),id,this.documento).subscribe(
      data => {
        this.toastr.success('Documento Actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/documentos/listar']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // this.router.navigate(['/']);
      }
    );
  }

}
