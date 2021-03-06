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

const routes: Routes = [


  { 
    path: 'users', component: LayoutComponent,

    children: [
      { path: '', component: UsersComponent},
    ]

  },

  { 
    path: 'stats', component: LayoutComponent,

    children: [
      { path: '', component: StastComponent},
    ]

  },

  { 
    path: 'clients', component: LayoutComponent,

    children: [
      { path: '', component: ClientsComponent},
    ]

  },
	
	{ 
    path: 'pandora', component: LayoutComponent,

    children: [
      { path: '', component: DiscoverComponent},
    ]

  },
  { 
    path: 'history', component: LayoutComponent,

    children: [
      { path: '', component: HistoryComponent},
    ]

  },
  { 
    path: 'reload', component: LayoutComponent,
    children: [
      { path: '', component: ReloadComponent},
    ]

  },
  { 
    path: 'collaborator', component: LayoutComponent,
    children: [
        {
          path: ':slug',
          component: CollaboratorDetailComponent
        }
    ]

  },  

  { 
    path: 'collections', component: LayoutComponent,
    children: [
        {
          path: ':slug',
          component: DiscoverComponent
        }
    ]

  },  

	{ path: 'login', component: LoginComponent },
	{ path: 'users/register', component: RegisterComponent },
  { path: '',   redirectTo: '/pandora', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
