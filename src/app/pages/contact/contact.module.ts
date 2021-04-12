import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact/contact.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from 'src/app/shared/footer/footer.module';
import { HeaderModule } from 'src/app/shared/header/header.module';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    HeaderModule,
    FooterModule
  ]
})
export class ContactModule { }
