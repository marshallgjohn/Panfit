import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
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
import { CurrentWorkout } from '../model/currentWorkout';

@Component({
  selector: 'app-createworkoutpage',
  templateUrl: './createworkoutpage.component.html',
  styleUrls: ['./createworkoutpage.component.sass']
})

//TODO: add delete button for workouts/routines

//FIXME: if first routine make it the current routine for the user
//SHould be fixed?
export class CreateworkoutpageComponent implements OnInit {

  private _modal: boolean = false;


  private _createModal: boolean = false;
  private _routineInput: boolean = true;
  private _workoutInput: boolean = false;
  private _newWorkoutInput: boolean = true;
  private _dayInput: boolean = true;

  routineCurrentExercises: RoutineExercise[] = []
  routineTempExercises: RoutineExercise[]
  routineModalList: RoutineExercise[]
  routineDeletedList: RoutineExercise[] = []

  exercises: Exercise[] = []
  exerciseList: Exercise[]

  currentWorkout: Workout;

  routineList: Workout[];
  workoutForm: FormGroup;
  selectedValue: any;
  muscleList: Muscle[] = [];
  equipmentList: Equipment[] = []
  routineDotw: Day[] = [];

  selectedWorkout: Workout;
  workoutDeletedList: Workout[];
  tempExercises: Exercise[] = [];


  routineControl: FormControl = new FormControl()
  workoutNameControl: FormControl = new FormControl()
  dayControl: FormControl = new FormControl()

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

    this.apiService.getAll("routineexercises").subscribe(data => {
      this.routineModalList = data;
    })

    this.apiService.getAll("user").subscribe(data => {
      this.currentWorkout = data.workout
    })


    this.workoutForm = new FormGroup({
      routine: new FormControl(),
    });

  }

  onClick(name: Exercise): void {
      console.log(name);
      this.routineCurrentExercises.push(
        new RoutineExercise(
          null,
          null,
          null,
          null,
          null,
          null,
          name,
          null))

      this.exerciseList = this.removeItemOnceD(this.exerciseList,name);
      //console.log("Clicked");
  }

  onOptionSelect(name): void {

    for(let i = 0; i < 7; i++) {
      this.routineDotw.push(new Day(i));
    }

    this.selectedWorkout = this.routineControl.value;

    this.exercises = [];
    this.tempExercises.forEach(data => this.exerciseList.push(data))
    this.tempExercises = []
    if(name == "New") {
      this.routineInput = true;
      this.workoutInput = true;
      this.newWorkoutInput = false
      this.routineCurrentExercises = [] 
    } else {
      this.routineInput = false;
      this.newWorkoutInput = true
      //console.log(this.routineControl.value.routine)
/*       this.routineControl.value.routine.forEach(data => {
        //console.log(data.routineDay);
        dArr = this.removeItemOnce(dArr,data.routineDay);
      }); */
    }
    
     
  } 


onWorkoutSelect() {
  //this.routineTempExercises.forEach(data => this.exerciseList.push(data.exercise));
  //this.routineTempExercises = []

  this.tempExercises.forEach(data => this.exerciseList.push(data))
  this.tempExercises = []

  console.log(this.workoutNameControl.value)
  if(this.workoutNameControl.value == "New") {
    this._dayInput = true;
    this._workoutInput = true;
    this.routineCurrentExercises = [] 

  } else {
    this.dayControl.patchValue(this.workoutNameControl.value.routineDay)

    this._workoutInput = false;
    //this.routineTempExercises = this.routineCurrentExercises.filter
    this.routineCurrentExercises = this.routineModalList.filter(re => re.routine.id == this.workoutNameControl.value.id)
    
    this.routineCurrentExercises.forEach(data => { 
      this.exerciseList.filter(re => re.id == data.exercise.id).forEach(d => {
        if(!this.tempExercises.includes(d)) {
          this.tempExercises.push(d)
        }
      })
      this.exerciseList = this.exerciseList.filter(re => re.id != data.exercise.id)
      })
    }
}



  removeItemOnce(arr, value) {
    var pos = arr.map(function(e) {return e.num;})
    var index = pos.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  
  removeItemOnceD(arr, value) {
    var pos = arr.map(function(e) {return e.id;})
    var index = pos.indexOf(value.id);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  deleteElement(exercise): void {
    this.routineDeletedList.push(exercise)
    this.exerciseList.push(exercise.exercise)
    this.routineCurrentExercises = this.routineCurrentExercises.filter(data => data.id != exercise.id)

  }


  postAll(): void {
    if((this.routineControl.value == "New")) {
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
            console.log(f)
            if(this.currentWorkout == null) {
              this.apiService.post("/current",new CurrentWorkout(null,data,f.body)).subscribe(current => {
                this.currentWorkout = current;
              });
            }
            

            this.apiService.post("/routines", 
            new Routine(
              null,
              this.dayControl.value,
              (document.getElementById("name") as HTMLInputElement).value,
              f.body
              )
              ).subscribe(rout => {
                let postExercises: RoutineExercise[] = [];

                this.exercises.forEach(data => {
                  //onsole.log(rout);
                  let x = new RoutineExercise(
                    null,
                    Number((document.getElementById(data.id + "-weights") as HTMLInputElement).value),
                    Number((document.getElementById(data.id + "-max-reps") as HTMLInputElement).value),
                    Number((document.getElementById(data.id + "-min-reps") as HTMLInputElement).value),
                    Number((document.getElementById(data.id + "-minutes") as HTMLInputElement).value) * Number((document.getElementById(data.id + "-minutes") as HTMLInputElement).value),
                    Number((document.getElementById(data.id + "-sets") as HTMLInputElement).value),
                    data,
                    rout.body,
                    );
                    postExercises.push(x);
                });
                //console.log(postExercises);
                this.apiService.post("/routineexercises",JSON.stringify(postExercises)).subscribe();
              });
            
              
          });
    });
    } else {
      //console.log(this.routineDeletedList)

      this.apiService.post("/routines", 
      new Routine(
        this.workoutNameControl.value.id,
        this.dayControl.value,
        (this._workoutInput) ? (document.getElementById("name") as HTMLInputElement).value : this.workoutNameControl.value.routineName,
        this.routineControl.value
        )
        ).subscribe(rout => {
          let postExercises: RoutineExercise[] = [];

          this.routineCurrentExercises.forEach(data => {
            let x = new RoutineExercise(
              /*id*/data.id,
              /*weight*/(data.id != null) ? Number((document.getElementById(data.id + "-weight") as HTMLInputElement).value) : Number((document.getElementById("-weight") as HTMLInputElement).value) ,
              /*Max reps*/(data.id != null) ? Number((document.getElementById(data.id + "-max-reps") as HTMLInputElement).value): Number((document.getElementById("-max-reps") as HTMLInputElement).value),
              /*Min Reps*/(data.id != null) ? Number((document.getElementById(data.id + "-min-reps") as HTMLInputElement).value) : Number((document.getElementById("-min-reps") as HTMLInputElement).value),
              /*Rest time*/(data.id != null) ? (Number((document.getElementById(data.id + "-minutes") as HTMLInputElement).value) * 60) + Number((document.getElementById(data.id + "-seconds") as HTMLInputElement).value) :
              (Number((document.getElementById("-minutes") as HTMLInputElement).value) * 60) + Number((document.getElementById("-seconds") as HTMLInputElement).value),
              /*sets*/(data.id != null) ? Number((document.getElementById(data.id + "-sets") as HTMLInputElement).value): Number((document.getElementById("-sets") as HTMLInputElement).value),
              /*Exercise*/data.exercise,
              /*routine*/rout.body,

              
              
              );
              postExercises.push(x);
          });
          //console.log(postExercises);
          this.apiService.post("/routineexercises",JSON.stringify(postExercises)).subscribe();
        });
    }
    this.apiService.delete("routineexercises",this.routineDeletedList).subscribe()
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

  set workoutInput(value: boolean) {
    this._workoutInput = value;
  }

  get workoutInput() {
    return this._workoutInput
  }

      /**
     * Getter dayInput
     * @return {boolean }
     */
	public get dayInput(): boolean  {
		return this._dayInput;
	}

    /**
     * Setter dayInput
     * @param {boolean } value
     */
	public set dayInput(value: boolean ) {
		this._dayInput = value;
  }
  

    /**
     * Getter newWorkoutInput
     * @return {boolean }
     */
	public get newWorkoutInput(): boolean  {
		return this._newWorkoutInput;
	}

    /**
     * Setter newWorkoutInput
     * @param {boolean } value
     */
	public set newWorkoutInput(value: boolean ) {
		this._newWorkoutInput = value;
	}

}
