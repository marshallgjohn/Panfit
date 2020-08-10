import { Component, OnInit, Input } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {RoutineExercise} from '../../model/routineExercise';
import {Routine} from '../../model/routine';
import {timer} from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import {RoutineEntry} from '../../model/routineEntry';
import {Sets} from '../../model/sets';
import {Router} from '@angular/router'
import { NotificationService } from 'src/app/services/notification.service';
import {Notification} from '../../model/notification';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.sass']
})
export class WorkoutComponent implements OnInit {

  routine: Routine;
  restTime: string = "NEXT SET";
  restAmount: number;
  elapsedTime: string;
  elapsedSeconds: number;
  exercises: RoutineExercise[];
  postSets: Sets[];
  entries: RoutineEntry[];
  private _test: any[] = [];
  private _setCount: number =-1;
  private _prevReps: number[] = []

  constructor(private apiService: ApiService, private data: DataService, private router: Router, private notif: NotificationService) { }

  ngOnInit(): void {



    this.data.currentRoutine.subscribe(rout => {
      this.routine = rout;
      if(this.routine.routineName === "none") {
        this.router.navigateByUrl("");
      }
      this.apiService.getAll("routineexercises/" + rout.id).subscribe((data:RoutineExercise[]) =>{
        this.exercises = data
        //console.log(data)
      })});

      this.apiService.getAll("entries").subscribe((data: RoutineEntry[]) => {
        this.entries = data;
        let s = data.filter(f => f.routine.routineName === this.routine.routineName)
        console.log("DINGDINDGIGD")

        let d = s[s.length-1]
        console.log(d.set)
        d.set.forEach(x=> {
          console.log(x.setPrevWeight)
          this.test.push(x.setPrevWeight)
          this.prevReps.push(x.setReps)
        })
      });
    



    this.elapsedTimer();
    
  }


  postWorkout(): void {
    let date = new Date()
    this.apiService.post(
      "/entries",
      new RoutineEntry(
        null,
        this.routine,
        new Date(date.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2')),//new Date(new Date().toJSON().slice(0,10).replace('/-/g','/')),
        this.elapsedSeconds,
        null
      )).subscribe(data => {
        //console.log(data);
        this.apiService.post(
          "/sets/all",
          JSON.stringify(this.createPostSets(data.body)
          )).subscribe(d => {
              this.router.navigateByUrl("")

              if(data.status === 200 && d.status === 200) {
                this.notif.changeNotification(new Notification("Update was a success!",true))
                this.router.navigateByUrl("")
              } else {
                this.notif.changeNotification(new Notification("Error in submitting data",false))
              }
          }
          );
      });
  }


  createPostSets(entry: RoutineEntry): Sets[] {

    let sets: Sets[] = [];

    this.exercises.forEach(data => {

      for(let i = 1; i < data.routine_sets+1;i++) {
        //console.log(data.id);
        let set = new Sets(
          null,
          entry,
          data,
          i,
          Number((document.getElementById(data.id +"-"+ i + "-reps") as HTMLInputElement).value),
          Number((document.getElementById(data.id +"-" + i + "-lbs") as HTMLInputElement).value),
          Number((document.getElementById(data.id +"-" + i + "-lbs") as HTMLInputElement).value),
          );
        sets.push(set);
      }
      
    })
    
    //console.log(sets)
    return sets;
  }

  restTimer(rest) {
    this.restAmount = rest;
    const sources = timer(1,1000);
    const abcd = sources.subscribe(val => {
      if(this.restAmount - val == 0) {
        abcd.unsubscribe();
        this.restTime = "NEXT SET";
      } else {
         this.restTime = this.restAmount - val + "S";
      }
    });


    
  }

  setPrevWeight(i): number{
    if(i < this.setCount) {
      this.setCount = this._setCount+1
    } else {
      this.setCount = i;
    }
    console.log(this.setCount)
    return this.test[this.setCount];
  }


  elapsedTimer() {
    const source = timer(1,1000);
    this.elapsedSeconds = 0;
    let hours = -1;
    let minutes = -1;
    let seconds = 0;
    const abc = source.subscribe(val => {
      this.elapsedSeconds = val;
      if (this.elapsedSeconds % 3600 == 0) { 
        hours++; 
      }
      if((this.elapsedSeconds - 3600 * hours) % 60 == 0) {
        minutes++;
      }
      if ( this.elapsedSeconds- (3600 * hours) - (60 * minutes) != 0) {
      seconds++;
      } else {
        seconds=0;
      }
    
      this.elapsedTime =((hours < 10)? "0"+hours +"H" : hours + "H") + ((minutes < 10)? "0"+minutes+"M" : minutes + "M") + ((seconds < 10)? "0"+seconds+"S" : seconds + "S");
    });
  }



  setArray(n: number): any[] {
    return Array(n);
  }


    /**
     * Getter test
     * @return {any[]}
     */
	public get test(): any[] {
		return this._test;
	}

    /**
     * Setter test
     * @param {any[]} value
     */
	public set test(value: any[]) {
		this._test = value;
	}


    /**
     * Getter setCount
     * @return {number }
     */
	public get setCount(): number  {
		return this._setCount;
	}

    /**
     * Setter setCount
     * @param {number } value
     */
	public set setCount(value: number ) {
		this._setCount = value;
	}
  

    /**
     * Getter prevReps
     * @return {number[] }
     */
	public get prevReps(): number[]  {
		return this._prevReps;
	}

    /**
     * Setter prevReps
     * @param {number[] } value
     */
	public set prevReps(value: number[] ) {
		this._prevReps = value;
	}


}
