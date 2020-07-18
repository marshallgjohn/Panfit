import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {Exercise} from '../model/exercise';
import {Routine} from '../model/routine';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Workout } from '../model/workout';
import { User } from '../model/user';
import { Credentials } from '../model/credentials';
import { RoutineExercise } from '../model/routineExercise';
import { Muscle } from '../model/muscle';
import { Equipment } from '../model/equipment';
import { Day }from '../model/day';

@Component({
  selector: 'app-createworkoutpage',
  templateUrl: './createworkoutpage.component.html',
  styleUrls: ['./createworkoutpage.component.sass']
})
export class CreateworkoutpageComponent implements OnInit {

  private _modal: boolean = false;
  private _createModal: boolean = false;
  private _routineInput: boolean = true;
  exercises: Exercise[] = [];
  exerciseList: Exercise[];
  routineList: Workout[];
  workoutForm: FormGroup;
  selectedValue: any;
  muscleList: Muscle[] = [];
  equipmentList: Equipment[] = []
  routineDotw: Day[] = [];


  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { 
  }


  showModal(): void {
      this.modal = !this.modal;
  }

  showCreateModal(): void {
    this.createModal = !this.createModal;
}

  ngOnInit(): void {
    this.apiService.getAll("exercises").subscribe(data => {
      this.exerciseList = data;
    });
    this.apiService.getAll("workouts").subscribe(data => {
      this.routineList = data;
    });

    this.apiService.getAll("muscles").subscribe(data => {
      this.muscleList = data;
    });

    this.apiService.getAll("equipment").subscribe(data => {
      this.equipmentList = data;
    });


    this.workoutForm = new FormGroup({
      routine: new FormControl(),
    });

  }

  onClick(name): void {
      this.exercises.push(name);
      this.exerciseList.splice(this.exerciseList.indexOf(name.exerciseName));
      //console.log("Clicked");
  }

  onOptionSelect(name): void {

    let dArr = [];
    for(let i = 0; i < 7; i++) {
      dArr.push(new Day(i));
    }

    //console.log(this.workoutForm.get("routine").value);
    if(name == "New") {
      this.routineInput = true;
    } else {
      this.routineInput = false;
      this.workoutForm.get("routine").value.routine.forEach(data => {
        //console.log(data.routineDay);
        dArr = this.removeItemOnce(dArr,data.routineDay);
      });
    }
    
    this.routineDotw = dArr;
  } 

  removeItemOnce(arr, value) {
    var pos = arr.map(function(e) {return e.num;})
    var index = pos.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  deleteElement(exercise): void {
    //console.log(exercise);
    this.exerciseList.push(this.exercises[this.exercises.indexOf(exercise)]);
    document.getElementById(exercise).remove();
  }


  postAll(): void {
    if((<HTMLSelectElement>document.getElementById('routine-select')).value == "New") {
    const l = this.apiService.getAll("users").subscribe(data => {
      this.apiService.post(
        "/workouts",
      new Workout(
        null,
        null,
        (document.getElementById("routine_name") as HTMLInputElement).value,
        data,
        null))
        .subscribe(f => 
          {
            //console.log(f);
            this.apiService.post("/routines", 
            new Routine(
              null,
              Number((<HTMLSelectElement>document.getElementById('day-select')).value),
              (document.getElementById("name") as HTMLInputElement).value,
              f.body
              )
              ).subscribe(rout => {
                let postExercises: RoutineExercise[] = [];

                this.exercises.forEach(data => {
                  //onsole.log(rout);
                  let x = new RoutineExercise(
                    null,
                    Number((document.getElementById(data.id + "-max-reps") as HTMLInputElement).value),
                    Number((document.getElementById(data.id + "-min-reps") as HTMLInputElement).value),
                    Number((document.getElementById(data.id + "-minutes") as HTMLInputElement).value) * Number((document.getElementById(data.id + "-minutes") as HTMLInputElement).value),
                    Number((document.getElementById(data.id + "-sets") as HTMLInputElement).value),
                    data,
                    rout.body
                    );
                    postExercises.push(x);
                });
                //console.log(postExercises);
                this.apiService.post("/routineexercises",JSON.stringify(postExercises)).subscribe();
              });
            
          });
    });
    } else {
      this.apiService.post("/routines", 
      new Routine(
        null,
        Number((<HTMLSelectElement>document.getElementById('day-select')).value),
        (document.getElementById("name") as HTMLInputElement).value,
        this.workoutForm.get("routine").value
        )
        ).subscribe(rout => {
          let postExercises: RoutineExercise[] = [];

          this.exercises.forEach(data => {
            
            let x = new RoutineExercise(
              null,
              Number((document.getElementById(data.id + "-max-reps") as HTMLInputElement).value),
              Number((document.getElementById(data.id + "-min-reps") as HTMLInputElement).value),
              Number((document.getElementById(data.id + "-minutes") as HTMLInputElement).value) * Number((document.getElementById(data.id + "-minutes") as HTMLInputElement).value),
              Number((document.getElementById(data.id + "-sets") as HTMLInputElement).value),
              data,
              rout.body
              );
              postExercises.push(x);
          });
          //console.log(postExercises);
          this.apiService.post("/routineexercises",JSON.stringify(postExercises)).subscribe();
        });
    }
  }

  postExercise(): void {
    //console.log("HELLO");
    this.apiService.post("/exercises",
    JSON.stringify(
    new Exercise(
      null,
      new Muscle(
        Number((<HTMLSelectElement>document.getElementById('muscle-select')).value),
        null
      ),
      new Equipment(
        Number((<HTMLSelectElement>document.getElementById('equipment-select')).value),
        null
      ),
      (document.getElementById("exercise-name-input") as HTMLInputElement).value
    ))).subscribe();
  }


  private dotw(day: string): number {
    return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].indexOf(day);
  }

  
  set modal(value: boolean) {
    this._modal = value;
  }

  get modal() {
    return this._modal;
  }

  set createModal(value: boolean) {
    this._createModal = value;
  }

  get createModal() {
    return this._createModal;
  }

  set routineInput(value: boolean) {
    this._routineInput = value;
  }

  get routineInput() {
    return this._routineInput
  }
}
