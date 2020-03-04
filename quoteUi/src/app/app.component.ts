import { trigger, state, style, animate, transition } from '@angular/animations';
import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
  trigger('changeDivSize', [
    state('initial', style({
      transform: 'scale(1)'
    })),
    state('final', style({
      transform: 'scale(1.1)'
    })),
    transition('initial=>final', animate('1500ms')),
    transition('final=>initial', animate('1000ms'))
  ]),
]
})
export class AppComponent implements OnInit {
  public author: any;
  public currentState = 'initial';
  public fonts = ['helvetica', 'papyrus', 'courier new', 'blackadder'];
  public image = '';
  public imageArray: any;
  public quote: string;
  public quoteArray = [];
  public randomFont: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getQuotes();
    this.getImages();
  }

  public getRandomImageAndQuote(language) {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
    this.randomFont = this.fonts[this.getRandomNumber(this.fonts)];
    this.image = this.imageArray[this.getRandomNumber( this.imageArray)].media.m;
    this.quote = this.quoteArray[this.getRandomNumber(this.quoteArray)][language];
  }

  // TODO don't return same number twice
  private getRandomNumber(array) {
    return Math.floor(Math.random() * array.length);
  }

  private getQuotes() {
    this.http.get('/api/quotes/').subscribe((quotes: Array<object>) => {
      this.quoteArray = quotes;
    });
  }

  private getImages() {
    const photoQueryString = 'format=json&tags=inspirational,nature&jsoncallback=JSONP_CALLBACK';
    const photoUrl = `https://api.flickr.com/services/feeds/photos_public.gne?${photoQueryString}`;
    const photoRequest = this.http.jsonp(photoUrl, 'JSONP_CALLBACK');
    photoRequest.subscribe((photos: any) => {
      this.imageArray = photos.items;
    });
  }
}
