import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxUiLoaderComponent } from 'ngx-ui-loader/lib/core/ngx-ui-loader.component';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageService } from '../service/ImageService';

@Component({
  selector: 'app-imageviewer',
  templateUrl: './imageviewer.component.html',
  styleUrls: ['./imageviewer.component.scss']
})
export class ImageviewerComponent implements OnInit, OnDestroy {

  imageSrc: File;
  subscription: Subscription;

  logs: string[];

  constructor(private client: HttpClient,
    private ngxUiLoader: NgxUiLoaderService,
    private imageService : ImageService) { }

  ngOnInit(): void {
    this.subscription = this.imageService._sideBarState.subscribe(res => {
      this.loadimage(res);
      this.loadLogs(res);
    })


  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  loadimage(id: string){
    this.ngxUiLoader.start();

    this.client.get('http://localhost:8080/image/loadimage?id=' + id,  { responseType: 'blob' as 'json' }).subscribe((theBlob: any) => {
      console.log('load')
      //Cast to a File() type
      this.imageSrc = new File([theBlob], "123.png");;

      this.ngxUiLoader.stopAll();
    })
  }

  loadLogs(id: string){
    this.client.get('http://localhost:8080/image/loadoperations?id=' + id,  { observe: 'response' }).pipe(
        //retry(3),
        map(result => {
          return result.body;
        })).subscribe((res: string[]) => {
          this.logs = res;
      })
  }

}
