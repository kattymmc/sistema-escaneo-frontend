import { HeaderModule } from 'src/app/shared/header/header.module';
import { FooterModule } from 'src/app/shared/footer/footer.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeaderModule,
    FooterModule
  ]
})
export class HomeModule { }
