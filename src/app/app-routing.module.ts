import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SessionComponent } from './components/session/session.component';
import { LoginComponent } from './components/session/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { EnergyGuard } from './guards/energy.guard';


const routes: Routes = [

	

  {
    path:'session',
    component:SessionComponent,
    children:[
      {
        path:'login',
        component:LoginComponent
      },
     
    ]
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    // canActivate : [EnergyGuard],
    children:[
      {
        path:'home',
        component:HomeComponent
      },
     
    ]
  },
  { path: '', redirectTo: '/session/login', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
