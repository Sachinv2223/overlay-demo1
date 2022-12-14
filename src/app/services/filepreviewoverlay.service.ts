import { UserName } from './../interfaces/UserName.interface';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector } from '@angular/core';
import { FilePreviewDialogConfig } from '../interfaces/FilePreviewDialogConfig.interface';
import { FilepreviewoverlayComponent } from '../overlays/filepreviewoverlay/filepreviewoverlay.component';
import { FilepreviewoverlayRef } from '../overlays/filepreviewoverlay/filepreviewoverlay.ref';

const DEFAULT_CONFIG: FilePreviewDialogConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel',
  data: {
    fname: '',
    lname: ''
  }
}

// Token injection
// export const FILE_PREVIEW_DIALOG_DATA = new InjectionToken<string>('FILE_PREVIEW_DIALOG_DATA');
export const FILE_PREVIEW_DIALOG_DATA = new InjectionToken<UserName>('FILE_PREVIEW_DIALOG_DATA');

@Injectable({
  providedIn: 'root'
})
export class FilepreviewoverlayService {

  constructor(private overlay: Overlay) { }

  private getOverlayConfig(config: FilePreviewDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: positionStrategy
    });

    return overlayConfig;
  }

  private createOverlay(config: FilePreviewDialogConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  // Portal Injector is deprecated.
  // private createInjector(config: FilePreviewDialogConfig, dialogRef: FilepreviewoverlayRef): PortalInjector {
  //   // Instantiate new WeakMap for our custom injection tokens
  //   const injectionTokens = new WeakMap();

  //   // Set custom injection tokens
  //   injectionTokens.set(FilepreviewoverlayRef, dialogRef);
  //   injectionTokens.set(FILE_PREVIEW_DIALOG_DATA, config.data);

  //   // Instantiate new PortalInjector
  //   return new PortalInjector(this.injector, injectionTokens);
  // }

  private createInjector(dialogConfig: FilePreviewDialogConfig, dialogRef: FilepreviewoverlayRef): Injector {
    return Injector.create({
      providers: [{
        provide: FilepreviewoverlayRef, useValue: dialogRef
      },
      {
        provide: FILE_PREVIEW_DIALOG_DATA, useValue: dialogConfig.data
      }]
    });
  }

  openOverlay(config: FilePreviewDialogConfig = {}): FilepreviewoverlayRef {
    // Override default configuration
    const dialogConfig: FilePreviewDialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Instantiate remote control, so that we can use it to close overlay
    const dialogRef = new FilepreviewoverlayRef(overlayRef);

    // create injector for sharing data as well as remote control
    const dialogInjector = this.createInjector(dialogConfig, dialogRef);

    // Create ComponentPortal that can be attached to a PortalHost and to use injector
    const filePreviewPortal = new ComponentPortal(FilepreviewoverlayComponent, null, dialogInjector);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(filePreviewPortal);

    // Backdrop click
    // overlayRef.backdropClick().subscribe(_ => {
    //   dialogRef.close();
    //   console.log('Backdrop clicked');
    // });

    // returing the remote control
    return dialogRef;
  }
}
