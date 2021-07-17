import { EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Listable } from './listable';
import { AbstractDataService } from './abstract-data-service';

export abstract class AbstractDataServiceFromSeed<T extends Listable> extends AbstractDataService<T>{  
}