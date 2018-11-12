import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ToastModule,ToastOptions } from 'ng2-toastr/ng2-toastr';
import { FileSelectDirective, FileDropDirective, FileUploadModule } from 'ng2-file-upload';
import { Ng2CompleterModule } from "ng2-completer";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { GooglePlaceModule } from 'ng2-google-place-autocomplete';
import { DatePipe } from '@angular/common';
import { DxDataGridModule,DxTemplateModule,DxLookupModule,DxFileUploaderModule,DxPopupModule,DxFormModule, DxDateBoxModule} from 'devextreme-angular';
// import { DateTimePickerModule } from 'ng-pick-datetime';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';



import { AppRoutingModule } from './app-routing.module';
import { EnergyGuard } from './guards/energy.guard';
import { AuthService } from './services/auth.service';
import { ApisService} from './services/apis.service';
import {ToastService} from './services/toast.service';
import { ToastCustomOption } from './config/toast-custom-option';
import {SpinnerService} from './services/spinner.service';


import { AppComponent } from './app.component';
import { SessionComponent } from './components/session/session.component';
import { LoginComponent } from './components/session/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/dashboard/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    SessionComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    FileUploadModule,
    Ng2CompleterModule,
    DxDataGridModule,
    DxLookupModule,
    DxTemplateModule,
    DxFileUploaderModule,
    DxPopupModule,
    BrowserAnimationsModule,
    DxFormModule,
    DxDateBoxModule,
    ToastModule.forRoot() ,
    // GooglePlaceModule,
    // DateTimePickerModule,
    BootstrapModalModule  
  ],
  providers: [
              EnergyGuard,
              AuthService,
              ApisService,
              SpinnerService,
              ToastService,
              {provide:ToastOptions, useClass: ToastCustomOption},
              { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
