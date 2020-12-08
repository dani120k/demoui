import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Directory } from '../model/Directory';

@Component({
  selector: 'app-directory-edit',
  templateUrl: './directory-edit.component.html',
  styleUrls: ['./directory-edit.component.scss']
})
export class DirectoryEditComponent implements OnInit {

  mailConfig: Directory;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.entity){
      this.mailConfig = this.data.entity;
    } else {
      this.mailConfig = new Directory();
    }
  }
}
