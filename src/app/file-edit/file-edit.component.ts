import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileInfo } from '../model/FileInfo';

@Component({
  selector: 'app-file-edit',
  templateUrl: './file-edit.component.html',
  styleUrls: ['./file-edit.component.scss']
})
export class FileEditComponent implements OnInit {
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;

  filename: string;
  file: any;
  mailConfig: FileInfo;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.entity){
      this.mailConfig = this.data.entity;
    } else {
      this.mailConfig = new FileInfo();
    }
  }

  addFileClicked(){
    const fileInput = this.fileInput.nativeElement;
    fileInput.onchange = () => {
      if (fileInput.files.length > 0) {
        this.file = fileInput.files[0];
        this.mailConfig.filename = fileInput.files[0].name;
      }
    };
    
    fileInput.click();
  }

  downloadFile(){

  }

  deleteFile(){

  }

}
