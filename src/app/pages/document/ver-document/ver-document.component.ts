import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Documento } from 'src/app/core/models/documento';
import { DocumentService } from 'src/app/core/services/document.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-ver-document',
  templateUrl: './ver-document.component.html',
  styleUrls: ['./ver-document.component.css']
})
export class VerDocumentComponent implements OnInit {

  documento: Documento = null;

  constructor(
    private documentoService: DocumentService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
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

}
