import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ItemComponent } from './item/item.component';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ScrollingModule],
  declarations: [ AppComponent, HelloComponent, ItemComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
