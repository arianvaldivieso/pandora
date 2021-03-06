import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { GlobalHttpInterceptorService } from './services/global-http-interceptor.service';


import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatTableModule } from '@angular/material/table'; 
import { MatHeaderRow } from '@angular/material/table'; 

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgxAutocompleteModule } from './ngx-autocomplete/ngx-autocomplete.module';
import { ToastrModule } from 'ngx-toastr';
import { ShareButtonsConfig } from 'ngx-sharebuttons';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ChartsModule } from 'ng2-charts';

import { CountUpModule } from 'ngx-countup';

const sharedConfig: ShareButtonsConfig = {
  include: [
    'whatsapp', 
    'linkedin',
    'copy'
  ],
}

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { MyCollectionSidebarComponent } from './partials/my-collection-sidebar/my-collection-sidebar.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { HeaderComponent } from './partials/header/header.component';
import { ArticleComponent } from './components/article/article.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TopComponent } from './components/collaborators/top/top.component';
import { CollaboratorComponent } from './components/collaborators/collaborator/collaborator.component';
import { LoginComponent } from './pages/login/login.component';
import { PresentationComponent } from './components/auth/presentation/presentation.component';
import { HeaderAuthComponent } from './components/auth/header-auth/header-auth.component';
import { DividerComponent } from './components/others/divider/divider.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArticleDialogComponent } from './components/dialogs/article-dialog/article-dialog.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutComponent } from './partials/layout/layout.component';
import { NotifyComponent } from './components/notify/notify.component';
import { BrandComponent } from './partials/brand/brand.component';
import { SharedDialogComponent } from './components/dialogs/shared-dialog/shared-dialog.component';
import { CollaboratorDetailComponent } from './pages/collaborator-detail/collaborator-detail.component';
import { TagComponent } from './components/tag/tag.component';
import { GroupComponent } from './components/articles/group/group.component';
import { CollectionDialogComponent } from './components/dialogs/collection-dialog/collection-dialog.component';
import { ArticleCollectionDialogComponent } from './components/dialogs/article-collection-dialog/article-collection-dialog.component';
import { CollectionDetailsComponent } from './pages/collection-details/collection-details.component';
import { HistoryComponent } from './pages/history/history.component';
import { ReloadComponent } from './pages/reload/reload.component';
import { UsersComponent } from './pages/users/users.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { StastComponent } from './pages/stast/stast.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { CardDashboardComponent } from './components/card-dashboard/card-dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MyCollectionSidebarComponent,
    DiscoverComponent,
    HeaderComponent,
    ArticleComponent,
    SearchBarComponent,
    TopComponent,
    CollaboratorComponent,
    LoginComponent,
    PresentationComponent,
    HeaderAuthComponent,
    DividerComponent,
    ArticleDialogComponent,
    RegisterComponent,
    LayoutComponent,
    CollectionDialogComponent,
    ArticleCollectionDialogComponent,
    NotifyComponent,
    BrandComponent,
    SharedDialogComponent,
    CollaboratorDetailComponent,
    TagComponent,
    GroupComponent,
    CollectionDetailsComponent,
    HistoryComponent,
    ReloadComponent,
    UsersComponent,
    ClientsComponent,
    CardDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    BrowserAnimationsModule,

    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,

    //MatHeaderRow,

    InfiniteScrollModule,
    NgxAutocompleteModule,    
    ToastrModule.forRoot({
        preventDuplicates: true,
    }),
    ShareButtonsModule.withConfig(sharedConfig),
    ShareIconsModule,
    CarouselModule,
    ChartsModule,
    CountUpModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

//platformBrowserDynamic().bootstrapModule(AppModule);
