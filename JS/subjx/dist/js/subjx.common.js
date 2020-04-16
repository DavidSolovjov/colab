/*@license
 * Drag/Rotate/Resize Library
 * Released under the MIT license, 2018-2020
 * Karen Sarksyan
 * nichollascarter@gmail.com
 */
"use strict";
const requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
        return setTimeout(e, 1e3 / 60)
    },
    cancelAnimFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || function(e) {
        clearTimeout(e)
    },
    {
        forEach: forEach,
        slice: arrSlice,
        map: arrMap,
        reduce: arrReduce
    } = Array.prototype,
    {
        warn: warn
    } = console;

function isDef(e) {
    return null != e
}

function isUndef(e) {
    return null == e
}

function isFunc(e) {
    return "function" == typeof e
}

function createMethod(e) {
    return isFunc(e) ? function() {
        e.call(this, ...arguments)
    } : () => {}
}
class Helper {
    constructor(e) {
        if ("string" == typeof e) {
            const t = document.querySelectorAll(e);
            this.length = t.length;
            for (let e = 0; e < this.length; e++) this[e] = t[e]
        } else if ("object" != typeof e || 1 !== e.nodeType && e !== document)
            if (e instanceof Helper) {
                this.length = e.length;
                for (let t = 0; t < this.length; t++) this[t] = e[t]
            } else {
                if (!isIterable(e)) throw new Error("Passed parameter must be selector/element/elementArray");
                this.length = 0;
                for (let t = 0; t < this.length; t++) 1 === e.nodeType && (this[t] = e[t], this.length++)
            } else this[0] = e, this.length = 1
    }
    css(e) {
        const t = {
            setStyle(e) {
                return ((e, t) => {
                    let s = e.length;
                    for (; s--;)
                        for (const o in t) e[s].style[o] = t[o];
                    return e.style
                })(this, e)
            }, getStyle() {
                return (t => {
                    let s = t.length;
                    for (; s--;) return t[s].currentStyle ? t[s].currentStyle[e] : document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(t[s], "")[e] : t[s].style[e]
                })(this)
            }
        };
        return "string" == typeof e ? t.getStyle.apply(this, arrSlice.call(arguments, 1)) : "object" != typeof e && e ? (warn(`Method ${e} does not exist`), !1) : t.setStyle.apply(this, arguments)
    }
    on() {
        let e = this.length;
        for (; e--;) this[e].events || (this[e].events = {}, this[e].events[arguments[0]] = []), "string" != typeof arguments[1] ? document.addEventListener ? this[e].addEventListener(arguments[0], arguments[1], arguments[2] || {
            passive: !1
        }) : document.attachEvent ? this[e].attachEvent(`on${arguments[0]}`, arguments[1]) : this[e][`on${arguments[0]}`] = arguments[1] : listenerDelegate(this[e], arguments[0], arguments[1], arguments[2], arguments[3], !0);
        return this
    }
    off() {
        let e = this.length;
        for (; e--;) this[e].events || (this[e].events = {}, this[e].events[arguments[0]] = []), "string" != typeof arguments[1] ? document.removeEventListener ? this[e].removeEventListener(arguments[0], arguments[1], arguments[2]) : document.detachEvent ? this[e].detachEvent(`on${arguments[0]}`, arguments[1]) : this[e][`on${arguments[0]}`] = null : listenerDelegate(this[e], arguments[0], arguments[1], arguments[2], arguments[3], !1);
        return this
    }
    is(e) {
        if (isUndef(e)) return !1;
        const t = helper(e);
        let s = this.length;
        for (; s--;)
            if (this[s] === t[s]) return !0;
        return !1
    }
}

function listenerDelegate(e, t, s, o, r, n) {
    const a = function(e) {
        let t = e.target;
        for (; t && t !== this;) t.matches(s) && o.call(t, e), t = t.parentNode
    };
    !0 === n ? document.addEventListener ? e.addEventListener(t, a, r || {
        passive: !1
    }) : document.attachEvent ? e.attachEvent(`on${t}`, a) : e[`on${t}`] = a : document.removeEventListener ? e.removeEventListener(t, a, r || {
        passive: !1
    }) : document.detachEvent ? e.detachEvent(`on${t}`, a) : e[`on${t}`] = null
}

function isIterable(e) {
    return isDef(e) && "object" == typeof e && (Array.isArray(e) || isDef(window.Symbol) && "function" == typeof e[window.Symbol.iterator] || isDef(e.forEach) || "number" == typeof e.length && (0 === e.length || e.length > 0 && e.length - 1 in e))
}

function helper(e) {
    return new Helper(e)
}
class Observable {
    constructor() {
        this.observers = {}
    }
    subscribe(e, t) {
        const s = this.observers;
        return isUndef(s[e]) && Object.defineProperty(s, e, {
            value: []
        }), s[e].push(t), this
    }
    unsubscribe(e, t) {
        const s = this.observers;
        if (isDef(s[e])) {
            const o = s[e].indexOf(t);
            s[e].splice(o, 1)
        }
        return this
    }
    notify(e, t, s) {
        isUndef(this.observers[e]) || this.observers[e].forEach(o => {
            if (t !== o) switch (e) {
                case "onmove":
                    o.notifyMove(s);
                    break;
                case "onrotate":
                    o.notifyRotate(s);
                    break;
                case "onresize":
                    o.notifyResize(s);
                    break;
                case "onapply":
                    o.notifyApply(s);
                    break;
                case "ongetstate":
                    o.notifyGetState(s)
            }
        })
    }
}
class Event {
    constructor(e) {
        this.name = e, this.callbacks = []
    }
    registerCallback(e) {
        this.callbacks.push(e)
    }
    removeCallback(e) {
        const t = this.callbacks(e);
        this.callbacks.splice(t, 1)
    }
}
class EventDispatcher {
    constructor() {
        this.events = {}
    }
    registerEvent(e) {
        this.events[e] = new Event(e)
    }
    emit(e, t, s) {
        this.events[t].callbacks.forEach(t => {
            t.call(e, s)
        })
    }
    addEventListener(e, t) {
        this.events[e].registerCallback(t)
    }
    removeEventListener(e, t) {
        this.events[e].removeCallback(t)
    }
}
class SubjectModel {
    constructor(e) {
        this.el = e, this.storage = null, this.proxyMethods = null, this.eventDispatcher = new EventDispatcher, this._onMouseDown = this._onMouseDown.bind(this), this._onTouchStart = this._onTouchStart.bind(this), this._onMouseMove = this._onMouseMove.bind(this), this._onTouchMove = this._onTouchMove.bind(this), this._onMouseUp = this._onMouseUp.bind(this), this._onTouchEnd = this._onTouchEnd.bind(this), this._animate = this._animate.bind(this)
    }
    enable(e) {
        this._processOptions(e), this._init(this.el), this.proxyMethods.onInit.call(this, this.el)
    }
    disable() {
        throwNotImplementedError()
    }
    _init() {
        throwNotImplementedError()
    }
    _destroy() {
        throwNotImplementedError()
    }
    _processOptions() {
        throwNotImplementedError()
    }
    _start() {
        throwNotImplementedError()
    }
    _moving() {
        throwNotImplementedError()
    }
    _end() {
        throwNotImplementedError()
    }
    _animate() {
        throwNotImplementedError()
    }
    _drag({
        dx: e,
        dy: t,
        ...s
    }) {
        const o = {
            dx: e,
            dy: t,
            transform: this._processMove(e, t),
            ...s
        };
        this.proxyMethods.onMove.call(this, o), this._emitEvent("drag", o)
    }
    _draw() {
        this._animate()
    }
    _onMouseDown(e) {
        this._start(e), helper(document).on("mousemove", this._onMouseMove).on("mouseup", this._onMouseUp)
    }
    _onTouchStart(e) {
        this._start(e.touches[0]), helper(document).on("touchmove", this._onTouchMove).on("touchend", this._onTouchEnd)
    }
    _onMouseMove(e) {
        e.preventDefault && e.preventDefault(), this._moving(e, this.el)
    }
    _onTouchMove(e) {
        e.preventDefault && e.preventDefault(), this._moving(e.touches[0], this.el)
    }
    _onMouseUp(e) {
        helper(document).off("mousemove", this._onMouseMove).off("mouseup", this._onMouseUp), this._end(e, this.el)
    }
    _onTouchEnd(e) {
        helper(document).off("touchmove", this._onTouchMove).off("touchend", this._onTouchEnd), 0 === e.touches.length && this._end(e.changedTouches[0], this.el)
    }
    _emitEvent() {
        this.eventDispatcher.emit(this, ...arguments)
    }
    on(e, t) {
        return this.eventDispatcher.addEventListener(e, t), this
    }
    off(e, t) {
        return this.eventDispatcher.removeEventListener(e, t), this
    }
}

function throwNotImplementedError() {
    throw Error("Method not implemented")
}
const EVENTS = ["dragStart", "drag", "dragEnd", "resizeStart", "resize", "resizeEnd", "rotateStart", "rotate", "rotateEnd", "setPointStart", "setPointEnd"],
    RAD = Math.PI / 180;

function snapToGrid(e, t) {
    if (0 === t) return e; {
        const s = snapCandidate(e, t);
        if (s - e < t) return s
    }
}

function snapCandidate(e, t) {
    return 0 === t ? e : Math.round(e / t) * t
}

function floatToFixed(e, t = 6) {
    return Number(e.toFixed(t))
}

function getOffset(e) {
    return e.getBoundingClientRect()
}

function getTransform(e) {
    return e.css("-webkit-transform") || e.css("-moz-transform") || e.css("-ms-transform") || e.css("-o-transform") || e.css("transform") || "none"
}

function parseMatrix(e) {
    const t = e.match(/[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g);
    return t ? t.map(e => parseFloat(e)) : [1, 0, 0, 1, 0, 0]
}

function addClass(e, t) {
    if (t) {
        if (e.classList) {
            if (!(t.indexOf(" ") > -1)) return e.classList.add(t);
            t.split(/\s+/).forEach(t => e.classList.add(t))
        }
        return e
    }
}

function removeClass(e, t) {
    if (t) {
        if (e.classList) {
            if (!(t.indexOf(" ") > -1)) return e.classList.remove(t);
            t.split(/\s+/).forEach(t => e.classList.remove(t))
        }
        return e
    }
}

function objectsCollide(e, t) {
    const {
        top: s,
        left: o
    } = getOffset(e), {
        top: r,
        left: n
    } = getOffset(t), a = helper(e), i = helper(t);
    return !(s < r || s + parseFloat(a.css("height")) > r + parseFloat(i.css("height")) || o < n || o + parseFloat(a.css("width")) > n + parseFloat(i.css("width")))
}

function matrixToCSS(e) {
    const t = `matrix(${e.join()})`;
    return {
        transform: t,
        webkitTranform: t,
        mozTransform: t,
        msTransform: t,
        otransform: t
    }
}
class Transformable extends SubjectModel {
    constructor(e, t, s) {
        if (super(e), this.constructor === Transformable) throw new TypeError("Cannot construct Transformable instances directly");
        this.observable = s, EVENTS.forEach(e => {
            this.eventDispatcher.registerEvent(e)
        }), this.enable(t)
    }
    _cursorPoint() {
        throw Error("'_cursorPoint()' method not implemented")
    }
    _rotate({
        radians: e,
        ...t
    }) {
        const s = {
            transform: this._processRotate(e),
            delta: e,
            ...t
        };
        this.proxyMethods.onRotate.call(this, s), this._emitEvent("rotate", s)
    }
    _resize({
        dx: e,
        dy: t,
        ...s
    }) {
        const o = {...this._processResize(e, t), dx: e, dy: t, ...s
        };
        this.proxyMethods.onResize.call(this, o), this._emitEvent("resize", o)
    }
    _processOptions(e) {
        const {
            el: t
        } = this;
        addClass(t, "sjx-drag");
        const s = {
                x: 10,
                y: 10,
                angle: 10 * RAD
            },
            o = {
                move: !1,
                resize: !1,
                rotate: !1
            };
        let r = null,
            n = !1,
            a = "xy",
            i = "auto",
            l = "auto",
            c = "auto",
            h = "#00a8ff",
            d = !1,
            u = !0,
            p = !0,
            f = !0,
            x = () => {},
            m = () => {},
            b = () => {},
            y = () => {},
            g = () => {},
            v = () => {},
            T = t.parentNode;
        if (isDef(e)) {
            const {
                snap: M,
                each: E,
                axis: _,
                cursorMove: w,
                cursorResize: S,
                cursorRotate: D,
                rotationPoint: V,
                restrict: C,
                draggable: j,
                resizable: F,
                rotatable: k,
                onInit: A,
                onDrop: N,
                onMove: z,
                onResize: R,
                onRotate: X,
                onDestroy: Y,
                container: O,
                proportions: P,
                themeColor: G
            } = e;
            if (isDef(M)) {
                const {
                    x: e,
                    y: t,
                    angle: o
                } = M;
                s.x = isUndef(e) ? 10 : e, s.y = isUndef(t) ? 10 : t, s.angle = isUndef(o) ? s.angle : o * RAD
            }
            if (isDef(E)) {
                const {
                    move: e,
                    resize: t,
                    rotate: s
                } = E;
                o.move = e || !1, o.resize = t || !1, o.rotate = s || !1
            }
            isDef(C) && (r = "parent" === C ? t.parentNode : helper(C)[0] || document), h = G || "#00a8ff", i = w || "auto", l = S || "auto", c = D || "auto", a = _ || "xy", T = isDef(O) && helper(O)[0] ? helper(O)[0] : T, d = V || !1, n = P || !1, u = !isDef(j) || j, p = !isDef(F) || F, f = !isDef(k) || k, x = createMethod(A), g = createMethod(N), m = createMethod(z), y = createMethod(R), b = createMethod(X), v = createMethod(Y)
        }
        this.options = {
            axis: a,
            themeColor: h,
            cursorMove: i,
            cursorRotate: c,
            cursorResize: l,
            rotationPoint: d,
            restrict: r,
            container: T,
            snap: s,
            each: o,
            proportions: n,
            draggable: u,
            resizable: p,
            rotatable: f
        }, this.proxyMethods = {
            onInit: x,
            onDrop: g,
            onMove: m,
            onResize: y,
            onRotate: b,
            onDestroy: v
        }, this.subscribe(o)
    }
    _animate() {
        const e = this,
            {
                observable: t,
                storage: s,
                options: o
            } = e;
        if (isUndef(s)) return;
        if (s.frame = requestAnimFrame(e._animate), !s.doDraw) return;
        s.doDraw = !1;
        let {
            dox: r,
            doy: n,
            clientX: a,
            clientY: i,
            doDrag: l,
            doResize: c,
            doRotate: h,
            doSetCenter: d,
            revX: u,
            revY: p
        } = s;
        const {
            snap: f,
            each: {
                move: x,
                resize: m,
                rotate: b
            },
            restrict: y,
            draggable: g,
            resizable: v,
            rotatable: T
        } = o;
        if (c && v) {
            const {
                transform: o,
                cx: l,
                cy: c
            } = s, {
                x: h,
                y: d
            } = this._pointToElement({
                x: a,
                y: i
            });
            let x = r ? snapToGrid(h - l, f.x / o.scX) : 0,
                b = n ? snapToGrid(d - c, f.y / o.scY) : 0;
            const y = {
                dx: x = r ? u ? -x : x : 0,
                dy: b = n ? p ? -b : b : 0,
                clientX: a,
                clientY: i
            };
            e._resize(y), m && t.notify("onresize", e, y)
        }
        if (l && g) {
            const {
                restrictOffset: o,
                elementOffset: l,
                nx: c,
                ny: h
            } = s;
            isDef(y) && (a - o.left < c - l.left && (a = c - l.left + o.left), i - o.top < h - l.top && (i = h - l.top + o.top));
            const d = {
                dx: r ? snapToGrid(a - c, f.x) : 0,
                dy: n ? snapToGrid(i - h, f.y) : 0,
                clientX: a,
                clientY: i
            };
            e._drag(d), x && t.notify("onmove", e, d)
        }
        if (h && T) {
            const {
                pressang: o,
                center: r
            } = s, n = Math.atan2(i - r.y, a - r.x) - o, l = {
                clientX: a,
                clientY: i
            };
            e._rotate({
                radians: snapToGrid(n, f.angle),
                ...l
            }), b && t.notify("onrotate", e, {
                radians: n,
                ...l
            })
        }
        if (d && T) {
            const {
                bx: t,
                by: o
            } = s, {
                x: r,
                y: n
            } = this._pointToControls({
                x: a,
                y: i
            });
            e._moveCenterHandle(r - t, n - o)
        }
    }
    _start(e) {
        const {
            observable: t,
            storage: s,
            options: {
                axis: o,
                restrict: r,
                each: n
            },
            el: a
        } = this, i = this._compute(e);
        Object.keys(i).forEach(e => {
            s[e] = i[e]
        });
        const {
            onRightEdge: l,
            onBottomEdge: c,
            onTopEdge: h,
            onLeftEdge: d,
            handle: u,
            factor: p,
            revX: f,
            revY: x,
            doW: m,
            doH: b
        } = i, y = l || c || h || d, {
            handles: g
        } = s, {
            rotator: v,
            center: T,
            radius: M
        } = g;
        isDef(M) && removeClass(M, "sjx-hidden");
        const E = u.is(v),
            _ = !!isDef(T) && u.is(T),
            w = !(E || y || _),
            {
                clientX: S,
                clientY: D
            } = e,
            {
                x: V,
                y: C
            } = this._cursorPoint({
                clientX: S,
                clientY: D
            }),
            {
                x: j,
                y: F
            } = this._pointToElement({
                x: V,
                y: C
            }),
            {
                x: k,
                y: A
            } = this._pointToControls({
                x: V,
                y: C
            }),
            N = {
                clientX: S,
                clientY: D,
                nx: V,
                ny: C,
                cx: j,
                cy: F,
                bx: k,
                by: A,
                doResize: y,
                doDrag: w,
                doRotate: E,
                doSetCenter: _,
                onExecution: !0,
                cursor: null,
                elementOffset: getOffset(a),
                restrictOffset: isDef(r) ? getOffset(r) : null,
                dox: /\x/.test(o) && (!y || (u.is(g.ml) || u.is(g.mr) || u.is(g.tl) || u.is(g.tr) || u.is(g.bl) || u.is(g.br))),
                doy: /\y/.test(o) && (!y || (u.is(g.br) || u.is(g.bl) || u.is(g.bc) || u.is(g.tr) || u.is(g.tl) || u.is(g.tc)))
            };
        this.storage = {...s, ...N
        };
        const z = {
            clientX: S,
            clientY: D
        };
        y ? this._emitEvent("resizeStart", z) : E ? this._emitEvent("rotateStart", z) : w && this._emitEvent("dragStart", z);
        const {
            move: R,
            resize: X,
            rotate: Y
        } = n, O = y ? "resize" : E ? "rotate" : "drag", P = y && X || E && Y || w && R;
        t.notify("ongetstate", this, {
            clientX: S,
            clientY: D,
            actionName: O,
            triggerEvent: P,
            factor: p,
            revX: f,
            revY: x,
            doW: m,
            doH: b
        }), this._draw()
    }
    _moving(e) {
        const {
            storage: t,
            options: s
        } = this, {
            x: o,
            y: r
        } = this._cursorPoint(e);
        t.e = e, t.clientX = o, t.clientY = r, t.doDraw = !0;
        let {
            doRotate: n,
            doDrag: a,
            doResize: i,
            cursor: l
        } = t;
        const {
            cursorMove: c,
            cursorResize: h,
            cursorRotate: d
        } = s;
        isUndef(l) && (a ? l = c : n ? l = d : i && (l = h), helper(document.body).css({
            cursor: l
        }))
    }
    _end({
        clientX: e,
        clientY: t
    }) {
        const {
            options: {
                each: s
            },
            observable: o,
            storage: r,
            proxyMethods: n
        } = this, {
            doResize: a,
            doDrag: i,
            doRotate: l,
            frame: c,
            handles: {
                radius: h
            }
        } = r, d = a ? "resize" : i ? "drag" : "rotate";
        r.doResize = !1, r.doDrag = !1, r.doRotate = !1, r.doSetCenter = !1, r.doDraw = !1, r.onExecution = !1, r.cursor = null, this._apply(d);
        const u = {
            clientX: e,
            clientY: t
        };
        n.onDrop.call(this, u), a ? this._emitEvent("resizeEnd", u) : l ? this._emitEvent("rotateEnd", u) : i && this._emitEvent("dragEnd", u);
        const {
            move: p,
            resize: f,
            rotate: x
        } = s, m = a && f || l && x || i && p;
        o.notify("onapply", this, {
            clientX: e,
            clientY: t,
            actionName: d,
            triggerEvent: m
        }), cancelAnimFrame(c), helper(document.body).css({
            cursor: "auto"
        }), isDef(h) && addClass(h, "sjx-hidden")
    }
    _compute(e) {
        const {
            handles: t
        } = this.storage, s = helper(e.target), {
            revX: o,
            revY: r,
            doW: n,
            doH: a,
            ...i
        } = this._checkHandles(s, t), l = this._getState({
            revX: o,
            revY: r,
            doW: n,
            doH: a
        }), {
            x: c,
            y: h
        } = this._cursorPoint(e), d = Math.atan2(h - l.center.y, c - l.center.x);
        return {...l, ...i, handle: s, pressang: d
        }
    }
    _checkHandles(e, t) {
        const {
            tl: s,
            tc: o,
            tr: r,
            bl: n,
            br: a,
            bc: i,
            ml: l,
            mr: c
        } = t, h = !!isDef(s) && e.is(s), d = !!isDef(o) && e.is(o), u = !!isDef(r) && e.is(r), p = !!isDef(n) && e.is(n), f = !!isDef(i) && e.is(i), x = !!isDef(a) && e.is(a), m = !!isDef(l) && e.is(l), b = !!isDef(c) && e.is(c);
        return {
            revX: h || m || p || d,
            revY: h || u || d || m,
            onTopEdge: d || u || h,
            onLeftEdge: h || m || p,
            onRightEdge: u || b || x,
            onBottomEdge: x || f || p,
            doW: m || b,
            doH: d || f
        }
    }
    notifyMove() {
        this._drag(...arguments)
    }
    notifyRotate({
        radians: e,
        ...t
    }) {
        const {
            snap: {
                angle: s
            }
        } = this.options;
        this._rotate({
            radians: snapToGrid(e, s),
            ...t
        })
    }
    notifyResize() {
        this._resize(...arguments)
    }
    notifyApply({
        clientX: e,
        clientY: t,
        actionName: s,
        triggerEvent: o
    }) {
        this.proxyMethods.onDrop.call(this, {
            clientX: e,
            clientY: t
        }), o && (this._apply(s), this._emitEvent(`${s}End`, {
            clientX: e,
            clientY: t
        }))
    }
    notifyGetState({
        clientX: e,
        clientY: t,
        actionName: s,
        triggerEvent: o,
        ...r
    }) {
        if (o) {
            const o = this._getState(r);
            this.storage = {...this.storage, ...o
            }, this._emitEvent(`${s}Start`, {
                clientX: e,
                clientY: t
            })
        }
    }
    subscribe({
        resize: e,
        move: t,
        rotate: s
    }) {
        const {
            observable: o
        } = this;
        (t || e || s) && o.subscribe("ongetstate", this).subscribe("onapply", this), t && o.subscribe("onmove", this), e && o.subscribe("onresize", this), s && o.subscribe("onrotate", this)
    }
    unsubscribe() {
        const {
            observable: e
        } = this;
        e.unsubscribe("ongetstate", this).unsubscribe("onapply", this).unsubscribe("onmove", this).unsubscribe("onresize", this).unsubscribe("onrotate", this)
    }
    disable() {
        const {
            storage: e,
            proxyMethods: t,
            el: s
        } = this;
        isUndef(e) || (e.onExecution && (this._end(), helper(document).off("mousemove", this._onMouseMove).off("mouseup", this._onMouseUp).off("touchmove", this._onTouchMove).off("touchend", this._onTouchEnd)), removeClass(s, "sjx-drag"), this._destroy(), this.unsubscribe(), t.onDestroy.call(this, s), delete this.storage)
    }
    exeDrag({
        dx: e,
        dy: t
    }) {
        const {
            draggable: s
        } = this.options;
        s && (this.storage = {...this.storage, ...this._getState({
                revX: !1,
                revY: !1,
                doW: !1,
                doH: !1
            })
        }, this._drag({
            dx: e,
            dy: t
        }), this._apply("drag"))
    }
    exeResize({
        dx: e,
        dy: t,
        revX: s,
        revY: o,
        doW: r,
        doH: n
    }) {
        const {
            resizable: a
        } = this.options;
        a && (this.storage = {...this.storage, ...this._getState({
                revX: s || !1,
                revY: o || !1,
                doW: r || !1,
                doH: n || !1
            })
        }, this._resize({
            dx: e,
            dy: t
        }), this._apply("resize"))
    }
    exeRotate({
        delta: e
    }) {
        const {
            rotatable: t
        } = this.options;
        t && (this.storage = {...this.storage, ...this._getState({
                revX: !1,
                revY: !1,
                doW: !1,
                doH: !1
            })
        }, this._rotate({
            radians: e
        }), this._apply("rotate"))
    }
}

function matrixTransform({
    x: e,
    y: t
}, s) {
    const [o, r, n, a, i, l] = s;
    return {
        x: o * e + n * t + i,
        y: r * e + a * t + l
    }
}

function matrixInvert(e) {
    const t = [
        [e[0], e[2], e[4]],
        [e[1], e[3], e[5]],
        [0, 0, 1]
    ];
    if (t.length !== t[0].length) return;
    const s = t.length,
        o = [],
        r = [];
    for (let e = 0; e < s; e += 1) {
        o[o.length] = [], r[r.length] = [];
        for (let n = 0; n < s; n += 1) o[e][n] = e == n ? 1 : 0, r[e][n] = t[e][n]
    }
    for (let e = 0; e < s; e += 1) {
        let t = r[e][e];
        if (0 === t) {
            for (let n = e + 1; n < s; n += 1)
                if (0 !== r[n][e]) {
                    for (let a = 0; a < s; a++) t = r[e][a], r[e][a] = r[n][a], r[n][a] = t, t = o[e][a], o[e][a] = o[n][a], o[n][a] = t;
                    break
                }
            if (0 === (t = r[e][e])) return
        }
        for (let n = 0; n < s; n++) r[e][n] = r[e][n] / t, o[e][n] = o[e][n] / t;
        for (let n = 0; n < s; n++)
            if (n != e) {
                t = r[n][e];
                for (let a = 0; a < s; a++) r[n][a] -= t * r[e][a], o[n][a] -= t * o[e][a]
            }
    }
    return [o[0][0], o[1][0], o[0][1], o[1][1], o[0][2], o[1][2]]
}

function multiplyMatrix([e, t, s, o, r, n], [a, i, l, c, h, d]) {
    const u = [
            [e, s, r],
            [t, o, n],
            [0, 0, 1]
        ],
        p = [
            [a, l, h],
            [i, c, d],
            [0, 0, 1]
        ],
        f = [];
    for (let e = 0; e < p.length; e++) {
        f[e] = [];
        for (let t = 0; t < u[0].length; t++) {
            let s = 0;
            for (let o = 0; o < u.length; o++) s += u[o][t] * p[e][o];
            f[e].push(s)
        }
    }
    return [f[0][0], f[1][0], f[0][1], f[1][1], f[0][2], f[1][2]]
}

function rotatedTopLeft(e, t, s, o, r, n, a, i, l) {
    const c = parseFloat(s) / 2,
        h = parseFloat(o) / 2,
        d = e + c,
        u = t + h,
        p = e - d,
        f = t - u,
        x = Math.atan2(i ? 0 : f, l ? 0 : p) + r,
        m = Math.sqrt(Math.pow(l ? 0 : c, 2) + Math.pow(i ? 0 : h, 2));
    let b = Math.cos(x),
        y = Math.sin(x);
    const g = u + m * (y = !0 === a ? -y : y);
    return {
        left: floatToFixed(d + m * (b = !0 === n ? -b : b)),
        top: floatToFixed(g)
    }
}
const MIN_SIZE = 2,
    CENTER_DELTA = 7;
class Draggable extends Transformable {
    _init(e) {
        const {
            rotationPoint: t,
            container: s,
            resizable: o,
            rotatable: r
        } = this.options, {
            left: n,
            top: a,
            width: i,
            height: l
        } = e.style, c = document.createElement("div");
        addClass(c, "sjx-wrapper"), s.appendChild(c);
        const h = helper(e),
            d = i || h.css("width"),
            u = l || h.css("height"),
            p = {
                top: a || h.css("top"),
                left: n || h.css("left"),
                width: d,
                height: u,
                transform: getTransform(h)
            },
            f = document.createElement("div");
        addClass(f, "sjx-controls");
        const x = {...r && {
                normal: ["sjx-normal"],
                rotator: ["sjx-hdl", "sjx-hdl-m", "sjx-rotator"]
            }, ...o && {
                tl: ["sjx-hdl", "sjx-hdl-t", "sjx-hdl-l", "sjx-hdl-tl"],
                tr: ["sjx-hdl", "sjx-hdl-t", "sjx-hdl-r", "sjx-hdl-tr"],
                br: ["sjx-hdl", "sjx-hdl-b", "sjx-hdl-r", "sjx-hdl-br"],
                bl: ["sjx-hdl", "sjx-hdl-b", "sjx-hdl-l", "sjx-hdl-bl"],
                tc: ["sjx-hdl", "sjx-hdl-t", "sjx-hdl-c", "sjx-hdl-tc"],
                bc: ["sjx-hdl", "sjx-hdl-b", "sjx-hdl-c", "sjx-hdl-bc"],
                ml: ["sjx-hdl", "sjx-hdl-m", "sjx-hdl-l", "sjx-hdl-ml"],
                mr: ["sjx-hdl", "sjx-hdl-m", "sjx-hdl-r", "sjx-hdl-mr"]
            }, center: t && r ? ["sjx-hdl", "sjx-hdl-m", "sjx-hdl-c", "sjx-hdl-mc"] : void 0
        };
        if (Object.keys(x).forEach(e => {
                const t = x[e];
                if (isUndef(t)) return;
                const s = createHandler(t);
                x[e] = s, f.appendChild(s)
            }), isDef(x.center)) {
            helper(x.center).css({
                left: `${e.getAttribute("data-cx")}px`,
                top: `${e.getAttribute("data-cy")}px`
            })
        }
        c.appendChild(f);
        const m = helper(f);
        m.css(p), this.storage = {
            controls: f,
            handles: x,
            radius: void 0,
            parent: e.parentNode
        }, m.on("mousedown", this._onMouseDown).on("touchstart", this._onTouchStart)
    }
    _destroy() {
        const {
            controls: e
        } = this.storage;
        helper(e).off("mousedown", this._onMouseDown).off("touchstart", this._onTouchStart);
        const t = e.parentNode;
        t.parentNode.removeChild(t)
    }
    _pointToElement({
        x: e,
        y: t
    }) {
        const {
            transform: s
        } = this.storage, o = [...s.matrix];
        return o[4] = o[5] = 0, this._applyMatrixToPoint(matrixInvert(o), e, t)
    }
    _pointToControls(e) {
        return this._pointToElement(e)
    }
    _applyMatrixToPoint(e, t, s) {
        return matrixTransform({
            x: t,
            y: s
        }, e)
    }
    _cursorPoint({
        clientX: e,
        clientY: t
    }) {
        const {
            container: s
        } = this.options;
        return matrixTransform({
            x: e,
            y: t
        }, matrixInvert(parseMatrix(getTransform(helper(s)))))
    }
    _apply() {
        const {
            el: e,
            storage: t
        } = this, {
            controls: s,
            handles: o
        } = t, r = helper(s), n = parseFloat(r.css("width")) / 2, a = parseFloat(r.css("height")) / 2, {
            center: i
        } = o, l = isDef(i), c = l ? parseFloat(helper(i).css("left")) : n, h = l ? parseFloat(helper(i).css("top")) : a;
        e.setAttribute("data-cx", c), e.setAttribute("data-cy", h), this.storage.cached = null
    }
    _processResize(e, t) {
        const {
            el: s,
            storage: o,
            options: {
                proportions: r
            }
        } = this, {
            controls: n,
            coords: a,
            cw: i,
            ch: l,
            transform: c,
            refang: h,
            revX: d,
            revY: u,
            doW: p,
            doH: f
        } = o, x = p || !p && !f ? (i + e) / i : (l + t) / l, m = r ? i * x : i + e, b = r ? l * x : l + t;
        if (m < MIN_SIZE || b < MIN_SIZE) return;
        const y = [...c.matrix],
            g = rotatedTopLeft(y[4], y[5], m, b, h, d, u, p, f),
            v = a.left - g.left,
            T = a.top - g.top;
        y[4] += v, y[5] += T;
        const M = matrixToCSS(y);
        return M.width = `${m}px`, M.height = `${b}px`, helper(n).css(M), helper(s).css(M), o.cached = {
            dx: v,
            dy: T
        }, {
            width: m,
            height: b,
            ox: v,
            oy: T
        }
    }
    _processMove(e, t) {
        const {
            el: s,
            storage: o
        } = this, {
            controls: r,
            transform: {
                matrix: n,
                parentMatrix: a
            }
        } = o, i = [...a];
        i[4] = i[5] = 0;
        const l = [...n];
        l[4] = n[4] + e, l[5] = n[5] + t;
        const c = matrixToCSS(l);
        return helper(r).css(c), helper(s).css(c), o.cached = {
            dx: e,
            dy: t
        }, l
    }
    _processRotate(e) {
        const {
            el: t,
            storage: {
                controls: s,
                transform: o,
                center: r
            }
        } = this, {
            matrix: n,
            parentMatrix: a
        } = o, i = floatToFixed(Math.cos(e), 4), l = floatToFixed(Math.sin(e), 4), c = [1, 0, 0, 1, r.cx, r.cy], h = [i, l, -l, i, 0, 0], d = [...a];
        d[4] = d[5] = 0;
        const u = multiplyMatrix(matrixInvert(d), multiplyMatrix(h, d)),
            p = multiplyMatrix(multiplyMatrix(c, u), matrixInvert(c)),
            f = multiplyMatrix(p, n),
            x = matrixToCSS(f);
        return helper(s).css(x), helper(t).css(x), f
    }
    _getState(e) {
        const {
            revX: t,
            revY: s,
            doW: o,
            doH: r
        } = e, n = t !== s ? -1 : 1, {
            el: a,
            storage: {
                handles: i,
                controls: l,
                parent: c
            },
            options: {
                container: h
            }
        } = this, {
            center: d
        } = i, u = helper(l), p = parseMatrix(getTransform(helper(h))), f = parseMatrix(getTransform(helper(l))), x = parseMatrix(getTransform(helper(c))), m = Math.atan2(f[1], f[0]) * n, b = c !== h ? multiplyMatrix(x, p) : p, y = {
            matrix: f,
            parentMatrix: b,
            scX: Math.sqrt(f[0] * f[0] + f[1] * f[1]),
            scY: Math.sqrt(f[2] * f[2] + f[3] * f[3])
        }, g = parseFloat(u.css("width")), v = parseFloat(u.css("height")), T = rotatedTopLeft(f[4], f[5], g, v, m, t, s, o, r), M = g / 2, E = v / 2, _ = getOffset(a), w = isDef(d), S = w ? parseFloat(helper(d).css("left")) : M, D = w ? parseFloat(helper(d).css("top")) : E, V = w ? CENTER_DELTA : 0, {
            x: C,
            y: j
        } = matrixTransform({
            x: _.left,
            y: _.top
        }, matrixInvert(b));
        return {
            transform: y,
            cw: g,
            ch: v,
            coords: T,
            center: {
                x: C + S - V,
                y: j + D - V,
                cx: -S + M - V,
                cy: -D + E - V,
                hx: S,
                hy: D
            },
            factor: n,
            refang: m,
            revX: t,
            revY: s,
            doW: o,
            doH: r
        }
    }
    _moveCenterHandle(e, t) {
        const {
            handles: {
                center: s
            },
            center: {
                hx: o,
                hy: r
            }
        } = this.storage, n = `${o+e}px`, a = `${r+t}px`;
        helper(s).css({
            left: n,
            top: a
        })
    }
    resetCenterPoint() {
        const {
            handles: {
                center: e
            }
        } = this.storage;
        helper(e).css({
            left: null,
            top: null
        })
    }
    fitControlsToSize() {}
    get controls() {
        return this.storage.controls
    }
}

function createHandler(e) {
    const t = document.createElement("div");
    return e.forEach(e => {
        addClass(t, e)
    }), t
}
const svgPoint = createSVGElement("svg").createSVGPoint(),
    floatRE = /[+-]?\d+(\.\d+)?/g,
    ALLOWED_ELEMENTS = ["circle", "ellipse", "image", "line", "path", "polygon", "polyline", "rect", "text", "g"];

function checkChildElements(e) {
    const t = [];
    return isGroup(e) ? forEach.call(e.childNodes, e => {
        if (1 === e.nodeType) {
            const s = e.tagName.toLowerCase(); - 1 !== ALLOWED_ELEMENTS.indexOf(s) && ("g" === s && t.push(...checkChildElements(e)), t.push(e))
        }
    }) : t.push(e), t
}

function createSVGElement(e) {
    return document.createElementNS("http://www.w3.org/2000/svg", e)
}

function createSVGMatrix() {
    return createSVGElement("svg").createSVGMatrix()
}

function getTransformToElement(e, t) {
    return (t.getScreenCTM() || createSVGMatrix()).inverse().multiply(e.getScreenCTM() || createSVGMatrix())
}

function matrixToString(e) {
    const {
        a: t,
        b: s,
        c: o,
        d: r,
        e: n,
        f: a
    } = e;
    return `matrix(${t},${s},${o},${r},${n},${a})`
}

function pointTo(e, t, s) {
    return svgPoint.x = t, svgPoint.y = s, svgPoint.matrixTransform(e)
}

function cloneMatrix(e) {
    const t = createSVGMatrix();
    return t.a = e.a, t.b = e.b, t.c = e.c, t.d = e.d, t.e = e.e, t.f = e.f, t
}

function checkElement(e) {
    const t = e.tagName.toLowerCase();
    return -1 !== ALLOWED_ELEMENTS.indexOf(t) || (warn("Selected element is not allowed to transform. Allowed elements:\ncircle, ellipse, image, line, path, polygon, polyline, rect, text, g"), !1)
}

function isIdentity(e) {
    const {
        a: t,
        b: s,
        c: o,
        d: r,
        e: n,
        f: a
    } = e;
    return 1 === t && 0 === s && 0 === o && 1 === r && 0 === n && 0 === a
}

function createPoint(e, t, s) {
    if (isUndef(t) || isUndef(s)) return null;
    const o = e.createSVGPoint();
    return o.x = t, o.y = s, o
}

function isGroup(e) {
    return "g" === e.tagName.toLowerCase()
}

function parsePoints(e) {
    return e.match(floatRE).reduce((e, t, s, o) => (s % 2 == 0 && e.push(o.slice(s, s + 2)), e), [])
}
const dRE = /\s*([achlmqstvz])([^achlmqstvz]*)\s*/gi,
    sepRE = /\s*,\s*|\s+/g;

function parsePath(e) {
    let t = dRE.lastIndex = 0;
    const s = [];
    for (; t = dRE.exec(e);) {
        const e = t[1],
            o = e.toUpperCase(),
            r = t[2].replace(/([^e])-/g, "$1 -").replace(/ +/g, " ");
        s.push({
            relative: e !== o,
            key: o,
            cmd: e,
            values: r.trim().split(sepRE).map(e => {
                if (!isNaN(e)) return Number(e)
            })
        })
    }
    return s
}

function movePath(e) {
    const {
        path: t,
        dx: s,
        dy: o
    } = e;
    try {
        const e = parsePath(t);
        let r = "",
            n = " ",
            a = !0;
        for (let t = 0, i = e.length; t < i; t++) {
            const i = e[t],
                {
                    values: l,
                    key: c,
                    relative: h
                } = i,
                d = [];
            switch (c) {
                case "M":
                    for (let e = 0, t = l.length; e < t; e += 2) {
                        let [t, r] = l.slice(e, e + 2);
                        h && !a || (t += s, r += o), d.push(t, r), a = !1
                    }
                    break;
                case "A":
                    for (let e = 0, t = l.length; e < t; e += 7) {
                        const t = l.slice(e, e + 7);
                        h || (t[5] += s, t[6] += o), d.push(...t)
                    }
                    break;
                case "C":
                    for (let e = 0, t = l.length; e < t; e += 6) {
                        const t = l.slice(e, e + 6);
                        h || (t[0] += s, t[1] += o, t[2] += s, t[3] += o, t[4] += s, t[5] += o), d.push(...t)
                    }
                    break;
                case "H":
                    for (let e = 0, t = l.length; e < t; e += 1) {
                        const t = l.slice(e, e + 1);
                        h || (t[0] += s), d.push(t[0])
                    }
                    break;
                case "V":
                    for (let e = 0, t = l.length; e < t; e += 1) {
                        const t = l.slice(e, e + 1);
                        h || (t[0] += o), d.push(t[0])
                    }
                    break;
                case "L":
                case "T":
                    for (let e = 0, t = l.length; e < t; e += 2) {
                        let [t, r] = l.slice(e, e + 2);
                        h || (t += s, r += o), d.push(t, r)
                    }
                    break;
                case "Q":
                case "S":
                    for (let e = 0, t = l.length; e < t; e += 4) {
                        let [t, r, n, a] = l.slice(e, e + 4);
                        h || (t += s, r += o, n += s, a += o), d.push(t, r, n, a)
                    }
                    break;
                case "Z":
                    l[0] = "", n = ""
            }
            r += i.cmd + d.join(",") + n
        }
        return r
    } catch (e) {
        warn("Path parsing error: " + e)
    }
}

function resizePath(e) {
    const {
        path: t,
        localCTM: s
    } = e;
    try {
        const e = parsePath(t);
        let o = "",
            r = " ";
        const n = [];
        let a = !0;
        for (let t = 0, i = e.length; t < i; t++) {
            const i = e[t],
                {
                    values: l,
                    key: c,
                    relative: h
                } = i;
            switch (c) {
                case "A":
                    {
                        const e = [];
                        for (let t = 0, o = l.length; t < o; t += 7) {
                            const [o, r, n, a, i, c, d] = l.slice(t, t + 7), u = cloneMatrix(s);
                            h && (u.e = u.f = 0);
                            const {
                                x: p,
                                y: f
                            } = pointTo(u, c, d);
                            e.push(floatToFixed(p), floatToFixed(f)), u.e = u.f = 0;
                            const {
                                x: x,
                                y: m
                            } = pointTo(u, o, r);
                            e.unshift(floatToFixed(x), floatToFixed(m), n, a, i)
                        }
                        n.push(e);
                        break
                    }
                case "C":
                    {
                        const e = [];
                        for (let t = 0, o = l.length; t < o; t += 6) {
                            const [o, r, n, a, i, c] = l.slice(t, t + 6), d = cloneMatrix(s);
                            h && (d.e = d.f = 0);
                            const {
                                x: u,
                                y: p
                            } = pointTo(d, o, r), {
                                x: f,
                                y: x
                            } = pointTo(d, n, a), {
                                x: m,
                                y: b
                            } = pointTo(d, i, c);
                            e.push(floatToFixed(u), floatToFixed(p), floatToFixed(f), floatToFixed(x), floatToFixed(m), floatToFixed(b))
                        }
                        n.push(e);
                        break
                    }
                case "H":
                    {
                        const e = [];
                        for (let t = 0, o = l.length; t < o; t += 1) {
                            const [o] = l.slice(t, t + 1), r = cloneMatrix(s);
                            h && (r.e = r.f = 0);
                            const {
                                x: n
                            } = pointTo(r, o, 0);
                            e.push(floatToFixed(n))
                        }
                        n.push(e);
                        break
                    }
                case "V":
                    {
                        const e = [];
                        for (let t = 0, o = l.length; t < o; t += 1) {
                            const [o] = l.slice(t, t + 1), r = cloneMatrix(s);
                            h && (r.e = r.f = 0);
                            const {
                                y: n
                            } = pointTo(r, 0, o);
                            e.push(floatToFixed(n))
                        }
                        n.push(e);
                        break
                    }
                case "T":
                case "L":
                    {
                        const e = [];
                        for (let t = 0, o = l.length; t < o; t += 2) {
                            const [o, r] = l.slice(t, t + 2), n = cloneMatrix(s);
                            h && (n.e = n.f = 0);
                            const {
                                x: a,
                                y: i
                            } = pointTo(n, o, r);
                            e.push(floatToFixed(a), floatToFixed(i))
                        }
                        n.push(e);
                        break
                    }
                case "M":
                    {
                        const e = [];
                        for (let t = 0, o = l.length; t < o; t += 2) {
                            const [o, r] = l.slice(t, t + 2), n = cloneMatrix(s);
                            h && !a && (n.e = n.f = 0);
                            const {
                                x: i,
                                y: c
                            } = pointTo(n, o, r);
                            e.push(floatToFixed(i), floatToFixed(c)), a = !1
                        }
                        n.push(e);
                        break
                    }
                case "Q":
                    {
                        const e = [];
                        for (let t = 0, o = l.length; t < o; t += 4) {
                            const [o, r, n, a] = l.slice(t, t + 4), i = cloneMatrix(s);
                            h && (i.e = i.f = 0);
                            const {
                                x: c,
                                y: d
                            } = pointTo(i, o, r), {
                                x: u,
                                y: p
                            } = pointTo(i, n, a);
                            e.push(floatToFixed(c), floatToFixed(d), floatToFixed(u), floatToFixed(p))
                        }
                        n.push(e);
                        break
                    }
                case "S":
                    {
                        const e = [];
                        for (let t = 0, o = l.length; t < o; t += 4) {
                            const [o, r, n, a] = l.slice(t, t + 4), i = cloneMatrix(s);
                            h && (i.e = i.f = 0);
                            const {
                                x: c,
                                y: d
                            } = pointTo(i, o, r), {
                                x: u,
                                y: p
                            } = pointTo(i, n, a);
                            e.push(floatToFixed(c), floatToFixed(d), floatToFixed(u), floatToFixed(p))
                        }
                        n.push(e);
                        break
                    }
                case "Z":
                    n.push([""]), r = ""
            }
            o += i.cmd + n[t].join(",") + r
        }
        return o
    } catch (e) {
        warn("Path parsing error: " + e)
    }
}
const MIN_SIZE$1 = 5,
    ROT_OFFSET = 50;
class DraggableSVG extends Transformable {
    _init(e) {
        const {
            rotationPoint: t,
            container: s,
            themeColor: o,
            resizable: r,
            rotatable: n
        } = this.options, a = createSVGElement("g");
        addClass(a, "sjx-svg-wrapper"), s.appendChild(a);
        const {
            width: i,
            height: l,
            x: c,
            y: h
        } = e.getBBox(), d = getTransformToElement(e, s), u = createSVGElement("rect");
        [
            ["width", i],
            ["height", l],
            ["x", c],
            ["y", h],
            ["fill", o],
            ["fill-opacity", .1],
            ["stroke", o],
            ["stroke-dasharray", "3 3"],
            ["vector-effect", "non-scaling-stroke"],
            ["transform", matrixToString(d)]
        ].forEach(([e, t]) => {
            u.setAttribute(e, t)
        });
        const p = createSVGElement("g"),
            f = createSVGElement("g"),
            x = createSVGElement("g");
        addClass(x, "sjx-svg-box-group"), addClass(p, "sjx-svg-handles"), addClass(f, "sjx-svg-normal-group"), x.appendChild(u), a.appendChild(x), a.appendChild(f), a.appendChild(p);
        const {
            x: m,
            y: b,
            width: y,
            height: g
        } = u.getBBox(), v = e.getAttribute("data-cx"), T = e.getAttribute("data-cy"), M = getTransformToElement(u, u.parentNode), E = pointTo(M, m + y / 2, b + g / 2), _ = pointTo(M, m, b), w = pointTo(M, m + y, b), S = pointTo(M, m + y, b + g / 2), D = {
            tl: _,
            tr: w,
            br: pointTo(M, m + y, b + g),
            bl: pointTo(M, m, b + g),
            tc: pointTo(M, m + y / 2, b),
            bc: pointTo(M, m + y / 2, b + g),
            ml: pointTo(M, m, b + g / 2),
            mr: S
        };
        let V = {},
            C = null;
        if (n) {
            const e = Math.atan2(_.y - w.y, _.x - w.x);
            C = {
                x: S.x - ROT_OFFSET * Math.cos(e),
                y: S.y - ROT_OFFSET * Math.sin(e)
            };
            const s = createSVGElement("line");
            s.x1.baseVal.value = S.x, s.y1.baseVal.value = S.y, s.x2.baseVal.value = C.x, s.y2.baseVal.value = C.y, setLineStyle(s, o), f.appendChild(s);
            let r = null;
            t && (addClass(r = createSVGElement("line"), "sjx-hidden"), r.x1.baseVal.value = E.x, r.y1.baseVal.value = E.y, r.x2.baseVal.value = v || E.x, r.y2.baseVal.value = T || E.y, setLineStyle(r, "#fe3232"), r.setAttribute("opacity", .5), f.appendChild(r)), V = {
                normal: s,
                radius: r
            }
        }
        const j = {...r && D, rotator: C, center: t && n ? createPoint(s, v, T) || E : void 0
        };
        Object.keys(j).forEach(e => {
            const t = j[e];
            if (isUndef(t)) return;
            const {
                x: s,
                y: r
            } = t, n = "center" === e ? "#fe3232" : o;
            j[e] = createHandler$1(s, r, n, e), p.appendChild(j[e])
        }), this.storage = {
            wrapper: a,
            box: u,
            handles: {...j, ...V
            },
            parent: e.parentNode,
            center: {}
        }, helper(a).on("mousedown", this._onMouseDown).on("touchstart", this._onTouchStart)
    }
    _destroy() {
        const {
            wrapper: e
        } = this.storage;
        helper(e).off("mousedown", this._onMouseDown).off("touchstart", this._onTouchStart), e.parentNode.removeChild(e)
    }
    _cursorPoint({
        clientX: e,
        clientY: t
    }) {
        const {
            container: s
        } = this.options;
        return pointTo(s.getScreenCTM().inverse(), e, t)
    }
    _pointToElement({
        x: e,
        y: t
    }) {
        const {
            transform: s
        } = this.storage, {
            ctm: o
        } = s, r = o.inverse();
        return r.e = r.f = 0, this._applyMatrixToPoint(r, e, t)
    }
    _pointToControls({
        x: e,
        y: t
    }) {
        const {
            transform: s
        } = this.storage, {
            boxCTM: o
        } = s, r = o.inverse();
        return r.e = r.f = 0, this._applyMatrixToPoint(r, e, t)
    }
    _applyMatrixToPoint(e, t, s) {
        const {
            container: o
        } = this.options, r = o.createSVGPoint();
        return r.x = t, r.y = s, r.matrixTransform(e)
    }
    _apply(e) {
        const {
            el: t,
            storage: s,
            options: {
                container: o
            }
        } = this, {
            box: r,
            handles: n,
            cached: a,
            transform: i
        } = s, {
            matrix: l,
            boxCTM: c,
            bBox: h,
            ctm: d
        } = i, u = t.getBBox(), {
            x: p,
            y: f,
            width: x,
            height: m
        } = u, b = isDef(n.center) ? pointTo(c, n.center.cx.baseVal.value, n.center.cy.baseVal.value) : pointTo(l, p + x / 2, f + m / 2);
        if (t.setAttribute("data-cx", b.x), t.setAttribute("data-cy", b.y), isUndef(a)) return;
        const {
            scaleX: y,
            scaleY: g,
            dx: v,
            dy: T,
            ox: M,
            oy: E
        } = a;
        if ("drag" === e) {
            if (0 === v && 0 === T) return;
            const e = createSVGMatrix();
            e.e = v, e.f = T;
            const s = e.multiply(l).multiply(e.inverse());
            if (t.setAttribute("transform", matrixToString(s)), isGroup(t)) {
                checkChildElements(t).forEach(e => {
                    const s = o.createSVGPoint(),
                        r = getTransformToElement(t.parentNode, o).inverse();
                    s.x = M, s.y = E, r.e = r.f = 0;
                    const n = s.matrixTransform(r),
                        a = createSVGMatrix();
                    a.e = v, a.f = T;
                    const i = a.multiply(getTransformToElement(e, e.parentNode)).multiply(a.inverse());
                    isIdentity(i) || e.setAttribute("transform", matrixToString(i)), isGroup(e) || applyTranslate(e, {
                        x: n.x,
                        y: n.y
                    })
                })
            } else applyTranslate(t, {
                x: v,
                y: T
            })
        }
        if ("resize" === e) {
            const {
                x: e,
                y: n,
                width: a,
                height: i
            } = r.getBBox();
            if (applyTransformToHandles(s, {
                    x: e,
                    y: n,
                    width: a,
                    height: i,
                    boxMatrix: null
                }), isGroup(t)) {
                checkChildElements(t).forEach(e => {
                    isGroup(e) || applyResize(e, {
                        scaleX: y,
                        scaleY: g,
                        defaultCTM: e.__ctm__,
                        bBox: h,
                        container: o,
                        storage: s
                    })
                })
            } else applyResize(t, {
                scaleX: y,
                scaleY: g,
                defaultCTM: d,
                bBox: h,
                container: o,
                storage: s
            });
            t.setAttribute("transform", matrixToString(l))
        }
        this.storage.cached = null
    }
    _processResize(e, t) {
        const {
            el: s,
            storage: o,
            options: {
                proportions: r
            }
        } = this, {
            left: n,
            top: a,
            cw: i,
            ch: l,
            transform: c,
            revX: h,
            revY: d,
            doW: u,
            doH: p
        } = o, {
            matrix: f,
            scMatrix: x,
            trMatrix: m,
            scaleX: b,
            scaleY: y
        } = c;
        let {
            width: g,
            height: v
        } = s.getBBox();
        const T = u || !u && !p ? (i + e) / i : (l + t) / l;
        if (g = r ? i * T : i + e, v = r ? l * T : l + t, Math.abs(g) < MIN_SIZE$1 || Math.abs(v) < MIN_SIZE$1) return;
        const M = g / i,
            E = v / l;
        x.a = M, x.b = 0, x.c = 0, x.d = E, x.e = 0, x.f = 0, m.e = b, m.f = y;
        const _ = m.multiply(x).multiply(m.inverse()),
            w = f.multiply(_);
        s.setAttribute("transform", matrixToString(w));
        const S = n - (g - i) * (p ? .5 : h ? 1 : 0),
            D = a - (v - l) * (u ? .5 : d ? 1 : 0);
        this.storage.cached = {
            scaleX: M,
            scaleY: E
        };
        const V = {
            x: S,
            y: D,
            width: g,
            height: v
        };
        return applyTransformToHandles(o, {...V, boxMatrix: null
        }), V
    }
    _processMove(e, t) {
        const {
            transform: s,
            wrapper: o,
            center: r
        } = this.storage, {
            matrix: n,
            trMatrix: a,
            scMatrix: i,
            wrapperMatrix: l,
            parentMatrix: c
        } = s;
        i.e = e, i.f = t;
        const h = i.multiply(l);
        o.setAttribute("transform", matrixToString(h)), c.e = c.f = 0;
        const {
            x: d,
            y: u
        } = pointTo(c.inverse(), e, t);
        a.e = d, a.f = u;
        const p = a.multiply(n);
        if (this.el.setAttribute("transform", matrixToString(p)), this.storage.cached = {
                dx: d,
                dy: u,
                ox: e,
                oy: t
            }, r.isShifted) {
            const s = l.inverse();
            s.e = s.f = 0;
            const {
                x: o,
                y: r
            } = pointTo(s, e, t);
            this._moveCenterHandle(-o, -r)
        }
        return p
    }
    _processRotate(e) {
        const {
            center: t,
            transform: s,
            wrapper: o
        } = this.storage, {
            matrix: r,
            wrapperMatrix: n,
            parentMatrix: a,
            trMatrix: i,
            scMatrix: l,
            rotMatrix: c
        } = s, h = floatToFixed(Math.cos(e)), d = floatToFixed(Math.sin(e));
        i.e = t.x, i.f = t.y, c.a = h, c.b = d, c.c = -d, c.d = h;
        const u = i.multiply(c).multiply(i.inverse()).multiply(n);
        o.setAttribute("transform", matrixToString(u)), l.e = t.el_x, l.f = t.el_y, a.e = a.f = 0;
        const p = a.inverse().multiply(c).multiply(a),
            f = l.multiply(p).multiply(l.inverse()).multiply(r);
        return this.el.setAttribute("transform", matrixToString(f)), f
    }
    _getState({
        revX: e,
        revY: t,
        doW: s,
        doH: o
    }) {
        const {
            el: r,
            storage: n,
            options: {
                container: a
            }
        } = this, {
            box: i,
            wrapper: l,
            parent: c,
            handles: {
                center: h
            }
        } = n, d = r.getBBox(), {
            x: u,
            y: p,
            width: f,
            height: x
        } = d, {
            width: m,
            height: b,
            x: y,
            y: g
        } = i.getBBox(), v = getTransformToElement(r, c), T = getTransformToElement(r, a), M = getTransformToElement(i.parentNode, a), E = getTransformToElement(c, a), _ = u + f * (o ? .5 : e ? 1 : 0), w = p + x * (s ? .5 : t ? 1 : 0), S = {
            matrix: v,
            ctm: T,
            boxCTM: M,
            parentMatrix: E,
            wrapperMatrix: getTransformToElement(l, l.parentNode),
            trMatrix: createSVGMatrix(),
            scMatrix: createSVGMatrix(),
            rotMatrix: createSVGMatrix(),
            scaleX: _,
            scaleY: w,
            scX: Math.sqrt(T.a * T.a + T.b * T.b),
            scY: Math.sqrt(T.c * T.c + T.d * T.d),
            bBox: d
        }, D = y + m / 2, V = g + b / 2, C = h ? h.cx.baseVal.value : D, j = h ? h.cy.baseVal.value : V, {
            x: F,
            y: k
        } = pointTo(M, C, j), {
            x: A,
            y: N
        } = isDef(h) ? pointTo(E.inverse(), F, k) : pointTo(v, u + f / 2, p + x / 2), {
            x: z,
            y: R
        } = pointTo(getTransformToElement(i, a), D, V);
        return checkChildElements(r).forEach(e => {
            e.__ctm__ = getTransformToElement(e, a)
        }), {
            transform: S,
            cw: m,
            ch: b,
            center: {
                x: h ? F : z,
                y: h ? k : R,
                el_x: A,
                el_y: N,
                hx: h ? h.cx.baseVal.value : null,
                hy: h ? h.cy.baseVal.value : null,
                isShifted: floatToFixed(z, 3) !== floatToFixed(F, 3) && floatToFixed(R, 3) !== floatToFixed(k, 3)
            },
            left: y,
            top: g,
            revX: e,
            revY: t,
            doW: s,
            doH: o
        }
    }
    _moveCenterHandle(e, t) {
        const {
            handles: {
                center: s,
                radius: o
            },
            center: {
                hx: r,
                hy: n
            }
        } = this.storage;
        if (isUndef(s)) return;
        const a = r + e,
            i = n + t;
        s.cx.baseVal.value = a, s.cy.baseVal.value = i, o.x2.baseVal.value = a, o.y2.baseVal.value = i
    }
    resetCenterPoint() {
        const {
            box: e,
            handles: {
                center: t,
                radius: s
            }
        } = this.storage, {
            width: o,
            height: r,
            x: n,
            y: a
        } = e.getBBox(), i = getTransformToElement(e, e.parentNode), {
            x: l,
            y: c
        } = pointTo(i, n + o / 2, a + r / 2);
        t.cx.baseVal.value = l, t.cy.baseVal.value = c, t.isShifted = !1, s.x2.baseVal.value = l, s.y2.baseVal.value = c
    }
    fitControlsToSize() {
        const {
            el: e,
            storage: {
                box: t,
                wrapper: s
            },
            options: {
                container: o
            }
        } = this, {
            width: r,
            height: n,
            x: a,
            y: i
        } = e.getBBox(), l = getTransformToElement(e, o);
        s.removeAttribute("transform"), t.setAttribute("transform", matrixToString(l)), applyTransformToHandles(this.storage, {
            x: a,
            y: i,
            width: r,
            height: n,
            boxMatrix: l
        })
    }
    get controls() {
        return this.storage.wrapper
    }
}

function applyTranslate(e, {
    x: t,
    y: s
}) {
    const o = [];
    switch (e.tagName.toLowerCase()) {
        case "text":
            {
                const r = isDef(e.x.baseVal[0]) ? e.x.baseVal[0].value + t : (Number(e.getAttribute("x")) || 0) + t,
                    n = isDef(e.y.baseVal[0]) ? e.y.baseVal[0].value + s : (Number(e.getAttribute("y")) || 0) + s;
                o.push(["x", r], ["y", n]);
                break
            }
        case "use":
        case "image":
        case "rect":
            {
                const r = isDef(e.x.baseVal.value) ? e.x.baseVal.value + t : (Number(e.getAttribute("x")) || 0) + t,
                    n = isDef(e.y.baseVal.value) ? e.y.baseVal.value + s : (Number(e.getAttribute("y")) || 0) + s;
                o.push(["x", r], ["y", n]);
                break
            }
        case "circle":
        case "ellipse":
            {
                const r = e.cx.baseVal.value + t,
                    n = e.cy.baseVal.value + s;
                o.push(["cx", r], ["cy", n]);
                break
            }
        case "line":
            {
                const r = e.x1.baseVal.value + t,
                    n = e.y1.baseVal.value + s,
                    a = e.x2.baseVal.value + t,
                    i = e.y2.baseVal.value + s;
                o.push(["x1", r], ["y1", n], ["x2", a], ["y2", i]);
                break
            }
        case "polygon":
        case "polyline":
            {
                const r = parsePoints(e.getAttribute("points")).map(e => (e[0] = Number(e[0]) + t, e[1] = Number(e[1]) + s, e.join(" "))).join(" ");
                o.push(["points", r]);
                break
            }
        case "path":
            {
                const r = e.getAttribute("d");
                o.push(["d", movePath({
                    path: r,
                    dx: t,
                    dy: s
                })]);
                break
            }
    }
    o.forEach(t => {
        e.setAttribute(t[0], t[1])
    })
}

function applyResize(e, t) {
    const {
        scaleX: s,
        scaleY: o,
        bBox: r,
        defaultCTM: n,
        container: a
    } = t, {
        width: i,
        height: l
    } = r, c = [], h = getTransformToElement(e, a), d = n.inverse().multiply(h);
    switch (e.tagName.toLowerCase()) {
        case "text":
            {
                const t = isDef(e.x.baseVal[0]) ? e.x.baseVal[0].value : Number(e.getAttribute("x")) || 0,
                    r = isDef(e.y.baseVal[0]) ? e.y.baseVal[0].value : Number(e.getAttribute("y")) || 0,
                    {
                        x: n,
                        y: a
                    } = pointTo(d, t, r);
                c.push(["x", n + (s < 0 ? i : 0)], ["y", a + (o < 0 ? l : 0)]);
                break
            }
        case "circle":
            {
                const t = e.r.baseVal.value,
                    r = e.cx.baseVal.value,
                    n = e.cy.baseVal.value,
                    a = t * (Math.abs(s) + Math.abs(o)) / 2,
                    {
                        x: i,
                        y: l
                    } = pointTo(d, r, n);
                c.push(["r", a], ["cx", i], ["cy", l]);
                break
            }
        case "image":
        case "rect":
            {
                const t = e.width.baseVal.value,
                    r = e.height.baseVal.value,
                    n = e.x.baseVal.value,
                    a = e.y.baseVal.value,
                    {
                        x: i,
                        y: l
                    } = pointTo(d, n, a),
                    h = Math.abs(t * s),
                    u = Math.abs(r * o);
                c.push(["x", i - (s < 0 ? h : 0)], ["y", l - (o < 0 ? u : 0)], ["width", h], ["height", u]);
                break
            }
        case "ellipse":
            {
                const t = e.rx.baseVal.value,
                    r = e.ry.baseVal.value,
                    n = e.cx.baseVal.value,
                    a = e.cy.baseVal.value,
                    {
                        x: i,
                        y: l
                    } = pointTo(d, n, a),
                    h = createSVGMatrix();
                h.a = s, h.d = o;
                const {
                    x: u,
                    y: p
                } = pointTo(h, t, r);
                c.push(["rx", Math.abs(u)], ["ry", Math.abs(p)], ["cx", i], ["cy", l]);
                break
            }
        case "line":
            {
                const t = e.x1.baseVal.value,
                    s = e.y1.baseVal.value,
                    o = e.x2.baseVal.value,
                    r = e.y2.baseVal.value,
                    {
                        x: n,
                        y: a
                    } = pointTo(d, t, s),
                    {
                        x: i,
                        y: l
                    } = pointTo(d, o, r);
                c.push(["x1", n], ["y1", a], ["x2", i], ["y2", l]);
                break
            }
        case "polygon":
        case "polyline":
            {
                const t = parsePoints(e.getAttribute("points")).map(e => {
                    const {
                        x: t,
                        y: s
                    } = pointTo(d, Number(e[0]), Number(e[1]));
                    return e[0] = t, e[1] = s, e.join(" ")
                }).join(" ");
                c.push(["points", t]);
                break
            }
        case "path":
            {
                const t = e.getAttribute("d");
                c.push(["d", resizePath({
                    path: t,
                    localCTM: d
                })]);
                break
            }
    }
    c.forEach(([t, s]) => {
        e.setAttribute(t, s)
    })
}

function applyTransformToHandles(e, t) {
    const {
        box: s,
        handles: o,
        center: r
    } = e;
    let {
        x: n,
        y: a,
        width: i,
        height: l,
        boxMatrix: c
    } = t;
    const h = i / 2,
        d = l / 2,
        u = null !== c ? c : getTransformToElement(s, s.parentNode),
        p = pointTo(u, n + h, a + d),
        f = {
            tl: pointTo(u, n, a),
            tr: pointTo(u, n + i, a),
            br: pointTo(u, n + i, a + l),
            bl: pointTo(u, n, a + l),
            tc: pointTo(u, n + h, a),
            bc: pointTo(u, n + h, a + l),
            ml: pointTo(u, n, a + d),
            mr: pointTo(u, n + i, a + d),
            rotator: {},
            center: isDef(o.center) && !r.isShifted ? p : void 0
        },
        x = Math.atan2(f.tl.y - f.tr.y, f.tl.x - f.tr.x);
    f.rotator.x = f.mr.x - ROT_OFFSET * Math.cos(x), f.rotator.y = f.mr.y - ROT_OFFSET * Math.sin(x);
    const {
        normal: m,
        radius: b
    } = o;
    isDef(m) && (m.x1.baseVal.value = f.mr.x, m.y1.baseVal.value = f.mr.y, m.x2.baseVal.value = f.rotator.x, m.y2.baseVal.value = f.rotator.y), isDef(b) && (b.x1.baseVal.value = p.x, b.y1.baseVal.value = p.y, r.isShifted || (b.x2.baseVal.value = p.x, b.y2.baseVal.value = p.y));
    const y = {
        x: n += i < 0 ? i : 0,
        y: a += l < 0 ? l : 0,
        width: Math.abs(i),
        height: Math.abs(l)
    };
    Object.keys(y).forEach(e => {
        s.setAttribute(e, y[e])
    }), Object.keys(f).forEach(e => {
        const t = o[e],
            s = f[e];
        isUndef(s) || isUndef(t) || (t.setAttribute("cx", s.x), t.setAttribute("cy", s.y))
    })
}

function createHandler$1(e, t, s, o) {
    const r = createSVGElement("circle");
    addClass(r, `sjx-svg-hdl-${o}`);
    const n = {
        cx: e,
        cy: t,
        r: 5.5,
        fill: s,
        stroke: "#fff",
        "fill-opacity": 1,
        "vector-effect": "non-scaling-stroke",
        "stroke-width": 1
    };
    return Object.keys(n).map(e => {
        r.setAttribute(e, n[e])
    }), r
}

function setLineStyle(e, t) {
    e.setAttribute("stroke", t), e.setAttribute("stroke-dasharray", "3 3"), e.setAttribute("vector-effect", "non-scaling-stroke")
}

function drag(e, t) {
    if (this.length) {
        const s = isDef(t) && t instanceof Observable ? t : new Observable;
        return arrReduce.call(this, (t, o) => (o instanceof SVGElement ? checkElement(o) && t.push(new DraggableSVG(o, e, s)) : t.push(new Draggable(o, e, s)), t), [])
    }
}
class Cloneable extends SubjectModel {
    constructor(e, t) {
        super(e), this.enable(t)
    }
    _init() {
        const {
            el: e,
            options: t
        } = this, s = helper(e), {
            style: o,
            appendTo: r
        } = t, n = {
            position: "absolute",
            "z-index": "2147483647",
            ...o
        };
        this.storage = {
            css: n,
            parent: isDef(r) ? helper(r)[0] : document.body
        }, s.on("mousedown", this._onMouseDown).on("touchstart", this._onTouchStart), EVENTS.slice(0, 3).forEach(e => {
            this.eventDispatcher.registerEvent(e)
        })
    }
    _processOptions(e) {
        let t = {},
            s = null,
            o = document,
            r = () => {},
            n = () => {},
            a = () => {},
            i = () => {};
        if (isDef(e)) {
            const {
                style: o,
                appendTo: l,
                stack: c,
                onInit: h,
                onMove: d,
                onDrop: u,
                onDestroy: p
            } = e;
            t = isDef(o) && "object" == typeof o ? o : t, s = l || null;
            const f = isDef(c) ? helper(c)[0] : document;
            r = createMethod(h), n = createMethod(d), a = isFunc(u) ? function(e) {
                const {
                    clone: t
                } = this.storage;
                objectsCollide(t, f) && u.call(this, e, this.el, t)
            } : () => {}, i = createMethod(p)
        }
        this.options = {
            style: t,
            appendTo: s,
            stack: o
        }, this.proxyMethods = {
            onInit: r,
            onDrop: a,
            onMove: n,
            onDestroy: i
        }
    }
    _start({
        clientX: e,
        clientY: t
    }) {
        const {
            storage: s,
            el: o
        } = this, {
            parent: r,
            css: n
        } = s, {
            left: a,
            top: i
        } = getOffset(r);
        n.left = `${e-a}px`, n.top = `${t-i}px`;
        const l = o.cloneNode(!0);
        helper(l).css(n), s.clientX = e, s.clientY = t, s.cx = e, s.cy = t, s.clone = l, helper(r)[0].appendChild(l), this._draw()
    }
    _moving({
        clientX: e,
        clientY: t
    }) {
        const {
            storage: s
        } = this;
        s.clientX = e, s.clientY = t, s.doDraw = !0, s.doMove = !0
    }
    _end(e) {
        const {
            storage: t
        } = this, {
            clone: s,
            frameId: o
        } = t;
        t.doDraw = !1, cancelAnimFrame(o), isUndef(s) || (this.proxyMethods.onDrop.call(this, e), s.parentNode.removeChild(s), delete t.clone)
    }
    _animate() {
        const {
            storage: e
        } = this;
        e.frameId = requestAnimFrame(this._animate);
        const {
            doDraw: t,
            clientX: s,
            clientY: o,
            cx: r,
            cy: n
        } = e;
        t && (e.doDraw = !1, this._drag({
            dx: s - r,
            dy: o - n
        }))
    }
    _processMove(e, t) {
        const {
            clone: s
        } = this.storage, o = `translate(${e}px, ${t}px)`;
        helper(s).css({
            transform: o,
            webkitTranform: o,
            mozTransform: o,
            msTransform: o,
            otransform: o
        })
    }
    _destroy() {
        const {
            storage: e,
            proxyMethods: t,
            el: s
        } = this;
        isUndef(e) || (helper(s).off("mousedown", this._onMouseDown).off("touchstart", this._onTouchStart), t.onDestroy.call(this, s), delete this.storage)
    }
    disable() {
        this._destroy()
    }
}

function clone(e) {
    if (this.length) return arrMap.call(this, t => new Cloneable(t, e))
}
class Subjx extends Helper {
    drag() {
        return drag.call(this, ...arguments)
    }
    clone() {
        return clone.call(this, ...arguments)
    }
}

function subjx(e) {
    return new Subjx(e)
}
Object.defineProperty(subjx, "createObservable", {
    value: () => new Observable
}), Object.defineProperty(subjx, "Subjx", {
    value: Subjx
}), Object.defineProperty(subjx, "Observable", {
    value: Observable
}), module.exports = subjx;