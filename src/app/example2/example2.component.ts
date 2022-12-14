import { FilepreviewoverlayRef } from './../overlays/filepreviewoverlay/filepreviewoverlay.ref';
import { FilepreviewoverlayService } from './../services/filepreviewoverlay.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserName } from '../interfaces/UserName.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./example2.component.css']
})
export class Example2Component implements OnInit {

  constructor(private filepreviewoverlayService: FilepreviewoverlayService) { }

  ngOnInit(): void {
  }

  dialogRef!: FilepreviewoverlayRef;
  customText: string = 'My Custom text to show in Overlay';

  // placeSubject = new BehaviorSubject<string>('');
  // place$ = this.placeSubject as Observable<string>;
  place: string = '';

  userName: UserName = {
    fname: '',
    lname: ''
  };



  onsubmit() {
    this.dialogRef = this.filepreviewoverlayService.openOverlay({
      data: this.userName
    });
    this.dialogRef.dataFromOverlaySubject.subscribe({
      next:(res) => {
        this.place = res;
      }
    })
  }

  // showOverlay() {
  //   this.dialogRef = this.filepreviewoverlayService.openOverlay({
  //     data: this.customText
  //   });

  //   // setTimeout(() => {
  //   //   this.dialogRef.close();
  //   //   console.log('overlay timeout')
  //   // }, 5000);
  // }

}
