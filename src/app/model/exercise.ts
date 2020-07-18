import {Muscle} from './muscle';
import {Equipment} from './equipment'

export class Exercise {
    constructor(
        public id: number,
        public muscle: Muscle,
        public equipment: Equipment,
        public exerciseName: string,
    ) {

    }
}