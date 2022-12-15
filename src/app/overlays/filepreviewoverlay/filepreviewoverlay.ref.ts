import { OverlayRef } from "@angular/cdk/overlay";
import { BehaviorSubject, Observable } from "rxjs";

export class FilepreviewoverlayRef {

    constructor(private overlayRef: OverlayRef) { }

    dataFromOverlaySubject = new BehaviorSubject<string>('');

    close(): void {
        this.overlayRef.dispose();
    }

    shareDataAndClose(userPlace: string) {
        this.dataFromOverlaySubject.next(userPlace);
        this.overlayRef.dispose();
        this.dataFromOverlaySubject.complete();
    }
}