import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAllTask(userid: any) {
      return this.http.post<any>(`${environment.apiUrl}/api/tasks`, { userid })
      .pipe(map(task => {
          console.log(task);
          return task;
      }));
    }
    delTaskById(id: any) {
      return this.http.post<any>(`${environment.apiUrl}/api/delete-task`, { id })
      .pipe(map(task => {
          console.log(task);
          return task;
      }));
    }
}
