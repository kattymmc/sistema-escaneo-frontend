import { DocumentRoutingModule } from './document-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document/document.component';
import { SidebarModule } from 'src/app/shared/sidebar/sidebar.module';



@NgModule({
  declarations: [DocumentComponent],
  imports: [
    CommonModule,
    SidebarModule,
    DocumentRoutingModule
  ]
})
export class DocumentModule { }
