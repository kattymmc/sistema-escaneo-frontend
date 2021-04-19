import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarDocumentComponent } from './agregar-document/agregar-document.component';
import { EditarDocumentComponent } from './editar-document/editar-document.component';
import { ListDocumentComponent } from './list-document/list-document.component';
import { VerDocumentComponent } from './ver-document/ver-document.component';

const routes: Routes = [
  {
    path: 'listar',
    component: ListDocumentComponent,
  },
  {
    path: 'ver/:id',
    component: VerDocumentComponent,
  },
  {
    path: 'editar/:id',
    component: EditarDocumentComponent,
  },
  {
    path: 'agregar',
    component: AgregarDocumentComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
