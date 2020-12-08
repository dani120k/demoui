import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { FileInfo } from '../model/FileInfo';
import { XmlResponse } from './XmlResponse';

@Component({
  selector: 'app-xml-viewer-edit',
  templateUrl: './xml-viewer-edit.component.html',
  styleUrls: ['./xml-viewer-edit.component.scss']
})
export class XmlViewerEditComponent implements OnInit {

  mailConfig: FileInfo;
  xmlText: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    if (this.data.entity){
      this.mailConfig = this.data.entity;

      this.httpClient.get('http://localhost:8080/image/loadxml?id=' + this.data.entity.id,  { observe: 'response' }).pipe(
        //retry(3),
        map(result => {
          return result.body;
        })).subscribe((res: XmlResponse) => {
          debugger;
          this.xmlText = res.text;
      })
    }
  }
}
