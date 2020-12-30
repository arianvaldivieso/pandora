import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LayoutComponent } from './partials/layout/layout.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CollaboratorDetailComponent } from './pages/collaborator-detail/collaborator-detail.component';
import { CollectionDetailsComponent } from './pages/collection-details/collection-details.component';
import { HistoryComponent } from './pages/history/history.component';
import { ReloadComponent } from './pages/reload/reload.component';
import { UsersComponent } from './pages/users/users.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { StastComponent } from './pages/stast/stast.component';
import { RequestPremiunComponent } from './components/request-premiun/request-premiun.component';

const routes: Routes = [


  { 
    path: '', component: LayoutComponent,

    children: [
      { path: 'stats', component: StastComponent},
      { path: 'users', component: UsersComponent},
      { path: 'clients', component: ClientsComponent},
      { path: 'pandora', component: DiscoverComponent},
      { path: 'history', component: HistoryComponent},
      { path: 'reload', component: ReloadComponent},
      { path: 'request', component: RequestPremiunComponent},
      {  path: 'users/register',
          component: RegisterComponent
        }
    ]

  },
 

	{ path: 'login', component: LoginComponent },
  { path: '',   redirectTo: '/pandora', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
