import { RoutineExercise } from './routineExercise';
import {Sets} from './sets'
import {Sessions} from './sessions';

export class RoutineEntry {
    constructor(
        public id: number,
        public entry_date: Date,
        public routineExercise: RoutineExercise,
        public set: Sets[],
        public sessions: Sessions,
        public numOfSets: number,
        public totalWeightLifted: number,
        public workoutLength: number
    ) {

        
    }
}