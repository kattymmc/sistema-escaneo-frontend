import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
