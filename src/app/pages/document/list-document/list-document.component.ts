import { DocumentService } from './../../../core/services/document.service';
import { Documento } from './../../../core/models/documento';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.css']
})
export class ListDocumentComponent implements OnInit {

  documentos: Documento[];

  constructor(
    private documentoService: DocumentService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.documentoService.getDocumentos(this.tokenService.getToken).subscribe(
      data => {
        this.documentos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
