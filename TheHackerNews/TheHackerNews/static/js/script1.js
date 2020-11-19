//<![CDATA[
! function(a, b) {
    var c = b(a, a.document, Date);
    a.lazySizes = c, "object" == typeof module && module.exports && (module.exports = c)
}("undefined" != typeof window ? window : {}, function(a, b, c) {
    "use strict";
    var d, e;
    if (function() {
            var b, c = {
                lazyClass: "lazyload",
                loadedClass: "lazyloaded",
                loadingClass: "lazyloading",
                preloadClass: "lazypreload",
                errorClass: "lazyerror",
                autosizesClass: "lazyautosizes",
                srcAttr: "data-src",
                srcsetAttr: "data-srcset",
                sizesAttr: "data-sizes",
                minSize: 40,
                customMedia: {},
                init: !0,
                expFactor: 1.5,
                hFac: .8,
                loadMode: 2,
                loadHidden: !0,
                ricTimeout: 0,
                throttleDelay: 125
            };
            e = a.lazySizesConfig || a.lazysizesConfig || {};
            for (b in c) b in e || (e[b] = c[b])
        }(), !b || !b.getElementsByClassName) return {
        init: function() {},
        cfg: e,
        noSupport: !0
    };
    var f = b.documentElement,
        g = a.HTMLPictureElement,
        h = "addEventListener",
        i = "getAttribute",
        j = a[h].bind(a),
        k = a.setTimeout,
        l = a.requestAnimationFrame || k,
        m = a.requestIdleCallback,
        n = /^picture$/i,
        o = ["load", "error", "lazyincluded", "_lazyloaded"],
        p = {},
        q = Array.prototype.forEach,
        r = function(a, b) {
            return p[b] || (p[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")), p[b].test(a[i]("class") || "") && p[b]
        },
        s = function(a, b) {
            r(a, b) || a.setAttribute("class", (a[i]("class") || "").trim() + " " + b)
        },
        t = function(a, b) {
            var c;
            (c = r(a, b)) && a.setAttribute("class", (a[i]("class") || "").replace(c, " "))
        },
        u = function(a, b, c) {
            var d = c ? h : "removeEventListener";
            c && u(a, b), o.forEach(function(c) {
                a[d](c, b)
            })
        },
        v = function(a, c, e, f, g) {
            var h = b.createEvent("Event");
            return e || (e = {}), e.instance = d, h.initEvent(c, !f, !g), h.detail = e, a.dispatchEvent(h), h
        },
        w = function(b, c) {
            var d;
            !g && (d = a.picturefill || e.pf) ? (c && c.src && !b[i]("srcset") && b.setAttribute("srcset", c.src), d({
                reevaluate: !0,
                elements: [b]
            })) : c && c.src && (b.src = c.src)
        },
        x = function(a, b) {
            return (getComputedStyle(a, null) || {})[b]
        },
        y = function(a, b, c) {
            for (c = c || a.offsetWidth; c < e.minSize && b && !a._lazysizesWidth;) c = b.offsetWidth, b = b.parentNode;
            return c
        },
        z = function() {
            var a, c, d = [],
                e = [],
                f = d,
                g = function() {
                    var b = f;
                    for (f = d.length ? e : d, a = !0, c = !1; b.length;) b.shift()();
                    a = !1
                },
                h = function(d, e) {
                    a && !e ? d.apply(this, arguments) : (f.push(d), c || (c = !0, (b.hidden ? k : l)(g)))
                };
            return h._lsFlush = g, h
        }(),
        A = function(a, b) {
            return b ? function() {
                z(a)
            } : function() {
                var b = this,
                    c = arguments;
                z(function() {
                    a.apply(b, c)
                })
            }
        },
        B = function(a) {
            var b, d = 0,
                f = e.throttleDelay,
                g = e.ricTimeout,
                h = function() {
                    b = !1, d = c.now(), a()
                },
                i = m && g > 49 ? function() {
                    m(h, {
                        timeout: g
                    }), g !== e.ricTimeout && (g = e.ricTimeout)
                } : A(function() {
                    k(h)
                }, !0);
            return function(a) {
                var e;
                (a = !0 === a) && (g = 33), b || (b = !0, e = f - (c.now() - d), e < 0 && (e = 0), a || e < 9 ? i() : k(i, e))
            }
        },
        C = function(a) {
            var b, d, e = 99,
                f = function() {
                    b = null, a()
                },
                g = function() {
                    var a = c.now() - d;
                    a < e ? k(g, e - a) : (m || f)(f)
                };
            return function() {
                d = c.now(), b || (b = k(g, e))
            }
        },
        D = function() {
            var g, m, o, p, y, D, F, G, H, I, J, K, L = /^img$/i,
                M = /^iframe$/i,
                N = "onscroll" in a && !/(gle|ing)bot/.test(navigator.userAgent),
                O = 0,
                P = 0,
                Q = 0,
                R = -1,
                S = function(a) {
                    Q--, (!a || Q < 0 || !a.target) && (Q = 0)
                },
                T = function(a) {
                    return null == K && (K = "hidden" == x(b.body, "visibility")), K || !("hidden" == x(a.parentNode, "visibility") && "hidden" == x(a, "visibility"))
                },
                U = function(a, c) {
                    var d, e = a,
                        g = T(a);
                    for (G -= c, J += c, H -= c, I += c; g && (e = e.offsetParent) && e != b.body && e != f;)(g = (x(e, "opacity") || 1) > 0) && "visible" != x(e, "overflow") && (d = e.getBoundingClientRect(), g = I > d.left && H < d.right && J > d.top - 1 && G < d.bottom + 1);
                    return g
                },
                V = function() {
                    var a, c, h, j, k, l, n, o, q, r, s, t, u = d.elements;
                    if ((p = e.loadMode) && Q < 8 && (a = u.length)) {
                        for (c = 0, R++; c < a; c++)
                            if (u[c] && !u[c]._lazyRace)
                                if (!N || d.prematureUnveil && d.prematureUnveil(u[c])) ba(u[c]);
                                else if ((o = u[c][i]("data-expand")) && (l = 1 * o) || (l = P), r || (r = !e.expand || e.expand < 1 ? f.clientHeight > 500 && f.clientWidth > 500 ? 500 : 370 : e.expand, d._defEx = r, s = r * e.expFactor, t = e.hFac, K = null, P < s && Q < 1 && R > 2 && p > 2 && !b.hidden ? (P = s, R = 0) : P = p > 1 && R > 1 && Q < 6 ? r : O), q !== l && (D = innerWidth + l * t, F = innerHeight + l, n = -1 * l, q = l), h = u[c].getBoundingClientRect(), (J = h.bottom) >= n && (G = h.top) <= F && (I = h.right) >= n * t && (H = h.left) <= D && (J || I || H || G) && (e.loadHidden || T(u[c])) && (m && Q < 3 && !o && (p < 3 || R < 4) || U(u[c], l))) {
                            if (ba(u[c]), k = !0, Q > 9) break
                        } else !k && m && !j && Q < 4 && R < 4 && p > 2 && (g[0] || e.preloadAfterLoad) && (g[0] || !o && (J || I || H || G || "auto" != u[c][i](e.sizesAttr))) && (j = g[0] || u[c]);
                        j && !k && ba(j)
                    }
                },
                W = B(V),
                X = function(a) {
                    var b = a.target;
                    if (b._lazyCache) return void delete b._lazyCache;
                    S(a), s(b, e.loadedClass), t(b, e.loadingClass), u(b, Z), v(b, "lazyloaded")
                },
                Y = A(X),
                Z = function(a) {
                    Y({
                        target: a.target
                    })
                },
                $ = function(a, b) {
                    try {
                        a.contentWindow.location.replace(b)
                    } catch (c) {
                        a.src = b
                    }
                },
                _ = function(a) {
                    var b, c = a[i](e.srcsetAttr);
                    (b = e.customMedia[a[i]("data-media") || a[i]("media")]) && a.setAttribute("media", b), c && a.setAttribute("srcset", c)
                },
                aa = A(function(a, b, c, d, f) {
                    var g, h, j, l, m, p;
                    (m = v(a, "lazybeforeunveil", b)).defaultPrevented || (d && (c ? s(a, e.autosizesClass) : a.setAttribute("sizes", d)), h = a[i](e.srcsetAttr), g = a[i](e.srcAttr), f && (j = a.parentNode, l = j && n.test(j.nodeName || "")), p = b.firesLoad || "src" in a && (h || g || l), m = {
                        target: a
                    }, s(a, e.loadingClass), p && (clearTimeout(o), o = k(S, 2500), u(a, Z, !0)), l && q.call(j.getElementsByTagName("source"), _), h ? a.setAttribute("srcset", h) : g && !l && (M.test(a.nodeName) ? $(a, g) : a.src = g), f && (h || l) && w(a, {
                        src: g
                    })), a._lazyRace && delete a._lazyRace, t(a, e.lazyClass), z(function() {
                        var b = a.complete && a.naturalWidth > 1;
                        p && !b || (b && s(a, "ls-is-cached"), X(m), a._lazyCache = !0, k(function() {
                            "_lazyCache" in a && delete a._lazyCache
                        }, 9)), "lazy" == a.loading && Q--
                    }, !0)
                }),
                ba = function(a) {
                    if (!a._lazyRace) {
                        var b, c = L.test(a.nodeName),
                            d = c && (a[i](e.sizesAttr) || a[i]("sizes")),
                            f = "auto" == d;
                        (!f && m || !c || !a[i]("src") && !a.srcset || a.complete || r(a, e.errorClass) || !r(a, e.lazyClass)) && (b = v(a, "lazyunveilread").detail, f && E.updateElem(a, !0, a.offsetWidth), a._lazyRace = !0, Q++, aa(a, b, f, d, c))
                    }
                },
                ca = C(function() {
                    e.loadMode = 3, W()
                }),
                da = function() {
                    3 == e.loadMode && (e.loadMode = 2), ca()
                },
                ea = function() {
                    if (!m) {
                        if (c.now() - y < 999) return void k(ea, 999);
                        m = !0, e.loadMode = 3, W(), j("scroll", da, !0)
                    }
                };
            return {
                _: function() {
                    y = c.now(), d.elements = b.getElementsByClassName(e.lazyClass), g = b.getElementsByClassName(e.lazyClass + " " + e.preloadClass), j("scroll", W, !0), j("resize", W, !0), j("pageshow", function(a) {
                        if (a.persisted) {
                            var c = b.querySelectorAll("." + e.loadingClass);
                            c.length && c.forEach && l(function() {
                                c.forEach(function(a) {
                                    a.complete && ba(a)
                                })
                            })
                        }
                    }), a.MutationObserver ? new MutationObserver(W).observe(f, {
                        childList: !0,
                        subtree: !0,
                        attributes: !0
                    }) : (f[h]("DOMNodeInserted", W, !0), f[h]("DOMAttrModified", W, !0), setInterval(W, 999)), j("hashchange", W, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(a) {
                        b[h](a, W, !0)
                    }), /d$|^c/.test(b.readyState) ? ea() : (j("load", ea), b[h]("DOMContentLoaded", W), k(ea, 2e4)), d.elements.length ? (V(), z._lsFlush()) : W()
                },
                checkElems: W,
                unveil: ba,
                _aLSL: da
            }
        }(),
        E = function() {
            var a, c = A(function(a, b, c, d) {
                    var e, f, g;
                    if (a._lazysizesWidth = d, d += "px", a.setAttribute("sizes", d), n.test(b.nodeName || ""))
                        for (e = b.getElementsByTagName("source"), f = 0, g = e.length; f < g; f++) e[f].setAttribute("sizes", d);
                    c.detail.dataAttr || w(a, c.detail)
                }),
                d = function(a, b, d) {
                    var e, f = a.parentNode;
                    f && (d = y(a, f, d), e = v(a, "lazybeforesizes", {
                        width: d,
                        dataAttr: !!b
                    }), e.defaultPrevented || (d = e.detail.width) && d !== a._lazysizesWidth && c(a, f, e, d))
                },
                f = function() {
                    var b, c = a.length;
                    if (c)
                        for (b = 0; b < c; b++) d(a[b])
                },
                g = C(f);
            return {
                _: function() {
                    a = b.getElementsByClassName(e.autosizesClass), j("resize", g)
                },
                checkElems: g,
                updateElem: d
            }
        }(),
        F = function() {
            !F.i && b.getElementsByClassName && (F.i = !0, E._(), D._())
        };
    return k(function() {
        e.init && F()
    }), d = {
        cfg: e,
        autoSizer: E,
        loader: D,
        init: F,
        uP: w,
        aC: s,
        rC: t,
        hC: r,
        fire: v,
        gW: y,
        rAF: z
    }
});
//]]>

//<![CDATA[
(function(n, t) {
    "use strict";

    function w() {}

    function u(n, t) {
        if (n) {
            typeof n == "object" && (n = [].slice.call(n));
            for (var i = 0, r = n.length; i < r; i++) t.call(n, n[i], i)
        }
    }

    function it(n, i) {
        var r = Object.prototype.toString.call(i).slice(8, -1);
        return i !== t && i !== null && r === n
    }

    function s(n) {
        return it("Function", n)
    }

    function a(n) {
        return it("Array", n)
    }

    function et(n) {
        var i = n.split("/"),
            t = i[i.length - 1],
            r = t.indexOf("?");
        return r !== -1 ? t.substring(0, r) : t
    }

    function f(n) {
        (n = n || w, n._done) || (n(), n._done = 1)
    }

    function ot(n, t, r, u) {
        var f = typeof n == "object" ? n : {
                test: n,
                success: !t ? !1 : a(t) ? t : [t],
                failure: !r ? !1 : a(r) ? r : [r],
                callback: u || w
            },
            e = !!f.test;
        return e && !!f.success ? (f.success.push(f.callback), i.load.apply(null, f.success)) : e || !f.failure ? u() : (f.failure.push(f.callback), i.load.apply(null, f.failure)), i
    }

    function v(n) {
        var t = {},
            i, r;
        if (typeof n == "object")
            for (i in n) !n[i] || (t = {
                name: i,
                url: n[i]
            });
        else t = {
            name: et(n),
            url: n
        };
        return (r = c[t.name], r && r.url === t.url) ? r : (c[t.name] = t, t)
    }

    function y(n) {
        n = n || c;
        for (var t in n)
            if (n.hasOwnProperty(t) && n[t].state !== l) return !1;
        return !0
    }

    function st(n) {
        n.state = ft;
        u(n.onpreload, function(n) {
            n.call()
        })
    }

    function ht(n) {
        n.state === t && (n.state = nt, n.onpreload = [], rt({
            url: n.url,
            type: "cache"
        }, function() {
            st(n)
        }))
    }

    function ct() {
        var n = arguments,
            t = n[n.length - 1],
            r = [].slice.call(n, 1),
            f = r[0];
        return (s(t) || (t = null), a(n[0])) ? (n[0].push(t), i.load.apply(null, n[0]), i) : (f ? (u(r, function(n) {
            s(n) || !n || ht(v(n))
        }), b(v(n[0]), s(f) ? f : function() {
            i.load.apply(null, r)
        })) : b(v(n[0])), i)
    }

    function lt() {
        var n = arguments,
            t = n[n.length - 1],
            r = {};
        return (s(t) || (t = null), a(n[0])) ? (n[0].push(t), i.load.apply(null, n[0]), i) : (u(n, function(n) {
            n !== t && (n = v(n), r[n.name] = n)
        }), u(n, function(n) {
            n !== t && (n = v(n), b(n, function() {
                y(r) && f(t)
            }))
        }), i)
    }

    function b(n, t) {
        if (t = t || w, n.state === l) {
            t();
            return
        }
        if (n.state === tt) {
            i.ready(n.name, t);
            return
        }
        if (n.state === nt) {
            n.onpreload.push(function() {
                b(n, t)
            });
            return
        }
        n.state = tt;
        rt(n, function() {
            n.state = l;
            t();
            u(h[n.name], function(n) {
                f(n)
            });
            o && y() && u(h.ALL, function(n) {
                f(n)
            })
        })
    }

    function at(n) {
        n = n || "";
        var t = n.split("?")[0].split(".");
        return t[t.length - 1].toLowerCase()
    }

    function rt(t, i) {
        function e(t) {
            t = t || n.event;
            u.onload = u.onreadystatechange = u.onerror = null;
            i()
        }

        function o(f) {
            f = f || n.event;
            (f.type === "load" || /loaded|complete/.test(u.readyState) && (!r.documentMode || r.documentMode < 9)) && (n.clearTimeout(t.errorTimeout), n.clearTimeout(t.cssTimeout), u.onload = u.onreadystatechange = u.onerror = null, i())
        }

        function s() {
            if (t.state !== l && t.cssRetries <= 20) {
                for (var i = 0, f = r.styleSheets.length; i < f; i++)
                    if (r.styleSheets[i].href === u.href) {
                        o({
                            type: "load"
                        });
                        return
                    } t.cssRetries++;
                t.cssTimeout = n.setTimeout(s, 250)
            }
        }
        var u, h, f;
        i = i || w;
        h = at(t.url);
        h === "css" ? (u = r.createElement("link"), u.type = "text/" + (t.type || "css"), u.rel = "stylesheet", u.href = t.url, t.cssRetries = 0, t.cssTimeout = n.setTimeout(s, 500)) : (u = r.createElement("script"), u.type = "text/" + (t.type || "javascript"), u.src = t.url);
        u.onload = u.onreadystatechange = o;
        u.onerror = e;
        u.async = !1;
        u.defer = !1;
        t.errorTimeout = n.setTimeout(function() {
            e({
                type: "timeout"
            })
        }, 7e3);
        f = r.head || r.getElementsByTagName("head")[0];
        f.insertBefore(u, f.lastChild)
    }

    function vt() {
        for (var t, u = r.getElementsByTagName("script"), n = 0, f = u.length; n < f; n++)
            if (t = u[n].getAttribute("data-headjs-load"), !!t) {
                i.load(t);
                return
            }
    }

    function yt(n, t) {
        var v, p, e;
        return n === r ? (o ? f(t) : d.push(t), i) : (s(n) && (t = n, n = "ALL"), a(n)) ? (v = {}, u(n, function(n) {
            v[n] = c[n];
            i.ready(n, function() {
                y(v) && f(t)
            })
        }), i) : typeof n != "string" || !s(t) ? i : (p = c[n], p && p.state === l || n === "ALL" && y() && o) ? (f(t), i) : (e = h[n], e ? e.push(t) : e = h[n] = [t], i)
    }

    function e() {
        if (!r.body) {
            n.clearTimeout(i.readyTimeout);
            i.readyTimeout = n.setTimeout(e, 50);
            return
        }
        o || (o = !0, vt(), u(d, function(n) {
            f(n)
        }))
    }

    function k() {
        r.addEventListener ? (r.removeEventListener("DOMContentLoaded", k, !1), e()) : r.readyState === "complete" && (r.detachEvent("onreadystatechange", k), e())
    }
    var r = n.document,
        d = [],
        h = {},
        c = {},
        ut = "async" in r.createElement("script") || "MozAppearance" in r.documentElement.style || n.opera,
        o, g = n.head_conf && n.head_conf.head || "head",
        i = n[g] = n[g] || function() {
            i.ready.apply(null, arguments)
        },
        nt = 1,
        ft = 2,
        tt = 3,
        l = 4,
        p;
    if (r.readyState === "complete") e();
    else if (r.addEventListener) r.addEventListener("DOMContentLoaded", k, !1), n.addEventListener("load", e, !1);
    else {
        r.attachEvent("onreadystatechange", k);
        n.attachEvent("onload", e);
        p = !1;
        try {
            p = !n.frameElement && r.documentElement
        } catch (wt) {}
        p && p.doScroll && function pt() {
            if (!o) {
                try {
                    p.doScroll("left")
                } catch (t) {
                    n.clearTimeout(i.readyTimeout);
                    i.readyTimeout = n.setTimeout(pt, 50);
                    return
                }
                e()
            }
        }()
    }
    i.load = i.js = ut ? lt : ct;
    i.test = ot;
    i.ready = yt;
    i.ready(r, function() {
        y() && u(h.ALL, function(n) {
            f(n)
        });
        i.feature && i.feature("domloaded", !0)
    })
})(window);
//]]>

//<![CDATA[
! function() {
    var s, i, c, a, o = {
            frameRate: 150,
            animationTime: 400,
            stepSize: 100,
            pulseAlgorithm: !0,
            pulseScale: 4,
            pulseNormalize: 1,
            accelerationDelta: 50,
            accelerationMax: 3,
            keyboardSupport: !0,
            arrowScroll: 50,
            fixedBackground: !0,
            excluded: ""
        },
        p = o,
        u = !1,
        d = !1,
        n = {
            x: 0,
            y: 0
        },
        f = !1,
        m = document.documentElement,
        l = [],
        h = /^Mac/.test(navigator.platform),
        w = {
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            spacebar: 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36
        },
        v = {
            37: 1,
            38: 1,
            39: 1,
            40: 1
        };

    function y() {
        if (!f && document.body) {
            f = !0;
            var e = document.body,
                t = document.documentElement,
                o = window.innerHeight,
                n = e.scrollHeight;
            if (m = 0 <= document.compatMode.indexOf("CSS") ? t : e, s = e, p.keyboardSupport && Y("keydown", x), top != self) d = !0;
            else if (Q && o < n && (e.offsetHeight <= o || t.offsetHeight <= o)) {
                var r, a = document.createElement("div");
                a.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + m.scrollHeight + "px", document.body.appendChild(a), c = function() {
                    r = r || setTimeout(function() {
                        u || (a.style.height = "0", a.style.height = m.scrollHeight + "px", r = null)
                    }, 500)
                }, setTimeout(c, 10), Y("resize", c);
                if ((i = new R(c)).observe(e, {
                        attributes: !0,
                        childList: !0,
                        characterData: !1
                    }), m.offsetHeight <= o) {
                    var l = document.createElement("div");
                    l.style.clear = "both", e.appendChild(l)
                }
            }
            p.fixedBackground || u || (e.style.backgroundAttachment = "scroll", t.style.backgroundAttachment = "scroll")
        }
    }
    var b = [],
        g = !1,
        r = Date.now();

    function S(d, f, m) {
        if (function(e, t) {
                e = 0 < e ? 1 : -1, t = 0 < t ? 1 : -1, n.x === e && n.y === t || (n.x = e, n.y = t, b = [], r = 0)
            }(f, m), 1 != p.accelerationMax) {
            var e = Date.now() - r;
            if (e < p.accelerationDelta) {
                var t = (1 + 50 / e) / 2;
                1 < t && (t = Math.min(t, p.accelerationMax), f *= t, m *= t)
            }
            r = Date.now()
        }
        if (b.push({
                x: f,
                y: m,
                lastX: f < 0 ? .99 : -.99,
                lastY: m < 0 ? .99 : -.99,
                start: Date.now()
            }), !g) {
            var o = q(),
                h = d === o || d === document.body;
            null == d.$scrollBehavior && function(e) {
                var t = M(e);
                if (null == B[t]) {
                    var o = getComputedStyle(e, "")["scroll-behavior"];
                    B[t] = "smooth" == o
                }
                return B[t]
            }(d) && (d.$scrollBehavior = d.style.scrollBehavior, d.style.scrollBehavior = "auto");
            var w = function(e) {
                for (var t = Date.now(), o = 0, n = 0, r = 0; r < b.length; r++) {
                    var a = b[r],
                        l = t - a.start,
                        i = l >= p.animationTime,
                        c = i ? 1 : l / p.animationTime;
                    p.pulseAlgorithm && (c = F(c));
                    var s = a.x * c - a.lastX >> 0,
                        u = a.y * c - a.lastY >> 0;
                    o += s, n += u, a.lastX += s, a.lastY += u, i && (b.splice(r, 1), r--)
                }
                h ? window.scrollBy(o, n) : (o && (d.scrollLeft += o), n && (d.scrollTop += n)), f || m || (b = []), b.length ? j(w, d, 1e3 / p.frameRate + 1) : (g = !1, null != d.$scrollBehavior && (d.style.scrollBehavior = d.$scrollBehavior, d.$scrollBehavior = null))
            };
            j(w, d, 0), g = !0
        }
    }

    function e(e) {
        f || y();
        var t = e.target;
        if (e.defaultPrevented || e.ctrlKey) return !0;
        if (N(s, "embed") || N(t, "embed") && /\.pdf/i.test(t.src) || N(s, "object") || t.shadowRoot) return !0;
        var o = -e.wheelDeltaX || e.deltaX || 0,
            n = -e.wheelDeltaY || e.deltaY || 0;
        h && (e.wheelDeltaX && K(e.wheelDeltaX, 120) && (o = e.wheelDeltaX / Math.abs(e.wheelDeltaX) * -120), e.wheelDeltaY && K(e.wheelDeltaY, 120) && (n = e.wheelDeltaY / Math.abs(e.wheelDeltaY) * -120)), o || n || (n = -e.wheelDelta || 0), 1 === e.deltaMode && (o *= 40, n *= 40);
        var r = z(t);
        return r ? !! function(e) {
            if (!e) return;
            l.length || (l = [e, e, e]);
            e = Math.abs(e), l.push(e), l.shift(), clearTimeout(a), a = setTimeout(function() {
                try {
                    localStorage.SS_deltaBuffer = l.join(",")
                } catch (e) {}
            }, 1e3);
            var t = 120 < e && P(e),
                o = !P(120) && !P(100) && !t;
            return e < 50 || o
        }(n) || (1.2 < Math.abs(o) && (o *= p.stepSize / 120), 1.2 < Math.abs(n) && (n *= p.stepSize / 120), S(r, o, n), e.preventDefault(), void C()) : !d || !W || (Object.defineProperty(e, "target", {
            value: window.frameElement
        }), parent.wheel(e))
    }

    function x(e) {
        var t = e.target,
            o = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== w.spacebar;
        document.body.contains(s) || (s = document.activeElement);
        var n = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (e.defaultPrevented || /^(textarea|select|embed|object)$/i.test(t.nodeName) || N(t, "input") && !n.test(t.type) || N(s, "video") || function(e) {
                var t = e.target,
                    o = !1;
                if (-1 != document.URL.indexOf("www.youtube.com/watch"))
                    do {
                        if (o = t.classList && t.classList.contains("html5-video-controls")) break
                    } while (t = t.parentNode);
                return o
            }(e) || t.isContentEditable || o) return !0;
        if ((N(t, "button") || N(t, "input") && n.test(t.type)) && e.keyCode === w.spacebar) return !0;
        if (N(t, "input") && "radio" == t.type && v[e.keyCode]) return !0;
        var r = 0,
            a = 0,
            l = z(s);
        if (!l) return !d || !W || parent.keydown(e);
        var i = l.clientHeight;
        switch (l == document.body && (i = window.innerHeight), e.keyCode) {
            case w.up:
                a = -p.arrowScroll;
                break;
            case w.down:
                a = p.arrowScroll;
                break;
            case w.spacebar:
                a = -(e.shiftKey ? 1 : -1) * i * .9;
                break;
            case w.pageup:
                a = .9 * -i;
                break;
            case w.pagedown:
                a = .9 * i;
                break;
            case w.home:
                l == document.body && document.scrollingElement && (l = document.scrollingElement), a = -l.scrollTop;
                break;
            case w.end:
                var c = l.scrollHeight - l.scrollTop - i;
                a = 0 < c ? 10 + c : 0;
                break;
            case w.left:
                r = -p.arrowScroll;
                break;
            case w.right:
                r = p.arrowScroll;
                break;
            default:
                return !0
        }
        S(l, r, a), e.preventDefault(), C()
    }

    function t(e) {
        s = e.target
    }
    var k, D, M = (k = 0, function(e) {
            return e.uniqueID || (e.uniqueID = k++)
        }),
        E = {},
        T = {},
        B = {};

    function C() {
        clearTimeout(D), D = setInterval(function() {
            E = T = B = {}
        }, 1e3)
    }

    function H(e, t, o) {
        for (var n = o ? E : T, r = e.length; r--;) n[M(e[r])] = t;
        return t
    }

    function z(e) {
        var t = [],
            o = document.body,
            n = m.scrollHeight;
        do {
            var r = (!1 ? E : T)[M(e)];
            if (r) return H(t, r);
            if (t.push(e), n === e.scrollHeight) {
                var a = O(m) && O(o) || X(m);
                if (d && L(m) || !d && a) return H(t, q())
            } else if (L(e) && X(e)) return H(t, e)
        } while (e = e.parentElement)
    }

    function L(e) {
        return e.clientHeight + 10 < e.scrollHeight
    }

    function O(e) {
        return "hidden" !== getComputedStyle(e, "").getPropertyValue("overflow-y")
    }

    function X(e) {
        var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
        return "scroll" === t || "auto" === t
    }

    function Y(e, t, o) {
        window.addEventListener(e, t, o || !1)
    }

    function A(e, t, o) {
        window.removeEventListener(e, t, o || !1)
    }

    function N(e, t) {
        return e && (e.nodeName || "").toLowerCase() === t.toLowerCase()
    }
    if (window.localStorage && localStorage.SS_deltaBuffer) try {
        l = localStorage.SS_deltaBuffer.split(",")
    } catch (e) {}

    function K(e, t) {
        return Math.floor(e / t) == e / t
    }

    function P(e) {
        return K(l[0], e) && K(l[1], e) && K(l[2], e)
    }
    var $, j = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e, t, o) {
            window.setTimeout(e, o || 1e3 / 60)
        },
        R = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
        q = ($ = document.scrollingElement, function() {
            if (!$) {
                var e = document.createElement("div");
                e.style.cssText = "height:10000px;width:1px;", document.body.appendChild(e);
                var t = document.body.scrollTop;
                document.documentElement.scrollTop, window.scrollBy(0, 3), $ = document.body.scrollTop != t ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(e)
            }
            return $
        });

    function V(e) {
        var t;
        return ((e *= p.pulseScale) < 1 ? e - (1 - Math.exp(-e)) : (e -= 1, (t = Math.exp(-1)) + (1 - Math.exp(-e)) * (1 - t))) * p.pulseNormalize
    }

    function F(e) {
        return 1 <= e ? 1 : e <= 0 ? 0 : (1 == p.pulseNormalize && (p.pulseNormalize /= V(1)), V(e))
    }
    var I = window.navigator.userAgent,
        _ = /Edge/.test(I),
        W = /chrome/i.test(I) && !_,
        U = /safari/i.test(I) && !_,
        G = /mobile/i.test(I),
        J = /Windows NT 6.1/i.test(I) && /rv:11/i.test(I),
        Q = U && (/Version\/8/i.test(I) || /Version\/9/i.test(I)),
        Z = (W || U || J) && !G,
        ee = !1;
    try {
        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
            get: function() {
                ee = !0
            }
        }))
    } catch (e) {}
    var te = !!ee && {
            passive: !1
        },
        oe = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

    function ne(e) {
        for (var t in e) o.hasOwnProperty(t) && (p[t] = e[t])
    }
    oe && Z && (Y(oe, e, te), Y("mousedown", t), Y("load", y)), ne.destroy = function() {
        i && i.disconnect(), A(oe, e), A("mousedown", t), A("keydown", x), A("resize", c), A("load", y)
    }, window.SmoothScrollOptions && ne(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function() {
        return ne
    }) : "object" == typeof exports ? module.exports = ne : window.SmoothScroll = ne
}();
//]]>

//<![CDATA[
head.ready(document, function() {
    head.load({
        jqueryfile: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js"
    })
}), head.ready("jqueryfile", function() {
    $(".articlebody div").css("text-align", "left"), $(".articlebody .separator a").css("margin-bottom", "15px"), $(".articlebody .separator a").css("margin-left", "0"), $(".menu-more, .m-menu-more").click(function() {
        $(".overlay").fadeToggle("fast"), $(".button a").toggleClass("btn-open").toggleClass("btn-close"), $("html, body").css("overflow", "hidden")
    }), $(".btn-close").on("click", function() {
        $(".overlay").fadeToggle("fast"), $(".button a").toggleClass("btn-open").toggleClass("btn-close"), $("html, body").css("overflow", "auto"), open = !1
    });
    var e = $(".share-modal");
    $(".share-show-modal, .fs-more").click(function() {
        e.fadeIn(), $("html, body").css("overflow", "hidden")
    }), $(".share-close-modal").click(function() {
        e.fadeOut(), $("html, body").css("overflow", "auto")
    }), $(".search-here, .m-search-here").on("click", function() {
        $(".search-here i").hasClass("icon-search") ? $(".search-here i").removeClass("icon-search").addClass("fa-times") : $(".search-here i").removeClass("fa-times").addClass("icon-search"), $(".search-box").slideToggle(), $(".search-b input").focus()
    })
});
//]]>

//<![CDATA[
head.ready("jqueryfile", function() {
    if (850 < $(window).width()) {
        var i = $(".left-box").height();
        if ($(".right-box").height() < i) {
            $(".sidebar").width($(".right-box").width());
            var o = $(".sidebar"),
                t = $(".sticky-stopper");
            if (!!o.offset()) {
                var e = o.innerHeight(),
                    s = o.offset().top,
                    n = t.offset().top - e - 0,
                    f = n - 0;
                $(window).scroll(function() {
                    var i = $(window).scrollTop();
                    n < i ? o.css({
                        position: "absolute",
                        top: f
                    }) : s < i - 300 ? o.css({
                        position: "fixed",
                        top: "0"
                    }) : o.css({
                        position: "absolute",
                        top: "initial"
                    })
                })
            }
        }
    }
});
//]]>

//<![CDATA[
head.ready("jqueryfile", function() {
    $("a[href^='#link_share']").each(function() {
        var e = $(this).attr("data-sm"),
            t = "";
        "facebook" == e && (t = "https://www.facebook.com/sharer.php?u=" + share_url), "twitter" == e && (t = "https://twitter.com/intent/tweet?url=" + share_url + "&text=" + share_title + "&via=TheHackersNews"), "linkedin" == e && (t = "https://www.linkedin.com/shareArticle?mini=true&url=" + share_url), "reddit" == e && (t = "https://www.reddit.com/submit?url=" + share_url), "hackernews" == e && (t = "https://news.ycombinator.com/submitlink?u=" + share_url + "&t=" + share_title), "email" == e && (t = "mailto:?&subject=News Article—" + share_title + "&body=Check out this article from The Hacker News. \n \n \n" + share_title + " — " + share_url), "whatsapp" == e && (t = "https://api.whatsapp.com/send?text=" + share_title + " — " + share_url), "facebook-m" == e && (t = "fb-messenger://share/?link=" + share_url + "&app_id=280117418781535"), "telegram" == e && (t = "https://telegram.me/share/url?url=" + share_url + "&text=" + share_title), $(this).attr("href", t)
    }), $(".show-comments").on("click", function() {
        var e = document.createElement("script");
        e.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=280117418781535&version=v2.12", document.body.appendChild(e), $(".sharebelow-comment").hide(), $(".comments").show()
    });
    var l = $(".articlebody").offset().top,
        o = !1;
    $(window).scroll(function() {
        var e, t, r, s, a, n;
        $(window).scrollTop() > l && !o && (jQuery.ajax({
            url: "https://thehackernews.com/feeds/posts/default?alt=json-in-script&max-results=4",
            type: "get",
            cache: !1,
            dataType: "jsonp",
            success: function(e) {
                for (var t = "", r = "", s = 0; s < e.feed.entry.length; s++) {
                    for (var a = 0; a < e.feed.entry[s].link.length; a++)
                        if ("alternate" == e.feed.entry[s].link[a].rel) {
                            t = e.feed.entry[s].link[a].href;
                            break
                        } if ("content" in e.feed.entry[s]) var n = e.feed.entry[s].content.$t;
                    else n = "summary" in e.feed.entry[s] ? e.feed.entry[s].summary.$t : "";
                    100 < (n = n.replace(/<S[^>]*>/g, "")).length && (n = n.substring(0, 90));
                    var l = e.feed.entry[s].title.$t;
                    l = l.substring(0, 50);
                    var o = e.feed.entry[s].media$thumbnail.url.replace(/\/s72\-c\-e100/, "/s260-e100");
                    o = o.replace(/http:\/\/1\.bp\.blogspot\.com\/|http:\/\/2\.bp\.blogspot\.com\/|http:\/\/3\.bp\.blogspot\.com\/|http:\/\/4\.bp\.blogspot\.com\/|https:\/\/1\.bp\.blogspot\.com\/|https:\/\/2\.bp\.blogspot\.com\/|https:\/\/3\.bp\.blogspot\.com\/|https:\/\/4\.bp\.blogspot\.com\//, "https://thehackernews.com/images/"), r += '<article class="latest cf"><a class="latest-link" href="' + t.replace("https://", "https://") + '"><div><img src="' + o + '" alt="' + l + '"/></div><div><div class="latest-h3">' + l + '...</div></div><div class="latest-desc">' + n + "...</div></a></article>"
                }
                r += "", document.getElementById("result").innerHTML = r
            }
        }), e = window, t = document, r = "script", s = "stackSonar", e.StackSonarObject = s, e[s] = e[s] || function() {
            (e[s].q = e[s].q || []).push(arguments)
        }, e[s].l = 1 * new Date, a = t.createElement(r), n = t.getElementsByTagName(r)[0], a.async = 1, a.src = "https://www.stack-sonar.c/ping.js", n.parentNode.insertBefore(a, n), stackSonar("stack-connect", "233"), o = !0)
    })
});
//]]>

//<![CDATA[
head.ready("jqueryfile", function() {
    $(window).scroll(function() {
        var e = $(this).scrollTop(),
            s = $(".articlebody").offset().top,
            i = $(".stophere").offset().top;
        jQuery(window).height();
        e < s ? ($(".float-share").css("visibility", "visible"), $(".float-share").removeClass("fixed-r")) : s < e && e < i - 440 ? ($(".float-share").addClass("fixed-r"), $(".float-share").css("visibility", "visible")) : ($(".float-share").css("visibility", "hidden"), $(".float-share").removeClass("fixed-r"))
    })
});
//]]>

//<![CDATA[
var group = Math.floor(4 * Math.random()),
    Cachebuster = Math.random().toString(36).substring(2),
    timestamp = Math.floor(1e9 + 9e10 * Math.random());
if (0 === group) var sidebar = "<a href='https://ad.doubleclick.net/ddm/clk/463791546;269244864;z' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-6vhDJ-T9u_Q/Xl_LzZu_HBI/AAAAAAAA2dU/TkjBhLSQXUQxJ5_hxArrnTW3PXn0rDRFQCLcBGAsYHQ/s728-e100/group-a-300.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.269244864;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.269244864;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a>',
    bottom = "<a href='https://ad.doubleclick.net/ddm/clk/463791531;269244987;z' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-hE5p9WwWcnA/Xl_LzY65f-I/AAAAAAAA2dY/zIlLKD-Uv1EMGUzImckTKEroMsdYbGi_ACLcBGAsYHQ/s728-e100/group-a-728.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.269244987;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.269244987;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a>',
    bottom_mobile = "<a href='https://ad.doubleclick.net/ddm/clk/463880458;269244861;x' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-6vhDJ-T9u_Q/Xl_LzZu_HBI/AAAAAAAA2dU/TkjBhLSQXUQxJ5_hxArrnTW3PXn0rDRFQCLcBGAsYHQ/s728-e100/group-a-300.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.269244861;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.269244861;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a>';
if (1 === group) sidebar = "<a href='https://ad.doubleclick.net/ddm/clk/463792107;269244996;z' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-7jXDgxuJs-M/Xl_LyC3CzII/AAAAAAAA2dM/UkVoe6L0mAkFwyJkFlri7PerNETYMcbCQCLcBGAsYHQ/s728-e100/group-b-300.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.269244996;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.269244996;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a>', bottom = "<a href='https://ad.doubleclick.net/ddm/clk/463880518;269173912;s' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-w9uWl8-niWE/Xl_LyIbN8HI/AAAAAAAA2dQ/X92ophZ31KcjU7TGMT-ncR4YR-BubeHHwCLcBGAsYHQ/s728-e100/group-b-728.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.269173912;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.269173912;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a>', bottom_mobile = "<a href='https://ad.doubleclick.net/ddm/clk/463880800;268915079;t' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-7jXDgxuJs-M/Xl_LyC3CzII/AAAAAAAA2dM/UkVoe6L0mAkFwyJkFlri7PerNETYMcbCQCLcBGAsYHQ/s728-e100/group-b-300.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.268915079;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.268915079;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a>';
if (2 === group) sidebar = "<a href='https://ad.doubleclick.net/ddm/clk/466736243;272059994;x' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-9h-8GWGAZnY/XqWaNhYbsCI/AAAAAAAA2sk/WQpXo579EPUuPrxvLTuhMiCBjzIl160PACLcBGAsYHQ/s728-e100/group-c-300.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.272059994;sz=1x1;u=__AP1_np_dv_[" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.272059994;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a><img src="https://tps.doubleverify.com/visit.jpg?ctx=607671&cmp=23636320&sid=5936378&plc=272059994&adsrv=1&btreg=&btadsrv=&crt=&tagtype=&dvtagver=6.1.img&" alt="" width="0" height="0" alt=\'AT&T cybersecurity\' />', bottom = "<a href='https://ad.doubleclick.net/ddm/clk/466825752;272414700;h' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-XdqGIhjU714/XqWaN1XDvYI/AAAAAAAA2sg/UM_GopPEt2UpOjQtm0Qv3gyMdJkqU1J_ACLcBGAsYHQ/s728-e100/group-c-728.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.272414700;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.272414700;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a><img src="https://tps.doubleverify.com/visit.jpg?ctx=607671&cmp=23636320&sid=5936378&plc=272414700&adsrv=1&btreg=&btadsrv=&crt=&tagtype=&dvtagver=6.1.img&" alt="" width="0" height="0" alt=\'AT&T cybersecurity\'/>', bottom_mobile = "<a href='https://ad.doubleclick.net/ddm/clk/466822284;272416755;q' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-9h-8GWGAZnY/XqWaNhYbsCI/AAAAAAAA2sk/WQpXo579EPUuPrxvLTuhMiCBjzIl160PACLcBGAsYHQ/s728-e100/group-c-300.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.272416755;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.272416755;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a><img src="https://tps.doubleverify.com/visit.jpg?ctx=607671&cmp=23636320&sid=5936378&plc=272416755&adsrv=1&btreg=&btadsrv=&crt=&tagtype=&dvtagver=6.1.img&" alt="" width="0" height="0" alt=\'AT&T cybersecurity\'/>';
if (3 === group) sidebar = "<a href='https://ad.doubleclick.net/ddm/clk/466822266;272061659;p' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-FW8FQ7bo8OU/XqWaPcyOX_I/AAAAAAAA2ss/uTM1NQ29-akne_9Pk7Ya7nttYaB3aZTrgCLcBGAsYHQ/s728-e100/group-d-300.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.272061659;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.272061659;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a><img src="https://tps.doubleverify.com/visit.jpg?ctx=607671&cmp=23636320&sid=5936378&plc=272061659&adsrv=1&btreg=&btadsrv=&crt=&tagtype=&dvtagver=6.1.img&" alt="" width="0" height="0" alt=\'AT&T cybersecurity\'/>', bottom = "<a href='https://ad.doubleclick.net/ddm/clk/466825137;272416746;q' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-7oJmLEYkjcQ/XqWacdmVRgI/AAAAAAAA2sw/P2VnIZJ4Rms0miW_RZVpJ6WhFtBlFeOqQCLcBGAsYHQ/s728-e100/group-d-728.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.272416746;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.272416746;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a><img src="https://tps.doubleverify.com/visit.jpg?ctx=607671&cmp=23636320&sid=5936378&plc=272416746&adsrv=1&btreg=&btadsrv=&crt=&tagtype=&dvtagver=6.1.img&" alt="" width="0" height="0" alt=\'AT&T cybersecurity\'/>', bottom_mobile = "<a href='https://ad.doubleclick.net/ddm/clk/466734980;272414697;y' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-FW8FQ7bo8OU/XqWaPcyOX_I/AAAAAAAA2ss/uTM1NQ29-akne_9Pk7Ya7nttYaB3aZTrgCLcBGAsYHQ/s728-e100/group-d-300.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.272414697;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.272414697;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a><img src="https://tps.doubleverify.com/visit.jpg?ctx=607671&cmp=23636320&sid=5936378&plc=272414697&adsrv=1&btreg=&btadsrv=&crt=&tagtype=&dvtagver=6.1.img&" alt="" width="0" height="0" alt=\'AT&T cybersecurity\'/>';
document.getElementById("av-sidebar") && (document.getElementById("av-sidebar").innerHTML = sidebar), document.getElementById("av-bottom-d") && (document.getElementById("av-bottom-d").innerHTML = bottom), document.getElementById("av-bottom-m") && (document.getElementById("av-bottom-m").innerHTML = bottom_mobile);
//]]>

//<![CDATA[
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {}).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
//]]>

//<![CDATA[
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-27389293-1', 'auto');
ga('send', 'pageview');
//]]>

//<![CDATA[
var group = Math.floor(4 * Math.random()),
    Cachebuster = Math.random().toString(36).substring(2),
    timestamp = Math.floor(1e9 + 9e10 * Math.random());
if (0 === group) var sidebar = "<a href='https://ad.doubleclick.net/ddm/clk/463791546;269244864;z' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-6vhDJ-T9u_Q/Xl_LzZu_HBI/AAAAAAAA2dU/TkjBhLSQXUQxJ5_hxArrnTW3PXn0rDRFQCLcBGAsYHQ/s728-e100/group-a-300.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.269244864;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.269244864;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a>',
    bottom = "<a href='https://ad.doubleclick.net/ddm/clk/463791531;269244987;z' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-hE5p9WwWcnA/Xl_LzY65f-I/AAAAAAAA2dY/zIlLKD-Uv1EMGUzImckTKEroMsdYbGi_ACLcBGAsYHQ/s728-e100/group-a-728.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.269244987;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.269244987;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a>',
    bottom_mobile = "<a href='https://ad.doubleclick.net/ddm/clk/463880458;269244861;x' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-6vhDJ-T9u_Q/Xl_LzZu_HBI/AAAAAAAA2dU/TkjBhLSQXUQxJ5_hxArrnTW3PXn0rDRFQCLcBGAsYHQ/s728-e100/group-a-300.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.269244861;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.269244861;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a>';
if (1 === group) sidebar = "<a href='https://ad.doubleclick.net/ddm/clk/463792107;269244996;z' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-7jXDgxuJs-M/Xl_LyC3CzII/AAAAAAAA2dM/UkVoe6L0mAkFwyJkFlri7PerNETYMcbCQCLcBGAsYHQ/s728-e100/group-b-300.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.269244996;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.269244996;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a>', bottom = "<a href='https://ad.doubleclick.net/ddm/clk/463880518;269173912;s' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-w9uWl8-niWE/Xl_LyIbN8HI/AAAAAAAA2dQ/X92ophZ31KcjU7TGMT-ncR4YR-BubeHHwCLcBGAsYHQ/s728-e100/group-b-728.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.269173912;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.269173912;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a>', bottom_mobile = "<a href='https://ad.doubleclick.net/ddm/clk/463880800;268915079;t' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-7jXDgxuJs-M/Xl_LyC3CzII/AAAAAAAA2dM/UkVoe6L0mAkFwyJkFlri7PerNETYMcbCQCLcBGAsYHQ/s728-e100/group-b-300.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.268915079;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.268915079;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a>';
if (2 === group) sidebar = "<a href='https://ad.doubleclick.net/ddm/clk/466736243;272059994;x' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-9h-8GWGAZnY/XqWaNhYbsCI/AAAAAAAA2sk/WQpXo579EPUuPrxvLTuhMiCBjzIl160PACLcBGAsYHQ/s728-e100/group-c-300.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.272059994;sz=1x1;u=__AP1_np_dv_[" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.272059994;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a><img src="https://tps.doubleverify.com/visit.jpg?ctx=607671&cmp=23636320&sid=5936378&plc=272059994&adsrv=1&btreg=&btadsrv=&crt=&tagtype=&dvtagver=6.1.img&" alt="" width="0" height="0" alt=\'AT&T cybersecurity\' />', bottom = "<a href='https://ad.doubleclick.net/ddm/clk/466825752;272414700;h' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-XdqGIhjU714/XqWaN1XDvYI/AAAAAAAA2sg/UM_GopPEt2UpOjQtm0Qv3gyMdJkqU1J_ACLcBGAsYHQ/s728-e100/group-c-728.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.272414700;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.272414700;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a><img src="https://tps.doubleverify.com/visit.jpg?ctx=607671&cmp=23636320&sid=5936378&plc=272414700&adsrv=1&btreg=&btadsrv=&crt=&tagtype=&dvtagver=6.1.img&" alt="" width="0" height="0" alt=\'AT&T cybersecurity\'/>', bottom_mobile = "<a href='https://ad.doubleclick.net/ddm/clk/466822284;272416755;q' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-9h-8GWGAZnY/XqWaNhYbsCI/AAAAAAAA2sk/WQpXo579EPUuPrxvLTuhMiCBjzIl160PACLcBGAsYHQ/s728-e100/group-c-300.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.272416755;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.272416755;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a><img src="https://tps.doubleverify.com/visit.jpg?ctx=607671&cmp=23636320&sid=5936378&plc=272416755&adsrv=1&btreg=&btadsrv=&crt=&tagtype=&dvtagver=6.1.img&" alt="" width="0" height="0" alt=\'AT&T cybersecurity\'/>';
if (3 === group) sidebar = "<a href='https://ad.doubleclick.net/ddm/clk/466822266;272061659;p' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-FW8FQ7bo8OU/XqWaPcyOX_I/AAAAAAAA2ss/uTM1NQ29-akne_9Pk7Ya7nttYaB3aZTrgCLcBGAsYHQ/s728-e100/group-d-300.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.272061659;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.272061659;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a><img src="https://tps.doubleverify.com/visit.jpg?ctx=607671&cmp=23636320&sid=5936378&plc=272061659&adsrv=1&btreg=&btadsrv=&crt=&tagtype=&dvtagver=6.1.img&" alt="" width="0" height="0" alt=\'AT&T cybersecurity\'/>', bottom = "<a href='https://ad.doubleclick.net/ddm/clk/466825137;272416746;q' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-7oJmLEYkjcQ/XqWacdmVRgI/AAAAAAAA2sw/P2VnIZJ4Rms0miW_RZVpJ6WhFtBlFeOqQCLcBGAsYHQ/s728-e100/group-d-728.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.272416746;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.272416746;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a><img src="https://tps.doubleverify.com/visit.jpg?ctx=607671&cmp=23636320&sid=5936378&plc=272416746&adsrv=1&btreg=&btadsrv=&crt=&tagtype=&dvtagver=6.1.img&" alt="" width="0" height="0" alt=\'AT&T cybersecurity\'/>', bottom_mobile = "<a href='https://ad.doubleclick.net/ddm/clk/466734980;272414697;y' rel='nofollow noopener sponsored' target='_blank'><img src='https://thehackernews.com/images/-FW8FQ7bo8OU/XqWaPcyOX_I/AAAAAAAA2ss/uTM1NQ29-akne_9Pk7Ya7nttYaB3aZTrgCLcBGAsYHQ/s728-e100/group-d-300.jpg' alt='AT&T cybersecurity'/></a><a href='https://ad.doubleclick.net/ddm/jump/N424004.3381407THEHACKERNEWS/B23636320.272414697;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + "?' rel='nofollow noopener sponsored' target='_blank'><IMG SRC=\"https://ad.doubleclick.net/ddm/ad/N424004.3381407THEHACKERNEWS/B23636320.272414697;sz=1x1;u=__AP1_np_dv_" + Cachebuster + "PA__;ord=" + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?" BORDER=0 WIDTH=1 HEIGHT=1 ALT="." class="av-pixel"/></a><img src="https://tps.doubleverify.com/visit.jpg?ctx=607671&cmp=23636320&sid=5936378&plc=272414697&adsrv=1&btreg=&btadsrv=&crt=&tagtype=&dvtagver=6.1.img&" alt="" width="0" height="0" alt=\'AT&T cybersecurity\'/>';
document.getElementById("av-sidebar") && (document.getElementById("av-sidebar").innerHTML = sidebar), document.getElementById("av-bottom-d") && (document.getElementById("av-bottom-d").innerHTML = bottom), document.getElementById("av-bottom-m") && (document.getElementById("av-bottom-m").innerHTML = bottom_mobile);
//]]>

//<![CDATA[
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {}).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
//]]>

//<![CDATA[
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-27389293-1', 'auto');
ga('send', 'pageview');
//]]>