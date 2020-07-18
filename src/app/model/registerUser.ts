
import { Credentials } from './credentials';
export class User {
    constructor(
        public email: string,
        public userCredentials: Credentials
    ) {

    }
}