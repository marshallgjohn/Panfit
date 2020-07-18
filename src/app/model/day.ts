export class Day {
    private _name: string

    constructor(
        public num: number,
        
    ) {
        this._name = this.dotw(num);
    }

    get name() {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
    
    private dotw(day: number): string {
        return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][day];
    }
    
}