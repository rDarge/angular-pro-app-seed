import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Store } from 'store';
import { WorkoutsService, Workout } from '../../../shared/services/workouts/workouts.service';


@Component({
    selector: 'workouts',
    styleUrls: ['workouts.component.scss'],
    template: `
        <div class="workouts">
            <div class="workouts__title">
                <h1>
                    <img src="/img/workout.svg">
                    Your workouts
                </h1>
                <a 
                    class="btn__add"
                    [routerLink]="['../workouts/new']">
                    <img src="/img/add-white.svg">
                    New workout
                </a>
            </div>
            <div *ngIf="workouts$ | async as workouts; else loading;">
                <div class="message" *ngIf="!workouts.length">
                    <img src="/img/face.svg">
                    No workouts, add a new workout to start 
                </div>
                <!-- Workouts ngFor -->
                <list-item
                    *ngFor="let workout of workouts;"
                    [item]="workout"
                    (remove)="removeWorkout($event)">
                </list-item>                
            </div>
            <ng-template #loading>
                <div class="message">
                    <img src="/img/loading.svg">
                    Fetching workouts... 
                </div>
            </ng-template>
        </div>
    `
})
export class WorkoutsComponent implements OnInit, OnDestroy {

    workouts$: Observable<Workout[]>;
    subscription: Subscription;

    constructor(
        private workoutsService: WorkoutsService,
        private store: Store
    ) {}

    ngOnInit() {
        this.workouts$ = this.store.select<Workout[]>('workouts');
        this.subscription = this.workoutsService.workouts$.subscribe();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    removeWorkout(workout: Workout) {
        this.workoutsService.removeWorkout(workout.$key);
    }
}