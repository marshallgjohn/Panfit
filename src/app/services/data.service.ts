import { Injectable } from '@angular/core';
import { Routine } from '../model/routine';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private routine = new BehaviorSubject(new Routine(1,1,"none",null));
  currentRoutine = this.routine.asObservable();


  constructor() { }

  changeRoutine(r: Routine) {
    this.routine.next(r);
  }
}
