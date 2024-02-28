import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styles: ''
})
export class DeleteModalComponent {
  @Output() deleteConfirmed = new EventEmitter<boolean>();

  confirmDelete() {
    this.deleteConfirmed.emit(true);
  }

  cancelDelete() {
    this.deleteConfirmed.emit(false);
  }
}
