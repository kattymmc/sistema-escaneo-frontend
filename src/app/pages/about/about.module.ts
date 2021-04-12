import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { FooterModule } from 'src/app/shared/footer/footer.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    HeaderModule,
    FooterModule
  ]
})
export class AboutModule { }
