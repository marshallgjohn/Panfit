import {User} from './user';
import {Workout} from './workout';
export class CurrentWorkout {
    public constructor(
        public id: number,
        public user: User,
        public workout: Workout
        ) {};
}