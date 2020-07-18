import { Component, OnInit, Input } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {RoutineExercise} from '../../model/routineExercise';
import {Routine} from '../../model/routine';
import {timer} from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import {RoutineEntry} from '../../model/routineEntry';

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
  exercises: RoutineExercise[];
  entries: RoutineEntry;

  constructor(private apiService: ApiService, private data: DataService) { }

  ngOnInit(): void {


    this.data.currentRoutine.subscribe(rout => {
      this.routine = rout;
      this.apiService.getAll("routineexercises/" + rout.id).subscribe((data:RoutineExercise[]) =>{
        this.exercises = data
        console.log(data);
      })});

      this.apiService.getAll("entries").subscribe((data: RoutineEntry[]) => {
        this.entries = data[data.length-2];
      });



    this.elapsedTimer();
    
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
    let x = 0;
    let hours = -1;
    let minutes = -1;
    let seconds = 0;
    const abc = source.subscribe(val => {
      x = val;
      if (x % 3600 == 0) { 
        hours++; 
      }
      if((x - 3600 * hours) % 60 == 0) {
        minutes++;
      }
      if ( x- (3600 * hours) - (60 * minutes) != 0) {
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
