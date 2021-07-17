import { Listable } from '../listable/listable';

export class Resource extends Listable {
    constructor(
        public id: string,
        public title: string,
        public product: string,
        public keywords: string[],
        public dateOf: string, 
      ) { super(id) };
}