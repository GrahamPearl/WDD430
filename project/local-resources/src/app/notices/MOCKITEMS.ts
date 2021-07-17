import { Notice } from './notice.model';

export const MOCKITEMS: Notice[] = [
  // index 0
  {
    id: '1',
    title: 'Notice#1',
    message: 'It works!',
    type: 'bg-danger',
    dateOf: '2021/07/16',    
    sender: null
  },
  // index 1
  {
    id: '2',
    title: 'Notice#2',
    message: 'It works!',
    type: 'bg-warning',
    dateOf: '2021/07/17',    
    sender: null
  },
  // index 2
  {
    id: '3',
    title: 'Notice#3',
    message: 'It works!',
    type: 'bg-dark',
    dateOf: '2021/07/17',    
    sender: null
  }  
];
