import {Exercise} from './exercise';
import {Routine} from './routine';


export class RoutineExercise {
    constructor(
        public id: number,
        public routine_goal_reps_max: number,
        public routine_goal_reps_min: number,
        public routine_rest: number,
        public routine_sets: number,
        public exercise: Exercise,
        public routine: Routine
    ) {

    }
}