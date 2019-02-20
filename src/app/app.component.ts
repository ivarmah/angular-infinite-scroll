import {Component} from '@angular/core';
import {times, chunk} from 'lodash';
import {BehaviorSubject, Observable, ReplaySubject, Subject, Subscription} from 'rxjs';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';

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
    dataSource = new ItemDataSource();
    scrolledIndex = 0;

    scrolledIndexChange(i) {
        this.scrolledIndex = i;
    }

    titleTrackFn = (_: number, item: IItem) => item.title;
}


class ItemDataSource extends DataSource<IItem> {
    private PAGE_SIZE = 20;
    private fetchedPages = new Set<number>();
    private cachedData = this.generateItems();
    private dataStream = new BehaviorSubject<Array<IItem>>(times(1000));
    private subscription = new Subscription();

    connect(collectionViewer: CollectionViewer): Observable<Array<IItem>> {
        this.subscription.add(collectionViewer.viewChange.subscribe(range => {
            console.log(range);
            const startPage = this.getPageForIndex(range.start);
            const endPage = this.getPageForIndex(range.end);
            for (let i = startPage; i <= endPage; i++) {
                this.fetchPage(i);
            }
        }));

        return this.dataStream;
    }

    disconnect(): void {
        this.subscription.unsubscribe();
    }

    private getPageForIndex(index: number): number {
        return Math.floor(index / this.PAGE_SIZE);
    }

    private fetchPage(page: number) {
        if (this.fetchedPages.has(page)) {
            return;
        }
        this.fetchedPages.add(page);

        const chunked = chunk(this.cachedData, this.PAGE_SIZE);
        console.log('chunked size', chunked.length);
        const pageItems = chunked[page];
        console.log('pageItems size', pageItems);

        this.dataStream.next(pageItems);
    }

    private generateItems(): Array<IItem> {
        return times(ITEMS_COUNT, Number).map(i => ({
            title: `Image #${i}`,
            src: `http://lorempixel.com/200/200/`,
            blur: `https://picsum.photos/200/200?blur`
        }))
    }
}