import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal.module'; no anda, ver porqué

@Component({
  selector: 'app-confirmacion-modal',
  templateUrl: './confirmacion-modal.component.html',
  styleUrls: ['./confirmacion-modal.component.css']
})
export class ConfirmacionModalComponent {
  @Input() message: string;

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close('confirm');
  }

  cancel() {
    this.activeModal.dismiss('cancel');
  }
}
