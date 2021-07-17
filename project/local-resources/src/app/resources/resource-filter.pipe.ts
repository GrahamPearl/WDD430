import { Pipe, PipeTransform } from '@angular/core';
import { Resource } from './resource.model';

@Pipe({
  name: 'ResourceFilterPipe'
})
export class ResourceFilterPipe implements PipeTransform {

  transform(items: Resource[], term: string): any {

    let filteredItems : Resource[] = [];

    if (term && term.length > 0) {
      filteredItems = items.filter(         
         (item:Resource) => item.keywords.join('|').toLowerCase().includes(term.toLowerCase())
      );
   }

   if (filteredItems.length < 1){
      return items;
   }

    return filteredItems;
  }

}
