import { Contact } from '../contacts/contact.model';
import { Listable } from '../listable/listable';

export class Notice extends Listable {
    constructor(
        public id: string,
        public title: string,
        public message: string,
        public type: string,
        public dateOf: string, 
        public sender : Contact[] | null
      ) { super(id) };
}
