import { Pipe, PipeTransform } from '@angular/core';
import { Video } from './video.model';

@Pipe({
  name: 'VideoFilterPipe'
})
export class VideoFilterPipe implements PipeTransform {

  transform(items: Video[], term: string): any {

    let filteredItems : Video[] = [];

    if (term && term.length > 0) {
      filteredItems = items.filter(         
         (item:Video) => item.name.toLowerCase().includes(term.toLowerCase())
      );
   }

   if (filteredItems.length < 1){
      return items;
   }

    return filteredItems;
  }

}
