function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var defaultOptions = {
  base: {
    reverse: 'reverse'
  },
  speed: 1,
  debug: false
};

var version = "1.0.2";

var MonocerosError = /*#__PURE__*/function (_Error) {
  _inherits(MonocerosError, _Error);

  var _super = _createSuper(MonocerosError);

  function MonocerosError(message) {
    var _this;

    _classCallCheck(this, MonocerosError);

    _this = _super.call(this);
    _this.name = _this.constructor.name;
    _this.message = message;
    return _this;
  }

  return MonocerosError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var ReverseScrollPluginError = /*#__PURE__*/function (_MonocerosError) {
  _inherits(ReverseScrollPluginError, _MonocerosError);

  var _super2 = _createSuper(ReverseScrollPluginError);

  function ReverseScrollPluginError(message, pluginName) {
    var _this2;

    _classCallCheck(this, ReverseScrollPluginError);

    _this2 = _super2.call(this, message);
    _this2.pluginName = pluginName;
    return _this2;
  }

  return ReverseScrollPluginError;
}(MonocerosError);

var ReverseScrollPlugin = function ReverseScrollPlugin(cluster, overrides) {
  var _this = this;

  this.name = 'ReverseScrollPlugin';
  this.version = version;
  this.cluster = cluster.createCluster();
  this.instances = [];
  this.dom = this.cluster.resolve('dom');
  this.options = this.cluster.resolve('options.create')(this.cluster.resolve('options'), defaultOptions, overrides);
  this.log = this.cluster.resolve('utils.log');

  this.logError = function (error) {
    return console.error(error);
  };

  this.getScrollTop = function (el) {
    return el.getBoundingClientRect().top;
  };

  this.updateScroller = function (index) {
    var instance = _this.instances[index];
    var el = instance.el;

    var scrollTop = _this.getScrollTop(el.closest(_this.options.selectors.section));

    var aboveContainer = scrollTop > 0;

    var belowContainer = !aboveContainer && Math.abs(scrollTop) > el.scrollHeight - _this.dom.viewport.clientHeight;

    var inContainer = !aboveContainer && !belowContainer;
    var scrollY = Math.abs(scrollTop);

    if (inContainer) {
      var next = scrollY + scrollY * _this.options.speed;
      instance.coordinates.y.current = next;
      instance.coordinates.y.end = scrollY;
      el.style.transform = "translate(0, ".concat(next, "px) translateZ(0)");

      if (!instance.inView) {
        if (_this.options.debug) {
          _this.log('ReverseScrollingPlugin: Entered reverse-scrolling element.', _this.instances[index]);
        }

        _this.instances[index].inView = true;
      }
    } else if (aboveContainer && instance.inView) {
      el.style.transform = 'translate(0, 0) translateZ(0)';

      if (_this.options.debug) {
        _this.log('ReverseScrollingPlugin: Left reverse-scrolling instance.', _this.instances[index]);
      }

      _this.instances[index].inView = false;
    } else if (belowContainer && instance.inView) {
      el.style.transform = "translate(0, ".concat(instance.coordinates.y.current, "px) translateZ(0)");

      if (_this.options.debug) {
        _this.log('ReverseScrollingPlugin: Left reverse-scrolling instance', _this.instances[index]);
      }

      _this.instances[index].inView = false;
    }
  };

  this.createScrollerGhost = function (el) {
    var ghost = document.createElement('div');
    ghost.style.height = el.scrollHeight * (1 / _this.options.speed) - _this.dom.viewport.clientHeight * (1 / _this.options.speed - 1) + 'px';
    el.parentNode.appendChild(ghost);
    return ghost;
  };

  this.initScroller = function (el) {
    var container = el.closest(_this.options.selectors.section);

    if (!container) {
      _this.logError(new ReverseScrollPluginError("Missing ".concat(_this.options.selectors.section, " parent for ").concat(_this.options.selectors.reverse, " element. Canceling plugin initialization.")));

      return;
    }

    var childNodes = _toConsumableArray(container.childNodes).filter(function (n) {
      return n.nodeType == 1;
    });

    if (childNodes.length > 1) {
      _this.logError(new ReverseScrollPluginError("".concat(_this.options.selectors.reverse, " should be only child of ").concat(_this.options.selectors.section, " element. Canceling plugin initialization.")));

      return;
    }

    el.style = "\n      height: 100%;\n      width: 100%;\n      left: 0;\n      top: 0;\n      position: absolute;\n    ";

    var createIndex = _this.cluster.resolve('monoceros.createInstance');

    _this.instances.push(createIndex(_this.options.base.reverse, el));

    var offset = container.scrollHeight > _this.dom.viewport.clientHeight ? _this.dom.viewport.clientHeight : container.scrollHeight;
    el.style.top = -1 * el.scrollHeight + offset + 'px';

    _this.createScrollerGhost(el, _this.dom.viewport);
  };

  this.onScroll = function () {
    _this.instances.forEach(function (_, instanceIndex) {
      _this.updateScroller(instanceIndex);
    });
  };

  this.init = function () {
    if (_this.options.speed < 0 || _this.options.speed > 1) {
      console.warn(new _this.ReverseScrollPluginError('options.speed should be a value between 0 and 1. Reverted to 1.'));
      _this.options.speed = 1;
    }

    var elements = Array.from(document.querySelectorAll(_this.options.selectors.reverse));

    if (elements.length === 0) {
      _this.logError(new ReverseScrollPluginError("Missing ".concat(_this.options.selectors.reverse, " element. Canceling plugin intialization.")));

      return;
    }

    elements.forEach(function (element, index) {
      _this.initScroller(element, index);
    });

    _this.dom.viewport.addEventListener('scroll', _this.onScroll);
  };
};

export default ReverseScrollPlugin;
