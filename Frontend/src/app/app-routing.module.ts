import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import{AdminGuard} from './shared/guards/admin.guard'
import{ClientGuard} from './shared/guards/client.guard'

const routes: Routes = [
  
 // Rutas para usuario
  {path: '', component: UserLayoutComponent ,
    children:[
        {path:'',redirectTo:'/home',pathMatch:'full'},
        {path:'',loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)},
        ]
      },

    //Rutas para administrador
  {path: '' ,component: AdminLayoutComponent ,canActivate:[AdminGuard],
    children:[
          {path:'',redirectTo:'/admin-dashboard',pathMatch:'full'},
          {path:'admin',loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)}
        ]
      },
      {path: '', component: ClientLayoutComponent ,canActivate:[ClientGuard],
    children:[
          {path:'',redirectTo:'/client-home',pathMatch:'full'},
          {path:'client',loadChildren:()=>import('./client/client.module').then(m=>m.ClientModule)}
        ]
      },
      {path: '**', redirectTo: '', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
