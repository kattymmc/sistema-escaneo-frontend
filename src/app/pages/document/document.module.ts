import { ListDocumentComponent } from './list-document/list-document.component';
import { VerDocumentComponent } from './ver-document/ver-document.component';
import { EditarDocumentComponent } from './editar-document/editar-document.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentRoutingModule } from './document-routing.module';
import { SidebarModule } from 'src/app/shared/sidebar/sidebar.module';
import { FormsModule } from '@angular/forms';
import { AgregarDocumentComponent } from './agregar-document/agregar-document.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    EditarDocumentComponent,
    VerDocumentComponent,
    ListDocumentComponent,
    AgregarDocumentComponent
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    Ng2SearchPipeModule,
    SidebarModule,
    FormsModule
  ]
})
export class DocumentModule { }
