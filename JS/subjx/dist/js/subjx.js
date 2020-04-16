/*@license
 * Drag/Rotate/Resize Library
 * Released under the MIT license, 2018-2020
 * Karen Sarksyan
 * nichollascarter@gmail.com
 */
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).subjx = e()
}(this, function() {
    "use strict";

    function p(t) {
        return (p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function s(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function n(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
    }

    function r(t, e, r) {
        return e && n(t.prototype, e), r && n(t, r), t
    }

    function e(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function I(a) {
        for (var t = 1; t < arguments.length; t++) {
            var o = null != arguments[t] ? arguments[t] : {};
            t % 2 ? e(o, !0).forEach(function(t) {
                var e, r, n;
                e = a, n = o[r = t], r in e ? Object.defineProperty(e, r, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[r] = n
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(o)) : e(o).forEach(function(t) {
                Object.defineProperty(a, t, Object.getOwnPropertyDescriptor(o, t))
            })
        }
        return a
    }

    function o(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                writable: !0,
                configurable: !0
            }
        }), e && a(t, e)
    }

    function i(t) {
        return (i = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function a(t, e) {
        return (a = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }

    function f(t, e) {
        if (null == t) return {};
        var r, n, a = function(t, e) {
            if (null == t) return {};
            var r, n, a = {},
                o = Object.keys(t);
            for (n = 0; n < o.length; n++) r = o[n], 0 <= e.indexOf(r) || (a[r] = t[r]);
            return a
        }(t, e);
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            for (n = 0; n < o.length; n++) r = o[n], 0 <= e.indexOf(r) || Object.prototype.propertyIsEnumerable.call(t, r) && (a[r] = t[r])
        }
        return a
    }

    function c(t, e) {
        return !e || "object" != typeof e && "function" != typeof e ? function(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }(t) : e
    }

    function se(t, e) {
        return function(t) {
            if (Array.isArray(t)) return t
        }(t) || function(t, e) {
            if (!(Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t))) return;
            var r = [],
                n = !0,
                a = !1,
                o = void 0;
            try {
                for (var s, i = t[Symbol.iterator](); !(n = (s = i.next()).done) && (r.push(s.value), !e || r.length !== e); n = !0);
            } catch (t) {
                a = !0, o = t
            } finally {
                try {
                    n || null == i["return"] || i["return"]()
                } finally {
                    if (a) throw o
                }
            }
            return r
        }(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }()
    }

    function W(t) {
        return function(t) {
            if (Array.isArray(t)) {
                for (var e = 0, r = new Array(t.length); e < t.length; e++) r[e] = t[e];
                return r
            }
        }(t) || function(t) {
            if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t)
        }(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }()
    }
    var G = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
            return setTimeout(t, 1e3 / 60)
        },
        x = window.cancelAnimationFrame || window.mozCancelAnimationFrame || function(t) {
            clearTimeout(t)
        },
        t = Array.prototype,
        l = t.forEach,
        u = t.slice,
        h = t.map,
        v = t.reduce,
        ie = console.warn;

    function rt(t) {
        return null != t
    }

    function U(t) {
        return null == t
    }

    function b(t) {
        return "function" == typeof t
    }

    function Q(t) {
        return b(t) ? function() {
            t.call.apply(t, [this].concat(Array.prototype.slice.call(arguments)))
        } : function() {}
    }
    var d = function() {
        function o(t) {
            if (s(this, o), "string" == typeof t) {
                var e = document.querySelectorAll(t);
                this.length = e.length;
                for (var r = 0; r < this.length; r++) this[r] = e[r]
            } else if ("object" !== p(t) || 1 !== t.nodeType && t !== document)
                if (t instanceof o) {
                    this.length = t.length;
                    for (var n = 0; n < this.length; n++) this[n] = t[n]
                } else {
                    if (! function(t) {
                            return rt(t) && "object" === p(t) && (Array.isArray(t) || rt(window.Symbol) && "function" == typeof t[window.Symbol.iterator] || rt(t.forEach) || "number" == typeof t.length && (0 === t.length || 0 < t.length && t.length - 1 in t))
                        }(t)) throw new Error("Passed parameter must be selector/element/elementArray");
                    for (var a = this.length = 0; a < this.length; a++) 1 === t.nodeType && (this[a] = t[a], this.length++)
                } else this[0] = t, this.length = 1
        }
        return r(o, [{
            key: "css",
            value: function(r) {
                var t = {
                    setStyle: function(t) {
                        return function(t, e) {
                            for (var r = t.length; r--;)
                                for (var n in e) t[r].style[n] = e[n];
                            return t.style
                        }(this, t)
                    },
                    getStyle: function() {
                        return function(t) {
                            for (var e = t.length; e--;) return t[e].currentStyle ? t[e].currentStyle[r] : document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(t[e], "")[r] : t[e].style[r]
                        }(this)
                    }
                };
                return "string" == typeof r ? t.getStyle.apply(this, u.call(arguments, 1)) : "object" !== p(r) && r ? (ie("Method ".concat(r, " does not exist")), !1) : t.setStyle.apply(this, arguments)
            }
        }, {
            key: "on",
            value: function(t, e, r, n) {
                for (var a = this.length; a--;) this[a].events || (this[a].events = {}, this[a].events[t] = []), "string" != typeof e ? document.addEventListener ? this[a].addEventListener(t, e, r || {
                    passive: !1
                }) : document.attachEvent ? this[a].attachEvent("on".concat(t), e) : this[a]["on".concat(t)] = e : y(this[a], t, e, r, n, !0);
                return this
            }
        }, {
            key: "off",
            value: function(t, e, r, n) {
                for (var a = this.length; a--;) this[a].events || (this[a].events = {}, this[a].events[t] = []), "string" != typeof e ? document.removeEventListener ? this[a].removeEventListener(t, e, r) : document.detachEvent ? this[a].detachEvent("on".concat(t), e) : this[a]["on".concat(t)] = null : y(this[a], t, e, r, n, !1);
                return this
            }
        }, {
            key: "is",
            value: function(t) {
                if (U(t)) return !1;
                for (var e = Z(t), r = this.length; r--;)
                    if (this[r] === e[r]) return !0;
                return !1
            }
        }]), o
    }();

    function y(t, e, r, n, a, o) {
        function s(t) {
            for (var e = t.target; e && e !== this;) e.matches(r) && n.call(e, t), e = e.parentNode
        }!0 === o ? document.addEventListener ? t.addEventListener(e, s, a || {
            passive: !1
        }) : document.attachEvent ? t.attachEvent("on".concat(e), s) : t["on".concat(e)] = s : document.removeEventListener ? t.removeEventListener(e, s, a || {
            passive: !1
        }) : document.detachEvent ? t.detachEvent("on".concat(e), s) : t["on".concat(e)] = null
    }

    function Z(t) {
        return new d(t)
    }
    var m = function() {
            function t() {
                s(this, t), this.observers = {}
            }
            return r(t, [{
                key: "subscribe",
                value: function(t, e) {
                    var r = this.observers;
                    return U(r[t]) && Object.defineProperty(r, t, {
                        value: []
                    }), r[t].push(e), this
                }
            }, {
                key: "unsubscribe",
                value: function(t, e) {
                    var r = this.observers;
                    if (rt(r[t])) {
                        var n = r[t].indexOf(e);
                        r[t].splice(n, 1)
                    }
                    return this
                }
            }, {
                key: "notify",
                value: function(e, r, n) {
                    U(this.observers[e]) || this.observers[e].forEach(function(t) {
                        if (r !== t) switch (e) {
                            case "onmove":
                                t.notifyMove(n);
                                break;
                            case "onrotate":
                                t.notifyRotate(n);
                                break;
                            case "onresize":
                                t.notifyResize(n);
                                break;
                            case "onapply":
                                t.notifyApply(n);
                                break;
                            case "ongetstate":
                                t.notifyGetState(n)
                        }
                    })
                }
            }]), t
        }(),
        g = function() {
            function e(t) {
                s(this, e), this.name = t, this.callbacks = []
            }
            return r(e, [{
                key: "registerCallback",
                value: function(t) {
                    this.callbacks.push(t)
                }
            }, {
                key: "removeCallback",
                value: function(t) {
                    var e = this.callbacks(t);
                    this.callbacks.splice(e, 1)
                }
            }]), e
        }(),
        _ = function() {
            function t() {
                s(this, t), this.events = {}
            }
            return r(t, [{
                key: "registerEvent",
                value: function(t) {
                    this.events[t] = new g(t)
                }
            }, {
                key: "emit",
                value: function(e, t, r) {
                    this.events[t].callbacks.forEach(function(t) {
                        t.call(e, r)
                    })
                }
            }, {
                key: "addEventListener",
                value: function(t, e) {
                    this.events[t].registerCallback(e)
                }
            }, {
                key: "removeEventListener",
                value: function(t, e) {
                    this.events[t].removeCallback(e)
                }
            }]), t
        }(),
        k = function() {
            function e(t) {
                s(this, e), this.el = t, this.storage = null, this.proxyMethods = null, this.eventDispatcher = new _, this._onMouseDown = this._onMouseDown.bind(this), this._onTouchStart = this._onTouchStart.bind(this), this._onMouseMove = this._onMouseMove.bind(this), this._onTouchMove = this._onTouchMove.bind(this), this._onMouseUp = this._onMouseUp.bind(this), this._onTouchEnd = this._onTouchEnd.bind(this), this._animate = this._animate.bind(this)
            }
            return r(e, [{
                key: "enable",
                value: function(t) {
                    this._processOptions(t), this._init(this.el), this.proxyMethods.onInit.call(this, this.el)
                }
            }, {
                key: "disable",
                value: function() {
                    w()
                }
            }, {
                key: "_init",
                value: function() {
                    w()
                }
            }, {
                key: "_destroy",
                value: function() {
                    w()
                }
            }, {
                key: "_processOptions",
                value: function() {
                    w()
                }
            }, {
                key: "_start",
                value: function() {
                    w()
                }
            }, {
                key: "_moving",
                value: function() {
                    w()
                }
            }, {
                key: "_end",
                value: function() {
                    w()
                }
            }, {
                key: "_animate",
                value: function() {
                    w()
                }
            }, {
                key: "_drag",
                value: function(t) {
                    var e = t.dx,
                        r = t.dy,
                        n = f(t, ["dx", "dy"]),
                        a = I({
                            dx: e,
                            dy: r,
                            transform: this._processMove(e, r)
                        }, n);
                    this.proxyMethods.onMove.call(this, a), this._emitEvent("drag", a)
                }
            }, {
                key: "_draw",
                value: function() {
                    this._animate()
                }
            }, {
                key: "_onMouseDown",
                value: function(t) {
                    this._start(t), Z(document).on("mousemove", this._onMouseMove).on("mouseup", this._onMouseUp)
                }
            }, {
                key: "_onTouchStart",
                value: function(t) {
                    this._start(t.touches[0]), Z(document).on("touchmove", this._onTouchMove).on("touchend", this._onTouchEnd)
                }
            }, {
                key: "_onMouseMove",
                value: function(t) {
                    t.preventDefault && t.preventDefault(), this._moving(t, this.el)
                }
            }, {
                key: "_onTouchMove",
                value: function(t) {
                    t.preventDefault && t.preventDefault(), this._moving(t.touches[0], this.el)
                }
            }, {
                key: "_onMouseUp",
                value: function(t) {
                    Z(document).off("mousemove", this._onMouseMove).off("mouseup", this._onMouseUp), this._end(t, this.el)
                }
            }, {
                key: "_onTouchEnd",
                value: function(t) {
                    Z(document).off("touchmove", this._onTouchMove).off("touchend", this._onTouchEnd), 0 === t.touches.length && this._end(t.changedTouches[0], this.el)
                }
            }, {
                key: "_emitEvent",
                value: function() {
                    var t;
                    (t = this.eventDispatcher).emit.apply(t, [this].concat(Array.prototype.slice.call(arguments)))
                }
            }, {
                key: "on",
                value: function(t, e) {
                    return this.eventDispatcher.addEventListener(t, e), this
                }
            }, {
                key: "off",
                value: function(t, e) {
                    return this.eventDispatcher.removeEventListener(t, e), this
                }
            }]), e
        }();

    function w() {
        throw Error("Method not implemented")
    }
    var M = ["dragStart", "drag", "dragEnd", "resizeStart", "resize", "resizeEnd", "rotateStart", "rotate", "rotateEnd", "setPointStart", "setPointEnd"],
        $ = Math.PI / 180;

    function J(t, e) {
        if (0 === e) return t;
        var r = function(t, e) {
            return 0 === e ? t : Math.round(t / e) * e
        }(t, e);
        return r - t < e ? r : void 0
    }

    function ce(t, e) {
        var r = 1 < arguments.length && void 0 !== e ? e : 6;
        return Number(t.toFixed(r))
    }

    function F(t) {
        return t.getBoundingClientRect()
    }

    function O(t) {
        return t.css("-webkit-transform") || t.css("-moz-transform") || t.css("-ms-transform") || t.css("-o-transform") || t.css("transform") || "none"
    }

    function C(t) {
        var e = t.match(/[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g);
        return e ? e.map(function(t) {
            return parseFloat(t)
        }) : [1, 0, 0, 1, 0, 0]
    }

    function K(e, t) {
        if (t) {
            if (e.classList) {
                if (!(-1 < t.indexOf(" "))) return e.classList.add(t);
                t.split(/\s+/).forEach(function(t) {
                    return e.classList.add(t)
                })
            }
            return e
        }
    }

    function q(e, t) {
        if (t) {
            if (e.classList) {
                if (!(-1 < t.indexOf(" "))) return e.classList.remove(t);
                t.split(/\s+/).forEach(function(t) {
                    return e.classList.remove(t)
                })
            }
            return e
        }
    }

    function E(t) {
        var e = "matrix(".concat(t.join(), ")");
        return {
            transform: e,
            webkitTranform: e,
            mozTransform: e,
            msTransform: e,
            otransform: e
        }
    }
    var j = function() {
        function a(t, e, r) {
            var n;
            if (s(this, a), (n = c(this, i(a).call(this, t))).constructor === a) throw new TypeError("Cannot construct Transformable instances directly");
            return n.observable = r, M.forEach(function(t) {
                n.eventDispatcher.registerEvent(t)
            }), n.enable(e), n
        }
        return o(a, k), r(a, [{
            key: "_cursorPoint",
            value: function() {
                throw Error("'_cursorPoint()' method not implemented")
            }
        }, {
            key: "_rotate",
            value: function(t) {
                var e = t.radians,
                    r = f(t, ["radians"]),
                    n = I({
                        transform: this._processRotate(e),
                        delta: e
                    }, r);
                this.proxyMethods.onRotate.call(this, n), this._emitEvent("rotate", n)
            }
        }, {
            key: "_resize",
            value: function(t) {
                var e = t.dx,
                    r = t.dy,
                    n = f(t, ["dx", "dy"]),
                    a = I({}, this._processResize(e, r), {
                        dx: e,
                        dy: r
                    }, n);
                this.proxyMethods.onResize.call(this, a), this._emitEvent("resize", a)
            }
        }, {
            key: "_processOptions",
            value: function(t) {
                var e = this.el;
                K(e, "sjx-drag");
                var r = {
                        x: 10,
                        y: 10,
                        angle: 10 * $
                    },
                    n = {
                        move: !1,
                        resize: !1,
                        rotate: !1
                    },
                    a = null,
                    o = !1,
                    s = "xy",
                    i = "auto",
                    c = "auto",
                    l = "auto",
                    u = "#00a8ff",
                    h = !1,
                    v = !0,
                    f = !0,
                    d = !0,
                    y = function() {},
                    p = function() {},
                    b = function() {},
                    x = function() {},
                    m = function() {},
                    g = function() {},
                    _ = e.parentNode;
                if (rt(t)) {
                    var k = t.snap,
                        w = t.each,
                        M = t.axis,
                        E = t.cursorMove,
                        j = t.cursorResize,
                        S = t.cursorRotate,
                        T = t.rotationPoint,
                        V = t.restrict,
                        A = t.draggable,
                        O = t.resizable,
                        C = t.rotatable,
                        z = t.onInit,
                        X = t.onDrop,
                        Y = t.onMove,
                        D = t.onResize,
                        P = t.onRotate,
                        N = t.onDestroy,
                        R = t.container,
                        L = t.proportions,
                        B = t.themeColor;
                    if (rt(k)) {
                        var H = k.x,
                            F = k.y,
                            W = k.angle;
                        r.x = U(H) ? 10 : H, r.y = U(F) ? 10 : F, r.angle = U(W) ? r.angle : W * $
                    }
                    if (rt(w)) {
                        var q = w.move,
                            I = w.resize,
                            G = w.rotate;
                        n.move = q || !1, n.resize = I || !1, n.rotate = G || !1
                    }
                    rt(V) && (a = "parent" === V ? e.parentNode : Z(V)[0] || document), u = B || "#00a8ff", i = E || "auto", c = j || "auto", l = S || "auto", s = M || "xy", _ = rt(R) && Z(R)[0] ? Z(R)[0] : _, h = T || !1, o = L || !1, v = !rt(A) || A, f = !rt(O) || O, d = !rt(C) || C, y = Q(z), m = Q(X), p = Q(Y), x = Q(D), b = Q(P), g = Q(N)
                }
                this.options = {
                    axis: s,
                    themeColor: u,
                    cursorMove: i,
                    cursorRotate: l,
                    cursorResize: c,
                    rotationPoint: h,
                    restrict: a,
                    container: _,
                    snap: r,
                    each: n,
                    proportions: o,
                    draggable: v,
                    resizable: f,
                    rotatable: d
                }, this.proxyMethods = {
                    onInit: y,
                    onDrop: m,
                    onMove: p,
                    onResize: x,
                    onRotate: b,
                    onDestroy: g
                }, this.subscribe(n)
            }
        }, {
            key: "_animate",
            value: function() {
                var t = this,
                    e = t.observable,
                    r = t.storage,
                    n = t.options;
                if (!U(r) && (r.frame = G(t._animate), r.doDraw)) {
                    r.doDraw = !1;
                    var a = r.dox,
                        o = r.doy,
                        s = r.clientX,
                        i = r.clientY,
                        c = r.doDrag,
                        l = r.doResize,
                        u = r.doRotate,
                        h = r.doSetCenter,
                        v = r.revX,
                        f = r.revY,
                        d = n.snap,
                        y = n.each,
                        p = y.move,
                        b = y.resize,
                        x = y.rotate,
                        m = n.restrict,
                        g = n.draggable,
                        _ = n.resizable,
                        k = n.rotatable;
                    if (l && _) {
                        var w = r.transform,
                            M = r.cx,
                            E = r.cy,
                            j = this._pointToElement({
                                x: s,
                                y: i
                            }),
                            S = j.x,
                            T = j.y,
                            V = a ? J(S - M, d.x / w.scX) : 0,
                            A = o ? J(T - E, d.y / w.scY) : 0,
                            O = {
                                dx: V = a ? v ? -V : V : 0,
                                dy: A = o ? f ? -A : A : 0,
                                clientX: s,
                                clientY: i
                            };
                        t._resize(O), b && e.notify("onresize", t, O)
                    }
                    if (c && g) {
                        var C = r.restrictOffset,
                            z = r.elementOffset,
                            X = r.nx,
                            Y = r.ny;
                        rt(m) && (s - C.left < X - z.left && (s = X - z.left + C.left), i - C.top < Y - z.top && (i = Y - z.top + C.top));
                        var D = {
                            dx: a ? J(s - X, d.x) : 0,
                            dy: o ? J(i - Y, d.y) : 0,
                            clientX: s,
                            clientY: i
                        };
                        t._drag(D), p && e.notify("onmove", t, D)
                    }
                    if (u && k) {
                        var P = r.pressang,
                            N = r.center,
                            R = Math.atan2(i - N.y, s - N.x) - P,
                            L = {
                                clientX: s,
                                clientY: i
                            };
                        t._rotate(I({
                            radians: J(R, d.angle)
                        }, L)), x && e.notify("onrotate", t, I({
                            radians: R
                        }, L))
                    }
                    if (h && k) {
                        var B = r.bx,
                            H = r.by,
                            F = this._pointToControls({
                                x: s,
                                y: i
                            }),
                            W = F.x,
                            q = F.y;
                        t._moveCenterHandle(W - B, q - H)
                    }
                }
            }
        }, {
            key: "_start",
            value: function(t) {
                var e = this.observable,
                    r = this.storage,
                    n = this.options,
                    a = n.axis,
                    o = n.restrict,
                    s = n.each,
                    i = this.el,
                    c = this._compute(t);
                Object.keys(c).forEach(function(t) {
                    r[t] = c[t]
                });
                var l = c.onRightEdge,
                    u = c.onBottomEdge,
                    h = c.onTopEdge,
                    v = c.onLeftEdge,
                    f = c.handle,
                    d = c.factor,
                    y = c.revX,
                    p = c.revY,
                    b = c.doW,
                    x = c.doH,
                    m = l || u || h || v,
                    g = r.handles,
                    _ = g.rotator,
                    k = g.center,
                    w = g.radius;
                rt(w) && q(w, "sjx-hidden");
                var M = f.is(_),
                    E = !!rt(k) && f.is(k),
                    j = !(M || m || E),
                    S = t.clientX,
                    T = t.clientY,
                    V = this._cursorPoint({
                        clientX: S,
                        clientY: T
                    }),
                    A = V.x,
                    O = V.y,
                    C = this._pointToElement({
                        x: A,
                        y: O
                    }),
                    z = C.x,
                    X = C.y,
                    Y = this._pointToControls({
                        x: A,
                        y: O
                    }),
                    D = {
                        clientX: S,
                        clientY: T,
                        nx: A,
                        ny: O,
                        cx: z,
                        cy: X,
                        bx: Y.x,
                        by: Y.y,
                        doResize: m,
                        doDrag: j,
                        doRotate: M,
                        doSetCenter: E,
                        onExecution: !0,
                        cursor: null,
                        elementOffset: F(i),
                        restrictOffset: rt(o) ? F(o) : null,
                        dox: /\x/.test(a) && (!m || (f.is(g.ml) || f.is(g.mr) || f.is(g.tl) || f.is(g.tr) || f.is(g.bl) || f.is(g.br))),
                        doy: /\y/.test(a) && (!m || (f.is(g.br) || f.is(g.bl) || f.is(g.bc) || f.is(g.tr) || f.is(g.tl) || f.is(g.tc)))
                    };
                this.storage = I({}, r, {}, D);
                var P = {
                    clientX: S,
                    clientY: T
                };
                m ? this._emitEvent("resizeStart", P) : M ? this._emitEvent("rotateStart", P) : j && this._emitEvent("dragStart", P);
                var N = s.move,
                    R = s.resize,
                    L = s.rotate,
                    B = m ? "resize" : M ? "rotate" : "drag",
                    H = m && R || M && L || j && N;
                e.notify("ongetstate", this, {
                    clientX: S,
                    clientY: T,
                    actionName: B,
                    triggerEvent: H,
                    factor: d,
                    revX: y,
                    revY: p,
                    doW: b,
                    doH: x
                }), this._draw()
            }
        }, {
            key: "_moving",
            value: function(t) {
                var e = this.storage,
                    r = this.options,
                    n = this._cursorPoint(t),
                    a = n.x,
                    o = n.y;
                e.e = t, e.clientX = a, e.clientY = o, e.doDraw = !0;
                var s = e.doRotate,
                    i = e.doDrag,
                    c = e.doResize,
                    l = e.cursor,
                    u = r.cursorMove,
                    h = r.cursorResize,
                    v = r.cursorRotate;
                U(l) && (i ? l = u : s ? l = v : c && (l = h), Z(document.body).css({
                    cursor: l
                }))
            }
        }, {
            key: "_end",
            value: function(t) {
                var e = t.clientX,
                    r = t.clientY,
                    n = this.options.each,
                    a = this.observable,
                    o = this.storage,
                    s = this.proxyMethods,
                    i = o.doResize,
                    c = o.doDrag,
                    l = o.doRotate,
                    u = o.frame,
                    h = o.handles.radius,
                    v = i ? "resize" : c ? "drag" : "rotate";
                o.doResize = !1, o.doDrag = !1, o.doRotate = !1, o.doSetCenter = !1, o.doDraw = !1, o.onExecution = !1, o.cursor = null, this._apply(v);
                var f = {
                    clientX: e,
                    clientY: r
                };
                s.onDrop.call(this, f), i ? this._emitEvent("resizeEnd", f) : l ? this._emitEvent("rotateEnd", f) : c && this._emitEvent("dragEnd", f);
                var d = n.move,
                    y = n.resize,
                    p = n.rotate,
                    b = i && y || l && p || c && d;
                a.notify("onapply", this, {
                    clientX: e,
                    clientY: r,
                    actionName: v,
                    triggerEvent: b
                }), x(u), Z(document.body).css({
                    cursor: "auto"
                }), rt(h) && K(h, "sjx-hidden")
            }
        }, {
            key: "_compute",
            value: function(t) {
                var e = this.storage.handles,
                    r = Z(t.target),
                    n = this._checkHandles(r, e),
                    a = n.revX,
                    o = n.revY,
                    s = n.doW,
                    i = n.doH,
                    c = f(n, ["revX", "revY", "doW", "doH"]),
                    l = this._getState({
                        revX: a,
                        revY: o,
                        doW: s,
                        doH: i
                    }),
                    u = this._cursorPoint(t),
                    h = u.x,
                    v = u.y;
                return I({}, l, {}, c, {
                    handle: r,
                    pressang: Math.atan2(v - l.center.y, h - l.center.x)
                })
            }
        }, {
            key: "_checkHandles",
            value: function(t, e) {
                var r = e.tl,
                    n = e.tc,
                    a = e.tr,
                    o = e.bl,
                    s = e.br,
                    i = e.bc,
                    c = e.ml,
                    l = e.mr,
                    u = !!rt(r) && t.is(r),
                    h = !!rt(n) && t.is(n),
                    v = !!rt(a) && t.is(a),
                    f = !!rt(o) && t.is(o),
                    d = !!rt(i) && t.is(i),
                    y = !!rt(s) && t.is(s),
                    p = !!rt(c) && t.is(c),
                    b = !!rt(l) && t.is(l);
                return {
                    revX: u || p || f || h,
                    revY: u || v || h || p,
                    onTopEdge: h || v || u,
                    onLeftEdge: u || p || f,
                    onRightEdge: v || b || y,
                    onBottomEdge: y || d || f,
                    doW: p || b,
                    doH: h || d
                }
            }
        }, {
            key: "notifyMove",
            value: function() {
                this._drag.apply(this, arguments)
            }
        }, {
            key: "notifyRotate",
            value: function(t) {
                var e = t.radians,
                    r = f(t, ["radians"]),
                    n = this.options.snap.angle;
                this._rotate(I({
                    radians: J(e, n)
                }, r))
            }
        }, {
            key: "notifyResize",
            value: function() {
                this._resize.apply(this, arguments)
            }
        }, {
            key: "notifyApply",
            value: function(t) {
                var e = t.clientX,
                    r = t.clientY,
                    n = t.actionName,
                    a = t.triggerEvent;
                this.proxyMethods.onDrop.call(this, {
                    clientX: e,
                    clientY: r
                }), a && (this._apply(n), this._emitEvent("".concat(n, "End"), {
                    clientX: e,
                    clientY: r
                }))
            }
        }, {
            key: "notifyGetState",
            value: function(t) {
                var e = t.clientX,
                    r = t.clientY,
                    n = t.actionName,
                    a = t.triggerEvent,
                    o = f(t, ["clientX", "clientY", "actionName", "triggerEvent"]);
                if (a) {
                    var s = this._getState(o);
                    this.storage = I({}, this.storage, {}, s), this._emitEvent("".concat(n, "Start"), {
                        clientX: e,
                        clientY: r
                    })
                }
            }
        }, {
            key: "subscribe",
            value: function(t) {
                var e = t.resize,
                    r = t.move,
                    n = t.rotate,
                    a = this.observable;
                (r || e || n) && a.subscribe("ongetstate", this).subscribe("onapply", this), r && a.subscribe("onmove", this), e && a.subscribe("onresize", this), n && a.subscribe("onrotate", this)
            }
        }, {
            key: "unsubscribe",
            value: function() {
                this.observable.unsubscribe("ongetstate", this).unsubscribe("onapply", this).unsubscribe("onmove", this).unsubscribe("onresize", this).unsubscribe("onrotate", this)
            }
        }, {
            key: "disable",
            value: function() {
                var t = this.storage,
                    e = this.proxyMethods,
                    r = this.el;
                U(t) || (t.onExecution && (this._end(), Z(document).off("mousemove", this._onMouseMove).off("mouseup", this._onMouseUp).off("touchmove", this._onTouchMove).off("touchend", this._onTouchEnd)), q(r, "sjx-drag"), this._destroy(), this.unsubscribe(), e.onDestroy.call(this, r), delete this.storage)
            }
        }, {
            key: "exeDrag",
            value: function(t) {
                var e = t.dx,
                    r = t.dy;
                this.options.draggable && (this.storage = I({}, this.storage, {}, this._getState({
                    revX: !1,
                    revY: !1,
                    doW: !1,
                    doH: !1
                })), this._drag({
                    dx: e,
                    dy: r
                }), this._apply("drag"))
            }
        }, {
            key: "exeResize",
            value: function(t) {
                var e = t.dx,
                    r = t.dy,
                    n = t.revX,
                    a = t.revY,
                    o = t.doW,
                    s = t.doH;
                this.options.resizable && (this.storage = I({}, this.storage, {}, this._getState({
                    revX: n || !1,
                    revY: a || !1,
                    doW: o || !1,
                    doH: s || !1
                })), this._resize({
                    dx: e,
                    dy: r
                }), this._apply("resize"))
            }
        }, {
            key: "exeRotate",
            value: function(t) {
                var e = t.delta;
                this.options.rotatable && (this.storage = I({}, this.storage, {}, this._getState({
                    revX: !1,
                    revY: !1,
                    doW: !1,
                    doH: !1
                })), this._rotate({
                    radians: e
                }), this._apply("rotate"))
            }
        }]), a
    }();

    function z(t, e) {
        var r = t.x,
            n = t.y,
            a = se(e, 6),
            o = a[0],
            s = a[1],
            i = a[2],
            c = a[3];
        return {
            x: o * r + i * n + a[4],
            y: s * r + c * n + a[5]
        }
    }

    function X(t) {
        var e = [
            [t[0], t[2], t[4]],
            [t[1], t[3], t[5]],
            [0, 0, 1]
        ];
        if (e.length === e[0].length) {
            for (var r = e.length, n = [], a = [], o = 0; o < r; o += 1) {
                n[n.length] = [], a[a.length] = [];
                for (var s = 0; s < r; s += 1) n[o][s] = o == s ? 1 : 0, a[o][s] = e[o][s]
            }
            for (var i = 0; i < r; i += 1) {
                var c = a[i][i];
                if (0 === c) {
                    for (var l = i + 1; l < r; l += 1)
                        if (0 !== a[l][i]) {
                            for (var u = 0; u < r; u++) c = a[i][u], a[i][u] = a[l][u], a[l][u] = c, c = n[i][u], n[i][u] = n[l][u], n[l][u] = c;
                            break
                        }
                    if (0 === (c = a[i][i])) return
                }
                for (var h = 0; h < r; h++) a[i][h] = a[i][h] / c, n[i][h] = n[i][h] / c;
                for (var v = 0; v < r; v++)
                    if (v != i) {
                        c = a[v][i];
                        for (var f = 0; f < r; f++) a[v][f] -= c * a[i][f], n[v][f] -= c * n[i][f]
                    }
            }
            return [n[0][0], n[1][0], n[0][1], n[1][1], n[0][2], n[1][2]]
        }
    }

    function Y(t, e) {
        for (var r = se(t, 6), n = r[0], a = r[1], o = r[2], s = r[3], i = r[4], c = r[5], l = se(e, 6), u = l[0], h = l[1], v = l[2], f = l[3], d = [
                [n, o, i],
                [a, s, c],
                [0, 0, 1]
            ], y = [
                [u, v, l[4]],
                [h, f, l[5]],
                [0, 0, 1]
            ], p = [], b = 0; b < y.length; b++) {
            p[b] = [];
            for (var x = 0; x < d[0].length; x++) {
                for (var m = 0, g = 0; g < d.length; g++) m += d[g][x] * y[b][g];
                p[b].push(m)
            }
        }
        return [p[0][0], p[1][0], p[0][1], p[1][1], p[0][2], p[1][2]]
    }

    function D(t, e, r, n, a, o, s, i, c) {
        var l = parseFloat(r) / 2,
            u = parseFloat(n) / 2,
            h = t + l,
            v = e + u,
            f = t - h,
            d = e - v,
            y = Math.atan2(i ? 0 : d, c ? 0 : f) + a,
            p = Math.sqrt(Math.pow(c ? 0 : l, 2) + Math.pow(i ? 0 : u, 2)),
            b = Math.cos(y),
            x = Math.sin(y),
            m = v + p * (x = !0 === s ? -x : x);
        return {
            left: ce(h + p * (b = !0 === o ? -b : b)),
            top: ce(m)
        }
    }
    var S = 2,
        P = 7,
        T = function() {
            function t() {
                return s(this, t), c(this, i(t).apply(this, arguments))
            }
            return o(t, j), r(t, [{
                key: "_init",
                value: function(t) {
                    var e = this.options,
                        r = e.rotationPoint,
                        n = e.container,
                        a = e.resizable,
                        o = e.rotatable,
                        s = t.style,
                        i = s.left,
                        c = s.top,
                        l = s.width,
                        u = s.height,
                        h = document.createElement("div");
                    K(h, "sjx-wrapper"), n.appendChild(h);
                    var v = Z(t),
                        f = l || v.css("width"),
                        d = u || v.css("height"),
                        y = {
                            top: c || v.css("top"),
                            left: i || v.css("left"),
                            width: f,
                            height: d,
                            transform: O(v)
                        },
                        p = document.createElement("div");
                    K(p, "sjx-controls");
                    var b = I({}, o && {
                        normal: ["sjx-normal"],
                        rotator: ["sjx-hdl", "sjx-hdl-m", "sjx-rotator"]
                    }, {}, a && {
                        tl: ["sjx-hdl", "sjx-hdl-t", "sjx-hdl-l", "sjx-hdl-tl"],
                        tr: ["sjx-hdl", "sjx-hdl-t", "sjx-hdl-r", "sjx-hdl-tr"],
                        br: ["sjx-hdl", "sjx-hdl-b", "sjx-hdl-r", "sjx-hdl-br"],
                        bl: ["sjx-hdl", "sjx-hdl-b", "sjx-hdl-l", "sjx-hdl-bl"],
                        tc: ["sjx-hdl", "sjx-hdl-t", "sjx-hdl-c", "sjx-hdl-tc"],
                        bc: ["sjx-hdl", "sjx-hdl-b", "sjx-hdl-c", "sjx-hdl-bc"],
                        ml: ["sjx-hdl", "sjx-hdl-m", "sjx-hdl-l", "sjx-hdl-ml"],
                        mr: ["sjx-hdl", "sjx-hdl-m", "sjx-hdl-r", "sjx-hdl-mr"]
                    }, {
                        center: r && o ? ["sjx-hdl", "sjx-hdl-m", "sjx-hdl-c", "sjx-hdl-mc"] : void 0
                    });
                    Object.keys(b).forEach(function(t) {
                        var e = b[t];
                        if (!U(e)) {
                            var r = function(t) {
                                var e = document.createElement("div");
                                return t.forEach(function(t) {
                                    K(e, t)
                                }), e
                            }(e);
                            b[t] = r, p.appendChild(r)
                        }
                    }), rt(b.center) && Z(b.center).css({
                        left: "".concat(t.getAttribute("data-cx"), "px"),
                        top: "".concat(t.getAttribute("data-cy"), "px")
                    });
                    h.appendChild(p);
                    var x = Z(p);
                    x.css(y), this.storage = {
                        controls: p,
                        handles: b,
                        radius: void 0,
                        parent: t.parentNode
                    }, x.on("mousedown", this._onMouseDown).on("touchstart", this._onTouchStart)
                }
            }, {
                key: "_destroy",
                value: function() {
                    var t = this.storage.controls;
                    Z(t).off("mousedown", this._onMouseDown).off("touchstart", this._onTouchStart);
                    var e = t.parentNode;
                    e.parentNode.removeChild(e)
                }
            }, {
                key: "_pointToElement",
                value: function(t) {
                    var e = t.x,
                        r = t.y,
                        n = W(this.storage.transform.matrix);
                    return n[4] = n[5] = 0, this._applyMatrixToPoint(X(n), e, r)
                }
            }, {
                key: "_pointToControls",
                value: function(t) {
                    return this._pointToElement(t)
                }
            }, {
                key: "_applyMatrixToPoint",
                value: function(t, e, r) {
                    return z({
                        x: e,
                        y: r
                    }, t)
                }
            }, {
                key: "_cursorPoint",
                value: function(t) {
                    return z({
                        x: t.clientX,
                        y: t.clientY
                    }, X(C(O(Z(this.options.container)))))
                }
            }, {
                key: "_apply",
                value: function() {
                    var t = this.el,
                        e = this.storage,
                        r = e.controls,
                        n = e.handles,
                        a = Z(r),
                        o = parseFloat(a.css("width")) / 2,
                        s = parseFloat(a.css("height")) / 2,
                        i = n.center,
                        c = rt(i),
                        l = c ? parseFloat(Z(i).css("left")) : o,
                        u = c ? parseFloat(Z(i).css("top")) : s;
                    t.setAttribute("data-cx", l), t.setAttribute("data-cy", u), this.storage.cached = null
                }
            }, {
                key: "_processResize",
                value: function(t, e) {
                    var r = this.el,
                        n = this.storage,
                        a = this.options.proportions,
                        o = n.controls,
                        s = n.coords,
                        i = n.cw,
                        c = n.ch,
                        l = n.transform,
                        u = n.refang,
                        h = n.revX,
                        v = n.revY,
                        f = n.doW,
                        d = n.doH,
                        y = f || !f && !d ? (i + t) / i : (c + e) / c,
                        p = a ? i * y : i + t,
                        b = a ? c * y : c + e;
                    if (!(p < S || b < S)) {
                        var x = W(l.matrix),
                            m = D(x[4], x[5], p, b, u, h, v, f, d),
                            g = s.left - m.left,
                            _ = s.top - m.top;
                        x[4] += g, x[5] += _;
                        var k = E(x);
                        return k.width = "".concat(p, "px"), k.height = "".concat(b, "px"), Z(o).css(k), Z(r).css(k), n.cached = {
                            dx: g,
                            dy: _
                        }, {
                            width: p,
                            height: b,
                            ox: g,
                            oy: _
                        }
                    }
                }
            }, {
                key: "_processMove",
                value: function(t, e) {
                    var r = this.el,
                        n = this.storage,
                        a = n.controls,
                        o = n.transform,
                        s = o.matrix,
                        i = W(o.parentMatrix);
                    i[4] = i[5] = 0;
                    var c = W(s);
                    c[4] = s[4] + t, c[5] = s[5] + e;
                    var l = E(c);
                    return Z(a).css(l), Z(r).css(l), n.cached = {
                        dx: t,
                        dy: e
                    }, c
                }
            }, {
                key: "_processRotate",
                value: function(t) {
                    var e = this.el,
                        r = this.storage,
                        n = r.controls,
                        a = r.transform,
                        o = r.center,
                        s = a.matrix,
                        i = a.parentMatrix,
                        c = ce(Math.cos(t), 4),
                        l = ce(Math.sin(t), 4),
                        u = [1, 0, 0, 1, o.cx, o.cy],
                        h = [c, l, -l, c, 0, 0],
                        v = W(i);
                    v[4] = v[5] = 0;
                    var f = Y(Y(Y(u, Y(X(v), Y(h, v))), X(u)), s),
                        d = E(f);
                    return Z(n).css(d), Z(e).css(d), f
                }
            }, {
                key: "_getState",
                value: function(t) {
                    var e = t.revX,
                        r = t.revY,
                        n = t.doW,
                        a = t.doH,
                        o = e !== r ? -1 : 1,
                        s = this.el,
                        i = this.storage,
                        c = i.handles,
                        l = i.controls,
                        u = i.parent,
                        h = this.options.container,
                        v = c.center,
                        f = Z(l),
                        d = C(O(Z(h))),
                        y = C(O(Z(l))),
                        p = C(O(Z(u))),
                        b = Math.atan2(y[1], y[0]) * o,
                        x = u !== h ? Y(p, d) : d,
                        m = {
                            matrix: y,
                            parentMatrix: x,
                            scX: Math.sqrt(y[0] * y[0] + y[1] * y[1]),
                            scY: Math.sqrt(y[2] * y[2] + y[3] * y[3])
                        },
                        g = parseFloat(f.css("width")),
                        _ = parseFloat(f.css("height")),
                        k = D(y[4], y[5], g, _, b, e, r, n, a),
                        w = g / 2,
                        M = _ / 2,
                        E = F(s),
                        j = rt(v),
                        S = j ? parseFloat(Z(v).css("left")) : w,
                        T = j ? parseFloat(Z(v).css("top")) : M,
                        V = j ? P : 0,
                        A = z({
                            x: E.left,
                            y: E.top
                        }, X(x));
                    return {
                        transform: m,
                        cw: g,
                        ch: _,
                        coords: k,
                        center: {
                            x: A.x + S - V,
                            y: A.y + T - V,
                            cx: -S + w - V,
                            cy: -T + M - V,
                            hx: S,
                            hy: T
                        },
                        factor: o,
                        refang: b,
                        revX: e,
                        revY: r,
                        doW: n,
                        doH: a
                    }
                }
            }, {
                key: "_moveCenterHandle",
                value: function(t, e) {
                    var r = this.storage,
                        n = r.handles.center,
                        a = r.center,
                        o = a.hx,
                        s = a.hy,
                        i = "".concat(o + t, "px"),
                        c = "".concat(s + e, "px");
                    Z(n).css({
                        left: i,
                        top: c
                    })
                }
            }, {
                key: "resetCenterPoint",
                value: function() {
                    Z(this.storage.handles.center).css({
                        left: null,
                        top: null
                    })
                }
            }, {
                key: "fitControlsToSize",
                value: function() {}
            }, {
                key: "controls",
                get: function() {
                    return this.storage.controls
                }
            }]), t
        }();
    var V = R("svg").createSVGPoint(),
        A = /[+-]?\d+(\.\d+)?/g,
        N = ["circle", "ellipse", "image", "line", "path", "polygon", "polyline", "rect", "text", "g"];

    function L(t) {
        var r = [];
        return H(t) ? l.call(t.childNodes, function(t) {
            if (1 === t.nodeType) {
                var e = t.tagName.toLowerCase(); - 1 !== N.indexOf(e) && ("g" === e && r.push.apply(r, W(L(t))), r.push(t))
            }
        }) : r.push(t), r
    }

    function R(t) {
        return document.createElementNS("http://www.w3.org/2000/svg", t)
    }

    function nt() {
        return R("svg").createSVGMatrix()
    }

    function at(t, e) {
        return (e.getScreenCTM() || nt()).inverse().multiply(t.getScreenCTM() || nt())
    }

    function B(t) {
        var e = t.a,
            r = t.b,
            n = t.c,
            a = t.d,
            o = t.e,
            s = t.f;
        return "matrix(".concat(e, ",").concat(r, ",").concat(n, ",").concat(a, ",").concat(o, ",").concat(s, ")")
    }

    function le(t, e, r) {
        return V.x = e, V.y = r, V.matrixTransform(t)
    }

    function ue(t) {
        var e = nt();
        return e.a = t.a, e.b = t.b, e.c = t.c, e.d = t.d, e.e = t.e, e.f = t.f, e
    }

    function H(t) {
        return "g" === t.tagName.toLowerCase()
    }

    function ot(t) {
        return t.match(A).reduce(function(t, e, r, n) {
            return r % 2 == 0 && t.push(n.slice(r, r + 2)), t
        }, [])
    }
    var tt = /\s*([achlmqstvz])([^achlmqstvz]*)\s*/gi,
        et = /\s*,\s*|\s+/g;

    function he(t) {
        for (var e = tt.lastIndex = 0, r = []; e = tt.exec(t);) {
            var n = e[1],
                a = n.toUpperCase(),
                o = e[2].replace(/([^e])-/g, "$1 -").replace(/ +/g, " ");
            r.push({
                relative: n !== a,
                key: a,
                cmd: n,
                values: o.trim().split(et).map(function(t) {
                    if (!isNaN(t)) return Number(t)
                })
            })
        }
        return r
    }
    var st = 5,
        it = 50,
        ct = function() {
            function t() {
                return s(this, t), c(this, i(t).apply(this, arguments))
            }
            return o(t, j), r(t, [{
                key: "_init",
                value: function(t) {
                    var e = this.options,
                        r = e.rotationPoint,
                        n = e.container,
                        o = e.themeColor,
                        a = e.resizable,
                        s = e.rotatable,
                        i = R("g");
                    K(i, "sjx-svg-wrapper"), n.appendChild(i);
                    var c = t.getBBox(),
                        l = c.width,
                        u = c.height,
                        h = c.x,
                        v = c.y,
                        f = at(t, n),
                        d = R("rect");
                    [
                        ["width", l],
                        ["height", u],
                        ["x", h],
                        ["y", v],
                        ["fill", o],
                        ["fill-opacity", .1],
                        ["stroke", o],
                        ["stroke-dasharray", "3 3"],
                        ["vector-effect", "non-scaling-stroke"],
                        ["transform", B(f)]
                    ].forEach(function(t) {
                        var e = se(t, 2),
                            r = e[0],
                            n = e[1];
                        d.setAttribute(r, n)
                    });
                    var y = R("g"),
                        p = R("g"),
                        b = R("g");
                    K(b, "sjx-svg-box-group"), K(y, "sjx-svg-handles"), K(p, "sjx-svg-normal-group"), b.appendChild(d), i.appendChild(b), i.appendChild(p), i.appendChild(y);
                    var x = d.getBBox(),
                        m = x.x,
                        g = x.y,
                        _ = x.width,
                        k = x.height,
                        w = t.getAttribute("data-cx"),
                        M = t.getAttribute("data-cy"),
                        E = at(d, d.parentNode),
                        j = le(E, m + _ / 2, g + k / 2),
                        S = le(E, m, g),
                        T = le(E, m + _, g),
                        V = le(E, m + _, g + k / 2),
                        A = {
                            tl: S,
                            tr: T,
                            br: le(E, m + _, g + k),
                            bl: le(E, m, g + k),
                            tc: le(E, m + _ / 2, g),
                            bc: le(E, m + _ / 2, g + k),
                            ml: le(E, m, g + k / 2),
                            mr: V
                        },
                        O = {},
                        C = null;
                    if (s) {
                        var z = Math.atan2(S.y - T.y, S.x - T.x);
                        C = {
                            x: V.x - it * Math.cos(z),
                            y: V.y - it * Math.sin(z)
                        };
                        var X = R("line");
                        X.x1.baseVal.value = V.x, X.y1.baseVal.value = V.y, X.x2.baseVal.value = C.x, X.y2.baseVal.value = C.y, vt(X, o), p.appendChild(X);
                        var Y = null;
                        r && (K(Y = R("line"), "sjx-hidden"), Y.x1.baseVal.value = j.x, Y.y1.baseVal.value = j.y, Y.x2.baseVal.value = w || j.x, Y.y2.baseVal.value = M || j.y, vt(Y, "#fe3232"), Y.setAttribute("opacity", .5), p.appendChild(Y)), O = {
                            normal: X,
                            radius: Y
                        }
                    }
                    var D = I({}, a && A, {
                        rotator: C,
                        center: r && s ? function(t, e, r) {
                            if (U(e) || U(r)) return null;
                            var n = t.createSVGPoint();
                            return n.x = e, n.y = r, n
                        }(n, w, M) || j : void 0
                    });
                    Object.keys(D).forEach(function(t) {
                        var e = D[t];
                        if (!U(e)) {
                            var r = e.x,
                                n = e.y,
                                a = "center" === t ? "#fe3232" : o;
                            D[t] = function(t, e, r, n) {
                                var a = R("circle");
                                K(a, "sjx-svg-hdl-".concat(n));
                                var o = {
                                    cx: t,
                                    cy: e,
                                    r: 2,
                                    fill: r,
                                    stroke: "#fff",
                                    "fill-opacity": 1,
                                    "vector-effect": "non-scaling-stroke",
                                    "stroke-width": 1
                                };
                                return Object.keys(o).map(function(t) {
                                    a.setAttribute(t, o[t])
                                }), a
                            }(r, n, a, t), y.appendChild(D[t])
                        }
                    }), this.storage = {
                        wrapper: i,
                        box: d,
                        handles: I({}, D, {}, O),
                        parent: t.parentNode,
                        center: {}
                    }, Z(i).on("mousedown", this._onMouseDown).on("touchstart", this._onTouchStart)
                }
            }, {
                key: "_destroy",
                value: function() {
                    var t = this.storage.wrapper;
                    Z(t).off("mousedown", this._onMouseDown).off("touchstart", this._onTouchStart), t.parentNode.removeChild(t)
                }
            }, {
                key: "_cursorPoint",
                value: function(t) {
                    var e = t.clientX,
                        r = t.clientY;
                    return le(this.options.container.getScreenCTM().inverse(), e, r)
                }
            }, {
                key: "_pointToElement",
                value: function(t) {
                    var e = t.x,
                        r = t.y,
                        n = this.storage.transform.ctm.inverse();
                    return n.e = n.f = 0, this._applyMatrixToPoint(n, e, r)
                }
            }, {
                key: "_pointToControls",
                value: function(t) {
                    var e = t.x,
                        r = t.y,
                        n = this.storage.transform.boxCTM.inverse();
                    return n.e = n.f = 0, this._applyMatrixToPoint(n, e, r)
                }
            }, {
                key: "_applyMatrixToPoint",
                value: function(t, e, r) {
                    var n = this.options.container.createSVGPoint();
                    return n.x = e, n.y = r, n.matrixTransform(t)
                }
            }, {
                key: "_apply",
                value: function(t) {
                    var s = this.el,
                        e = this.storage,
                        i = this.options.container,
                        r = e.box,
                        n = e.handles,
                        a = e.cached,
                        o = e.transform,
                        c = o.matrix,
                        l = o.boxCTM,
                        u = o.bBox,
                        h = o.ctm,
                        v = s.getBBox(),
                        f = v.x,
                        d = v.y,
                        y = v.width,
                        p = v.height,
                        b = rt(n.center) ? le(l, n.center.cx.baseVal.value, n.center.cy.baseVal.value) : le(c, f + y / 2, d + p / 2);
                    if (s.setAttribute("data-cx", b.x), s.setAttribute("data-cy", b.y), !U(a)) {
                        var x = a.scaleX,
                            m = a.scaleY,
                            g = a.dx,
                            _ = a.dy,
                            k = a.ox,
                            w = a.oy;
                        if ("drag" === t) {
                            if (0 === g && 0 === _) return;
                            var M = nt();
                            M.e = g, M.f = _;
                            var E = M.multiply(c).multiply(M.inverse());
                            if (s.setAttribute("transform", B(E)), H(s)) L(s).forEach(function(t) {
                                var e = i.createSVGPoint(),
                                    r = at(s.parentNode, i).inverse();
                                e.x = k, e.y = w, r.e = r.f = 0;
                                var n = e.matrixTransform(r),
                                    a = nt();
                                a.e = g, a.f = _;
                                var o = a.multiply(at(t, t.parentNode)).multiply(a.inverse());
                                ! function(t) {
                                    var e = t.a,
                                        r = t.b,
                                        n = t.c,
                                        a = t.d,
                                        o = t.e,
                                        s = t.f;
                                    return 1 === e && 0 === r && 0 === n && 1 === a && 0 === o && 0 === s
                                }(o) && t.setAttribute("transform", B(o)), H(t) || lt(t, {
                                    x: n.x,
                                    y: n.y
                                })
                            });
                            else lt(s, {
                                x: g,
                                y: _
                            })
                        }
                        if ("resize" === t) {
                            var j = r.getBBox(),
                                S = j.x,
                                T = j.y,
                                V = j.width,
                                A = j.height;
                            if (ht(e, {
                                    x: S,
                                    y: T,
                                    width: V,
                                    height: A,
                                    boxMatrix: null
                                }), H(s)) L(s).forEach(function(t) {
                                H(t) || ut(t, {
                                    scaleX: x,
                                    scaleY: m,
                                    defaultCTM: t.__ctm__,
                                    bBox: u,
                                    container: i,
                                    storage: e
                                })
                            });
                            else ut(s, {
                                scaleX: x,
                                scaleY: m,
                                defaultCTM: h,
                                bBox: u,
                                container: i,
                                storage: e
                            });
                            s.setAttribute("transform", B(c))
                        }
                        this.storage.cached = null
                    }
                }
            }, {
                key: "_processResize",
                value: function(t, e) {
                    var r = this.el,
                        n = this.storage,
                        a = this.options.proportions,
                        o = n.left,
                        s = n.top,
                        i = n.cw,
                        c = n.ch,
                        l = n.transform,
                        u = n.revX,
                        h = n.revY,
                        v = n.doW,
                        f = n.doH,
                        d = l.matrix,
                        y = l.scMatrix,
                        p = l.trMatrix,
                        b = l.scaleX,
                        x = l.scaleY,
                        m = r.getBBox(),
                        g = m.width,
                        _ = m.height,
                        k = v || !v && !f ? (i + t) / i : (c + e) / c;
                    if (g = a ? i * k : i + t, _ = a ? c * k : c + e, !(Math.abs(g) < st || Math.abs(_) < st)) {
                        var w = g / i,
                            M = _ / c;
                        y.a = w, y.b = 0, y.c = 0, y.d = M, y.e = 0, y.f = 0, p.e = b, p.f = x;
                        var E = p.multiply(y).multiply(p.inverse()),
                            j = d.multiply(E);
                        r.setAttribute("transform", B(j));
                        var S = o - (g - i) * (f ? .5 : u ? 1 : 0),
                            T = s - (_ - c) * (v ? .5 : h ? 1 : 0);
                        this.storage.cached = {
                            scaleX: w,
                            scaleY: M
                        };
                        var V = {
                            x: S,
                            y: T,
                            width: g,
                            height: _
                        };
                        return ht(n, I({}, V, {
                            boxMatrix: null
                        })), V
                    }
                }
            }, {
                key: "_processMove",
                value: function(t, e) {
                    var r = this.storage,
                        n = r.transform,
                        a = r.wrapper,
                        o = r.center,
                        s = n.matrix,
                        i = n.trMatrix,
                        c = n.scMatrix,
                        l = n.wrapperMatrix,
                        u = n.parentMatrix;
                    c.e = t, c.f = e;
                    var h = c.multiply(l);
                    a.setAttribute("transform", B(h)), u.e = u.f = 0;
                    var v = le(u.inverse(), t, e),
                        f = v.x,
                        d = v.y;
                    i.e = f, i.f = d;
                    var y = i.multiply(s);
                    if (this.el.setAttribute("transform", B(y)), this.storage.cached = {
                            dx: f,
                            dy: d,
                            ox: t,
                            oy: e
                        }, o.isShifted) {
                        var p = l.inverse();
                        p.e = p.f = 0;
                        var b = le(p, t, e),
                            x = b.x,
                            m = b.y;
                        this._moveCenterHandle(-x, -m)
                    }
                    return y
                }
            }, {
                key: "_processRotate",
                value: function(t) {
                    var e = this.storage,
                        r = e.center,
                        n = e.transform,
                        a = e.wrapper,
                        o = n.matrix,
                        s = n.wrapperMatrix,
                        i = n.parentMatrix,
                        c = n.trMatrix,
                        l = n.scMatrix,
                        u = n.rotMatrix,
                        h = ce(Math.cos(t)),
                        v = ce(Math.sin(t));
                    c.e = r.x, c.f = r.y, u.a = h, u.b = v, u.c = -v, u.d = h;
                    var f = c.multiply(u).multiply(c.inverse()).multiply(s);
                    a.setAttribute("transform", B(f)), l.e = r.el_x, l.f = r.el_y, i.e = i.f = 0;
                    var d = i.inverse().multiply(u).multiply(i),
                        y = l.multiply(d).multiply(l.inverse()).multiply(o);
                    return this.el.setAttribute("transform", B(y)), y
                }
            }, {
                key: "_getState",
                value: function(t) {
                    var e = t.revX,
                        r = t.revY,
                        n = t.doW,
                        a = t.doH,
                        o = this.el,
                        s = this.storage,
                        i = this.options.container,
                        c = s.box,
                        l = s.wrapper,
                        u = s.parent,
                        h = s.handles.center,
                        v = o.getBBox(),
                        f = v.x,
                        d = v.y,
                        y = v.width,
                        p = v.height,
                        b = c.getBBox(),
                        x = b.width,
                        m = b.height,
                        g = b.x,
                        _ = b.y,
                        k = at(o, u),
                        w = at(o, i),
                        M = at(c.parentNode, i),
                        E = at(u, i),
                        j = f + y * (a ? .5 : e ? 1 : 0),
                        S = d + p * (n ? .5 : r ? 1 : 0),
                        T = {
                            matrix: k,
                            ctm: w,
                            boxCTM: M,
                            parentMatrix: E,
                            wrapperMatrix: at(l, l.parentNode),
                            trMatrix: nt(),
                            scMatrix: nt(),
                            rotMatrix: nt(),
                            scaleX: j,
                            scaleY: S,
                            scX: Math.sqrt(w.a * w.a + w.b * w.b),
                            scY: Math.sqrt(w.c * w.c + w.d * w.d),
                            bBox: v
                        },
                        V = g + x / 2,
                        A = _ + m / 2,
                        O = le(M, h ? h.cx.baseVal.value : V, h ? h.cy.baseVal.value : A),
                        C = O.x,
                        z = O.y,
                        X = rt(h) ? le(E.inverse(), C, z) : le(k, f + y / 2, d + p / 2),
                        Y = X.x,
                        D = X.y,
                        P = le(at(c, i), V, A),
                        N = P.x,
                        R = P.y;
                    return L(o).forEach(function(t) {
                        t.__ctm__ = at(t, i)
                    }), {
                        transform: T,
                        cw: x,
                        ch: m,
                        center: {
                            x: h ? C : N,
                            y: h ? z : R,
                            el_x: Y,
                            el_y: D,
                            hx: h ? h.cx.baseVal.value : null,
                            hy: h ? h.cy.baseVal.value : null,
                            isShifted: ce(N, 3) !== ce(C, 3) && ce(R, 3) !== ce(z, 3)
                        },
                        left: g,
                        top: _,
                        revX: e,
                        revY: r,
                        doW: n,
                        doH: a
                    }
                }
            }, {
                key: "_moveCenterHandle",
                value: function(t, e) {
                    var r = this.storage,
                        n = r.handles,
                        a = n.center,
                        o = n.radius,
                        s = r.center,
                        i = s.hx,
                        c = s.hy;
                    if (!U(a)) {
                        var l = i + t,
                            u = c + e;
                        a.cx.baseVal.value = l, a.cy.baseVal.value = u, o.x2.baseVal.value = l, o.y2.baseVal.value = u
                    }
                }
            }, {
                key: "resetCenterPoint",
                value: function() {
                    var t = this.storage,
                        e = t.box,
                        r = t.handles,
                        n = r.center,
                        a = r.radius,
                        o = e.getBBox(),
                        s = o.width,
                        i = o.height,
                        c = o.x,
                        l = o.y,
                        u = le(at(e, e.parentNode), c + s / 2, l + i / 2),
                        h = u.x,
                        v = u.y;
                    n.cx.baseVal.value = h, n.cy.baseVal.value = v, n.isShifted = !1, a.x2.baseVal.value = h, a.y2.baseVal.value = v
                }
            }, {
                key: "fitControlsToSize",
                value: function() {
                    var t = this.el,
                        e = this.storage,
                        r = e.box,
                        n = e.wrapper,
                        a = this.options.container,
                        o = t.getBBox(),
                        s = o.width,
                        i = o.height,
                        c = o.x,
                        l = o.y,
                        u = at(t, a);
                    n.removeAttribute("transform"), r.setAttribute("transform", B(u)), ht(this.storage, {
                        x: c,
                        y: l,
                        width: s,
                        height: i,
                        boxMatrix: u
                    })
                }
            }, {
                key: "controls",
                get: function() {
                    return this.storage.wrapper
                }
            }]), t
        }();

    function lt(e, t) {
        var r = t.x,
            n = t.y,
            a = [];
        switch (e.tagName.toLowerCase()) {
            case "text":
                var o = rt(e.x.baseVal[0]) ? e.x.baseVal[0].value + r : (Number(e.getAttribute("x")) || 0) + r,
                    s = rt(e.y.baseVal[0]) ? e.y.baseVal[0].value + n : (Number(e.getAttribute("y")) || 0) + n;
                a.push(["x", o], ["y", s]);
                break;
            case "use":
            case "image":
            case "rect":
                var i = rt(e.x.baseVal.value) ? e.x.baseVal.value + r : (Number(e.getAttribute("x")) || 0) + r,
                    c = rt(e.y.baseVal.value) ? e.y.baseVal.value + n : (Number(e.getAttribute("y")) || 0) + n;
                a.push(["x", i], ["y", c]);
                break;
            case "circle":
            case "ellipse":
                var l = e.cx.baseVal.value + r,
                    u = e.cy.baseVal.value + n;
                a.push(["cx", l], ["cy", u]);
                break;
            case "line":
                var h = e.x1.baseVal.value + r,
                    v = e.y1.baseVal.value + n,
                    f = e.x2.baseVal.value + r,
                    d = e.y2.baseVal.value + n;
                a.push(["x1", h], ["y1", v], ["x2", f], ["y2", d]);
                break;
            case "polygon":
            case "polyline":
                var y = ot(e.getAttribute("points")).map(function(t) {
                    return t[0] = Number(t[0]) + r, t[1] = Number(t[1]) + n, t.join(" ")
                }).join(" ");
                a.push(["points", y]);
                break;
            case "path":
                var p = e.getAttribute("d");
                a.push(["d", function(t) {
                    var e = t.path,
                        r = t.dx,
                        n = t.dy;
                    try {
                        for (var a = he(e), o = "", s = " ", i = !0, c = 0, l = a.length; c < l; c++) {
                            var u = a[c],
                                h = u.values,
                                v = u.key,
                                f = u.relative,
                                d = [];
                            switch (v) {
                                case "M":
                                    for (var y = 0, p = h.length; y < p; y += 2) {
                                        var b = se(h.slice(y, y + 2), 2),
                                            x = b[0],
                                            m = b[1];
                                        f && !i || (x += r, m += n), d.push(x, m), i = !1
                                    }
                                    break;
                                case "A":
                                    for (var g = 0, _ = h.length; g < _; g += 7) {
                                        var k = h.slice(g, g + 7);
                                        f || (k[5] += r, k[6] += n), d.push.apply(d, W(k))
                                    }
                                    break;
                                case "C":
                                    for (var w = 0, M = h.length; w < M; w += 6) {
                                        var E = h.slice(w, w + 6);
                                        f || (E[0] += r, E[1] += n, E[2] += r, E[3] += n, E[4] += r, E[5] += n), d.push.apply(d, W(E))
                                    }
                                    break;
                                case "H":
                                    for (var j = 0, S = h.length; j < S; j += 1) {
                                        var T = h.slice(j, j + 1);
                                        f || (T[0] += r), d.push(T[0])
                                    }
                                    break;
                                case "V":
                                    for (var V = 0, A = h.length; V < A; V += 1) {
                                        var O = h.slice(V, V + 1);
                                        f || (O[0] += n), d.push(O[0])
                                    }
                                    break;
                                case "L":
                                case "T":
                                    for (var C = 0, z = h.length; C < z; C += 2) {
                                        var X = se(h.slice(C, C + 2), 2),
                                            Y = X[0],
                                            D = X[1];
                                        f || (Y += r, D += n), d.push(Y, D)
                                    }
                                    break;
                                case "Q":
                                case "S":
                                    for (var P = 0, N = h.length; P < N; P += 4) {
                                        var R = se(h.slice(P, P + 4), 4),
                                            L = R[0],
                                            B = R[1],
                                            H = R[2],
                                            F = R[3];
                                        f || (L += r, B += n, H += r, F += n), d.push(L, B, H, F)
                                    }
                                    break;
                                case "Z":
                                    s = h[0] = ""
                            }
                            o += u.cmd + d.join(",") + s
                        }
                        return o
                    } catch (t) {
                        ie("Path parsing error: " + t)
                    }
                }({
                    path: p,
                    dx: r,
                    dy: n
                })])
        }
        a.forEach(function(t) {
            e.setAttribute(t[0], t[1])
        })
    }

    function ut(a, t) {
        var e = t.scaleX,
            r = t.scaleY,
            n = t.bBox,
            o = t.defaultCTM,
            s = t.container,
            i = n.width,
            c = n.height,
            l = [],
            u = at(a, s),
            h = o.inverse().multiply(u);
        switch (a.tagName.toLowerCase()) {
            case "text":
                var v = rt(a.x.baseVal[0]) ? a.x.baseVal[0].value : Number(a.getAttribute("x")) || 0,
                    f = rt(a.y.baseVal[0]) ? a.y.baseVal[0].value : Number(a.getAttribute("y")) || 0,
                    d = le(h, v, f),
                    y = d.x,
                    p = d.y;
                l.push(["x", y + (e < 0 ? i : 0)], ["y", p + (r < 0 ? c : 0)]);
                break;
            case "circle":
                var b = a.r.baseVal.value,
                    x = a.cx.baseVal.value,
                    m = a.cy.baseVal.value,
                    g = b * (Math.abs(e) + Math.abs(r)) / 2,
                    _ = le(h, x, m),
                    k = _.x,
                    w = _.y;
                l.push(["r", g], ["cx", k], ["cy", w]);
                break;
            case "image":
            case "rect":
                var M = a.width.baseVal.value,
                    E = a.height.baseVal.value,
                    j = a.x.baseVal.value,
                    S = a.y.baseVal.value,
                    T = le(h, j, S),
                    V = T.x,
                    A = T.y,
                    O = Math.abs(M * e),
                    C = Math.abs(E * r);
                l.push(["x", V - (e < 0 ? O : 0)], ["y", A - (r < 0 ? C : 0)], ["width", O], ["height", C]);
                break;
            case "ellipse":
                var z = a.rx.baseVal.value,
                    X = a.ry.baseVal.value,
                    Y = a.cx.baseVal.value,
                    D = a.cy.baseVal.value,
                    P = le(h, Y, D),
                    N = P.x,
                    R = P.y,
                    L = nt();
                L.a = e, L.d = r;
                var B = le(L, z, X),
                    H = B.x,
                    F = B.y;
                l.push(["rx", Math.abs(H)], ["ry", Math.abs(F)], ["cx", N], ["cy", R]);
                break;
            case "line":
                var W = a.x1.baseVal.value,
                    q = a.y1.baseVal.value,
                    I = a.x2.baseVal.value,
                    G = a.y2.baseVal.value,
                    U = le(h, W, q),
                    Q = U.x,
                    Z = U.y,
                    $ = le(h, I, G),
                    J = $.x,
                    K = $.y;
                l.push(["x1", Q], ["y1", Z], ["x2", J], ["y2", K]);
                break;
            case "polygon":
            case "polyline":
                var tt = ot(a.getAttribute("points")).map(function(t) {
                    var e = le(h, Number(t[0]), Number(t[1])),
                        r = e.x,
                        n = e.y;
                    return t[0] = r, t[1] = n, t.join(" ")
                }).join(" ");
                l.push(["points", tt]);
                break;
            case "path":
                var et = a.getAttribute("d");
                l.push(["d", function(t) {
                    var e = t.path,
                        r = t.localCTM;
                    try {
                        for (var n = he(e), a = "", o = " ", s = [], i = !0, c = 0, l = n.length; c < l; c++) {
                            var u = n[c],
                                h = u.values,
                                v = u.key,
                                f = u.relative;
                            switch (v) {
                                case "A":
                                    for (var d = [], y = 0, p = h.length; y < p; y += 7) {
                                        var b = se(h.slice(y, y + 7), 7),
                                            x = b[0],
                                            m = b[1],
                                            g = b[2],
                                            _ = b[3],
                                            k = b[4],
                                            w = b[5],
                                            M = b[6],
                                            E = ue(r);
                                        f && (E.e = E.f = 0);
                                        var j = le(E, w, M),
                                            S = j.x,
                                            T = j.y;
                                        d.push(ce(S), ce(T)), E.e = E.f = 0;
                                        var V = le(E, x, m),
                                            A = V.x,
                                            O = V.y;
                                        d.unshift(ce(A), ce(O), g, _, k)
                                    }
                                    s.push(d);
                                    break;
                                case "C":
                                    for (var C = [], z = 0, X = h.length; z < X; z += 6) {
                                        var Y = se(h.slice(z, z + 6), 6),
                                            D = Y[0],
                                            P = Y[1],
                                            N = Y[2],
                                            R = Y[3],
                                            L = Y[4],
                                            B = Y[5],
                                            H = ue(r);
                                        f && (H.e = H.f = 0);
                                        var F = le(H, D, P),
                                            W = F.x,
                                            q = F.y,
                                            I = le(H, N, R),
                                            G = I.x,
                                            U = I.y,
                                            Q = le(H, L, B),
                                            Z = Q.x,
                                            $ = Q.y;
                                        C.push(ce(W), ce(q), ce(G), ce(U), ce(Z), ce($))
                                    }
                                    s.push(C);
                                    break;
                                case "H":
                                    for (var J = [], K = 0, tt = h.length; K < tt; K += 1) {
                                        var et = se(h.slice(K, K + 1), 1)[0],
                                            rt = ue(r);
                                        f && (rt.e = rt.f = 0);
                                        var nt = le(rt, et, 0).x;
                                        J.push(ce(nt))
                                    }
                                    s.push(J);
                                    break;
                                case "V":
                                    for (var at = [], ot = 0, st = h.length; ot < st; ot += 1) {
                                        var it = se(h.slice(ot, ot + 1), 1)[0],
                                            ct = ue(r);
                                        f && (ct.e = ct.f = 0);
                                        var lt = le(ct, 0, it).y;
                                        at.push(ce(lt))
                                    }
                                    s.push(at);
                                    break;
                                case "T":
                                case "L":
                                    for (var ut = [], ht = 0, vt = h.length; ht < vt; ht += 2) {
                                        var ft = se(h.slice(ht, ht + 2), 2),
                                            dt = ft[0],
                                            yt = ft[1],
                                            pt = ue(r);
                                        f && (pt.e = pt.f = 0);
                                        var bt = le(pt, dt, yt),
                                            xt = bt.x,
                                            mt = bt.y;
                                        ut.push(ce(xt), ce(mt))
                                    }
                                    s.push(ut);
                                    break;
                                case "M":
                                    for (var gt = [], _t = 0, kt = h.length; _t < kt; _t += 2) {
                                        var wt = se(h.slice(_t, _t + 2), 2),
                                            Mt = wt[0],
                                            Et = wt[1],
                                            jt = ue(r);
                                        f && !i && (jt.e = jt.f = 0);
                                        var St = le(jt, Mt, Et),
                                            Tt = St.x,
                                            Vt = St.y;
                                        gt.push(ce(Tt), ce(Vt)), i = !1
                                    }
                                    s.push(gt);
                                    break;
                                case "Q":
                                    for (var At = [], Ot = 0, Ct = h.length; Ot < Ct; Ot += 4) {
                                        var zt = se(h.slice(Ot, Ot + 4), 4),
                                            Xt = zt[0],
                                            Yt = zt[1],
                                            Dt = zt[2],
                                            Pt = zt[3],
                                            Nt = ue(r);
                                        f && (Nt.e = Nt.f = 0);
                                        var Rt = le(Nt, Xt, Yt),
                                            Lt = Rt.x,
                                            Bt = Rt.y,
                                            Ht = le(Nt, Dt, Pt),
                                            Ft = Ht.x,
                                            Wt = Ht.y;
                                        At.push(ce(Lt), ce(Bt), ce(Ft), ce(Wt))
                                    }
                                    s.push(At);
                                    break;
                                case "S":
                                    for (var qt = [], It = 0, Gt = h.length; It < Gt; It += 4) {
                                        var Ut = se(h.slice(It, It + 4), 4),
                                            Qt = Ut[0],
                                            Zt = Ut[1],
                                            $t = Ut[2],
                                            Jt = Ut[3],
                                            Kt = ue(r);
                                        f && (Kt.e = Kt.f = 0);
                                        var te = le(Kt, Qt, Zt),
                                            ee = te.x,
                                            re = te.y,
                                            ne = le(Kt, $t, Jt),
                                            ae = ne.x,
                                            oe = ne.y;
                                        qt.push(ce(ee), ce(re), ce(ae), ce(oe))
                                    }
                                    s.push(qt);
                                    break;
                                case "Z":
                                    s.push([""]), o = ""
                            }
                            a += u.cmd + s[c].join(",") + o
                        }
                        return a
                    } catch (t) {
                        ie("Path parsing error: " + t)
                    }
                }({
                    path: et,
                    localCTM: h
                })])
        }
        l.forEach(function(t) {
            var e = se(t, 2),
                r = e[0],
                n = e[1];
            a.setAttribute(r, n)
        })
    }

    function ht(t, e) {
        var r = t.box,
            n = t.handles,
            a = t.center,
            o = e.x,
            s = e.y,
            i = e.width,
            c = e.height,
            l = e.boxMatrix,
            u = i / 2,
            h = c / 2,
            v = null !== l ? l : at(r, r.parentNode),
            f = le(v, o + u, s + h),
            d = {
                tl: le(v, o, s),
                tr: le(v, o + i, s),
                br: le(v, o + i, s + c),
                bl: le(v, o, s + c),
                tc: le(v, o + u, s),
                bc: le(v, o + u, s + c),
                ml: le(v, o, s + h),
                mr: le(v, o + i, s + h),
                rotator: {},
                center: rt(n.center) && !a.isShifted ? f : void 0
            },
            y = Math.atan2(d.tl.y - d.tr.y, d.tl.x - d.tr.x);
        d.rotator.x = d.mr.x - it * Math.cos(y), d.rotator.y = d.mr.y - it * Math.sin(y);
        var p = n.normal,
            b = n.radius;
        rt(p) && (p.x1.baseVal.value = d.mr.x, p.y1.baseVal.value = d.mr.y, p.x2.baseVal.value = d.rotator.x, p.y2.baseVal.value = d.rotator.y), rt(b) && (b.x1.baseVal.value = f.x, b.y1.baseVal.value = f.y, a.isShifted || (b.x2.baseVal.value = f.x, b.y2.baseVal.value = f.y));
        var x = {
            x: o += i < 0 ? i : 0,
            y: s += c < 0 ? c : 0,
            width: Math.abs(i),
            height: Math.abs(c)
        };
        Object.keys(x).forEach(function(t) {
            r.setAttribute(t, x[t])
        }), Object.keys(d).forEach(function(t) {
            var e = n[t],
                r = d[t];
            U(r) || U(e) || (e.setAttribute("cx", r.x), e.setAttribute("cy", r.y))
        })
    }

    function vt(t, e) {
        t.setAttribute("stroke", e), t.setAttribute("stroke-dasharray", "3 3"), t.setAttribute("vector-effect", "non-scaling-stroke")
    }

    function ft(r, t) {
        if (this.length) {
            var n = rt(t) && t instanceof m ? t : new m;
            return v.call(this, function(t, e) {
                return e instanceof SVGElement ? function(t) {
                    var e = t.tagName.toLowerCase();
                    return -1 !== N.indexOf(e) || (ie("Selected element is not allowed to transform. Allowed elements:\n" + "circle, ellipse, image, line, path, polygon, polyline, rect, text, g"), !1)
                }(e) && t.push(new ct(e, r, n)) : t.push(new T(e, r, n)), t
            }, [])
        }
    }
    var dt = function() {
        function n(t, e) {
            var r;
            return s(this, n), (r = c(this, i(n).call(this, t))).enable(e), r
        }
        return o(n, k), r(n, [{
            key: "_init",
            value: function() {
                var e = this,
                    t = this.el,
                    r = this.options,
                    n = Z(t),
                    a = r.style,
                    o = r.appendTo,
                    s = I({
                        position: "absolute",
                        "z-index": "2147483647"
                    }, a);
                this.storage = {
                    css: s,
                    parent: rt(o) ? Z(o)[0] : document.body
                }, n.on("mousedown", this._onMouseDown).on("touchstart", this._onTouchStart), M.slice(0, 3).forEach(function(t) {
                    e.eventDispatcher.registerEvent(t)
                })
            }
        }, {
            key: "_processOptions",
            value: function(t) {
                var e = {},
                    r = null,
                    n = document,
                    a = function() {},
                    o = function() {},
                    s = function() {},
                    i = function() {};
                if (rt(t)) {
                    var c = t.style,
                        l = t.appendTo,
                        u = t.stack,
                        h = t.onInit,
                        v = t.onMove,
                        f = t.onDrop,
                        d = t.onDestroy;
                    e = rt(c) && "object" === p(c) ? c : e, r = l || null;
                    var y = rt(u) ? Z(u)[0] : document;
                    a = Q(h), o = Q(v), s = b(f) ? function(t) {
                        var e = this.storage.clone;
                        ! function(t, e) {
                            var r = F(t),
                                n = r.top,
                                a = r.left,
                                o = F(e),
                                s = o.top,
                                i = o.left,
                                c = Z(t),
                                l = Z(e);
                            return !(n < s || n + parseFloat(c.css("height")) > s + parseFloat(l.css("height")) || a < i || a + parseFloat(c.css("width")) > i + parseFloat(l.css("width")))
                        }(e, y) || f.call(this, t, this.el, e)
                    } : function() {}, i = Q(d)
                }
                this.options = {
                    style: e,
                    appendTo: r,
                    stack: n
                }, this.proxyMethods = {
                    onInit: a,
                    onDrop: s,
                    onMove: o,
                    onDestroy: i
                }
            }
        }, {
            key: "_start",
            value: function(t) {
                var e = t.clientX,
                    r = t.clientY,
                    n = this.storage,
                    a = this.el,
                    o = n.parent,
                    s = n.css,
                    i = F(o),
                    c = i.left,
                    l = i.top;
                s.left = "".concat(e - c, "px"), s.top = "".concat(r - l, "px");
                var u = a.cloneNode(!0);
                Z(u).css(s), n.clientX = e, n.clientY = r, n.cx = e, n.cy = r, n.clone = u, Z(o)[0].appendChild(u), this._draw()
            }
        }, {
            key: "_moving",
            value: function(t) {
                var e = t.clientX,
                    r = t.clientY,
                    n = this.storage;
                n.clientX = e, n.clientY = r, n.doDraw = !0, n.doMove = !0
            }
        }, {
            key: "_end",
            value: function(t) {
                var e = this.storage,
                    r = e.clone,
                    n = e.frameId;
                e.doDraw = !1, x(n), U(r) || (this.proxyMethods.onDrop.call(this, t), r.parentNode.removeChild(r), delete e.clone)
            }
        }, {
            key: "_animate",
            value: function() {
                var t = this.storage;
                t.frameId = G(this._animate);
                var e = t.doDraw,
                    r = t.clientX,
                    n = t.clientY,
                    a = t.cx,
                    o = t.cy;
                e && (t.doDraw = !1, this._drag({
                    dx: r - a,
                    dy: n - o
                }))
            }
        }, {
            key: "_processMove",
            value: function(t, e) {
                var r = this.storage.clone,
                    n = "translate(".concat(t, "px, ").concat(e, "px)");
                Z(r).css({
                    transform: n,
                    webkitTranform: n,
                    mozTransform: n,
                    msTransform: n,
                    otransform: n
                })
            }
        }, {
            key: "_destroy",
            value: function() {
                var t = this.storage,
                    e = this.proxyMethods,
                    r = this.el;
                U(t) || (Z(r).off("mousedown", this._onMouseDown).off("touchstart", this._onTouchStart), e.onDestroy.call(this, r), delete this.storage)
            }
        }, {
            key: "disable",
            value: function() {
                this._destroy()
            }
        }]), n
    }();

    function yt(e) {
        if (this.length) return h.call(this, function(t) {
            return new dt(t, e)
        })
    }
    var pt = function() {
        function t() {
            return s(this, t), c(this, i(t).apply(this, arguments))
        }
        return o(t, d), r(t, [{
            key: "drag",
            value: function() {
                return ft.call.apply(ft, [this].concat(Array.prototype.slice.call(arguments)))
            }
        }, {
            key: "clone",
            value: function() {
                return yt.call.apply(yt, [this].concat(Array.prototype.slice.call(arguments)))
            }
        }]), t
    }();

    function bt(t) {
        return new pt(t)
    }
    return Object.defineProperty(bt, "createObservable", {
        value: function() {
            return new m
        }
    }), Object.defineProperty(bt, "Subjx", {
        value: pt
    }), Object.defineProperty(bt, "Observable", {
        value: m
    }), bt
});