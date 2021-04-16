import { ListDocumentComponent } from './pages/document/list-document/list-document.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [

  {
    path: '', 
    redirectTo: '/', 
    pathMatch: 'full'
  },
  {
    path: '', 
    loadChildren: () => 
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'nosotros', 
    loadChildren: () => 
      import('./pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'contactanos', 
    loadChildren: () => 
      import('./pages/contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'login', 
    loadChildren: () => 
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'documentos', 
    component: ListDocumentComponent,
  },
  {
    path: '**', 
    redirectTo: '/', 
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
