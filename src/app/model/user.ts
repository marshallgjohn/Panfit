import {Routine} from './routine';
import {Workout} from './workout';
import { Credentials } from './credentials';
export class User {
    constructor(
        public id: number,
        public userCredentials: Credentials,
        public role: string,
        public token: string
    ) {

    }
}