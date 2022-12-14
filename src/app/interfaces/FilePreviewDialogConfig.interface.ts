import { UserName } from './UserName.interface';
// Each property can be overridden by the consumer
export interface FilePreviewDialogConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string | string[];
    data?: UserName;
}