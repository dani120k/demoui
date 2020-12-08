import {  NestedTreeControl } from '@angular/cdk/tree';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import {  map } from 'rxjs/operators';
import { TreeNodeValue } from './TreeNodeValue';
import _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { DirectoryEditComponent } from '../directory-edit/directory-edit.component';
import { ImageService } from '../service/ImageService';
import { FileEditComponent } from '../file-edit/file-edit.component';
import { XmlViewerEditComponent } from '../xml-viewer-edit/xml-viewer-edit.component';
import { saveAs } from 'file-saver';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
/*interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussels sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];*/

@Component({
  selector: 'app-foldertree',
  templateUrl: './foldertree.component.html',
  styleUrls: ['./foldertree.component.scss']
})
export class FoldertreeComponent implements OnInit {

  ngOnInit(){
    this.loadData();
  }

  treeControl = new NestedTreeControl<TreeNodeValue>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNodeValue>();

  constructor(private httpClient: HttpClient,
    private imageService: ImageService,
    private dialog: MatDialog) {
    //this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: TreeNodeValue) => !!node.children && node.children.length > 0;


  loadData(){
    this.httpClient.get('http://localhost:8080/tree/loadtree', { observe: 'response' }).pipe(
      //retry(3),
      map(result => {
        return result.body;
      })
    ).subscribe((res: TreeNodeValue[]) => {
      this.dataSource.data = res;

      //this.ngxLoader.stopAll();
    })
  }

  addDirectory(){
    this.openAddDirectoryDialog(null);
  }

  addChildDirectory(directory){
    this.openAddChildDirectoryDialog(null, directory);
  }

  showPreview(file){
    this.imageService._sideBarState.next(file.id);
  }

  addChildFile(directory){
    this.openAddChildFileDialog(null, directory);
  }

  showPreviewXml(node){
    this.openXmlPreview(node);
  }

  deleteNode(node){
    if (node.type == 'directory'){
      this.httpClient.get('http://localhost:8080/tree/deletedirectory?id=' + node.id,  { observe: 'response' }).subscribe(res => {
        this.loadData();
      })
    } else if (node.type == 'file'){
      this.httpClient.get('http://localhost:8080/tree/deletefile?id=' + node.id,  { observe: 'response' }).subscribe(res => {
        this.loadData();
      })
    }
  }

  download(node){
    this.httpClient.get('http://localhost:8080/image/loadoriginalimage?id=' + node.id,  { responseType: 'blob' as 'json' }).subscribe((theBlob: any) => {
      saveAs(theBlob, 'file.tif');
    });
  }

  openXmlPreview(entity){
    let clonnedEntity = _.cloneDeep(entity);

    let dialogRef = this.dialog.open(XmlViewerEditComponent, {
      'data': { entity: clonnedEntity },
      width: '1000px',
      height: '800px',
      disableClose: false
    });

    dialogRef.beforeClosed().subscribe(res => {

      if (res) {

      }

      console.log('dialog beforeclose res =' + JSON.stringify(res));
    });

    dialogRef.afterClosed().subscribe(res => {
     

      console.log('dialog afterclose res =' + res);
    });
  }

  openAddChildFileDialog(entity, directory){
    let clonnedEntity = _.cloneDeep(entity);

    let dialogRef = this.dialog.open(FileEditComponent, {
      'data': { entity: clonnedEntity },
      width: '1000px',
      height: '800px',
      disableClose: false
    });

    dialogRef.beforeClosed().subscribe(res => {

      if (res) {
        //this.ngxLoader.start();
        res[0].parentdirectoryid = directory.id;

        const httpOptions = {
          headers: new HttpHeaders({
          }),
          observe: "response" as 'response'
        };

        const formData = new FormData();
        formData.append('file', res[1]);
        formData.append('fileinfo', JSON.stringify(res[0]));
  

        this.httpClient.post('http://localhost:8080/tree/savefile', formData, httpOptions).pipe(
          map(res => res.body)
        ).subscribe(result => {
          this.loadData();
        })
      }

      console.log('dialog beforeclose res =' + JSON.stringify(res));
    });

    dialogRef.afterClosed().subscribe(res => {
      

      console.log('dialog afterclose res =' + res);
    });
  }

  openAddChildDirectoryDialog(entity, directory){
    let clonnedEntity = _.cloneDeep(entity);

    let dialogRef = this.dialog.open(DirectoryEditComponent, {
      'data': { entity: clonnedEntity },
      width: '1000px',
      height: '800px',
      disableClose: false
    });

    dialogRef.beforeClosed().subscribe(res => {

      if (res) {
        //this.ngxLoader.start();
        res.parentdirectoryid = directory.id;

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json;charset=utf-8'
          }),
          observe: "response" as 'response'
        };

        this.httpClient.post('http://localhost:8080/tree/save', res, httpOptions).pipe(
          map(res => res.body)
        ).subscribe(result => {
          this.loadData();
        })
      }

      console.log('dialog beforeclose res =' + JSON.stringify(res));
    });

    dialogRef.afterClosed().subscribe(res => {
      

      console.log('dialog afterclose res =' + res);
    });
  }

  openAddDirectoryDialog(entity){
    let clonnedEntity = _.cloneDeep(entity);

    let dialogRef = this.dialog.open(DirectoryEditComponent, {
      'data': { entity: clonnedEntity },
      width: '1000px',
      height: '800px',
      disableClose: false
    });

    dialogRef.beforeClosed().subscribe(res => {

      if (res) {
        //this.ngxLoader.start();

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json;charset=utf-8'
          }),
          observe: "response" as 'response'
        };

        this.httpClient.post('http://localhost:8080/tree/save', res, httpOptions).pipe(
          map(res => res.body)
        ).subscribe(result => {
          this.loadData();
        })
      }

      console.log('dialog beforeclose res =' + JSON.stringify(res));
    });

    dialogRef.afterClosed().subscribe(res => {
     

      console.log('dialog afterclose res =' + res);
    });
  }
}
