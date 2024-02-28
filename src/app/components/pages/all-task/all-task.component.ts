import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    PageTitleComponent,
    TaskListComponent,
    LoaderComponent,
    CommonModule,
  ],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss',
})
export class AllTaskComponent {
  newTask = '';
  initialTaskList: any[] = [];
  taskList: any[] = [];
  httpService = inject(HttpService);
  stateService = inject(StateService);
  loading: boolean = true;
  ngOnInit() {
    this.stateService.searchSubject.subscribe((value) => {
      console.log('search', value);
      if (value) {
        this.taskList = this.initialTaskList.filter((x) =>
          x.title.toLowerCase().includes(value.toLowerCase())
        );
      } else {
        this.taskList = this.initialTaskList;
      }
    });
    this.getAllTasks();

  }
  addTask() {
    console.log('addTask', this.newTask);
    this.httpService.addTask(this.newTask).subscribe(() => {
      this.newTask = '';
      this.getAllTasks();
    });
  }
  getAllTasks() {
    this.httpService.getAllTasks().subscribe((result: any) => {
      this.initialTaskList = this.taskList = result;
      this.loading = false;
    });
  }
  clearAllTasks() {
    this.taskList.map((t) => {
      this.httpService.deleteTask(t.id).subscribe(() => {
        this.getAllTasks();
      });
    })
  }
  onComplete(task: any) {
    task.completed = true;
    console.log('complete', task);
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }
  onImportant(task: any) {
    task.important = !task.important;
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }

  onDeleted(taskId: number) {
    console.log(taskId);
    this.httpService.deleteTask(taskId).subscribe(() => {
      this.getAllTasks();
    });
  }
  
  onUpdate(task:any){
    this.httpService.updateTask(task)
  }
}
