import { RoutineExercise } from './routineExercise';
import {Routine} from './routine';
import {Sets} from './sets';
import {Sessions} from './sessions';

export class RoutineEntry {
    constructor(
        public id: number,
        public routine: Routine,
        public entryDate: Date,
        public entryLength: number
    ) {

        
    }
}