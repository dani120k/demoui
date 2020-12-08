import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/MaterialModule';
import { FoldertreeComponent } from './foldertree/foldertree.component';
import { ImageviewerComponent } from './imageviewer/imageviewer.component';
import { ImageViewerModule } from '@hallysonh/ngx-imageviewer';
import { HttpClientModule } from '@angular/common/http';
import { DirectoryEditComponent } from './directory-edit/directory-edit.component';
import { FormsModule } from '@angular/forms';
import { FileEditComponent } from './file-edit/file-edit.component';
import { XmlViewerEditComponent } from './xml-viewer-edit/xml-viewer-edit.component';
import { NgxEditorModule } from 'ngx-editor';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from "ngx-ui-loader";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "#2589DE",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin-clockwise",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#2589DE", //#b71c1c
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "ball-spin-clockwise",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "#2589DE",
  "pbDirection": "ltr",
  "pbThickness": 2,
  "hasProgressBar": false,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
}

@NgModule({
  declarations: [
    AppComponent,
    FoldertreeComponent,
    ImageviewerComponent,
    DirectoryEditComponent,
    FileEditComponent,
    XmlViewerEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ImageViewerModule,
    HttpClientModule,
    FormsModule,
    NgxEditorModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
