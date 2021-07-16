import { Listable } from '../listable/listable';

export class Notice extends Listable {
    constructor(
        public id: string,
        public title: string,
        public message: string,
        public type: string,
        public dateOf: string,    
      ) { super(id) };
}
