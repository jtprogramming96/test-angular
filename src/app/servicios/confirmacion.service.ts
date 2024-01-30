import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionModalComponent } from '../confirmacion-modal/confirmacion-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmacionService {

  private modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) {}

  openConfirmationModal(message: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.modalRef = this.modalService.open(ConfirmacionModalComponent, { centered: true });
      this.modalRef.componentInstance.message = message;

      this.modalRef.result.then(
        (result) => resolve(result === 'confirm'),
        () => reject(false)
      );
    });
  }

  closeConfirmationModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}
