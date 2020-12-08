import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    public _sideBarState: Subject<string>;

    constructor(){
        this._sideBarState = new Subject<string>();
    }
}