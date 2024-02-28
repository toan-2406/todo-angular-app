import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,DeleteModalComponent,FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  showDeleteModal: boolean = false;
  taskToDeleteId: number | undefined;
  editingTask: any = null;
  @Input() taskList: any[] = [];
  @Output() important = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  markImportant(task: any) {
    this.important.emit(task);
  }
  markComplete(task: any) {
    this.complete.emit(task);
  }

  markDeleted(id:number) {
    this.delete.emit(id)
  }
  openDeleteModal(taskId: number) {
    this.showDeleteModal = true;
    this.taskToDeleteId = taskId;
  }

  deleteTaskConfirmed(confirmed: boolean) {
    if (confirmed && this.taskToDeleteId !== undefined) {
    this.delete.emit(this.taskToDeleteId)
    }
    this.showDeleteModal = false;
    this.taskToDeleteId = undefined;
  }

  editTask(task: any) {
    this.editingTask = { ...task };
  }

  saveEditedTask(editedTask: any) {
    this.update.emit(editedTask)
    this.editingTask = null; // Kết thúc việc chỉnh sửa, gán editingTask về null
  }

  cancelEditTask() {
    this.editingTask = null; // Hủy chỉnh sửa, không lưu thay đổi
  }
}
