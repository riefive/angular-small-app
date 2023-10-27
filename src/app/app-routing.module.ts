import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { authGuard } from 'src/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../pages/page-main/page-main.module').then(module => module.PageMainModule)
  },
  { 
    path: 'login', 
    loadChildren: () => import('../pages/page-auth/page-auth.module').then(module => module.PageAuthModule)
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class AppRoutingModule { }