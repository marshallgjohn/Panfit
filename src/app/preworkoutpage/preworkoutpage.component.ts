import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import { User } from '../model/user';
import { Workout } from '../model/workout';
import {Routine} from '../model/routine';
import {RoutineEntry} from '../model/routineEntry';
import { AppRoutingModule } from '../app-routing.module';
import {DataService} from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import {CurrentWorkout} from '../model/currentWorkout';

@Component({
  selector: 'app-preworkoutpage',
  templateUrl: './preworkoutpage.component.html',
  styleUrls: ['./preworkoutpage.component.sass']
})
//TODO: Get graph of progression working
//TODO: make page reactive to change current workout routine
//FIXME: last workout/workout history not filling in

export class PreworkoutpageComponent implements OnInit {

  private _user: User;
  workout: Workout;
  dotw: String[];
  private _routines: String[];
  workoutList: Workout[];
  entries: RoutineEntry[];
  lastEntry: RoutineEntry;
  test: String;
  currentWorkout: CurrentWorkout;
  currentRoutine: Routine;
  todayDate: String;
  private _modal: boolean = false;


  constructor(private apiService: ApiService, private data: DataService, private router: Router) { }

  ngOnInit(): void {
      this.data.currentRoutine.subscribe(r => this.currentRoutine = r);
      this.apiService.getAll("current").subscribe(r => this.currentWorkout = r);

      this.apiService.getAll("routines").subscribe((data: Routine[]) => {

        if(data.length==0) {
          this.router.navigateByUrl('/create-workout');
        }
         this.routines = this.initRoutines(data);
         console.log(["DAY OFF", "DAY OFF", "DAY OFF"]);

         
         
      });
      
      this.apiService.getAll("entries").subscribe((data: RoutineEntry[]) => {
          this.entries = data;
          this.lastEntry = data[data.length-1];
          console.log(this.lastEntry.entryDate.toLocaleString())
        });

      this.apiService.getAll("users").subscribe((data: User) => {
        this.user = data;
     });

     this.apiService.getAll("workouts").subscribe((data: Workout[]) => {
        this.workoutList = data;
        //console.log(this.workoutList)
     });
      this.dotw = this.initDotw();
      this.todayDate = this.getFormattedDate()
      console.log(this.todayDate)
      console.log(this.lastEntry.entryDate.toLocaleString())
  }

  initRoutines(user) {
    let num = new Date().getDay();
    let r = ["DAY OFF","DAY OFF","DAY OFF"];
    user.forEach(element => {
      console.log(element.routineDay)
        switch(element.routineDay) {
          case num-1:
            r.splice(0,1,element.routineName.toUpperCase());
          break;

          case num:
            r.splice(1,1,element.routineName.toUpperCase());
            this.changeRoutine(element);
            //console.log(element);
            break;

          case num+1:
            r.splice(2,1,element.routineName.toUpperCase());
            break;
      }
    });
      console.log(r)
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

  updateCurrentWorkout() {
    this.apiService.put("current",Number((<HTMLSelectElement>document.getElementById('current-select')).value)).subscribe()

    this.ngOnInit()
   
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

  getFormattedDate() {

    var todayTime = new Date();

    var month = (todayTime.getMonth() + 1);

    var day = (todayTime .getDate());

    let dday = (day < 10) ? "0"+ day : ""+day

    var year = (todayTime .getFullYear());

    return  (month < 10) ? "0"+month + "/" + dday + "/" + year : month + "/" + dday + "/" + year;

}

  showModal(): void {
    this._modal = !this._modal;
  }

  get modal() {
    return this._modal
  }
  set modal(value: boolean) {
    this._modal = value;
  }


    /**
     * Getter user
     * @return {User}
     */
	public get user(): User {
		return this._user;
	}

    /**
     * Setter user
     * @param {User} value
     */
	public set user(value: User) {
		this._user = value;
  }
  

    /**
     * Getter routines
     * @return {String[]}
     */
	public get routines(): String[] {
		return this._routines;
	}

    /**
     * Setter routines
     * @param {String[]} value
     */
	public set routines(value: String[]) {
		this._routines = value;
	}

  

}
