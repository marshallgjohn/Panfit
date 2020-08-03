import { Component, OnInit, Input } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {RoutineExercise} from '../../model/routineExercise';
import {Routine} from '../../model/routine';
import {timer} from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import {RoutineEntry} from '../../model/routineEntry';
import {Sets} from '../../model/sets';

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
  entries: RoutineEntry;

  constructor(private apiService: ApiService, private data: DataService) { }

  ngOnInit(): void {


    this.data.currentRoutine.subscribe(rout => {
      this.routine = rout;
      this.apiService.getAll("routineexercises/" + rout.id).subscribe((data:RoutineExercise[]) =>{
        this.exercises = data
        console.log(data)
      })});

      this.apiService.getAll("entries").subscribe((data: RoutineEntry[]) => {
        this.entries = data[data.length-2];
      });



    this.elapsedTimer();
    
  }


  postWorkout(): void {

    this.apiService.post(
      "/entries",
      new RoutineEntry(
        null,
        this.routine,
        new Date(new Date().toJSON().slice(0,10).replace(/-/g,'/')),
        this.elapsedSeconds
      )).subscribe(data => {
        console.log(data);
        //this.apiService.post("/sets",this.createPostSets(data.bod.routine))
        this.apiService.post(
          "/sets/all",
          JSON.stringify(this.createPostSets(data.body)
          )).subscribe();
      });
  }


  createPostSets(entry: RoutineEntry): Sets[] {

    let sets: Sets[] = [];

    this.exercises.forEach(data => {

      for(let i = 1; i < data.routine_sets+1;i++) {
        console.log(data.id);
        let set = new Sets(
          null,
          new RoutineEntry(1,null,null,null),
          data,
          i,
          Number((document.getElementById(data.id +"-"+ i + "-reps") as HTMLInputElement).value),
          Number((document.getElementById(data.id +"-" + i + "-lbs") as HTMLInputElement).value),
          0,
          );
        sets.push(set);
      }
      
    })
    
    console.log(sets)
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
      
      //console.log(hours,hour);
      //let minutes = (x - 3600 * hours) / 60;
      //let seconds = (x - 3600 * hours - 60 * minutes);
      this.elapsedTime = hours + "H" + minutes + "M" + (seconds) + "S";
    });
  }



  setArray(n: number): any[] {
    return Array(n);
  }

}
