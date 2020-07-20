import { RoutineExercise } from './routineExercise';
import { RoutineEntry } from './routineEntry';

export class Sets {
    constructor(
        public id: string,
        public routineEntries: RoutineEntry,
        public routineExercise: RoutineExercise,
        public setNumber: number,
        public setReps: number,
        public setWeight: number,
        public setPrevWeight: number
    ) {

    }
}