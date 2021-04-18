import { ListDocumentComponent } from './pages/document/list-document/list-document.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { VerDocumentComponent } from './pages/document/ver-document/ver-document.component';
import { EditarDocumentComponent } from './pages/document/editar-document/editar-document.component';

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
    loadChildren: () => 
      import('./pages/document/document.module').then((m) => m.DocumentModule),
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
