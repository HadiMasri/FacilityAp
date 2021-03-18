import { CommentService } from './services/comment.service';
import { ArchiveService } from './services/archive.service';
import { ConfirmDialogService } from './shared/confirm-dialog.service';
import { ExportService } from './services/export.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificatiesComponent } from './notificaties/notificaties.component';
import { OverzichtComponent } from './overzicht/overzicht.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArchiefComponent } from './archief/archief.component';
import { AuthComponent } from './auth/auth.component';
import { CreateDefectComponent } from './create-defect/create-defect.component';
import { DefectMeldenComponent } from './defect-melden/defect-melden.component';
import { InstellingenComponent } from './instellingen/instellingen.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MijnMeldingenComponent } from './mijn-meldingen/mijn-meldingen.component';
import { MijnTakenComponent } from './mijn-taken/mijn-taken.component';
import { NoodgevalComponent } from './noodgeval/noodgeval.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import { MatTableFilterModule } from 'mat-table-filter';
import {
  MatBadgeModule,
  MatDialogModule,
  MatExpansionModule,
} from '@angular/material';
import {
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatGridListModule,
  MatCheckboxModule,
  MatCardModule,
  MatSelectModule,
  MatTabsModule,
  MatMenuModule,
  MatBottomSheetModule,
  MatAutocompleteModule,
} from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from './auth-service/auth.service';
import { CreateTaskComponent } from './create-task/create-task.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './auth-service/auth-guard';
import { TaskMeldenComponent } from './task-melden/task-melden.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MeldingDetailComponent } from './melding-detail/melding-detail.component';
import { DialogModalComponent } from './shared/dialog-modal/dialog-modal.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { CompressorService } from './services/Compressor.service';
import { NgpSortModule } from 'ngp-sort-pipe';
import { CategoryService } from './services/category.service';
import { AdminGuard } from './auth-service/admin-guard';
import { MijnTakenGuard } from './auth-service/mijn-taken-guard';
import { CategoryComponent } from './category/category.component';
import { MatConfirmDialogComponent } from './shared/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatContactsDiaglogComponent } from './shared/mat-contacts-diaglog/mat-contacts-diaglog.component';
import { CreateExternalFirmDialogComponent } from './create-external-firm-dialog/create-external-firm-dialog.component';
import { UsersDialogComponent } from './shared/users-dialog/users-dialog.component';
import { UpdateContactDialogComponent } from './shared/update-contact-dialog/update-contact-dialog.component';
import { CategoryModalComponent } from './shared/category-modal/category-modal.component';
import { MailTemplateComponent } from './mail-template/mail-template.component';
import { UpdateMailtemplateComponent } from './update-mailtemplate/update-mailtemplate.component';
import { AddMailTemplateComponent } from './shared/add-mail-template/add-mail-template.component';
import { SendMailtemplateComponent } from './send-mailtemplate/send-mailtemplate.component';
import { ExternalFirmGuard } from './auth-service/external-frim-guard';

@NgModule({
  declarations: [
    AppComponent,
    ArchiefComponent,
    AuthComponent,
    CreateDefectComponent,
    DefectMeldenComponent,
    InstellingenComponent,
    NavBarComponent,
    MijnMeldingenComponent,
    MijnTakenComponent,
    NotificatiesComponent,
    NoodgevalComponent,
    NotFoundComponent,
    OverzichtComponent,
    CreateTaskComponent,
    TaskMeldenComponent,
    MeldingDetailComponent,
    TaskMeldenComponent,
    DialogModalComponent,
    TaskDetailComponent,
    CategoryComponent,
    MatConfirmDialogComponent,
    MatContactsDiaglogComponent,
    CreateExternalFirmDialogComponent,
    CreateExternalFirmDialogComponent,
    UsersDialogComponent,
    UpdateContactDialogComponent,
    UsersDialogComponent,
    CategoryModalComponent,
    MailTemplateComponent,
    UpdateMailtemplateComponent,
    AddMailTemplateComponent,
    SendMailtemplateComponent,
  ],
  imports: [
    MatAutocompleteModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatGridListModule,
    MatInputModule,
    MatTableFilterModule,
    MatTableModule,
    MatCheckboxModule,
    MatGridListModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatTableModule,
    MatTabsModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatBottomSheetModule,
    NgpSortModule,
    MatBadgeModule,
    MatExpansionModule,
    MatDialogModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminGuard,
    MijnTakenGuard,
    CompressorService,
    ExportService,
    CategoryService,
    ConfirmDialogService,
    ArchiveService,
    CommentService,
    Location,
    ExternalFirmGuard
  ],
  // tslint:disable-next-line: max-line-length
  entryComponents: [
    DialogModalComponent,
    MatConfirmDialogComponent,
    CategoryComponent,
    CreateExternalFirmDialogComponent,
    UsersDialogComponent,
    CategoryModalComponent,
    MatContactsDiaglogComponent,
    UpdateContactDialogComponent,
    UpdateMailtemplateComponent,
    AddMailTemplateComponent,
    SendMailtemplateComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
