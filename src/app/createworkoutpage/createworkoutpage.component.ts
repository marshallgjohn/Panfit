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
import {Router} from '@angular/router'
import { NotificationService } from '../services/notification.service';
import { Notification } from '../model/notification';


@Component({
  selector: 'app-createworkoutpage',
  templateUrl: './createworkoutpage.component.html',
  styleUrls: ['./createworkoutpage.component.sass']
})

//TODO: add delete button for workouts/routines
//TODO: add exercise to list when new created
//TODO: when done/add exercise need to refresh or add to list
export class CreateworkoutpageComponent implements OnInit {


  //Variables for various parts of the screen to be hidden or shown
  private _exerciseListModalShown: boolean = false;
  private _createExerciseModalShown: boolean = false;
  private _routineNameSelectShown: boolean = true;
  private _workoutNameSelectShown: boolean = false;
  private _routineSelectShown: boolean = true;
  private _dayNameSelectShown: boolean = false;
  private _newWorkoutNameInputShown: boolean = false;

  private _addExerciseButtonShown: boolean = false;

  private _currentWorkoutExists: boolean = false;




  private _routineCurrentExercises: RoutineExercise[] = []
  private _routineTempExercises: RoutineExercise[]
  private _routineModalList: RoutineExercise[]
  private _routineDeletedList: RoutineExercise[] = []

  private _exercises: Exercise[] = []
  private _exerciseList: Exercise[]

  private _currentWorkout: Workout;

  private _routineList: Workout[];
  private _selectedValue: any;
  private _muscleList: Muscle[] = [];
  private _equipmentList: Equipment[] = []
  private _routineDotw: Day[] = [];

  private _submitButtonText: string = "SUBMIT"

  private _selectedWorkout: Workout;
  private _workoutDeletedList: Workout[];
  private _tempExercises: Exercise[] = [];


  routineNameSelectControl: FormControl = new FormControl()
  workoutNameSelectControl: FormControl = new FormControl()
  dayNameSelectControl: FormControl = new FormControl()

  constructor(private apiService: ApiService,private notif: NotificationService) { 
  }

  ngOnInit(): void {

    this.getAllApiData()

    //Adds all DOTW to dayNameSelectControl
    this.resetDotwList()

    

  }

  addExerciseToCurrentExercises(name: Exercise): void {
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

    this.exerciseList = this.removeItemFromExerciseList(this.exerciseList,name);
}

  //Converts rest time from database to minutes as is stored in seconds
  convertToMinute(num: number) {


    return ~~(num/60);
  }

  //Deletes exercise from a workout
  deleteItemFromWorkout(exercise): void {
    //If the exercise is not in the database dont send it to be deleted
    if(exercise.id !== null) {
      this.routineDeletedList.push(exercise)
    }
    //Adds exercise back to exercise masterlist and removes it from workout
    this.exerciseList.push(exercise.exercise)
    this.routineCurrentExercises = this.routineCurrentExercises.filter(data => data.exercise.id != exercise.exercise.id)

  }

  getAllApiData(): void {
    
    this.apiService.getAll("current").subscribe(data => {
      this._currentWorkoutExists = (data === null) ? true: false;
    })

    this.apiService.getAll("exercises").subscribe(data => {
      this.exerciseList = data;
    })
    this.apiService.getAll("workouts").subscribe(data => {
      this.routineList = data;
    })

    this.apiService.getAll("muscles").subscribe(data => {
      this.muscleList = data;
    })

    this.apiService.getAll("equipment").subscribe(data => {
      this.equipmentList = data;
    })

    this.apiService.getAll("routineexercises").subscribe(data => {
      this.routineModalList = data;
    })

    this.apiService.getAll("users").subscribe(data => {
      this.currentWorkout = data.workout
    })

  }

  //When user selects new workout/new routine if they type nothing then click out
  //it resets back to the dropdown list so they can choose something instead of
  //creating new workout
  onBlur(input,id) {
    if((<HTMLInputElement>document.getElementById(id)).value !== "") return

    switch(input) {
      case "routineInput":
        //Shows routine name select and resets it value
        this.routineNameSelect = true;
        this.routineNameSelectControl.reset()

        this.workoutNameSelect = false
        this.newWorkoutNameInput = false
        this.dayNameSelect = false
        this.addExerciseButton = false
      
        
        break;
      case "newWorkoutInput":
          if(!this.routineNameSelect) return
            this.newWorkoutNameInput = false;
            this.workoutNameSelect = true;
            this.workoutNameSelectControl.reset()
          
          break;
    }
  }

  onRoutineSelect(name): void {
    //Clears all lists
    this.exercises = [];
    this.tempExercises = []
    this.routineDeletedList = []
    this.routineCurrentExercises = []

    //Sets selected workout to what was selected by user
    this.selectedWorkout = this.routineNameSelectControl.value;


    //Pushes the temp exercises back to the master exercise list
    this.tempExercises.forEach(data => this.exerciseList.push(data))

    //Shows workout select and hides day name select
    this.workoutNameSelect = true;
    this.dayNameSelect = false

    //this.routineNameSelectControl.

    //Hides diddferent parts 
    if(name == "New") {
      this.routineCurrentExercises = []

      this.routineNameSelect = false;
      this.workoutNameSelect = false;

      this.newWorkoutNameInput = true

      this.addExerciseButton = true
      this.submitButtonText = "CREATE"
      this.dayNameSelect = true
      
      
    } else {
      this.submitButtonText = "UPDATE"
      this.routineNameSelect = true;
      this.newWorkoutNameInput = false
    }
  } 

  onWorkoutSelect() {
    


    //Pushs any removed modal exercies back to exercise list modal
    this.tempExercises.forEach(data => this.exerciseList.push(data))

    //Clears lists
    this.tempExercises = []
    this.routineDeletedList = []

    //Shows correct UI
    this.addExerciseButton = true
    this.dayNameSelect = true

    //console.log(this.workoutNameControl.value)
    if(this.workoutNameSelectControl.value == "New") {
      this._dayNameSelectShown = true;
      this._workoutNameSelectShown = false;
      this.newWorkoutNameInput = true;

      //Clears list of any exercises already in select exercise list
      this.routineCurrentExercises = [] 


      this.submitButtonText = "CREATE"

    } else {


      this.submitButtonText = "UPDATE"

      this._workoutNameSelectShown = true;

      //Gets exercises in workout and shows them on screen
      this.routineCurrentExercises = this.routineModalList.filter(re => re.routine.id == this.workoutNameSelectControl.value.id)

      //For each current exercise it pushes it to a temporary list so that it can be added back to the master list once the workout/routine is changed
      this.routineCurrentExercises
        .forEach(data => { 
            this.exerciseList
              .filter(re => re.id == data.exercise.id)
                .forEach(d => {
                  if(!this.tempExercises.includes(d)) {
                    this.tempExercises.push(d)
                  }
                })

        //Then filters out all current exercises from the exercise list so you cannot have more than one of the same exercise
          this.exerciseList = this.exerciseList.filter(re => re.id != data.exercise.id)
        })
      }
    

      this.resetDotwList()

          
      //Removes days of other workouts that already exist so two workouts are never on same day
      this.selectedWorkout.routine
        .forEach(data => {
          this.routineDotw = this.routineDotw.filter(re => re.num != data.routineDay || this.workoutNameSelectControl.value.routineDay == re.num)
      })

        //Sets value of dayNameSelectControl to DOTW that workout is on
      this.dayNameSelectControl.patchValue(this.workoutNameSelectControl.value.routineDay)
        


  }

  postAll(): void {
    //console.log(this.routineControl.value)
    if(this.routineNameSelectControl.value === "New") {
    this.apiService.getAll("users").subscribe(data => {
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
            
            if(this._currentWorkoutExists) {
              this.apiService.post("/current",new CurrentWorkout(null,data,f.body)).subscribe(current => {
                this.currentWorkout = current;
                if(current.status === 400) {
                  this.notif.changeNotification(new Notification("Failed to updated current routine! Please create another routine",false))
                }
              });
            }
            

            this.apiService.post("/routines", 
            new Routine(
              null,
              this.dayNameSelectControl.value,
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
                this.apiService.post("/routineexercises",JSON.stringify(postExercises)).subscribe(d => {
                  //console.log(f)
                  f.body.routine = rout.body


                
                  this.routineList.push(f.body)

                  if(f.status === 200 && rout.status === 200) {
                    this.notif.changeNotification(new Notification("New routine created successfully!",true))
                  }
                });
                
              });
            
              
          });
         
    });
    } else {

      this.apiService.post("/routines", 
      new Routine(
        this.workoutNameSelectControl.value.id,
        this.dayNameSelectControl.value,
        (!this.workoutNameSelectShown) ? (document.getElementById("name") as HTMLInputElement).value : this.workoutNameSelectControl.value.routineName,
        this.routineNameSelectControl.value
        )
        ).subscribe(rout => {
          console.log(rout)
          if(rout.status === 400) {
            this.notif.changeNotification(new Notification("Data was malformed. Please look over you data and submit again!",false))
          }
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
          this.apiService.post("/routineexercises",JSON.stringify(postExercises)).subscribe(xy=> {
            if(xy.status === 400) {
              this.notif.changeNotification(new Notification("Data was malformed. Please look over you data and submit again!",false))
            }

            //Adds any new workouts to list and makes sure it is not already in the list if just updating routine
            if(this.selectedWorkout.routine.findIndex(i => i.id === rout.body.id) === -1) {
              this.selectedWorkout.routine.push(rout.body)
            }
            
            
            xy.body.forEach(element => {
              this.routineModalList = this.routineModalList.filter(x => x.id !== element.id)
              this.routineModalList.push(element)
            });
         
            
            if(rout.status === 200 && xy.status === 200) {
              this.notif.changeNotification(new Notification("Update was a success!",true))
            }
          });
          
        });
    }
    //Deletes any exercises that were deleted by user
    this.apiService.delete("routineexercises",this.routineDeletedList).subscribe()
    //this.ngOnInit();
  }

  //Posts new exercise to database and adds it to exercise master list
  postExercise(): void {
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
    ))).subscribe(data => {
      //if data was submitted successfully tells user
      if(data.status === 200) {
        this.notif.changeNotification(new Notification("Exercise was created successfully!",true))
        this.exerciseList.push(data.body)
      } else {
        this.notif.changeNotification(new Notification("Exercise could not be created, please try again!",false))
      }
      

    });
  }

  //Adds all DOTW values to dotw list so days can be refiltered thru for each routine
  resetDotwList() {
    this.routineDotw = [new Day(0),new Day(1),new Day(2),new Day(3),new Day(4),new Day(5),new Day(6)]
  }

  //Removes item from master exercise list
  removeItemFromExerciseList(arr, value) {
      var pos = arr.map(function(e) {return e.id;})
      var index = pos.indexOf(value.id);
    

    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  showExerciseCreateModal(): void {
    this.createExerciseModalShown = !this.createExerciseModalShown;
  }

  showExerciseListModal(): void {
      this.exerciseListModalShown = !this.exerciseListModalShown;
  }



  set routineTempExercises(value: RoutineExercise[]) {
    this._routineTempExercises = value;
  }

  get routineTempExercises() {
    return this._routineTempExercises;
  }

  set routineModalList(value: RoutineExercise[]) {
    this._routineModalList = value;
  }

  get routineModalList() {
    return this._routineModalList;
  }

  set exerciseList(value: Exercise[]) {
    this._exerciseList = value;
  }

  get exerciseList() {
    return this._exerciseList;
  }


  set exerciseListModalShown(value: boolean) {
    this._exerciseListModalShown = value;
  }

  get exerciseListModalShown() {
    return this._exerciseListModalShown;
  }

  set createExerciseModalShown(value: boolean) {
    this._createExerciseModalShown = value;
  }

  get createExerciseModalShown() {
    return this._createExerciseModalShown;
  }

  set routineNameSelect(value: boolean) {
    this._routineNameSelectShown = value;
  }

  get routineNameSelect() {
    return this._routineNameSelectShown
  }

  set workoutNameSelect(value: boolean) {
    this._workoutNameSelectShown = value;
  }

  get workoutNameSelect() {
    return this._workoutNameSelectShown
  }

      /**
     * Getter dayInput
     * @return {boolean }
     */
	public get dayNameSelect(): boolean  {
		return this._dayNameSelectShown;
	}

    /**
     * Setter dayInput
     * @param {boolean } value
     */
	public set dayNameSelect(value: boolean ) {
		this._dayNameSelectShown = value;
  }
  

    /**
     * Getter newWorkoutInput
     * @return {boolean }
     */
	public get newWorkoutNameInput(): boolean  {
		return this._newWorkoutNameInputShown;
	}

    /**
     * Setter newWorkoutInput
     * @param {boolean } value
     */
	public set newWorkoutNameInput(value: boolean ) {
		this._newWorkoutNameInputShown = value;
	}


    /**
     * Getter routineSelect
     * @return {boolean }
     */
	public get routineSelect(): boolean  {
		return this._routineSelectShown;
	}

    /**
     * Setter routineSelect
     * @param {boolean } value
     */
	public set routineSelect(value: boolean ) {
		this._routineSelectShown = value;
  }
  

    /**
     * Getter addExerciseButton
     * @return {boolean }
     */
	public get addExerciseButton(): boolean  {
		return this._addExerciseButtonShown;
	}

    /**
     * Setter addExerciseButton
     * @param {boolean } value
     */
	public set addExerciseButton(value: boolean ) {
		this._addExerciseButtonShown = value;
	}



    /**
     * Getter tempExercises
     * @return {Exercise[] }
     */
	public get tempExercises(): Exercise[]  {
		return this._tempExercises;
	}

    /**
     * Setter tempExercises
     * @param {Exercise[] } value
     */
	public set tempExercises(value: Exercise[] ) {
		this._tempExercises = value;
	}
  

    /**
     * Getter workoutDeletedList
     * @return {Workout[]}
     */
	public get workoutDeletedList(): Workout[] {
		return this._workoutDeletedList;
	}

    /**
     * Setter workoutDeletedList
     * @param {Workout[]} value
     */
	public set workoutDeletedList(value: Workout[]) {
		this._workoutDeletedList = value;
	}


    /**
     * Getter selectedWorkout
     * @return {Workout}
     */
	public get selectedWorkout(): Workout {
		return this._selectedWorkout;
	}

    /**
     * Setter selectedWorkout
     * @param {Workout} value
     */
	public set selectedWorkout(value: Workout) {
		this._selectedWorkout = value;
	}
  

    /**
     * Getter submitButtonText
     * @return {string }
     */
	public get submitButtonText(): string  {
		return this._submitButtonText;
	}

    /**
     * Setter submitButtonText
     * @param {string } value
     */
	public set submitButtonText(value: string ) {
		this._submitButtonText = value;
	}


    /**
     * Getter routineDotw
     * @return {Day[] }
     */
	public get routineDotw(): Day[]  {
		return this._routineDotw;
	}

    /**
     * Setter routineDotw
     * @param {Day[] } value
     */
	public set routineDotw(value: Day[] ) {
		this._routineDotw = value;
	}


    /**
     * Getter equipmentList
     * @return {Equipment[] }
     */
	public get equipmentList(): Equipment[]  {
		return this._equipmentList;
	}

    /**
     * Setter equipmentList
     * @param {Equipment[] } value
     */
	public set equipmentList(value: Equipment[] ) {
		this._equipmentList = value;
	}


    /**
     * Getter muscleList
     * @return {Muscle[] }
     */
	public get muscleList(): Muscle[]  {
		return this._muscleList;
	}

    /**
     * Setter muscleList
     * @param {Muscle[] } value
     */
	public set muscleList(value: Muscle[] ) {
		this._muscleList = value;
	}


    /**
     * Getter selectedValue
     * @return {any}
     */
	public get selectedValue(): any {
		return this._selectedValue;
	}

    /**
     * Setter selectedValue
     * @param {any} value
     */
	public set selectedValue(value: any) {
		this._selectedValue = value;
	}

    /**
     * Getter routineList
     * @return {Workout[]}
     */
	public get routineList(): Workout[] {
		return this._routineList;
	}

    /**
     * Setter routineList
     * @param {Workout[]} value
     */
	public set routineList(value: Workout[]) {
		this._routineList = value;
	}


    /**
     * Getter currentWorkout
     * @return {Workout}
     */
	public get currentWorkout(): Workout {
		return this._currentWorkout;
	}

    /**
     * Setter currentWorkout
     * @param {Workout} value
     */
	public set currentWorkout(value: Workout) {
		this._currentWorkout = value;
	}


    /**
     * Getter exercises
     * @return {Exercise[] }
     */
	public get exercises(): Exercise[]  {
		return this._exercises;
	}

    /**
     * Setter exercises
     * @param {Exercise[] } value
     */
	public set exercises(value: Exercise[] ) {
		this._exercises = value;
	}


    /**
     * Getter routineDeletedList
     * @return {RoutineExercise[] }
     */
	public get routineDeletedList(): RoutineExercise[]  {
		return this._routineDeletedList;
	}

    /**
     * Setter routineDeletedList
     * @param {RoutineExercise[] } value
     */
	public set routineDeletedList(value: RoutineExercise[] ) {
		this._routineDeletedList = value;
	}


    /**
     * Getter routineCurrentExercises
     * @return {RoutineExercise[] }
     */
	public get routineCurrentExercises(): RoutineExercise[]  {
		return this._routineCurrentExercises;
	}

    /**
     * Setter routineCurrentExercises
     * @param {RoutineExercise[] } value
     */
	public set routineCurrentExercises(value: RoutineExercise[] ) {
		this._routineCurrentExercises = value;
	}


    /**
     * Getter currentWorkoutExists
     * @return {boolean }
     */
	public get currentWorkoutExists(): boolean  {
		return this._currentWorkoutExists;
	}

    /**
     * Setter currentWorkoutExists
     * @param {boolean } value
     */
	public set currentWorkoutExists(value: boolean ) {
		this._currentWorkoutExists = value;
	}


    /**
     * Getter addExerciseButtonShown
     * @return {boolean }
     */
	public get addExerciseButtonShown(): boolean  {
		return this._addExerciseButtonShown;
	}

    /**
     * Setter addExerciseButtonShown
     * @param {boolean } value
     */
	public set addExerciseButtonShown(value: boolean ) {
		this._addExerciseButtonShown = value;
	}


    /**
     * Getter newWorkoutNameInputShown
     * @return {boolean }
     */
	public get newWorkoutNameInputShown(): boolean  {
		return this._newWorkoutNameInputShown;
	}

    /**
     * Setter newWorkoutNameInputShown
     * @param {boolean } value
     */
	public set newWorkoutNameInputShown(value: boolean ) {
		this._newWorkoutNameInputShown = value;
	}


    /**
     * Getter dayNameSelectShown
     * @return {boolean }
     */
	public get dayNameSelectShown(): boolean  {
		return this._dayNameSelectShown;
	}

    /**
     * Setter dayNameSelectShown
     * @param {boolean } value
     */
	public set dayNameSelectShown(value: boolean ) {
		this._dayNameSelectShown = value;
	}


    /**
     * Getter routineSelectShown
     * @return {boolean }
     */
	public get routineSelectShown(): boolean  {
		return this._routineSelectShown;
	}

    /**
     * Setter routineSelectShown
     * @param {boolean } value
     */
	public set routineSelectShown(value: boolean ) {
		this._routineSelectShown = value;
	}


    /**
     * Getter workoutNameSelectShown
     * @return {boolean }
     */
	public get workoutNameSelectShown(): boolean  {
		return this._workoutNameSelectShown;
	}

    /**
     * Setter workoutNameSelectShown
     * @param {boolean } value
     */
	public set workoutNameSelectShown(value: boolean ) {
		this._workoutNameSelectShown = value;
	}


    /**
     * Getter routineNameSelectShown
     * @return {boolean }
     */
	public get routineNameSelectShown(): boolean  {
		return this._routineNameSelectShown;
	}

    /**
     * Setter routineNameSelectShown
     * @param {boolean } value
     */
	public set routineNameSelectShown(value: boolean ) {
		this._routineNameSelectShown = value;
	}



}
