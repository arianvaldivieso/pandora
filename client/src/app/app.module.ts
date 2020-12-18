import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { MatInputModule } from '@angular/material/input'; 
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ToastrModule } from 'ngx-toastr';
import { ShareButtonsConfig } from 'ngx-sharebuttons';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxAutocompleteApiModule } from 'ngx-autocomplete-api';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxChartsModule, LineChartModule } from '@swimlane/ngx-charts';
import { ChartsModule, BaseChartDirective } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxAutocompleteModule } from './ngx-autocomplete/ngx-autocomplete.module';
import { SelectDropDownModule } from 'ngx-select-dropdown';


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
import { CardDashboardComponent } from './components/card-dashboard/card-dashboard.component';
import { BasicChartComponent } from './components/basic-chart/basic-chart.component';
import { LinearChartComponent } from './components/linear-chart/linear-chart.component';
import { AreaChartComponent } from './components/area-chart/area-chart.component';
import { RequestPremiunComponent } from './components/request-premiun/request-premiun.component';
import { ConfirmDeleteUserComponent } from './dialogs/confirm-delete-user/confirm-delete-user.component';
import { ConfirmComponent } from './dialogs/confirm-request/confirm-delete-user.component';



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
    CardDashboardComponent,
    StastComponent,
    LinearChartComponent,
    AreaChartComponent,
    RequestPremiunComponent,
    ConfirmDeleteUserComponent,
    ConfirmComponent
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
    MatInputModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,


    //MatHeaderRow,

    InfiniteScrollModule,
    NgxAutocompleteApiModule,    
    ToastrModule.forRoot({
        preventDuplicates: true,
    }),
    ShareButtonsModule.withConfig(sharedConfig),
    ShareIconsModule,
    CarouselModule,
    CountUpModule,
    Ng2SearchPipeModule,
    NgxChartsModule,
    NgxPaginationModule,
    SelectDropDownModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

//platformBrowserDynamic().bootstrapModule(AppModule);
