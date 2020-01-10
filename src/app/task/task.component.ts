import { Output, Input, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'task.component.html' })
export class TaskComponent implements OnInit {
  taskForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/tasks']);
    }
  }
  @Input() receivedParentMessage: string;

  ngOnInit() {

    let taskById = JSON.parse(localStorage.getItem('task') || '{}');
    console.log(taskById);
    if (taskById !== {}) {
      this.taskForm = this.formBuilder.group({
        taskName: [taskById.taskname, Validators.required],
        description: [taskById.description, Validators.required]
      });
    } else {
      this.taskForm = this.formBuilder.group({
        taskName: ['', Validators.required],
        description: ['', Validators.required]
      });
    }
  }
  get f() { return this.taskForm.controls; }
  onSubmit() {
    let taskById = JSON.parse(localStorage.getItem('task') || '{}');
    let taskId = null;
    if (taskById !== {}) {
      taskId = taskById.id;
    }
    let userid = JSON.parse(localStorage.getItem('currentUser') || '{}').userid;
    this.authenticationService.addTask(userid, taskId, this.f.taskName.value, this.f.description.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
          localStorage.removeItem('task');
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }

  cancel() {
    this.router.navigate(['/']);
  }
}
