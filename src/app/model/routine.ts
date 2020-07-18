
import {Workout} from './workout';
export class Routine {
    constructor(
        public id: number,
        public routineDay: number,
        public routineName: string,
        public workout: Workout,
    ) {

    }
}