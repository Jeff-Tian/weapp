import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _typeof from "@babel/runtime/helpers/typeof";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * https://github.com/BBKolton/reactify-wc/
 * modified event naming
 **/
import React, { createRef, createElement } from 'react'; // eslint-disable-next-line

var h = React.createElement;
var SCROLL_VIEW = 'taro-scroll-view-core'; // 为了不要覆盖 wc 中 host 内置的 class 和 stencil 加入的 class

function getClassName(wc, prevProps, props) {
  var classList = Array.from(wc.classList);
  var oldClassNames = (prevProps.className || prevProps.class || '').split(' ');
  var incomingClassNames = (props.className || props.class || '').split(' ');
  var finalClassNames = [];
  classList.forEach(function (classname) {
    if (incomingClassNames.indexOf(classname) > -1) {
      finalClassNames.push(classname);
      incomingClassNames = incomingClassNames.filter(function (name) {
        return name !== classname;
      });
    } else if (oldClassNames.indexOf(classname) === -1) {
      finalClassNames.push(classname);
    }
  });
  finalClassNames = [].concat(_toConsumableArray(finalClassNames), _toConsumableArray(incomingClassNames));
  return finalClassNames.join(' ');
}

var reactifyWebComponent = function reactifyWebComponent(WC, onMount) {
  var Index = /*#__PURE__*/function (_React$Component) {
    _inherits(Index, _React$Component);

    var _super = _createSuper(Index);

    function Index(props) {
      var _this;

      _classCallCheck(this, Index);

      _this = _super.call(this, props);
      _this.eventHandlers = [];
      _this.ref = /*#__PURE__*/createRef();
      return _this;
    }

    _createClass(Index, [{
      key: "update",
      value: function update(prevProps) {
        var _this2 = this;

        this.clearEventHandlers();
        Object.entries(this.props).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              prop = _ref2[0],
              val = _ref2[1];

          if (!_this2.ref.current) return;

          if (prop === 'children') {
            return;
          }

          if (prop.toLowerCase() === 'classname') {
            _this2.ref.current.className = prevProps ? getClassName(_this2.ref.current, prevProps, _this2.props) : val;
            return;
          }

          if (prop === 'style') {
            if (typeof val === 'string') {
              return _this2.ref.current.setAttribute(prop, val);
            } else if (val && _typeof(val) === 'object') {
              for (var key in val) {
                if (/^--/.test(key)) {
                  // css variable
                  _this2.ref.current.style.setProperty(key, val[key]);
                } else {
                  _this2.ref.current.style[key] = val[key];
                }
              }

              return;
            }

            return;
          }

          if (WC === SCROLL_VIEW) {
            if (prop === 'scrollTop') {
              _this2.ref.current.mpScrollTop = val;
              return;
            }

            if (prop === 'scrollLeft') {
              _this2.ref.current.mpScrollLeft = val;
              return;
            }

            if (prop === 'scrollIntoView') {
              _this2.ref.current.mpScrollIntoView = val;
              return;
            }
          }

          if (typeof val === 'function' && prop.match(/^on[A-Z]/)) {
            var event = prop.substr(2).toLowerCase();
            var fn = val; // 解决用户监听 ScrollView 的 onScroll 会监听到原生 onScroll 的问题

            if (WC === SCROLL_VIEW && event === 'scroll') {
              fn = function fn(e) {
                if (e instanceof CustomEvent) {
                  val.apply(null, Array.from(arguments));
                }
              };
            }

            _this2.eventHandlers.push([event, fn]);

            return _this2.ref.current.addEventListener(event, fn);
          } // if (typeof val === 'function' && prop.match(/^on-[a-z]/)) {
          //   const event = prop.substr(3)
          //   this.eventHandlers.push([event, val])
          //   return this.ref.current.addEventListener(event, val)
          // }


          if (typeof val === 'string' || typeof val === 'number') {
            _this2.ref.current[prop] = val;
            return;
          }

          if (typeof val === 'boolean') {
            if (val) {
              _this2.ref.current[prop] = true;
              return _this2.ref.current.setAttribute(prop, val);
            }

            _this2.ref.current[prop] = false;
            return _this2.ref.current.removeAttribute(prop);
          }

          _this2.ref.current[prop] = val;
        });
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        this.update(prevProps);
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var forwardRef = this.props.forwardRef;

        if (typeof forwardRef === 'function') {
          forwardRef(this.ref.current);
        } else if (forwardRef && _typeof(forwardRef) === 'object' && forwardRef.hasOwnProperty('current')) {
          forwardRef.current = this.ref.current;
        } else if (typeof forwardRef === 'string') {
          console.warn('内置组件不支持字符串 ref');
        }

        this.update();
        // add onMount callback
        onMount && onMount(this.props)
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.clearEventHandlers();
      }
    }, {
      key: "clearEventHandlers",
      value: function clearEventHandlers() {
        var _this3 = this;

        this.eventHandlers.forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              event = _ref4[0],
              handler = _ref4[1];

          if (!_this3.ref.current) return;

          _this3.ref.current.removeEventListener(event, handler);
        });
        this.eventHandlers = [];
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            children = _this$props.children,
            dangerouslySetInnerHTML = _this$props.dangerouslySetInnerHTML;
        var props = {
          ref: this.ref
        };
        if (dangerouslySetInnerHTML) props.dangerouslySetInnerHTML = dangerouslySetInnerHTML;
        return /*#__PURE__*/createElement(WC, props, children);
      }
    }]);

    return Index;
  }(React.Component);

  return /*#__PURE__*/React.forwardRef(function (props, ref) {
    return /*#__PURE__*/React.createElement(Index, _objectSpread(_objectSpread({}, props), {}, {
      forwardRef: ref
    }));
  });
};

export default reactifyWebComponent;