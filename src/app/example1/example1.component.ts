import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.css']
})
export class Example1Component implements OnInit {

  constructor() {
    this.isOpen = false;
  }

  ngOnInit(): void {
  }

  isOpen: boolean;

  @Input('cdkConnectedOverlayBackdropClass')
  backdropClass: string | string[] = ['modal', 'modal-backdrop'];

  @Input('cdkConnectedOverlayHasBackdrop')
  hasBackdrop: boolean = true;

}
