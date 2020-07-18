import {User} from "./user";
import {Routine} from "./routine";

export class Workout {
    constructor(
        public id: number,
        public workout: number,
        public workoutName: string,
        public user: User,
        public routine: Routine[]
    ) {

    }
}