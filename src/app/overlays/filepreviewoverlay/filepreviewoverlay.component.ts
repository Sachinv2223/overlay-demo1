import { NgForm } from '@angular/forms';
import { FilepreviewoverlayRef } from './filepreviewoverlay.ref';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FILE_PREVIEW_DIALOG_DATA } from 'src/app/services/filepreviewoverlay.service';
import { UserName } from 'src/app/interfaces/UserName.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filepreviewoverlay',
  templateUrl: './filepreviewoverlay.component.html',
  styleUrls: ['./filepreviewoverlay.component.css']
})
export class FilepreviewoverlayComponent implements OnInit {

  constructor(
    public dialogRef: FilepreviewoverlayRef,
    @Inject(FILE_PREVIEW_DIALOG_DATA) public data: UserName,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  isLoading: boolean = true;
  place: any = '';

  // Escape key - to close overlay
  @HostListener('document:keydown', ['$event']) private handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.dialogRef.close();
    }
  }

  oSubmit() {
    console.log(this.place);
    this.dialogRef.shareDataAndClose(this.place);
    this.router.navigate(['/home']);
  }

  closeOverlay() {
    console.log('cancel');
    this.dialogRef.close();
  }


}
