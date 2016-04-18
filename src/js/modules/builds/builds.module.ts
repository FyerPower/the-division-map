/// <reference path="../../../../typings/main.d.ts"/>
import {Component, StateConfig, bundle, bootstrap} from 'ng-forward';
import BuildComponent from './builds.ts';

@Component({
  selector: 'builds-app',
  template: `<div></div>`
})
@StateConfig([
    { url: '/builds', component: BuildComponent, name: 'builds' }
])
export class App {}

bundle('theDivisionAgent.builds', App);
