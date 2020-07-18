import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import { User } from '../model/user';
import { Workout } from '../model/workout';
import {Routine} from '../model/routine';
import {RoutineEntry} from '../model/routineEntry';
import { AppRoutingModule } from '../app-routing.module';
import {DataService} from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-preworkoutpage',
  templateUrl: './preworkoutpage.component.html',
  styleUrls: ['./preworkoutpage.component.sass']
})
export class PreworkoutpageComponent implements OnInit {

  user: User;
  workout: Workout;
  dotw: String[];
  routines: String[];
  entries: RoutineEntry[];
  lastEntry: RoutineEntry;
  test: String;
  currentRoutine: Routine;


  constructor(private apiService: ApiService, private data: DataService, private router: Router) { }

  ngOnInit(): void {
      this.data.currentRoutine.subscribe(r => this.currentRoutine = r);


      this.apiService.getAll("routines").subscribe((data: Routine[]) => {

        if(data.length==0) {
          this.router.navigateByUrl('/create-workout');
        }
         this.routines = this.initRoutines(data);
         
         
      });
      
      this.apiService.getAll("entries").subscribe((data: RoutineEntry[]) => {
          this.entries = data;
          this.lastEntry = data[data.length-1];
        });

      this.apiService.getAll("users").subscribe((data: User) => {
        this.user = data;
     });
      this.dotw = this.initDotw();
  }

  initRoutines(user): String[] {
    let num = new Date().getDay();
    let r = ["DAY OFF","DAY OFF","DAY OFF"];
    user.forEach(element => {
        switch(element.routineDay) {
          case num-1:
            r.splice(0,1,element.routineName.toUpperCase());
          break;

          case num:
            r.splice(1,1,element.routineName.toUpperCase());
            this.changeRoutine(element);
            console.log(element);
            break;

          case num+1:
            r.splice(2,1,element.routineName.toUpperCase());
            break;
      }
      
    });

      return r;
  }

  

  initDotw(): String[] {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let date = new Date();
    let num = date.getDay();
    let ret = [];

    //Puts dotw in arr
     (num==0) ?  ret.push(days[6]): ret.push(days[num-1]); 
     ret.push(days[num]);
     (num==6) ?  ret.push(days[0]): ret.push(days[num+1]); 

     let dayNum = date.getDate();

     //Puts number of day in arr
     (dayNum==1) ?  ret.push(31): ret.push(dayNum-1); 
     ret.push(dayNum);
     (dayNum==30) ?  ret.push(1): ret.push(dayNum+1); 

     let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
     let monthNum = date.getMonth();
     //Puts month in arr
     ret.push(months[monthNum]); 

     //Puts year in arr
     ret.push(date.getFullYear());

    return ret;
  }

  changeRoutine(rout: Routine) {
    this.data.changeRoutine(rout);
  }

  getSumReps(id): number {
    this.apiService.getAll("entries/sets/1").subscribe((data: number) => {
      return data;
    });

    return null;
  }

}
