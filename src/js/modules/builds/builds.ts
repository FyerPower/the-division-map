import {StateConfig, Component} from 'ng-forward';

@Component({
    selector: 'build-component',
    template: `
        <div id="page-builds">
            <div class="jumbotron header-cover">
                <div class="container">
                    <h2><b>Builds</b></h2>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        {{ctrl.text}}
                    </div>
                </div>
                <footer></footer>
            </div>
        </div>
    `
})
export default class BuildComponent {
    text = "Foobar";
}
