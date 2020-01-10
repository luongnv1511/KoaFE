import { Input, Output, Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  loading = false;
  users: User[];
  tasks: any = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  @Output() messageToEmit = new EventEmitter<string>();

  ngOnInit() {
    this.loading = true;
    let userid = JSON.parse(localStorage.getItem('currentUser') || '{}').userid;
    console.log(userid);
    this.userService.getAllTask(userid).pipe(first()).subscribe(rs => {
      this.tasks = rs.tasks;
      this.loading = false;
    });
  }

  deleteTask(id) {
    var r = confirm(`Delete task have id = ${id}!`);
    if (r === true) {
      this.userService.delTaskById(id).pipe(first()).subscribe(rs => {
        this.ngOnInit() 
      });
    }
  }
  editTask(task, id?) {
    if (id) {
      console.log(task);
      localStorage.setItem('task', JSON.stringify(task));
    } else {
	localStorage.removeItem('task');
    }
    this.router.navigate(['/tasks']);
  }

}
