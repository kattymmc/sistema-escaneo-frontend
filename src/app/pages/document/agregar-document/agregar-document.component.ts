import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Documento } from 'src/app/core/models/documento';
import { TipoDocumento } from 'src/app/core/models/tipo-documento';
import { DocumentService } from 'src/app/core/services/document.service';
import { TokenService } from 'src/app/core/services/token.service';

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
    private documentoService: DocumentService
  ) { 
    this.documento = new Documento("","", new TipoDocumento(""));
  }

  ngOnInit(): void {
  }

  onCreate(): void {
    this.documentoService.addDocumento(this.tokenService.getToken(),this.documento).subscribe(
      data => {
        this.toastr.success('Documento Creado', 'OK', {
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
