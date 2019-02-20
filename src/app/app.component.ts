import {Component} from '@angular/core';
import {times} from 'lodash';
import {BehaviorSubject} from 'rxjs';

interface IItem {
    title: string;
    src: string;
    blur: string;
}

const ITEMS_COUNT = 10000;

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    itemsStream$: BehaviorSubject<Array<IItem>> = new BehaviorSubject<Array<IItem>>(this.generateItems());
    scrolledIndex = 0;

    generateItems(): Array<IItem> {
        return times(ITEMS_COUNT, Number).map(i => ({
            title: `Image #${i}`,
            src: `http://lorempixel.com/200/200/`,
            blur: `https://picsum.photos/200/200?blur`
        }))
    }

    scrolledIndexChange(i): void {
        this.scrolledIndex = i;
    }

    titleTrackFn = (_: number, item: IItem) => item.title;
}
