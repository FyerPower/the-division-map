(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/bootstrap.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = bootstrap;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bundle = require('./bundle');

var _bundle2 = _interopRequireDefault(_bundle);

var _writers = require('./writers');

function bootstrap(component) {
    var otherProviders = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    var selector = _writers.bundleStore.get('selector', component);
    var rootElement = document.querySelector(selector);
    (0, _bundle2['default'])(selector, component, otherProviders);
    return angular.bootstrap(rootElement, [selector]);
}

module.exports = exports['default'];


},{"./bundle":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/bundle.js","./writers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/writers.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/bundle.js":[function(require,module,exports){
// # Bundle function
// Takes a root decorated class and generates a Module from it
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = bundle;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _writers = require('./writers');

var _classesModule = require('./classes/module');

var _classesModule2 = _interopRequireDefault(_classesModule);

var _eventsEvents = require('./events/events');

var _eventsEvents2 = _interopRequireDefault(_eventsEvents);

var _utilGroupModulesProviders = require('./util/group-modules-providers');

var _utilGroupModulesProviders2 = _interopRequireDefault(_utilGroupModulesProviders);

function bundle(moduleName, provider) {
    var _Module;

    var otherProviders = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

    var getProvidersFrom = function getProvidersFrom(t) {
        return _writers.bundleStore.get('providers', t) || [];
    };
    var getModulesFrom = function getModulesFrom(t) {
        return _writers.bundleStore.get('modules', t) || [];
    };
    var setHasProviderWithToken = function setHasProviderWithToken(_set, token) {
        return [].concat(_toConsumableArray(_set)).filter(function (p) {
            return token && p.token === token;
        }).length > 0;
    };

    var _groupModulesAndProviders = (0, _utilGroupModulesProviders2['default'])([provider].concat(_toConsumableArray(otherProviders)), 'during bundle entry point for \'' + moduleName + '\' module');

    var startingModules = _groupModulesAndProviders.modules;
    var startingProviders = _groupModulesAndProviders.providers;

    var providers = new Set();
    var modules = new Set(startingModules);
    function parseProvider(provider) {
        if (provider) {
            if (providers.has(provider) || setHasProviderWithToken(providers, provider.token)) {
                return;
            }
            providers.add(provider);
            var annotated = provider.useClass || provider.useFactory || provider;
            getModulesFrom(annotated).forEach(function (mod) {
                return modules.add(mod);
            });
            getProvidersFrom(annotated).forEach(parseProvider);
        }
    }
    startingProviders.forEach(parseProvider);
    return (_Module = (0, _classesModule2['default'])(moduleName, [].concat(_toConsumableArray(modules)))).add.apply(_Module, _toConsumableArray(_eventsEvents2['default'].resolve()).concat(_toConsumableArray(providers)));
}

module.exports = exports['default'];


},{"./classes/module":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/classes/module.js","./events/events":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/events/events.js","./util/group-modules-providers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/group-modules-providers.js","./writers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/writers.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/classes/metastore.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Metastore = (function () {
    function Metastore(namespace) {
        _classCallCheck(this, Metastore);

        this.namespace = namespace;
    }

    _createClass(Metastore, [{
        key: '_map',
        value: function _map(obj, key) {
            if (!Reflect.hasOwnMetadata(this.namespace, obj, key)) {
                Reflect.defineMetadata(this.namespace, new Map(), obj, key);
            }
            return Reflect.getOwnMetadata(this.namespace, obj, key);
        }
    }, {
        key: 'get',
        value: function get(key, obj, prop) {
            return this._map(obj, prop).get(key);
        }
    }, {
        key: 'set',
        value: function set(key, value, obj, prop) {
            this._map(obj, prop).set(key, value);
        }
    }, {
        key: 'has',
        value: function has(key, obj, prop) {
            return this._map(obj, prop).has(key);
        }
    }, {
        key: 'push',
        value: function push(key, value, obj, prop) {
            if (!this.has(key, obj, prop)) {
                this.set(key, [], obj, prop);
            }
            var store = this.get(key, obj, prop);
            if (!Array.isArray(store)) {
                throw new Error('Metastores can only push metadata to array values');
            }
            store.push(value);
        }
    }, {
        key: 'merge',
        value: function merge(key, value, obj, prop) {
            var previous = this.get(key, obj, prop) || {};
            var mergedObj = Object.assign({}, previous, value);
            this.set(key, mergedObj, obj, prop);
        }
    }, {
        key: 'forEach',
        value: function forEach(callbackFn, obj, prop) {
            this._map(obj, prop).forEach(callbackFn);
        }
    }]);

    return Metastore;
})();

exports['default'] = Metastore;
module.exports = exports['default'];


},{}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/classes/module.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _writers = require('../writers');

var _parsers = {};

var DecoratedModule = (function () {
    function DecoratedModule(name) {
        var modules = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        _classCallCheck(this, DecoratedModule);

        this.name = name;
        if (modules) {
            this.moduleList(modules);
            this._module = angular.module(name, this._dependencies);
        } else {
            this._module = angular.module(name);
        }
    }

    _createClass(DecoratedModule, [{
        key: 'add',
        value: function add() {
            var _this = this;

            for (var _len = arguments.length, providers = Array(_len), _key = 0; _key < _len; _key++) {
                providers[_key] = arguments[_key];
            }

            // We used a rest parameter so that you can add multiple providers at once.
            // So we must iterate over our array of providers.
            var providersInferred = providers.filter(function (p) {
                return !p.isProvider;
            });
            var providersProper = providers.filter(function (p) {
                return p.isProvider;
            });
            var handleProvider = function handleProvider(provider) {
                if (!_writers.providerStore.has('type', provider)) {
                    throw new Error('Cannot read provider metadata. Are you adding a class that hasn\'t been decorated yet?');
                }
                var type = _writers.providerStore.get('type', provider);
                var name = _writers.providerStore.get('name', provider);
                var inject = _writers.bundleStore.get('$inject', provider) || [];
                if (_parsers[type]) {
                    _parsers[type](provider, name, inject, _this._module);
                } else {
                    throw new Error('No parser registered for type \'' + type + '\'');
                }
            };
            providersInferred.forEach(handleProvider);
            providersProper.forEach(handleProvider);
            return this;
        }
    }, {
        key: 'publish',
        value: function publish() {
            return this._module;
        }
    }, {
        key: 'moduleList',
        value: function moduleList(modules) {
            this._dependencies = [];
            if (modules && modules.length !== 0) {
                for (var i = 0; i < modules.length; i++) {
                    if (typeof modules[i] === 'string') {
                        this._dependencies.push(modules[i]);
                    } else if (modules[i] && modules[i].name) {
                        this._dependencies.push(modules[i].name);
                    } else {
                        throw new Error('Cannot read module: Unknown module in ' + this.name);
                    }
                }
            }
        }
    }, {
        key: 'config',
        value: function config(configFunc) {
            this._module.config(configFunc);
            return this;
        }
    }, {
        key: 'run',
        value: function run(runFunc) {
            this._module.run(runFunc);
            return this;
        }
    }, {
        key: 'value',
        value: function value(name, _value) {
            this._module.value(name, _value);
            return this;
        }
    }, {
        key: 'constant',
        value: function constant(name, value) {
            this._module.constant(name, value);
            return this;
        }
    }]);

    return DecoratedModule;
})();

exports.DecoratedModule = DecoratedModule;

var Module = function Module(name, modules) {
    return new DecoratedModule(name, modules);
};
Module.addProvider = function (providerType, parser) {
    _parsers[providerType] = parser;
};
Module.getParser = function (providerType) {
    return _parsers[providerType];
};
exports['default'] = Module;


},{"../writers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/writers.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/classes/opaque-token.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OpaqueToken = (function () {
    function OpaqueToken(_desc) {
        _classCallCheck(this, OpaqueToken);

        this._desc = _desc;
    }

    _createClass(OpaqueToken, [{
        key: "toString",
        value: function toString() {
            return "Token " + this._desc;
        }
    }]);

    return OpaqueToken;
})();

exports.OpaqueToken = OpaqueToken;


},{}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/classes/provider.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _writers = require('../writers');

var _module2 = require('./module');

var _module3 = _interopRequireDefault(_module2);

var _decoratorsInject = require('../decorators/inject');

var _utilGetInjectableName = require('../util/get-injectable-name');

var _decoratorsProviders = require('../decorators/providers');

var _decoratorsInjectable = require('../decorators/injectable');

var TYPE = 'provider';

var Provider = (function () {
    function Provider(token, _ref) {
        var useClass = _ref.useClass;
        var useValue = _ref.useValue;
        var useConstant = _ref.useConstant;
        var useFactory = _ref.useFactory;
        var deps = _ref.deps;

        _classCallCheck(this, Provider);

        this.isProvider = true;
        this._dependencies = [];
        try {
            this.token = (0, _utilGetInjectableName.getInjectableNameWithJitCreation)(token);
        } catch (e) {
            throw new Error('new Provider() Error: Invalid token ' + token);
        }
        Object.assign(this, { useClass: useClass, useValue: useValue, useConstant: useConstant, useFactory: useFactory });
        if (!useClass && !useValue && !useConstant && !useFactory) {
            throw new Error('new Provider(' + token + ') Error: No usage provided (i.e. useClass, useValue, useConstant, useFactory)');
        }
        if (deps) {
            _decoratorsInject.Inject.apply(undefined, _toConsumableArray(deps))(this.useFactory);
            _decoratorsProviders.Providers.apply(undefined, _toConsumableArray(deps.filter(function (d) {
                return typeof d !== 'string';
            })))(this.useFactory, 'while analyzing Provider \'' + this.token + '\' useFactory deps');
            this._dependencies = _writers.bundleStore.get('$inject', this.useFactory);
        }
        _writers.providerStore.set('name', this.token, this);
        _writers.providerStore.set('type', TYPE, this);
    }

    _createClass(Provider, [{
        key: 'type',
        get: function get() {
            var _this = this;

            if (this._type) return this._type;
            this._type = Object.keys(this).find(function (k) {
                return k.startsWith('use') && _this[k] !== undefined;
            });
            return this._type;
        }
    }, {
        key: 'dependencies',
        get: function get() {
            return this._dependencies;
        }
    }]);

    return Provider;
})();

exports.Provider = Provider;

_module3['default'].addProvider(TYPE, function (provider, name, injects, ngModule) {
    switch (provider.type) {
        case 'useValue':
            ngModule.value(provider.token, provider.useValue);
            break;
        case 'useConstant':
            ngModule.constant(provider.token, provider.useConstant);
            break;
        case 'useClass':
            injects = _writers.bundleStore.get('$inject', provider.useClass) || [];
            _module3['default'].getParser(_decoratorsInjectable.INJECTABLE)(provider.useClass, provider.token, injects, ngModule);
            break;
        case 'useFactory':
            ngModule.factory(provider.token, [].concat(_toConsumableArray(provider.dependencies), [provider.useFactory]));
            break;
        default:
            break;
    }
});
var provide = function provide(token, _ref2) {
    var useClass = _ref2.useClass;
    var useValue = _ref2.useValue;
    var useConstant = _ref2.useConstant;
    var useFactory = _ref2.useFactory;
    var deps = _ref2.deps;

    return new Provider(token, { useClass: useClass, useValue: useValue, useConstant: useConstant, useFactory: useFactory, deps: deps });
};
exports.provide = provide;


},{"../decorators/inject":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/inject.js","../decorators/injectable":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/injectable.js","../decorators/providers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/providers.js","../util/get-injectable-name":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/get-injectable-name.js","../writers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/writers.js","./module":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/classes/module.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/component.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports.Component = Component;
exports.View = View;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _utilParseSelector = require('../util/parse-selector');

var _utilParseSelector2 = _interopRequireDefault(_utilParseSelector);

var _writers = require('../writers');

var _providers = require('./providers');

var _classesModule = require('../classes/module');

var _classesModule2 = _interopRequireDefault(_classesModule);

var _utilDirectiveController = require('../util/directive-controller');

var _utilDirectiveController2 = _interopRequireDefault(_utilDirectiveController);

var _inputOutput = require('./input-output');

var _propertiesInputsBuilder = require('../properties/inputs-builder');

var _eventsEvents = require('../events/events');

var _eventsEvents2 = _interopRequireDefault(_eventsEvents);

var _utilHelpers = require('../util/helpers');

var TYPE = 'component';
var componentHooks = {
    _after: [],
    _extendDDO: [],
    _beforeCtrlInvoke: [],
    _afterCtrlInvoke: [],
    after: function after(fn) {
        this._after.push(fn);
    },
    extendDDO: function extendDDO(fn) {
        this._extendDDO.push(fn);
    },
    beforeCtrlInvoke: function beforeCtrlInvoke(fn) {
        this._beforeCtrlInvoke.push(fn);
    },
    afterCtrlInvoke: function afterCtrlInvoke(fn) {
        this._afterCtrlInvoke.push(fn);
    }
};
exports.componentHooks = componentHooks;

function Component(_ref) {
    var selector = _ref.selector;
    var controllerAs = _ref.controllerAs;
    var template = _ref.template;
    var templateUrl = _ref.templateUrl;
    var _ref$providers = _ref.providers;
    var providers = _ref$providers === undefined ? [] : _ref$providers;
    var _ref$inputs = _ref.inputs;
    var inputs = _ref$inputs === undefined ? [] : _ref$inputs;
    var _ref$outputs = _ref.outputs;
    var outputs = _ref$outputs === undefined ? [] : _ref$outputs;
    var _ref$pipes = _ref.pipes;
    var pipes = _ref$pipes === undefined ? [] : _ref$pipes;
    var _ref$directives = _ref.directives;
    var directives = _ref$directives === undefined ? [] : _ref$directives;

    return function (t) {
        if (!selector) {
            throw new Error('Component Decorator Error in "' + t.name + '": Component selector must be provided');
        }

        var _parseSelector = (0, _utilParseSelector2['default'])(selector);

        var name = _parseSelector.name;
        var restrict = _parseSelector.type;

        _writers.providerStore.set('name', name, t);
        _writers.providerStore.set('type', TYPE, t);
        _writers.bundleStore.set('selector', selector, t);
        _providers.Providers.apply(undefined, _toConsumableArray(providers))(t, 'while analyzing Component \'' + t.name + '\' providers');
        _writers.componentStore.set('restrict', restrict, t);
        _writers.componentStore.set('scope', {}, t);
        _writers.componentStore.set('transclude', true, t);
        _writers.componentStore.set('bindToController', true, t);
        [['inputs', inputs], ['providers', providers], ['directives', directives], ['outputs', outputs]].forEach(function (_ref2) {
            var _ref22 = _slicedToArray(_ref2, 2);

            var propName = _ref22[0];
            var propVal = _ref22[1];

            if (propVal !== undefined && !Array.isArray(propVal)) {
                throw new TypeError('Component Decorator Error in "' + t.name + '": Component ' + propName + ' must be an array');
            }
        });
        (0, _inputOutput.writeMapMulti)(t, inputs, 'inputMap');
        var outputMap = (0, _inputOutput.writeMapMulti)(t, outputs, 'outputMap');
        Object.keys(outputMap).forEach(function (key) {
            return _eventsEvents2['default'].add(key);
        });
        if (controllerAs === '$auto') {
            _writers.componentStore.set('controllerAs', name, t);
        } else if (controllerAs) {
            _writers.componentStore.set('controllerAs', controllerAs, t);
        } else {
            _writers.componentStore.set('controllerAs', 'ctrl', t);
        }
        if (t.link) {
            _writers.componentStore.set('link', t.link, t);
        }
        if (t.compile) {
            _writers.componentStore.set('compile', t.compile, t);
        }
        View({
            selector: selector,
            template: template,
            templateUrl: templateUrl,
            pipes: pipes,
            directives: directives
        })(t);
    };
}

function View(_ref3) {
    var selector = _ref3.selector;
    var template = _ref3.template;
    var templateUrl = _ref3.templateUrl;
    var _ref3$pipes = _ref3.pipes;
    var pipes = _ref3$pipes === undefined ? [] : _ref3$pipes;
    var _ref3$directives = _ref3.directives;
    var directives = _ref3$directives === undefined ? [] : _ref3$directives;

    return function (t) {
        if (templateUrl) {
            _writers.componentStore.set('templateUrl', templateUrl, t);
        } else if (template) {
            _writers.componentStore.set('template', template, t);
        } else {
            throw new Error('@Component config must include either a template or a template url for component with selector ' + selector + ' on ' + t.name);
        }
        _providers.Providers.apply(undefined, _toConsumableArray(directives))(t, 'while analyzing Component \'' + t.name + '\' directives');
        _providers.Providers.apply(undefined, _toConsumableArray(pipes))(t, 'while analyzing Component \'' + t.name + '\' pipes');
    };
}

_classesModule2['default'].addProvider(TYPE, function (target, name, injects, ngModule) {
    var ddo = {};
    _writers.componentStore.forEach(function (val, key) {
        return ddo[key] = val;
    }, target);
    var bindProp = angular.version.minor >= 4 ? 'bindToController' : 'scope';
    ddo[bindProp] = (0, _propertiesInputsBuilder.inputsMap)(ddo.inputMap);
    if (ddo.restrict !== 'E') {
        throw new Error((0, _utilHelpers.createConfigErrorMessage)(target, ngModule, '@Component selectors can only be elements. ' + 'Perhaps you meant to use @Directive?'));
    }
    controller.$inject = ['$scope', '$element', '$attrs', '$transclude', '$injector'];
    function controller($scope, $element, $attrs, $transclude, $injector) {
        var locals = { $scope: $scope, $element: $element, $attrs: $attrs, $transclude: $transclude };
        return (0, _utilDirectiveController2['default'])(this, injects, target, ddo, $injector, locals);
    }
    ddo.controller = controller;
    if (typeof target.prototype.ngAfterViewInit === 'function') {
        ddo.link = function () {
            return ddo.ngAfterViewInitBound();
        };
    }
    if (ddo.template && ddo.template.replace) {
        ddo.template = ddo.template.replace(/ng-content/g, 'ng-transclude');
    }
    componentHooks._extendDDO.forEach(function (hook) {
        return hook(ddo, target, name, injects, ngModule);
    });
    ngModule.directive(name, function () {
        return ddo;
    });
    componentHooks._after.forEach(function (hook) {
        return hook(target, name, injects, ngModule);
    });
});


},{"../classes/module":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/classes/module.js","../events/events":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/events/events.js","../properties/inputs-builder":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/properties/inputs-builder.js","../util/directive-controller":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/directive-controller.js","../util/helpers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/helpers.js","../util/parse-selector":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/parse-selector.js","../writers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/writers.js","./input-output":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/input-output.js","./providers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/providers.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/directive.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.Directive = Directive;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _utilParseSelector = require('../util/parse-selector');

var _utilParseSelector2 = _interopRequireDefault(_utilParseSelector);

var _writers = require('../writers');

var _providers = require('./providers');

var _classesModule = require('../classes/module');

var _classesModule2 = _interopRequireDefault(_classesModule);

var _utilDirectiveController = require('../util/directive-controller');

var _utilDirectiveController2 = _interopRequireDefault(_utilDirectiveController);

var _utilHelpers = require('../util/helpers');

var TYPE = 'directive';

function Directive(_ref) {
    var selector = _ref.selector;
    var _ref$providers = _ref.providers;
    var providers = _ref$providers === undefined ? [] : _ref$providers;

    return function (t) {
        if (!selector) {
            throw new Error('Directive selector must be provided');
        }

        var _parseSelector = (0, _utilParseSelector2['default'])(selector);

        var name = _parseSelector.name;
        var restrict = _parseSelector.type;

        if (providers !== undefined && !Array.isArray(providers)) {
            throw new TypeError('Directive providers must be an array');
        }
        _writers.providerStore.set('name', name, t);
        _writers.providerStore.set('type', TYPE, t);
        _writers.bundleStore.set('selector', selector, t);
        _providers.Providers.apply(undefined, _toConsumableArray(providers))(t, 'while analyzing Directive \'' + t.name + '\' providers');
        _writers.componentStore.set('restrict', restrict, t);
    };
}

_classesModule2['default'].addProvider(TYPE, function (target, name, injects, ngModule) {
    var ddo = {};
    _writers.componentStore.forEach(function (val, key) {
        return ddo[key] = val;
    }, target);
    if (ddo.restrict !== 'A') {
        throw new Error((0, _utilHelpers.createConfigErrorMessage)(target, ngModule, '@Directive selectors can only be attributes, e.g. selector: \'[my-directive]\''));
    }
    ngModule.directive(name, ['$injector', function ($injector) {
        ddo.link = function ($scope, $element, $attrs, $requires, $transclude) {
            var locals = { $scope: $scope, $element: $element, $attrs: $attrs, $transclude: $transclude, $requires: $requires };
            return (0, _utilDirectiveController2['default'])(this, injects, target, ddo, $injector, locals);
        };
        return ddo;
    }]);
});


},{"../classes/module":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/classes/module.js","../util/directive-controller":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/directive-controller.js","../util/helpers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/helpers.js","../util/parse-selector":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/parse-selector.js","../writers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/writers.js","./providers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/providers.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/inject.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.Inject = Inject;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _writers = require('../writers');

var _utilGetInjectableName = require('../util/get-injectable-name');

var _decoratorsProviders = require('../decorators/providers');

var _classesOpaqueToken = require('../classes/opaque-token');

var _component = require('./component');

function Inject() {
    for (var _len = arguments.length, injects = Array(_len), _key = 0; _key < _len; _key++) {
        injects[_key] = arguments[_key];
    }

    return function (t1, name) {
        var _ref = arguments.length <= 2 || arguments[2] === undefined ? { value: undefined } : arguments[2];

        var t2 = _ref.value;

        var targetIsClass = arguments.length === 1;
        var t = targetIsClass ? t1 : t2;
        var notStringBased = function notStringBased(inj) {
            return typeof inj !== 'string' && !(inj instanceof _classesOpaqueToken.OpaqueToken);
        };
        var ensureInjectable = function ensureInjectable(inj) {
            if (!_writers.providerStore.get('name', inj) || !_writers.providerStore.get('type', inj)) {
                throw new Error('Processing "' + t.name + '" @Inject parameter: "' + (inj.name || inj.toString()) + '" is not a valid injectable.\n\t\t\t\tPlease ensure ' + (inj.name || inj.toString()) + ' is injectable. Valid examples can be:\n\t\t\t\t- a string representing an ng1 provider, e.g. \'$q\'\n\t\t\t\t- an @Injectable ng-forward class\n\t\t\t\t- a Provider, e.g. provide(SOME_CONFIG, {asValue: 100})');
            }
            return inj;
        };
        var providers = injects.filter(notStringBased).map(ensureInjectable);
        _decoratorsProviders.Providers.apply(undefined, _toConsumableArray(providers))(t, 'while analyzing \'' + t.name + '\' injected providers');
        var dependencies = injects.map(_utilGetInjectableName.getInjectableName).filter(function (n) {
            return n !== undefined;
        });
        if (_writers.bundleStore.has('$inject', t)) {
            var parentInjects = _writers.bundleStore.get('$inject', t);
            _writers.bundleStore.set('$inject', [].concat(_toConsumableArray(dependencies), _toConsumableArray(parentInjects)), t);
        } else {
            _writers.bundleStore.set('$inject', dependencies, t);
        }
    };
}

_component.componentHooks.beforeCtrlInvoke(injectParentComponents);
function injectParentComponents(caller, injects, controller, ddo, $injector, locals) {
    injects.forEach(function (inject) {
        if (!$injector.has(inject)) {
            var _parent = locals.$element;
            do {
                if (!_parent.controller) continue;
                var parentCtrl = _parent.controller(inject);
                if (parentCtrl) {
                    locals[inject] = parentCtrl;
                    return;
                }
            } while ((_parent = _parent.parent()) && _parent.length > 0);
        }
    });
}


},{"../classes/opaque-token":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/classes/opaque-token.js","../decorators/providers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/providers.js","../util/get-injectable-name":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/get-injectable-name.js","../writers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/writers.js","./component":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/component.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/injectable.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _classesModule = require('../classes/module');

var _classesModule2 = _interopRequireDefault(_classesModule);

var _utilDecoratorFactory = require('../util/decorator-factory');

var _utilDecoratorFactory2 = _interopRequireDefault(_utilDecoratorFactory);

var INJECTABLE = 'injectable';
exports.INJECTABLE = INJECTABLE;
var Injectable = (0, _utilDecoratorFactory2['default'])(INJECTABLE);
exports.Injectable = Injectable;
_classesModule2['default'].addProvider(INJECTABLE, function (provider, name, injects, ngModule) {
    ngModule.service(name, [].concat(_toConsumableArray(injects), [provider]));
});


},{"../classes/module":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/classes/module.js","../util/decorator-factory":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/decorator-factory.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/input-output.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.Input = Input;
exports.Output = Output;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _writers = require('../writers');

var _propertiesParsePropertyMap = require('../properties/parse-property-map');

var _propertiesParsePropertyMap2 = _interopRequireDefault(_propertiesParsePropertyMap);

var _eventsEvents = require('../events/events');

var _eventsEvents2 = _interopRequireDefault(_eventsEvents);

var writeMapSingle = function writeMapSingle(t, localName, publicName, storeKey) {
    var put = localName + (publicName ? ':' + publicName : '');
    var putMap = (0, _propertiesParsePropertyMap2['default'])([put]);
    var previousPutMap = _writers.componentStore.get(storeKey, t) || {};
    _writers.componentStore.set(storeKey, Object.assign({}, previousPutMap, putMap), t);
    return putMap;
};
exports.writeMapSingle = writeMapSingle;
var writeMapMulti = function writeMapMulti(t, names, storeKey) {
    var putMap = (0, _propertiesParsePropertyMap2['default'])(names);
    var previousPutMap = _writers.componentStore.get(storeKey, t) || {};
    _writers.componentStore.set(storeKey, Object.assign({}, previousPutMap, putMap), t);
    return putMap;
};
exports.writeMapMulti = writeMapMulti;

function Input(publicName) {
    return function (proto, localName) {
        writeMapSingle(proto.constructor, localName, publicName, 'inputMap');
    };
}

function Output(publicName) {
    return function (proto, localName) {
        var outputMap = writeMapSingle(proto.constructor, localName, publicName, 'outputMap');
        Object.keys(outputMap).forEach(function (key) {
            return _eventsEvents2['default'].add(key);
        });
    };
}


},{"../events/events":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/events/events.js","../properties/parse-property-map":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/properties/parse-property-map.js","../writers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/writers.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/pipe.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var _bind = Function.prototype.bind;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _classesModule = require('../classes/module');

var _classesModule2 = _interopRequireDefault(_classesModule);

var _utilDecoratorFactory = require('../util/decorator-factory');

var _utilDecoratorFactory2 = _interopRequireDefault(_utilDecoratorFactory);

var TYPE = 'pipe';
var Pipe = (0, _utilDecoratorFactory2['default'])(TYPE);
exports.Pipe = Pipe;
_classesModule2['default'].addProvider(TYPE, function (provider, name, injects, ngModule) {
    ngModule.filter(name, [].concat(_toConsumableArray(injects), [function () {
        for (var _len = arguments.length, dependencies = Array(_len), _key = 0; _key < _len; _key++) {
            dependencies[_key] = arguments[_key];
        }

        var pipe = new (_bind.apply(provider, [null].concat(dependencies)))();
        if (!pipe.transform) {
            throw new Error('Filters must implement a transform method');
        }
        return function (input) {
            for (var _len2 = arguments.length, params = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                params[_key2 - 1] = arguments[_key2];
            }

            if (pipe.supports && !pipe.supports(input)) {
                throw new Error('Filter ' + name + ' does not support ' + input);
            }
            return pipe.transform.apply(pipe, [input].concat(params));
        };
    }]));
});


},{"../classes/module":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/classes/module.js","../util/decorator-factory":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/decorator-factory.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/providers.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.Providers = Providers;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _writers = require('../writers');

var _utilGroupModulesProviders = require('../util/group-modules-providers');

var _utilGroupModulesProviders2 = _interopRequireDefault(_utilGroupModulesProviders);

function Providers() {
    for (var _len = arguments.length, modulesAndProviders = Array(_len), _key = 0; _key < _len; _key++) {
        modulesAndProviders[_key] = arguments[_key];
    }

    return function (t) {
        var errorContext = arguments.length <= 1 || arguments[1] === undefined ? 'while parsing ' + t.name + '\'s providers' : arguments[1];
        return (function () {
            var _groupIntoModulesAndProviders = (0, _utilGroupModulesProviders2['default'])(modulesAndProviders, errorContext);

            var modules = _groupIntoModulesAndProviders.modules;
            var providers = _groupIntoModulesAndProviders.providers;

            var parentModules = _writers.bundleStore.get('modules', t) || [];
            _writers.bundleStore.set('modules', [].concat(_toConsumableArray(modules), _toConsumableArray(parentModules)), t);
            var parentProviders = _writers.bundleStore.get('providers', t) || [];
            _writers.bundleStore.set('providers', [].concat(_toConsumableArray(providers), _toConsumableArray(parentProviders)), t);
        })();
    };
}


},{"../util/group-modules-providers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/group-modules-providers.js","../writers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/writers.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/state-config.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.StateConfig = StateConfig;
exports.Resolve = Resolve;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _writers = require('../writers');

var _providers = require('./providers');

var _component = require("./component");

var _utilHelpers = require('../util/helpers');

var _utilGetInjectableName = require('../util/get-injectable-name');

var configsKey = 'ui-router.stateConfigs';
var childConfigsKey = 'ui-router.stateChildConfigs';
var annotatedResolvesKey = 'ui-router.annotatedResolves';
var resolvedMapKey = 'ui-router.resolvedMap';

function StateConfig(stateConfigs) {
    return function (t) {
        _providers.Providers.apply(undefined, _toConsumableArray(stateConfigs.map(function (sc) {
            return sc.component;
        })))(t, 'while analyzing StateConfig \'' + t.name + '\' state components');
        _writers.componentStore.set(childConfigsKey, stateConfigs, t);
        stateConfigs.forEach(function (config) {
            if (!config.component) return;
            var existingConfigs = _writers.componentStore.get(configsKey, config.component) || [];
            _writers.componentStore.set(configsKey, [].concat(_toConsumableArray(existingConfigs), [config]), config.component);
        });
    };
}

function targetIsStaticFn(t) {
    return t.name !== undefined && t.constructor.name === 'Function';
}

function Resolve() {
    var resolveName = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

    return function (target, resolveFnName, _ref) {
        var resolveFn = _ref.value;

        if (!targetIsStaticFn(target)) {
            throw new Error('@Resolve target must be a static method.');
        }
        _writers.componentStore.merge(annotatedResolvesKey, _defineProperty({}, resolveName || resolveFnName, resolveFn), target);
    };
}

_component.componentHooks.extendDDO(function (ddo) {
    if (ddo.template && ddo.template.replace) {
        ddo.template = ddo.template.replace(/ng-outlet/g, 'ui-view');
    }
});
_component.componentHooks.after(function (target, name, injects, ngModule) {
    var childStateConfigs = _writers.componentStore.get(childConfigsKey, target);
    if (childStateConfigs) {
        if (!Array.isArray(childStateConfigs)) {
            throw new TypeError((0, _utilHelpers.createConfigErrorMessage)(target, ngModule, '@StateConfig param must be an array of state objects.'));
        }
        ngModule.config(['$stateProvider', function ($stateProvider) {
            if (!$stateProvider) return;
            childStateConfigs.forEach(function (config) {
                var tagName = _writers.bundleStore.get('selector', config.component);
                config.template = config.template || '<' + tagName + '></' + tagName + '>';
                var annotatedResolves = _writers.componentStore.get(annotatedResolvesKey, config.component) || {};
                Object.keys(annotatedResolves).forEach(function (resolveName) {
                    var resolveFn = annotatedResolves[resolveName];
                    var fnInjects = _writers.bundleStore.get('$inject', resolveFn);
                    resolveFn.$inject = fnInjects;
                });
                config.resolve = Object.assign({}, config.resolve, annotatedResolves);
                var childInjects = _writers.bundleStore.get('$inject', config.component);
                var injects = childInjects ? childInjects.map(_utilGetInjectableName.getInjectableName) : [];
                function stateController() {
                    for (var _len = arguments.length, resolves = Array(_len), _key = 0; _key < _len; _key++) {
                        resolves[_key] = arguments[_key];
                    }

                    var resolvedMap = resolves.reduce(function (obj, val, i) {
                        obj[injects[i]] = val;
                        return obj;
                    }, {});
                    _writers.componentStore.set(resolvedMapKey, resolvedMap, config.component);
                }
                config.controller = config.controller || [].concat(_toConsumableArray(injects), [stateController]);
                $stateProvider.state(config.name, config);
            });
        }]);
    }
});
_component.componentHooks.beforeCtrlInvoke(function (caller, injects, controller, ddo, $injector, locals) {
    var resolvesMap = _writers.componentStore.get(resolvedMapKey, controller);
    Object.assign(locals, resolvesMap);
});


},{"../util/get-injectable-name":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/get-injectable-name.js","../util/helpers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/helpers.js","../writers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/writers.js","./component":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/component.js","./providers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/providers.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/events/event-emitter.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _reactivexRxjsDistCjsSubject = require('@reactivex/rxjs/dist/cjs/Subject');

var _reactivexRxjsDistCjsSubject2 = _interopRequireDefault(_reactivexRxjsDistCjsSubject);

var EventEmitter = (function (_Subject) {
    _inherits(EventEmitter, _Subject);

    function EventEmitter() {
        var isAsync = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

        _classCallCheck(this, EventEmitter);

        _get(Object.getPrototypeOf(EventEmitter.prototype), 'constructor', this).call(this);
        this._isAsync = isAsync;
    }

    _createClass(EventEmitter, [{
        key: 'subscribe',
        value: function subscribe(generatorOrNext, error, complete) {
            if (generatorOrNext && typeof generatorOrNext === 'object') {
                var schedulerFn = this._isAsync ? function (value) {
                    setTimeout(function () {
                        return generatorOrNext.next(value);
                    });
                } : function (value) {
                    generatorOrNext.next(value);
                };
                return _get(Object.getPrototypeOf(EventEmitter.prototype), 'subscribe', this).call(this, schedulerFn, function (err) {
                    return generatorOrNext.error ? generatorOrNext.error(err) : null;
                }, function () {
                    return generatorOrNext.complete ? generatorOrNext.complete() : null;
                });
            } else {
                var schedulerFn = this._isAsync ? function (value) {
                    setTimeout(function () {
                        return generatorOrNext(value);
                    });
                } : function (value) {
                    generatorOrNext(value);
                };
                return _get(Object.getPrototypeOf(EventEmitter.prototype), 'subscribe', this).call(this, schedulerFn, function (err) {
                    return error ? error(err) : null;
                }, function () {
                    return complete ? complete() : null;
                });
            }
        }
    }]);

    return EventEmitter;
})(_reactivexRxjsDistCjsSubject2['default']);

exports['default'] = EventEmitter;
module.exports = exports['default'];


},{"@reactivex/rxjs/dist/cjs/Subject":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/Subject.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/events/events.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _decoratorsDirective = require('../decorators/directive');

var _decoratorsInject = require('../decorators/inject');

var _utilParseSelector = require('../util/parse-selector');

var _utilParseSelector2 = _interopRequireDefault(_utilParseSelector);

var _utilHelpers = require('../util/helpers');

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2:
            return decorators.reduceRight(function (o, d) {
                return d && d(o) || o;
            }, target);
        case 3:
            return decorators.reduceRight(function (o, d) {
                return d && d(target, key), void 0;
            }, void 0);
        case 4:
            return decorators.reduceRight(function (o, d) {
                return d && d(target, key, o) || o;
            }, desc);
    }
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var events = new Set(['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove', 'mouseenter', 'mouseleave', 'keydown', 'keyup', 'keypress', 'submit', 'focus', 'blur', 'copy', 'cut', 'paste', 'change', 'dragstart', 'drag', 'dragenter', 'dragleave', 'dragover', 'drop', 'dragend', 'error', 'input', 'load', 'wheel', 'scroll']);
function resolve() {
    var directives = [];
    events.forEach(function (event) {
        var selector = "[(" + (0, _utilHelpers.dasherize)(event) + ")]";
        var EventHandler = (function () {
            function EventHandler($parse, $element, $attrs, $scope) {
                var _this = this;

                _classCallCheck(this, EventHandler);

                this.$element = $element;
                this.$scope = $scope;

                var _parseSelector = (0, _utilParseSelector2["default"])(selector);

                var attrName = _parseSelector.name;

                this.expression = $parse($attrs[attrName]);
                $element.on(event, function (e) {
                    return _this.eventHandler(e);
                });
                $scope.$on('$destroy', function () {
                    return _this.onDestroy();
                });
            }

            _createClass(EventHandler, [{
                key: "eventHandler",
                value: function eventHandler() {
                    var $event = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                    var detail = $event.detail;
                    if (!detail && $event.originalEvent && $event.originalEvent.detail) {
                        detail = $event.originalEvent.detail;
                    } else if (!detail) {
                        detail = {};
                    }
                    this.expression(this.$scope, Object.assign(detail, { $event: $event }));
                    this.$scope.$applyAsync();
                }
            }, {
                key: "onDestroy",
                value: function onDestroy() {
                    this.$element.off(event);
                }
            }]);

            return EventHandler;
        })();
        EventHandler = __decorate([(0, _decoratorsDirective.Directive)({ selector: selector }), (0, _decoratorsInject.Inject)('$parse', '$element', '$attrs', '$scope'), __metadata('design:paramtypes', [Function, Object, Object, Object])], EventHandler);
        directives.push(EventHandler);
    });
    return directives;
}
function add() {
    for (var _len = arguments.length, customEvents = Array(_len), _key = 0; _key < _len; _key++) {
        customEvents[_key] = arguments[_key];
    }

    customEvents.forEach(function (event) {
        return events.add(event);
    });
}
exports["default"] = { resolve: resolve, add: add };
module.exports = exports["default"];


},{"../decorators/directive":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/directive.js","../decorators/inject":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/inject.js","../util/helpers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/helpers.js","../util/parse-selector":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/parse-selector.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/index.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _classesModule = require('./classes/module');

var _classesModule2 = _interopRequireDefault(_classesModule);

var _classesMetastore = require('./classes/metastore');

var _classesMetastore2 = _interopRequireDefault(_classesMetastore);

var _classesOpaqueToken = require('./classes/opaque-token');

var _classesProvider = require('./classes/provider');

var _decoratorsComponent = require('./decorators/component');

var _decoratorsDirective = require('./decorators/directive');

var _decoratorsInject = require('./decorators/inject');

var _decoratorsInjectable = require('./decorators/injectable');

var _decoratorsPipe = require('./decorators/pipe');

var _decoratorsProviders = require('./decorators/providers');

var _decoratorsInputOutput = require('./decorators/input-output');

var _decoratorsStateConfig = require('./decorators/state-config');

var _eventsEvents = require('./events/events');

var _eventsEvents2 = _interopRequireDefault(_eventsEvents);

var _eventsEventEmitter = require('./events/event-emitter');

var _eventsEventEmitter2 = _interopRequireDefault(_eventsEventEmitter);

var _bootstrap = require('./bootstrap');

var _bootstrap2 = _interopRequireDefault(_bootstrap);

var _bundle = require('./bundle');

var _bundle2 = _interopRequireDefault(_bundle);

var _utilGetInjectableName = require('./util/get-injectable-name');

var _writers = require('./writers');

require('./util/jqlite-extensions');

exports.Module = _classesModule2['default'];
exports.Metastore = _classesMetastore2['default'];
exports.OpaqueToken = _classesOpaqueToken.OpaqueToken;
exports.Provider = _classesProvider.Provider;
exports.provide = _classesProvider.provide;
exports.Component = _decoratorsComponent.Component;
exports.Directive = _decoratorsDirective.Directive;
exports.Inject = _decoratorsInject.Inject;
exports.Injectable = _decoratorsInjectable.Injectable;
exports.Pipe = _decoratorsPipe.Pipe;
exports.Providers = _decoratorsProviders.Providers;
exports.Input = _decoratorsInputOutput.Input;
exports.Output = _decoratorsInputOutput.Output;
exports.StateConfig = _decoratorsStateConfig.StateConfig;
exports.Resolve = _decoratorsStateConfig.Resolve;
exports.events = _eventsEvents2['default'];
exports.EventEmitter = _eventsEventEmitter2['default'];
exports.bootstrap = _bootstrap2['default'];
exports.bundle = _bundle2['default'];
exports.getInjectableName = _utilGetInjectableName.getInjectableName;
exports.bundleStore = _writers.bundleStore;
exports.providerStore = _writers.providerStore;
exports.componentStore = _writers.componentStore;


},{"./bootstrap":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/bootstrap.js","./bundle":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/bundle.js","./classes/metastore":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/classes/metastore.js","./classes/module":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/classes/module.js","./classes/opaque-token":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/classes/opaque-token.js","./classes/provider":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/classes/provider.js","./decorators/component":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/component.js","./decorators/directive":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/directive.js","./decorators/inject":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/inject.js","./decorators/injectable":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/injectable.js","./decorators/input-output":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/input-output.js","./decorators/pipe":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/pipe.js","./decorators/providers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/providers.js","./decorators/state-config":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/state-config.js","./events/event-emitter":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/events/event-emitter.js","./events/events":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/events/events.js","./util/get-injectable-name":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/get-injectable-name.js","./util/jqlite-extensions":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/jqlite-extensions.js","./writers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/writers.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/properties/inputs-builder.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.inputsMap = inputsMap;
exports['default'] = inputsBuilder;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BIND_STRING = '_bind_string_';
var BIND_ONEWAY = '_bind_oneway_';
var BIND_TWOWAY = '_bind_twoway_';
function isDefined(value) {
    return typeof value !== 'undefined';
}

function inputsMap(inputs) {
    var definition = {};
    for (var key in inputs) {
        var lowercaseInput = inputs[key];
        definition['@' + key] = '@' + lowercaseInput;
        definition['[' + inputs[key] + ']'] = '=?';
        definition['[(' + inputs[key] + ')]'] = '=?';
    }
    return definition;
}

function inputsBuilder(controller, localKey, publicKey) {
    var _Object$defineProperties;

    // We are going to be installing a lot of properties on the controller to handle the magic
    // of our input bindings. Here we are marking them as hidden but writeable, that way
    // we don't leak our abstraction
    var stringKey = '@' + localKey;
    var oneWayKey = '[' + publicKey + ']';
    var twoWayKey = '[(' + publicKey + ')]';
    var __stringKey = Symbol();
    var __oneWayKey = Symbol();
    var __twoWayKey = Symbol();
    var __using_binding = Symbol();
    Object.defineProperties(controller, (_Object$defineProperties = {}, _defineProperty(_Object$defineProperties, stringKey, {
        enumerable: false, configurable: false,
        set: createHiddenPropSetter(BIND_STRING, __stringKey),
        get: function get() {
            return this[__stringKey];
        }
    }), _defineProperty(_Object$defineProperties, oneWayKey, {
        enumerable: false, configurable: false,
        set: createHiddenPropSetter(BIND_ONEWAY, __oneWayKey),
        get: function get() {
            return this[__oneWayKey];
        }
    }), _defineProperty(_Object$defineProperties, twoWayKey, {
        enumerable: false, configurable: false,
        set: createHiddenPropSetter(BIND_TWOWAY, __twoWayKey),
        get: function get() {
            return this[localKey];
        }
    }), _defineProperty(_Object$defineProperties, __using_binding, {
        enumerable: false, configurable: false, writable: true,
        value: controller.__using_binding || {}
    }), _Object$defineProperties));
    function createHiddenPropSetter(BIND_TYPE, __privateKey) {
        return function (val) {
            this[__privateKey] = val;
            if (isDefined(val)) {
                setBindingUsed(BIND_TYPE, localKey);
            }
            if (controller[__using_binding][localKey] === BIND_TYPE) {
                this[localKey] = val;
            }
        };
    }
    function setBindingUsed(using, key) {
        if (controller[__using_binding][key] && controller[__using_binding][key] !== using) {
            throw new Error('Can not use more than one type of attribute binding simultaneously: ' + key + ', [' + key + '], [(' + key + ')]. Choose one.');
        }
        controller[__using_binding][key] = using;
    }
}


},{}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/properties/outputs-builder.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _eventsEventEmitter = require('../events/event-emitter');

var _eventsEventEmitter2 = _interopRequireDefault(_eventsEventEmitter);

var _utilCustomEvent = require('../util/custom-event');

var _utilCustomEvent2 = _interopRequireDefault(_utilCustomEvent);

exports['default'] = function (instance, element, $scope, outputs) {
    var subscriptions = [];
    var create = function create(eventKey, emitter) {
        return emitter.subscribe(function (data) {
            var event = new _utilCustomEvent2['default'](eventKey, { detail: data, bubbles: false });
            element[0].dispatchEvent(event);
        });
    };
    for (var key in outputs) {
        if (instance[key] && instance[key] instanceof _eventsEventEmitter2['default']) {
            subscriptions.push(create(outputs[key], instance[key]));
        }
    }
    $scope.$on('$destroy', function (event) {
        subscriptions.forEach(function (subscription) {
            return subscription.unsubscribe();
        });
    });
};

module.exports = exports['default'];


},{"../events/event-emitter":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/events/event-emitter.js","../util/custom-event":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/custom-event.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/properties/parse-property-map.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = function (props) {
    var map = {};
    for (var i = 0; i < props.length; i++) {
        var split = props[i].split(':');
        for (var y = 0; y < split.length; y++) {
            split[y] = split[y].trim();
        }
        if (split.length === 1) {
            map[split[0]] = split[0];
        } else if (split.length === 2) {
            map[split[0]] = split[1];
        } else {
            throw new Error('Inputs and outputs must be in the form of "propName: attrName" or in the form of "attrName"');
        }
    }
    return map;
};

module.exports = exports['default'];


},{}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/custom-event.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var NativeCustomEvent = CustomEvent;
function useNative() {
    try {
        var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
        return 'cat' === p.type && 'bar' === p.detail.foo;
    } catch (e) {
        return false;
    }
}
function fromCreateEvent(type) {
    var params = arguments.length <= 1 || arguments[1] === undefined ? { bubbles: false, cancelable: false, detail: {} } : arguments[1];

    var e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
    return e;
}
function fromCreateEventObject(type) {
    var params = arguments.length <= 1 || arguments[1] === undefined ? { bubbles: false, cancelable: false, detail: {} } : arguments[1];

    var e = document.createEventObject();
    e.type = type;
    e.bubbles = params.bubbles;
    e.cancelable = params.cancelable;
    e.detail = params.detail;
    return e;
}
var eventExport = undefined;
if (useNative()) {
    eventExport = NativeCustomEvent;
} else if (typeof document.createEvent === 'function') {
    eventExport = fromCreateEvent;
} else {
    eventExport = fromCreateEventObject;
}
exports['default'] = eventExport;
module.exports = exports['default'];


},{}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/decorator-factory.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _writers = require('../writers');

var randomInt = function randomInt() {
    return Math.floor(Math.random() * 100);
};

exports['default'] = function (type) {
    var strategyType = arguments.length <= 1 || arguments[1] === undefined ? 'provider' : arguments[1];

    var names = new Set();
    function createUniqueName(_x2) {
        var _again = true;

        _function: while (_again) {
            var name = _x2;
            _again = false;

            if (names.has(name)) {
                _x2 = '' + name + randomInt();
                _again = true;
                continue _function;
            } else {
                return name;
            }
        }
    }
    ;
    var NAME_TAKEN_ERROR = function NAME_TAKEN_ERROR(name) {
        return new Error('A provider with type ' + type + ' and name ' + name + ' has already been registered');
    };
    return (function () {
        var d = function d(maybeT) {
            var writeWithUniqueName = function writeWithUniqueName(t) {
                var name = createUniqueName(t.name);
                _writers.providerStore.set('type', type, t);
                _writers.providerStore.set('name', name, t);
                names.add(name);
            };
            if (typeof maybeT === 'string') {
                if (names.has(maybeT)) {
                    throw NAME_TAKEN_ERROR(maybeT);
                }
                return function (t) {
                    _writers.providerStore.set('type', type, t);
                    _writers.providerStore.set('name', maybeT, t);
                    names.add(maybeT);
                };
            } else if (maybeT === undefined) {
                return function (t) {
                    return writeWithUniqueName(t);
                };
            }
            writeWithUniqueName(maybeT);
        };
        d.clearNameCache = function () {
            return names.clear();
        };
        return d;
    })();
};

;
module.exports = exports['default'];


},{"../writers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/writers.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/directive-controller.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _propertiesInputsBuilder = require('../properties/inputs-builder');

var _propertiesInputsBuilder2 = _interopRequireDefault(_propertiesInputsBuilder);

var _propertiesOutputsBuilder = require('../properties/outputs-builder');

var _propertiesOutputsBuilder2 = _interopRequireDefault(_propertiesOutputsBuilder);

var _decoratorsComponent = require('../decorators/component');

exports['default'] = function (caller, injects, controller, ddo, $injector, locals) {
    var instance = Object.create(controller.prototype);
    _decoratorsComponent.componentHooks._beforeCtrlInvoke.forEach(function (hook) {
        return hook(caller, injects, controller, ddo, $injector, locals);
    });
    $injector.invoke([].concat(_toConsumableArray(injects), [controller]), instance, locals);
    _decoratorsComponent.componentHooks._afterCtrlInvoke.forEach(function (hook) {
        return hook(caller, injects, controller, ddo, $injector, locals);
    });
    for (var key in ddo.inputMap) {
        (0, _propertiesInputsBuilder2['default'])(instance, key, ddo.inputMap[key]);
    }
    Object.assign(instance, caller);
    var $element = locals.$element;
    var $scope = locals.$scope;

    (0, _propertiesOutputsBuilder2['default'])(instance, $element, $scope, ddo.outputMap || {});
    if (typeof instance.ngOnInit === 'function') {
        instance.ngOnInit();
    }
    if (typeof instance.ngOnDestroy === 'function') {
        $scope.$on('$destroy', instance.ngOnDestroy.bind(instance));
    }
    if (typeof instance.ngAfterViewInit === 'function') {
        ddo.ngAfterViewInitBound = instance.ngAfterViewInit.bind(instance);
    }
    return instance;
};

module.exports = exports['default'];


},{"../decorators/component":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/component.js","../properties/inputs-builder":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/properties/inputs-builder.js","../properties/outputs-builder":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/properties/outputs-builder.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/get-injectable-name.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _writers = require('../writers');

var _decoratorsInjectable = require('../decorators/injectable');

var _classesOpaqueToken = require('../classes/opaque-token');

var getInjectableName = function getInjectableName(injectable) {
    if (typeof injectable === 'string' || injectable instanceof _classesOpaqueToken.OpaqueToken) {
        return injectable.toString();
    } else if (_writers.providerStore.has('type', injectable)) {
        return _writers.providerStore.get('name', injectable);
    }
};
exports.getInjectableName = getInjectableName;
var getInjectableNameWithJitCreation = function getInjectableNameWithJitCreation(injectable) {
    var name = getInjectableName(injectable);
    if (name) {
        return name;
    }
    if (typeof injectable === 'function') {
        (0, _decoratorsInjectable.Injectable)(injectable);
        return _writers.providerStore.get('name', injectable);
    }
};
exports.getInjectableNameWithJitCreation = getInjectableNameWithJitCreation;


},{"../classes/opaque-token":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/classes/opaque-token.js","../decorators/injectable":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/decorators/injectable.js","../writers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/writers.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/group-modules-providers.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = groupModulesAndProviders;

var _writers = require('../writers');

var _helpers = require('./helpers');

var _classesProvider = require('./../classes/provider');

var STRING_TEST = function STRING_TEST(a) {
    return typeof a === 'string';
};
var PROVIDER_TEST = function PROVIDER_TEST(a) {
    return (typeof a === 'function' || a instanceof _classesProvider.Provider) && _writers.providerStore.has('name', a);
};

function groupModulesAndProviders(modulesAndProviders) {
    var errorContext = arguments.length <= 1 || arguments[1] === undefined ? 'while analyzing providers' : arguments[1];

    modulesAndProviders = (0, _helpers.flatten)(modulesAndProviders);
    var modules = modulesAndProviders.filter(STRING_TEST);
    var providers = modulesAndProviders.filter(PROVIDER_TEST);
    var invalid = modulesAndProviders.filter(function (a) {
        return !STRING_TEST(a);
    }).filter(function (a) {
        return !PROVIDER_TEST(a);
    });
    if (invalid.length > 0) {
        throw new TypeError('TypeError ' + errorContext + '.\n    Invalid Providers: please make sure all providers are an Injectable(), Component(), Directive(), a Provider, or a module string.\n    Here\'s the invalid values: ' + invalid.join(', '));
    }
    return { modules: modules, providers: providers };
}

module.exports = exports['default'];


},{"../writers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/writers.js","./../classes/provider":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/classes/provider.js","./helpers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/helpers.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/helpers.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.ucFirst = ucFirst;
exports.dashToCamel = dashToCamel;
exports.dasherize = dasherize;
exports.snakeCase = snakeCase;
exports.flatten = flatten;
exports.createConfigErrorMessage = createConfigErrorMessage;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var SNAKE_CASE_REGEXP = /[A-Z]/g;

function ucFirst(word) {
    return '' + word.charAt(0).toUpperCase() + word.substring(1);
}

function dashToCamel(dash) {
    var words = dash.split('-');
    return '' + words.shift() + words.map(ucFirst).join('');
}

function dasherize(name) {
    var separator = arguments.length <= 1 || arguments[1] === undefined ? '-' : arguments[1];

    return name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
        return '' + (pos ? separator : '') + letter.toLowerCase();
    });
}

function snakeCase(name) {
    var separator = arguments.length <= 1 || arguments[1] === undefined ? '-' : arguments[1];

    return name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
        return '' + (pos ? separator : '') + letter.toLowerCase();
    });
}

function flatten(items) {
    var resolved = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            if (Array.isArray(item)) {
                resolved.push.apply(resolved, _toConsumableArray(flatten(item)));
            } else {
                resolved.push(item);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return resolved;
}

function createConfigErrorMessage(target, ngModule, message) {
    return 'Processing "' + target.name + '" in "' + ngModule.name + '": ' + message;
}


},{}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/jqlite-extensions.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _writers = require('../writers');

var _getInjectableName = require('./get-injectable-name');

var By = (function () {
    function By() {
        _classCallCheck(this, By);
    }

    _createClass(By, null, [{
        key: 'all',
        value: function all() {
            return '*';
        }
    }, {
        key: 'css',
        value: function css(selector) {
            return selector;
        }
    }, {
        key: 'directive',
        value: function directive(type) {
            return _writers.bundleStore.get('selector', type);
        }
    }]);

    return By;
})();

exports.By = By;

(function extendJQLite(proto) {
    Object.defineProperties(proto, {
        nativeElement: {
            get: function get() {
                return this[0];
            }
        },
        componentInstance: {
            get: function get() {
                if (this._componentInstance) return this._componentInstance;
                var isolateScope = this.isolateScope();
                this._componentInstance = isolateScope && isolateScope['ctrl'] || null;
                return this._componentInstance;
            }
        },
        componentViewChildren: {
            get: function get() {
                return [].concat(_toConsumableArray(this.children())).map(function (child) {
                    return angular.element(child);
                });
            }
        },
        getLocal: {
            value: function value(injectable) {
                return (this.injector() || this.inheritedData('$injector')).get((0, _getInjectableName.getInjectableName)(injectable));
            }
        },
        query: {
            value: function value(predicate, scope) {
                var results = this.queryAll(predicate, scope);
                return results.length > 0 ? results[0] : null;
            }
        },
        queryAll: {
            value: function value(predicate, scope) {
                if (scope) throw Error('scope argument not yet supported. All queries are done with Scope.all for now.');
                return Array.from(this[0].querySelectorAll(predicate)).map(function (el) {
                    return angular.element(el);
                });
            }
        },
        getDirectiveInstance: {
            value: function value(index) {
                throw new Error('Not yet implemented in ng-forward.');
            }
        },
        triggerEventHandler: {
            value: function value(eventName, eventObj) {
                throw new Error('Not yet implemented in ng-forward.');
            }
        },
        inject: {
            value: function value(type) {
                throw new Error('Not yet implemented in ng-forward.');
            }
        },
        hasDirective: {
            value: function value(type) {
                throw new Error('Not yet implemented in ng-forward.');
            }
        }
    });
})(angular.element.prototype);
exports['default'] = angular.element;


},{"../writers":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/writers.js","./get-injectable-name":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/get-injectable-name.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/util/parse-selector.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

exports['default'] = function (selector) {
    var selectorArray = undefined;
    var type = undefined;
    if (selector.match(/\[(.*?)\]/) !== null) {
        selectorArray = selector.slice(1, selector.length - 1).split('-');
        type = 'A';
    } else if (selector[0] === '.') {
        selectorArray = selector.slice(1, selector.length).split('-');
        type = 'C';
    } else {
        selectorArray = selector.split('-');
        type = 'E';
    }
    var first = selectorArray.shift();
    var name = undefined;
    if (selectorArray.length > 0) {
        for (var i = 0; i < selectorArray.length; i++) {
            var s = selectorArray[i];
            s = s.slice(0, 1).toUpperCase() + s.slice(1, s.length);
            selectorArray[i] = s;
        }
        name = [first].concat(_toConsumableArray(selectorArray)).join('');
    } else {
        name = first;
    }
    return { name: name, type: type };
};

module.exports = exports['default'];


},{}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/writers.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _classesMetastore = require('./classes/metastore');

var _classesMetastore2 = _interopRequireDefault(_classesMetastore);

var componentStore = new _classesMetastore2['default']('$component');
exports.componentStore = componentStore;
var providerStore = new _classesMetastore2['default']('$provider');
exports.providerStore = providerStore;
var bundleStore = new _classesMetastore2['default']('$bundle');
exports.bundleStore = bundleStore;


},{"./classes/metastore":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/classes/metastore.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/index.js":[function(require,module,exports){
module.exports = require('./cjs');
},{"./cjs":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/cjs/index.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/Observable.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Subscriber = require('./Subscriber');

var _Subscriber2 = _interopRequireDefault(_Subscriber);

var _utilRoot = require('./util/root');

var _utilSymbol_observable = require('./util/Symbol_observable');

var _utilSymbol_observable2 = _interopRequireDefault(_utilSymbol_observable);

/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */

var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is
     * called when the Observable is initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or `complete` can be called to notify
     * of a successful completion.
     */

    function Observable(subscribe) {
        _classCallCheck(this, Observable);

        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }

    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * @static
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @returns {Observable} a new cold observable
     * @description creates a new cold Observable by calling the Observable constructor
     */

    /**
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @returns {Observable} a new observable with the Operator applied
     * @description creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     */

    Observable.prototype.lift = function lift(operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };

    /**
     * @method Symbol.observable
     * @returns {Observable} this instance of the observable
     * @description an interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     */

    Observable.prototype[_utilSymbol_observable2['default']] = function () {
        return this;
    };

    /**
     * @method subscribe
     * @param {Observer|Function} observerOrNext (optional) either an observer defining all functions to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
     * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled
     * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
     * @returns {Subscription} a subscription reference to the registered handlers
     * @description registers handlers for handling emitted values, error and completions from the observable, and
     *  executes the observable's subscriber function, which will take action to set up the underlying data stream
     */

    Observable.prototype.subscribe = function subscribe(observerOrNext, error, complete) {
        var subscriber = undefined;
        if (observerOrNext && typeof observerOrNext === "object") {
            if (observerOrNext instanceof _Subscriber2['default']) {
                subscriber = observerOrNext;
            } else {
                subscriber = new _Subscriber2['default'](observerOrNext);
            }
        } else {
            var next = observerOrNext;
            subscriber = _Subscriber2['default'].create(next, error, complete);
        }
        subscriber.add(this._subscribe(subscriber));
        return subscriber;
    };

    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} PromiseCtor? a constructor function used to instantiate the Promise
     * @returns {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */

    Observable.prototype.forEach = function forEach(next, PromiseCtor) {
        var _this = this;

        if (!PromiseCtor) {
            if (_utilRoot.root.Rx && _utilRoot.root.Rx.config && _utilRoot.root.Rx.config.Promise) {
                PromiseCtor = _utilRoot.root.Rx.config.Promise;
            } else if (_utilRoot.root.Promise) {
                PromiseCtor = _utilRoot.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            _this.subscribe(next, reject, resolve);
        });
    };

    Observable.prototype._subscribe = function _subscribe(subscriber) {
        return this.source._subscribe(this.operator.call(subscriber));
    };

    return Observable;
})();

exports['default'] = Observable;
Observable.create = function (subscribe) {
    return new Observable(subscribe);
};

module.exports = exports['default'];

},{"./Subscriber":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/Subscriber.js","./util/Symbol_observable":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/util/Symbol_observable.js","./util/root":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/util/root.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/Subject.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Observable2 = require('./Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _Subscriber = require('./Subscriber');

var _Subscriber2 = _interopRequireDefault(_Subscriber);

var _Subscription = require('./Subscription');

var _Subscription2 = _interopRequireDefault(_Subscription);

var _subjectsSubjectSubscription = require('./subjects/SubjectSubscription');

var _subjectsSubjectSubscription2 = _interopRequireDefault(_subjectsSubjectSubscription);

var subscriptionAdd = _Subscription2['default'].prototype.add;
var subscriptionRemove = _Subscription2['default'].prototype.remove;
var subscriptionUnsubscribe = _Subscription2['default'].prototype.unsubscribe;
var subscriberNext = _Subscriber2['default'].prototype.next;
var subscriberError = _Subscriber2['default'].prototype.error;
var subscriberComplete = _Subscriber2['default'].prototype.complete;
var _subscriberNext = _Subscriber2['default'].prototype._next;
var _subscriberError = _Subscriber2['default'].prototype._error;
var _subscriberComplete = _Subscriber2['default'].prototype._complete;

var Subject = (function (_Observable) {
    _inherits(Subject, _Observable);

    function Subject() {
        _classCallCheck(this, Subject);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _Observable.call.apply(_Observable, [this].concat(args));
        this.observers = [];
        this.isUnsubscribed = false;
        this.dispatching = false;
        this.errorSignal = false;
        this.completeSignal = false;
    }

    Subject.create = function create(source, destination) {
        return new BidirectionalSubject(source, destination);
    };

    Subject.prototype.lift = function lift(operator) {
        var subject = new BidirectionalSubject(this, this.destination || this);
        subject.operator = operator;
        return subject;
    };

    Subject.prototype._subscribe = function _subscribe(subscriber) {
        if (subscriber.isUnsubscribed) {
            return;
        } else if (this.errorSignal) {
            subscriber.error(this.errorInstance);
            return;
        } else if (this.completeSignal) {
            subscriber.complete();
            return;
        } else if (this.isUnsubscribed) {
            throw new Error("Cannot subscribe to a disposed Subject.");
        }
        this.observers.push(subscriber);
        return new _subjectsSubjectSubscription2['default'](this, subscriber);
    };

    Subject.prototype.add = function add(subscription) {
        subscriptionAdd.call(this, subscription);
    };

    Subject.prototype.remove = function remove(subscription) {
        subscriptionRemove.call(this, subscription);
    };

    Subject.prototype.unsubscribe = function unsubscribe() {
        this.observers = void 0;
        subscriptionUnsubscribe.call(this);
    };

    Subject.prototype.next = function next(value) {
        if (this.isUnsubscribed) {
            return;
        }
        this.dispatching = true;
        this._next(value);
        this.dispatching = false;
        if (this.errorSignal) {
            this.error(this.errorInstance);
        } else if (this.completeSignal) {
            this.complete();
        }
    };

    Subject.prototype.error = function error(_error) {
        if (this.isUnsubscribed || this.completeSignal) {
            return;
        }
        this.errorSignal = true;
        this.errorInstance = _error;
        if (this.dispatching) {
            return;
        }
        this._error(_error);
        this.unsubscribe();
    };

    Subject.prototype.complete = function complete() {
        if (this.isUnsubscribed || this.errorSignal) {
            return;
        }
        this.completeSignal = true;
        if (this.dispatching) {
            return;
        }
        this._complete();
        this.unsubscribe();
    };

    Subject.prototype._next = function _next(value) {
        var index = -1;
        var observers = this.observers.slice(0);
        var len = observers.length;
        while (++index < len) {
            observers[index].next(value);
        }
    };

    Subject.prototype._error = function _error(error) {
        var index = -1;
        var observers = this.observers;
        var len = observers.length;
        // optimization -- block next, complete, and unsubscribe while dispatching
        this.observers = void 0;
        this.isUnsubscribed = true;
        while (++index < len) {
            observers[index].error(error);
        }
        this.isUnsubscribed = false;
    };

    Subject.prototype._complete = function _complete() {
        var index = -1;
        var observers = this.observers;
        var len = observers.length;
        // optimization -- block next, complete, and unsubscribe while dispatching
        this.observers = void 0; // optimization
        this.isUnsubscribed = true;
        while (++index < len) {
            observers[index].complete();
        }
        this.isUnsubscribed = false;
    };

    return Subject;
})(_Observable3['default']);

exports['default'] = Subject;

var BidirectionalSubject = (function (_Subject) {
    _inherits(BidirectionalSubject, _Subject);

    function BidirectionalSubject(source, destination) {
        _classCallCheck(this, BidirectionalSubject);

        _Subject.call(this);
        this.source = source;
        this.destination = destination;
    }

    

    BidirectionalSubject.prototype._subscribe = function _subscribe(subscriber) {
        var operator = this.operator;
        return this.source._subscribe.call(this.source, operator ? operator.call(subscriber) : subscriber);
    };

    BidirectionalSubject.prototype.next = function next(x) {
        subscriberNext.call(this, x);
    };

    BidirectionalSubject.prototype.error = function error(e) {
        subscriberError.call(this, e);
    };

    BidirectionalSubject.prototype.complete = function complete() {
        subscriberComplete.call(this);
    };

    BidirectionalSubject.prototype._next = function _next(x) {
        _subscriberNext.call(this, x);
    };

    BidirectionalSubject.prototype._error = function _error(e) {
        _subscriberError.call(this, e);
    };

    BidirectionalSubject.prototype._complete = function _complete() {
        _subscriberComplete.call(this);
    };

    return BidirectionalSubject;
})(Subject);

module.exports = exports['default'];

},{"./Observable":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/Observable.js","./Subscriber":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/Subscriber.js","./Subscription":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/Subscription.js","./subjects/SubjectSubscription":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/subjects/SubjectSubscription.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/Subscriber.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilNoop = require('./util/noop');

var _utilNoop2 = _interopRequireDefault(_utilNoop);

var _utilThrowError = require('./util/throwError');

var _utilThrowError2 = _interopRequireDefault(_utilThrowError);

var _utilTryOrOnError = require('./util/tryOrOnError');

var _utilTryOrOnError2 = _interopRequireDefault(_utilTryOrOnError);

var _Subscription2 = require('./Subscription');

var _Subscription3 = _interopRequireDefault(_Subscription2);

var Subscriber = (function (_Subscription) {
    _inherits(Subscriber, _Subscription);

    function Subscriber(destination) {
        _classCallCheck(this, Subscriber);

        _Subscription.call(this);
        this.destination = destination;
        this._isUnsubscribed = false;
        if (!this.destination) {
            return;
        }
        var subscription = destination._subscription;
        if (subscription) {
            this._subscription = subscription;
        } else if (destination instanceof Subscriber) {
            this._subscription = destination;
        }
    }

    

    Subscriber.create = function create(next, error, complete) {
        var subscriber = new Subscriber();
        subscriber._next = typeof next === "function" && _utilTryOrOnError2['default'](next) || _utilNoop2['default'];
        subscriber._error = typeof error === "function" && error || _utilThrowError2['default'];
        subscriber._complete = typeof complete === "function" && complete || _utilNoop2['default'];
        return subscriber;
    };

    Subscriber.prototype.add = function add(sub) {
        // route add to the shared Subscription if it exists
        var _subscription = this._subscription;
        if (_subscription) {
            _subscription.add(sub);
        } else {
            _Subscription.prototype.add.call(this, sub);
        }
    };

    Subscriber.prototype.remove = function remove(sub) {
        // route remove to the shared Subscription if it exists
        if (this._subscription) {
            this._subscription.remove(sub);
        } else {
            _Subscription.prototype.remove.call(this, sub);
        }
    };

    Subscriber.prototype.unsubscribe = function unsubscribe() {
        if (this._isUnsubscribed) {
            return;
        } else if (this._subscription) {
            this._isUnsubscribed = true;
        } else {
            _Subscription.prototype.unsubscribe.call(this);
        }
    };

    Subscriber.prototype._next = function _next(value) {
        this.destination.next(value);
    };

    Subscriber.prototype._error = function _error(err) {
        this.destination.error(err);
    };

    Subscriber.prototype._complete = function _complete() {
        this.destination.complete();
    };

    Subscriber.prototype.next = function next(value) {
        if (!this.isUnsubscribed) {
            this._next(value);
        }
    };

    Subscriber.prototype.error = function error(_error2) {
        if (!this.isUnsubscribed) {
            this._error(_error2);
            this.unsubscribe();
        }
    };

    Subscriber.prototype.complete = function complete() {
        if (!this.isUnsubscribed) {
            this._complete();
            this.unsubscribe();
        }
    };

    _createClass(Subscriber, [{
        key: 'isUnsubscribed',
        get: function get() {
            var subscription = this._subscription;
            if (subscription) {
                // route to the shared Subscription if it exists
                return this._isUnsubscribed || subscription.isUnsubscribed;
            } else {
                return this._isUnsubscribed;
            }
        },
        set: function set(value) {
            var subscription = this._subscription;
            if (subscription) {
                // route to the shared Subscription if it exists
                subscription.isUnsubscribed = Boolean(value);
            } else {
                this._isUnsubscribed = Boolean(value);
            }
        }
    }]);

    return Subscriber;
})(_Subscription3['default']);

exports['default'] = Subscriber;
module.exports = exports['default'];

},{"./Subscription":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/Subscription.js","./util/noop":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/util/noop.js","./util/throwError":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/util/throwError.js","./util/tryOrOnError":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/util/tryOrOnError.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/Subscription.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Subscription = (function () {
    function Subscription(_unsubscribe) {
        _classCallCheck(this, Subscription);

        this.isUnsubscribed = false;
        if (_unsubscribe) {
            this._unsubscribe = _unsubscribe;
        }
    }

    Subscription.prototype._unsubscribe = function _unsubscribe() {};

    Subscription.prototype.unsubscribe = function unsubscribe() {
        if (this.isUnsubscribed) {
            return;
        }
        this.isUnsubscribed = true;
        var unsubscribe = this._unsubscribe;
        var subscriptions = this._subscriptions;
        this._subscriptions = void 0;
        if (unsubscribe) {
            unsubscribe.call(this);
        }
        if (subscriptions != null) {
            var index = -1;
            var len = subscriptions.length;
            while (++index < len) {
                subscriptions[index].unsubscribe();
            }
        }
    };

    Subscription.prototype.add = function add(subscription) {
        // return early if:
        //  1. the subscription is null
        //  2. we're attempting to add our this
        //  3. we're attempting to add the static `empty` Subscription
        if (!subscription || subscription === this || subscription === Subscription.EMPTY) {
            return;
        }
        var sub = subscription;
        switch (typeof subscription) {
            case "function":
                sub = new Subscription(subscription);
            case "object":
                if (sub.isUnsubscribed || typeof sub.unsubscribe !== "function") {
                    break;
                } else if (this.isUnsubscribed) {
                    sub.unsubscribe();
                } else {
                    var subscriptions = this._subscriptions || (this._subscriptions = []);
                    subscriptions.push(sub);
                }
                break;
            default:
                throw new Error('Unrecognized subscription ' + subscription + ' added to Subscription.');
        }
    };

    Subscription.prototype.remove = function remove(subscription) {
        // return early if:
        //  1. the subscription is null
        //  2. we're attempting to remove ourthis
        //  3. we're attempting to remove the static `empty` Subscription
        if (subscription == null || subscription === this || subscription === Subscription.EMPTY) {
            return;
        }
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };

    return Subscription;
})();

exports["default"] = Subscription;

Subscription.EMPTY = (function (empty) {
    empty.isUnsubscribed = true;
    return empty;
})(new Subscription());

module.exports = exports["default"];

},{}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/subjects/SubjectSubscription.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Subscription2 = require('../Subscription');

var _Subscription3 = _interopRequireDefault(_Subscription2);

var _Subscriber = require('../Subscriber');

var _Subscriber2 = _interopRequireDefault(_Subscriber);

var SubjectSubscription = (function (_Subscription) {
    _inherits(SubjectSubscription, _Subscription);

    function SubjectSubscription(subject, observer) {
        _classCallCheck(this, SubjectSubscription);

        _Subscription.call(this);
        this.subject = subject;
        this.observer = observer;
        this.isUnsubscribed = false;
    }

    

    SubjectSubscription.prototype.unsubscribe = function unsubscribe() {
        if (this.isUnsubscribed) {
            return;
        }
        this.isUnsubscribed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = void 0;
        if (!observers || observers.length === 0 || subject.isUnsubscribed) {
            return;
        }
        if (this.observer instanceof _Subscriber2['default']) {
            this.observer.unsubscribe();
        }
        var subscriberIndex = observers.indexOf(this.observer);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };

    return SubjectSubscription;
})(_Subscription3['default']);

exports['default'] = SubjectSubscription;
module.exports = exports['default'];

},{"../Subscriber":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/Subscriber.js","../Subscription":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/Subscription.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/util/Symbol_observable.js":[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _root = require('./root');

if (!_root.root.Symbol) {
    _root.root.Symbol = {};
}
if (!_root.root.Symbol.observable) {
    if (typeof _root.root.Symbol['for'] === 'function') {
        _root.root.Symbol.observable = _root.root.Symbol['for']('observable');
    } else {
        _root.root.Symbol.observable = '@@observable';
    }
}
exports['default'] = _root.root.Symbol.observable;


module.exports = exports['default'];

},{"./root":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/util/root.js"}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/util/noop.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = noop;

function noop() {}


module.exports = exports["default"];

},{}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/util/root.js":[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;
var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
};
var root = objectTypes[typeof self] && self || objectTypes[typeof window] && window;
exports.root = root;
var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
var freeGlobal = objectTypes[typeof global] && global;
if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    exports.root = root = freeGlobal;
}


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/util/throwError.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = throwError;

function throwError(e) {
  throw e;
}


module.exports = exports["default"];

},{}],"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/node_modules/@reactivex/rxjs/dist/cjs/util/tryOrOnError.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = tryOrOnError;

function tryOrOnError(target) {
    function tryCatcher() {
        try {
            tryCatcher.target.apply(this, arguments);
        } catch (e) {
            this.error(e);
        }
    }
    tryCatcher.target = target;
    return tryCatcher;
}


module.exports = exports["default"];

},{}],"/Users/michaellynch/Projects/DivisionMap/src/js/modules/builds/builds.module.ts":[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../../../typings/main.d.ts"/>
var ng_forward_1 = require('ng-forward');
var builds_ts_1 = require('./builds.ts');
var App = (function () {
    function App() {
    }
    App = __decorate([
        ng_forward_1.Component({
            selector: 'builds-app',
            template: "<div></div>"
        }),
        ng_forward_1.StateConfig([
            { url: '/builds', component: builds_ts_1.default, name: 'builds' }
        ]), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
ng_forward_1.bundle('theDivisionAgent.builds', App);

},{"./builds.ts":"/Users/michaellynch/Projects/DivisionMap/src/js/modules/builds/builds.ts","ng-forward":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/index.js"}],"/Users/michaellynch/Projects/DivisionMap/src/js/modules/builds/builds.ts":[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ng_forward_1 = require('ng-forward');
var BuildComponent = (function () {
    function BuildComponent() {
        this.text = "Foobar";
    }
    BuildComponent = __decorate([
        ng_forward_1.Component({
            selector: 'build-component',
            template: "\n        <div id=\"page-builds\">\n            <div class=\"jumbotron header-cover\">\n                <div class=\"container\">\n                    <h2><b>Builds</b></h2>\n                </div>\n            </div>\n            <div class=\"container\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        {{ctrl.text}}\n                    </div>\n                </div>\n                <footer></footer>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], BuildComponent);
    return BuildComponent;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BuildComponent;

},{"ng-forward":"/Users/michaellynch/Projects/DivisionMap/node_modules/ng-forward/index.js"}]},{},["/Users/michaellynch/Projects/DivisionMap/src/js/modules/builds/builds.module.ts"]);
