export class Quizes{
    constructor(public id: number, 
        public question: String, 
        public choice1: String, 
        public choice2: String, 
        public choice3: String, 
        public choice4: String, 
        public answer:String,
        public selectedId?: number,
        public result?:boolean){}
}