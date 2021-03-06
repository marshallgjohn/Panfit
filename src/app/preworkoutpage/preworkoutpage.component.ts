import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import { User } from '../model/user';
import { Workout } from '../model/workout';
import {Routine} from '../model/routine';
import {RoutineEntry} from '../model/routineEntry';
import {DataSet} from '../model/dataset';
import { AppRoutingModule } from '../app-routing.module';
import {DataService} from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import {CurrentWorkout} from '../model/currentWorkout';
import * as CanvasJS from '../../assets/js/canvasjs.min'
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../model/notification';
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

  private _graphData: any[] = [];
  private _dataSets: DataSet[] = [];
  private _routines: String[];
  private _modal: boolean = false;


  private _workoutList: Workout[];

  private chart: any;

  workout: Workout;
  dotw: String[];

  
  entries: RoutineEntry[];
  lastEntry: RoutineEntry;
  test: String;
  currentWorkout: CurrentWorkout;
  currentRoutine: Routine;
  todayDate: String;

  avgWeight: number;
  

  optionSelect: FormControl;




  constructor(private apiService: ApiService, private data: DataService, private router: Router, private notif: NotificationService) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.createChart();
  }, 100)


  
  this.apiService.getAll("workouts").subscribe((data: Workout[]) => {
    if(data.length==0) {
      this.router.navigateByUrl('/create-workout');
    } else {
    this.workoutList = data
    }

    console.log(this.workoutList)
 });
    let dp = []
      this.data.currentRoutine.subscribe(r => this.currentRoutine = r);
      this.apiService.getAll("current").subscribe(r => this.currentWorkout = r);
      //this.optionSelect.patchValue((this.currentWorkout !== undefined) ? this.currentWorkout.id : "-")

      this.apiService.getAll("routines").subscribe((data: Routine[]) => {
         this.routines = this.initRoutines(data);
         //console.log(data)
         //console.log(["DAY OFF", "DAY OFF", "DAY OFF"]);
      });
      
      this.apiService.getAll("entries").subscribe(data => {
          //console.log(data)
          if(data.length > 0) {
          this.entries = data;
          this.lastEntry = data[0];
          //console.log(this.lastEntry)

          let unique = []
          data.forEach(element => {
            //console.log(element.routine)
            if (unique.indexOf(element.routine.id) === -1 ) {
              unique.push(element.routine.id)
            }
          });

          unique.forEach((element,indexy) => {
            let temp = this.entries.filter(d=> d.routine.id === element)

            this.dataSets.push(new DataSet(element,temp[0].routine.routineName,[]))
            //console.log(temp)
            this.entries.filter(d=> d.routine.id === element).forEach((x,index) => {
              console.log(x.entryDate)
              let tempDate = x.entryDate.toString().split("T")[0].split("-")

              this.dataSets[indexy].data.push({y: x.totalWeightLifted, x: new Date(Number(tempDate[0]),-1+Number(tempDate[1]),Number(tempDate[2])),markerColor: "#0F5E76"})
              

              try {
                x.netWeight = x.totalWeightLifted - temp[index+1].totalWeightLifted
              } catch(error) {
              }
            })
            this.dataSets[indexy].data = this.dataSets[indexy].data.reverse()
            //console.log(this.dataSets[indexy].data)
          })
        } else {
          this.entries = []
          this.lastEntry = new RoutineEntry(null,null,null,null,null,null,null)
          this.dataSets = []
        }

        });

      this.apiService.getAll("users").subscribe((data: User) => {
        this.user = data;
     });


      this.dotw = this.initDotw();
      this.todayDate = this.getFormattedDate()
      console.log(this.todayDate)


      //console.log(this.dataSets)



      

  }

  createChart() {
    this.chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      backgroundColor: " #C6FDFF",
      title: {
        text: ""
      },	
      axisX:{
        valueFormatString: "DD MMM",
        crosshair: {
          snapToDataPoint: true
        },
        labelFontSize: 14
      },
      axisY: {
        title: "Total Weight Lifted",
        includeZero: true,
        labelFontSize: 14,
        labelFontWeight: "bold",
        titleFontSize: 16,
        titleFontWeight: "bold",
        titleFontColor: "black"
      },
      data: [{
        type: "line",
        xValueFormatString: "DD MMM, YYYY",
        yValueFormatString: "# lbs",
        color: "#F08080",
        markerType: "square",
        markerSize: 12,
        dataPoints: this.graphData
    }]
    });
      
    this.chart.render();
  }

  onCompleted() {
    this.notif.changeNotification(new Notification("Workout has been completed for today!",true))
  }

  initRoutines(user) {
    let num = new Date().getDay();
    let r = ["DAY OFF","DAY OFF","DAY OFF"];
    user.forEach(element => {
      //console.log(element.routineDay)
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
      //console.log(r)
      return r;
  }

  onOptionSelect(value) {
    this.graphData = this.dataSets.filter(val => val.id === Number(value))[0].data
    //console.log(this.graphData)
    this.createChart()    


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

    const promise = new Promise((resolve,reject) => {

    });
    this.apiService.put("current",Number((<HTMLSelectElement>document.getElementById('current-select')).value)).subscribe(data => {
      document.location.reload();
    })

    
   
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

formatDBDate(date: Date): String {
  try {
  var d = date.toString().split("T")[0].split("-");
  } catch {
    return null
  }
  return d[1]+"/"+d[2]+"/"+d[0]
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



    /**
     * Getter graphData
     * @return {any[]}
     */
	public get graphData(): any[] {
		return this._graphData;
	}

    /**
     * Setter graphData
     * @param {any[]} value
     */
	public set graphData(value: any[]) {
		this._graphData = value;
	}


    /**
     * Getter dataSets
     * @return {DataSet[] }
     */
	public get dataSets(): DataSet[]  {
		return this._dataSets;
	}

    /**
     * Setter dataSets
     * @param {DataSet[] } value
     */
	public set dataSets(value: DataSet[] ) {
		this._dataSets = value;
	}
  

    /**
     * Getter workoutList
     * @return {Workout[]}
     */
	public get workoutList(): Workout[] {
		return this._workoutList;
	}

    /**
     * Setter workoutList
     * @param {Workout[]} value
     */
	public set workoutList(value: Workout[]) {
		this._workoutList = value;
	}


}
