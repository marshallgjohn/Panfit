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
//TODO: add exercise to list when new created
//TODO: when done/add exercise need to refresh or add to list
export class CreateworkoutpageComponent implements OnInit {

  private _modal: boolean = false;


  private _createModal: boolean = false;
  private _routineInput: boolean = false;
  private _workoutInput: boolean = false;
  private _newWorkoutInput: boolean = true;
  private _dayInput: boolean = false;

  private _routineSelect: boolean = true;

  private _workoutTitle: boolean = false;

  private _addExerciseButton: boolean = false;


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

    this.apiService.getAll("users").subscribe(data => {
      this.currentWorkout = data.workout
    })


    this.workoutForm = new FormGroup({
      routineControl: new FormControl(),
      workoutNameControl: new FormControl(),
      dayControl: new FormControl()
    });

    for(let i = 0; i < 7; i++) {
      this.routineDotw.push(new Day(i));
    }

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
          null,
          name,
          null))

      this.exerciseList = this.removeItemOnceD(this.exerciseList,name);
      //console.log("Clicked");
  }

  onOptionSelect(name): void {
    this.routineCurrentExercises.forEach(data => console.log(data))
    this.routineCurrentExercises = []

    
    this.workoutNameControl.setValue("hidden")
    this.dayControl.setValue("hidden")

    this.selectedWorkout = this.routineControl.value;

    this.routineDeletedList = []

    this.exercises = [];
    this.tempExercises.forEach(data => this.exerciseList.push(data))
    this.tempExercises = []
    this.workoutTitle = true;

    if(name == "New") {
      this.routineInput = true;
      this.workoutInput = true;
      this.newWorkoutInput = false
      this.routineCurrentExercises = []
      this.routineSelect = false
      this.dayInput = true
      this.addExerciseButton = true
      
      
    } else {
      this.routineInput = false;
      this.dayInput = true;
      this.newWorkoutInput = true
    }
    
     
  } 


onWorkoutSelect() {
  this.workoutForm.reset()
  this.tempExercises.forEach(data => this.exerciseList.push(data))
  this.tempExercises = []
  this.routineDeletedList = []
  this.workoutTitle = true
  this.addExerciseButton = true

  console.log(this.workoutNameControl.value)
  if(this.workoutNameControl.value == "New") {
    this._dayInput = true;
    this._workoutInput = true;
    this.routineCurrentExercises = [] 
    this.newWorkoutInput = false;
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

      this.routineDotw = []
      for(let i = 0; i < 7; i++) {
        this.routineDotw.push(new Day(i));
      }
      console.log(this.selectedWorkout)
    this.selectedWorkout.routine.forEach(data => {
      console.log(data.routineDay)
      this.routineDotw = this.routineDotw.filter(re => re.num != data.routineDay || this.workoutNameControl.value.routineDay == re.num)
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
    console.log(exercise)
    if(exercise.id !== null) {
      this.routineDeletedList.push(exercise)
    }
    
    this.exerciseList.push(exercise.exercise)
    this.routineCurrentExercises = this.routineCurrentExercises.filter(data => data.exercise.id != exercise.exercise.id)

  }


  postAll(): void {
    console.log(this.routineControl.value)
    if(this.routineControl.value == "New") {
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
            //console.log(f)
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

                this.routineCurrentExercises.forEach(data => {
                  //onsole.log(rout);
                  console.log(data)
                  let x = new RoutineExercise(
                    null,
                    Number((document.getElementById(data.exercise.id + "-weight") as HTMLInputElement).value),
                    Number((document.getElementById(data.exercise.id + "-max-reps") as HTMLInputElement).value),
                    Number((document.getElementById(data.exercise.id + "-min-reps") as HTMLInputElement).value),
                    Number((document.getElementById(data.exercise.id + "-minutes") as HTMLInputElement).value) * Number((document.getElementById(data.exercise.id + "-seconds") as HTMLInputElement).value),
                    Number((document.getElementById(data.exercise.id + "-sets") as HTMLInputElement).value),
                    this.routineCurrentExercises.indexOf(this.routineCurrentExercises.filter(f => f.exercise == data.exercise)[0]),
                    data.exercise,
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
              /*weight*/(data.id != null) ? Number((document.getElementById(data.id + "-weight") as HTMLInputElement).value) : Number((document.getElementById(data.exercise.id+"-weight") as HTMLInputElement).value) ,
              /*Max reps*/(data.id != null) ? Number((document.getElementById(data.id + "-max-reps") as HTMLInputElement).value): Number((document.getElementById(data.exercise.id+"-max-reps") as HTMLInputElement).value),
              /*Min Reps*/(data.id != null) ? Number((document.getElementById(data.id + "-min-reps") as HTMLInputElement).value) : Number((document.getElementById(data.exercise.id+"-min-reps") as HTMLInputElement).value),
              /*Rest time*/(data.id != null) ? (Number((document.getElementById(data.id + "-minutes") as HTMLInputElement).value) * 60) + Number((document.getElementById(data.id + "-seconds") as HTMLInputElement).value) :
              (Number((document.getElementById(data.exercise.id+"-minutes") as HTMLInputElement).value) * 60) + Number((document.getElementById(data.exercise.id+"-seconds") as HTMLInputElement).value),
              /*sets*/(data.id != null) ? Number((document.getElementById(data.id + "-sets") as HTMLInputElement).value): Number((document.getElementById(data.exercise.id+"-sets") as HTMLInputElement).value),
              this.routineCurrentExercises.indexOf(this.routineCurrentExercises.filter(f => f.exercise == data.exercise)[0]),
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
    //this.ngOnInit();
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



  onBlur(input,id) {
    console.log((<HTMLInputElement>document.getElementById(id)).value === "")
    if((<HTMLInputElement>document.getElementById(id)).value === "") {
      switch(input) {
        case "routineInput":
          this.routineInput = false;
          this.routineSelect = true;
          this.workoutInput = false
          this.dayInput = false
          this.workoutTitle = false
          this.routineControl.reset()
          break;
        case "newWorkoutInput":
          if(!this.routineInput) {
          this.newWorkoutInput = true;
          this.workoutInput = false;
          }
          break;
      }
    }

    console.log(this.routineInput)
  }

  onFocus() {
    
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


    /**
     * Getter routineSelect
     * @return {boolean }
     */
	public get routineSelect(): boolean  {
		return this._routineSelect;
	}

    /**
     * Setter routineSelect
     * @param {boolean } value
     */
	public set routineSelect(value: boolean ) {
		this._routineSelect = value;
  }
  

    /**
     * Getter workoutTitle
     * @return {boolean }
     */
	public get workoutTitle(): boolean  {
		return this._workoutTitle;
	}

    /**
     * Setter workoutTitle
     * @param {boolean } value
     */
	public set workoutTitle(value: boolean ) {
		this._workoutTitle = value;
  }
  

    /**
     * Getter addExerciseButton
     * @return {boolean }
     */
	public get addExerciseButton(): boolean  {
		return this._addExerciseButton;
	}

    /**
     * Setter addExerciseButton
     * @param {boolean } value
     */
	public set addExerciseButton(value: boolean ) {
		this._addExerciseButton = value;
	}




}
