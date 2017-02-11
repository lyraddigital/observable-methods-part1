import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/never';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ofProperty: String = '';
  rangeProperty: String = '';
  timerProperty: String = '';
  ongoingIntervalProperty: String = '';
  limitedIntervalProperty: String = '';
  concatProperty: String = '';
  mergedProperty: String = '';
  concatMergedProperty: String = '';
  throwsProperty: String = '';
  
  ngOnInit() {
    var arrayObs = Observable.of([1,2,3,4,5], [3], [5], [10, 13, 13]);
    var rangeObs = Observable.range(5, 10);
    var timerObs = Observable.timer(3000, 2000).take(4);
    var intervalObs = Observable.interval(1000);
    var intervalObsTwo = Observable.interval(1000).take(5);
    var concatObs = Observable.concat(rangeObs, arrayObs);
    var mergedObs = Observable.merge(intervalObs, intervalObsTwo);
    var concatMergeObs = Observable.concat(timerObs, mergedObs);
    var throws = Observable.throw("This is not working"); 
    
    var showsSuccessFlowObs = Observable.create(function(observer) { 
      observer.next(1); 
      observer.next(2);
      observer.next(4);
      observer.complete();
    });
    
    var showsErrorFlowObs = Observable.create(function(observer) { 
      observer.error('This broke for some reason'); 
      observer.complete();
    });

    var neverRunsObs = Observable.never();

    arrayObs.subscribe(value => { this.ofProperty = this.appendValueToProperty(this.ofProperty, value.toString());});
    rangeObs.subscribe(value => { this.rangeProperty = this.appendValueToProperty(this.rangeProperty, value.toString());});
    timerObs.subscribe(value => { this.timerProperty = this.appendValueToProperty(this.timerProperty, value.toString());});
    intervalObs.subscribe(value => { this.ongoingIntervalProperty = this.changeValueOfProperty(this.ongoingIntervalProperty, value.toString());});
    intervalObsTwo.subscribe(value => { this.limitedIntervalProperty = this.appendValueToProperty(this.limitedIntervalProperty, value.toString());});
    concatObs.subscribe(value => { this.concatProperty = this.appendValueToProperty(this.concatProperty, value.toString());});
    mergedObs.subscribe(value => { this.mergedProperty = this.appendValueToProperty(this.mergedProperty, value.toString());});
    concatMergeObs.subscribe(value => { this.concatMergedProperty = this.appendValueToProperty(this.concatMergedProperty, value.toString());});
    throws.subscribe(() => {}, (error) => { this.throwsProperty = this.appendValueToProperty(this.throwsProperty, error.toString());});

    showsSuccessFlowObs.subscribe(
      (number) => console.log(`We succeeded with a result of ${number}`),
      (error) => console.log('This will never be run'),
      () => console.log('Complete was also called.')
    );

    showsErrorFlowObs.subscribe(
      () => console.log('This will never execute.'),
      (error) => console.log(`This returned with an error message of ${error}`),
      () => console.log('Complete was also called.')
    );

    neverRunsObs.subscribe(
      () => console.log('This success will never be hit'),
      (error) => console.log('This will never be run either'),
      () => console.log('Even complete will never be run')
    ); 
  }

  private appendValueToProperty(property: String, value: String) : String {
    return property += `${value} `
  }

  private changeValueOfProperty(property: String, value: String) : String {
    return property = `${value}`
  }
}
