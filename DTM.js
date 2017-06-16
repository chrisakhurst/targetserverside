! function e(t, n, i) {
    function r(s, o) {
        if (!n[s]) {
            if (!t[s]) {
                var c = "function" == typeof require && require;
                if (!o && c) return c(s, !0);
                if (a) return a(s, !0);
                var l = new Error("Cannot find module '" + s + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var u = n[s] = {
                exports: {}
            };
            t[s][0].call(u.exports, function(e) {
                var n = t[s][1][e];
                return r(n || e)
            }, u, u.exports, e, t, n, i)
        }
        return n[s].exports
    }
    for (var a = "function" == typeof require && require, s = 0; s < i.length; s++) r(i[s]);
    return r
}({
    1: [function(e, t, n) {
        (function(n) {
            e("./utils/polyfills");
            var i = e("./strategies/LocalVisitor"),
                r = e("./strategies/ProxyVisitor"),
                a = e("./strategies/PlaceholderVisitor"),
                s = e("./utils/callbackRegistryFactory"),
                o = e("./Message"),
                c = e("./enums"),
                l = c.MESSAGES;
            t.exports = function(e, t, c, u) {
                function f(e) {
                    Object.assign(S, e)
                }
                function d(e) {
                    Object.assign(S.state, e), S.callbackRegistry.executeAll(S.state)
                }
                function h(e) {
                    if (!C.isInvalid(e)) {
                        E = !1;
                        var t = C.parse(e);
                        S.setStateAndPublish(t.state)
                    }
                }
                function g(e) {
                    !E && _ && (E = !0, C.send(u, e))
                }
                function p() {
                    f(new i(c._generateID)), S.getMarketingCloudVisitorID(), S.callbackRegistry.executeAll(S.state, !0), n.removeEventListener("message", m)
                }
                function m(e) {
                    if (!C.isInvalid(e)) {
                        var t = C.parse(e);
                        E = !1, n.clearTimeout(this.timeout), n.removeEventListener("message", m), f(new r(S)), n.addEventListener("message", h), S.setStateAndPublish(t.state), S.callbackRegistry.hasCallbacks() && g(l.GETSTATE)
                    }
                }
                function v() {
                    _ && postMessage ? (n.addEventListener("message", m), g(l.HANDSHAKE), this.timeout = setTimeout(p, 250)) : p()
                }
                function y() {
                    n.s_c_in || (n.s_c_il = [], n.s_c_in = 0), S._c = "Visitor", S._il = n.s_c_il, S._in = n.s_c_in, S._il[S._in] = S, n.s_c_in++
                }
                function b() {
                    function e(e) {
                        0 !== e.indexOf("_") && "function" == typeof c[e] && (S[e] = function() {})
                    }
                    Object.keys(c).forEach(e), S.getSupplementalDataID = c.getSupplementalDataID
                }
                var S = this,
                    _ = t.whitelistParentDomain;
                S.state = {}, S.version = c.version, S.marketingCloudOrgID = e;
                var E = !1,
                    C = new o(e, _);
                S.callbackRegistry = s(), S.findField = function(e, t) {
                        return S.state[e] ? (t(S.state[e]), S.state[e]) : void 0
                    }, S.messageParent = g, S.setStateAndPublish = d,
                    function() {
                        y(), b(), f(new a(S)), v()
                    }()
            }
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "./Message": 2,
        "./enums": 4,
        "./strategies/LocalVisitor": 5,
        "./strategies/PlaceholderVisitor": 6,
        "./strategies/ProxyVisitor": 7,
        "./utils/callbackRegistryFactory": 8,
        "./utils/polyfills": 10
    }],
    2: [function(e, t, n) {
        var i = e("./enums"),
            r = i.MESSAGES,
            a = {
                0: "prefix",
                1: "orgID",
                2: "state"
            };
        t.exports = function(e, t) {
            this.parse = function(e) {
                try {
                    var t = {};
                    return e.data.split("|").forEach(function(e, n) {
                        void 0 !== e && (t[a[n]] = 2 !== n ? e : JSON.parse(e))
                    }), t
                } catch (e) {}
            }, this.isInvalid = function(n) {
                var i = this.parse(n);
                if (!i || Object.keys(i).length < 2) return !0;
                var a = e !== i.orgID,
                    s = !t || n.origin !== t,
                    o = -1 === Object.keys(r).indexOf(i.prefix);
                return a || s || o
            }, this.send = function(e, n, i) {
                var r = n + "|" + a;
                i && i === Object(i) && (r += "|" + JSON.stringify(i));
                try {
                    e.postMessage(r, t)
                } catch (a) {}
            }
        }
    }, {
        "./enums": 4
    }],
    3: [function(e, t, i) {
        (function(i) {
            function n() {
                function e() {
                    o.windowLoaded = !0
                }
                i.addEventListener ? i.addEventListener("load", e) : i.attachEvent && i.attachEvent("onload", e), o.codeLoadEnd = (new Date).getTime()
            }
            /** @license ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ============
            Adobe Visitor API for JavaScript version: 2.2.0
            Copyright 1996-2015 Adobe, Inc. All Rights Reserved
            More info available at https://marketing.adobe.com/resources/help/en_US/mcvid/
            */
            var r = e("./ChildVisitor"),
                a = e("./Message"),
                s = e("./utils/makeChildMessageListener"),
                o = function(e, t) {
                    function n(e) {
                        return function(e) {
                            var t = e || g.location.href;
                            try {
                                var n = f._extractParamFromUri(t, i);
                                if (n) return P.parsePipeDelimetedKeyValues(n)
                            } catch (i) {}
                        }
                    }
                    function r(e) {
                        function t(e, t) {
                            e && e.match(p.VALID_VISITOR_ID_REGEX) && t(e)
                        }
                        t(e[I], f.setMarketingCloudVisitorID), f._setFieldExpire(T, -1), t(e[E], f.setAnalyticsVisitorID)
                    }
                    function o(e) {
                        for (var t = "", n = 0, i = e.length; i > n; n++) {
                            var r = e[n],
                                a = r[0],
                                s = r[1];
                            null != s && s !== L && (t = function(e, t, n) {
                                return n = n ? n += "|" : n, n += e + "=" + encodeURIComponent(t)
                            }(a, s, t))
                        }
                        return function(e) {
                            var t = P.getTimestampInSeconds();
                            return e = e ? e += "|" : e, e += "TS=" + t
                        }(t)
                    }
                    function l(e) {
                        var t = e.minutesToLive,
                            n = "";
                        return f.idSyncDisableSyncs && (n = n || "Error: id syncs have been disabled"), "string" == typeof e.dpid && e.dpid.length || (n = n || "Error: config.dpid is empty"), "string" == typeof e.url && e.url.length || (n = n || "Error: config.url is empty"), void 0 === t ? t = 20160 : (t = parseInt(t, 10), (isNaN(t) || 0 >= t) && (n = n || "Error: config.minutesToLive needs to be a positive number")), {
                            error: n,
                            ttl: t
                        }
                    }
                    function u(e) {
                        for (var t = 0, n = e.length; n > t; t++)
                            if (!p.POSITIVE_INT_REGEX.test(e[t])) return !1;
                        return !0
                    }
                    function c(e, t) {
                        for (; e.length < t.length;) e.push("0");
                        for (; t.length < e.length;) t.push("0")
                    }
                    function d(e, t) {
                        for (var n = 0; n < e.length; n++) {
                            var i = parseInt(e[n], 10),
                                r = parseInt(t[n], 10);
                            if (i > r) return 1;
                            if (r > i) return -1
                        }
                        return 0
                    }
                    if (!e) throw new Error("Visitor requires Adobe Marketing Cloud Org ID");
                    var f = this;
                    f.version = "2.2.0";
                    var g = i,
                        _ = g.Visitor;
                    _.version = f.version, g.s_c_in || (g.s_c_il = [], g.s_c_in = 0), f._c = "Visitor", f._il = g.s_c_il, f._in = g.s_c_in, f._il[f._in] = f, g.s_c_in++, f._log = {
                        requests: []
                    };
                    var m = g.document,
                        p = {
                            POST_MESSAGE_ENABLED: !!g.postMessage,
                            DAYS_BETWEEN_SYNC_ID_CALLS: 1,
                            MILLIS_PER_DAY: 864e5,
                            ADOBE_MC: "adobe_mc",
                            ADOBE_MC_SDID: "adobe_mc_sdid",
                            VALID_VISITOR_ID_REGEX: /^[0-9a-fA-F\-]+$/,
                            ADOBE_MC_TTL_IN_MIN: 5,
                            POSITIVE_INT_REGEX: /^\d+$/,
                            VERSION_REGEX: /vVersion\|((\d+\.)?(\d+\.)?(\*|\d+))(?=$|\|)/
                        },
                        h = function(e) {
                            return !Object.prototype[e]
                        };
                    f._hash = function(e) {
                        var t, n, i = 0;
                        if (e)
                            for (t = 0; t < e.length; t++) n = e.charCodeAt(t), i = (i << 5) - i + n, i &= i;
                        return i
                    }, f._generateID = function(e, t) {
                        var n, i, r = "0123456789",
                            a = "",
                            s = "",
                            o = 8,
                            c = 10,
                            l = 10;
                        if (t === I && (V.isClientSideMarketingCloudVisitorID = !0), 1 === e) {
                            for (r += "ABCDEF", n = 0; 16 > n; n++) i = Math.floor(Math.random() * o), a += r.substring(i, i + 1), i = Math.floor(Math.random() * o), s += r.substring(i, i + 1), o = 16;
                            return a + "-" + s
                        }
                        for (n = 0; 19 > n; n++) i = Math.floor(Math.random() * c), a += r.substring(i, i + 1), 0 === n && 9 === i ? c = 3 : (1 === n || 2 === n) && 10 !== c && 2 > i ? c = 10 : n > 2 && (c = 10), i = Math.floor(Math.random() * l), s += r.substring(i, i + 1), 0 === n && 9 === i ? l = 3 : (1 === n || 2 === n) && 10 !== l && 2 > i ? l = 10 : n > 2 && (l = 10);
                        return a + s
                    }, f._getDomain = function(e) {
                        var t;
                        if (!e && g.location && (e = g.location.hostname), t = e)
                            if (/^[0-9.]+$/.test(t)) t = "";
                            else {
                                var n = ",ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,ax,az,ba,bb,be,bf,bg,bh,bi,bj,bm,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cd,cf,cg,ch,ci,cl,cm,cn,co,cr,cu,cv,cw,cx,cz,de,dj,dk,dm,do,dz,ec,ee,eg,es,et,eu,fi,fm,fo,fr,ga,gb,gd,ge,gf,gg,gh,gi,gl,gm,gn,gp,gq,gr,gs,gt,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,im,in,io,iq,ir,is,it,je,jo,jp,kg,ki,km,kn,kp,kr,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,na,nc,ne,nf,ng,nl,no,nr,nu,nz,om,pa,pe,pf,ph,pk,pl,pm,pn,pr,ps,pt,pw,py,qa,re,ro,rs,ru,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,st,su,sv,sx,sy,sz,tc,td,tf,tg,th,tj,tk,tl,tm,tn,to,tp,tr,tt,tv,tw,tz,ua,ug,uk,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wf,ws,yt,",
                                    i = t.split("."),
                                    r = i.length - 1,
                                    a = r - 1;
                                if (r > 1 && i[r].length <= 2 && (2 === i[r - 1].length || n.indexOf("," + i[r] + ",") < 0) && a--, a > 0)
                                    for (t = ""; r >= a;) t = i[r] + (t ? "." : "") + t, r--
                            }
                        return t
                    }, f.cookieRead = function(e) {
                        e = encodeURIComponent(e);
                        var t = (";" + m.cookie).split(" ").join(";"),
                            n = t.indexOf(";" + e + "="),
                            i = 0 > n ? n : t.indexOf(";", n + 1);
                        return 0 > n ? "" : decodeURIComponent(t.substring(n + 2 + e.length, 0 > i ? t.length : i))
                    }, f.cookieWrite = function(e, t, n) {
                        var i, r = f.cookieLifetime;
                        if (t = "" + t, r = r ? ("" + r).toUpperCase() : "", n && "SESSION" !== r && "NONE" !== r) {
                            if (i = "" !== t ? parseInt(r || 0, 10) : -60) n = new Date, n.setTime(n.getTime() + 1e3 * i);
                            else if (1 === n) {
                                n = new Date;
                                var a = n.getYear();
                                n.setYear(a + 2 + (1900 > a ? 1900 : 0))
                            }
                        } else n = 0;
                        return e && "NONE" !== r ? (m.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) + "; path=/;" + (n ? " expires=" + n.toGMTString() + ";" : "") + (f.cookieDomain ? " domain=" + f.cookieDomain + ";" : ""), f.cookieRead(e) === t) : 0
                    }, f._callbackList = null, f._callCallback = function(e, t) {
                        try {
                            "function" == typeof e ? e.apply(g, t) : e[1].apply(e[0], t)
                        } catch (e) {}
                    }, f._registerCallback = function(e, t) {
                        t && (null == f._callbackList && (f._callbackList = {}), void 0 == f._callbackList[e] && (f._callbackList[e] = []), f._callbackList[e].push(t))
                    }, f._callAllCallbacks = function(e, t) {
                        if (null != f._callbackList) {
                            var n = f._callbackList[e];
                            if (n)
                                for (; n.length > 0;) f._callCallback(n.shift(), t)
                        }
                    }, f._addQuerystringParam = function(e, t, n, i) {
                        var r = encodeURIComponent(t) + "=" + encodeURIComponent(n),
                            a = P.parseHash(e),
                            s = P.hashlessUrl(e);
                        if (-1 === s.indexOf("?")) return s + "?" + r + a;
                        var o = s.split("?"),
                            c = o[0] + "?",
                            l = o[1];
                        return c + P.addQueryParamAtLocation(l, r, i) + a
                    }, f._extractParamFromUri = function(e, t) {
                        var n = new RegExp("[\\?&#]" + t + "=([^&#]*)"),
                            i = n.exec(e);
                        return i && i.length ? decodeURIComponent(i[1]) : void 0
                    }, f._parseAdobeMcFromUrl = n(p.ADOBE_MC), f._parseAdobeMcSdidFromUrl = n(p.ADOBE_MC_SDID), f._attemptToPopulateSdidFromUrl = function(t) {
                        var n = f._parseAdobeMcSdidFromUrl(t);
                        n && n.SDID && n[S] === e && (f._supplementalDataIDCurrent = n.SDID, f._supplementalDataIDCurrentConsumed.SDID_URL_PARAM = !0)
                    }, f._attemptToPopulateIdsFromUrl = function() {
                        var t = f._parseAdobeMcFromUrl();
                        if (t && t.TS) {
                            var n = P.getTimestampInSeconds(),
                                i = n - t.TS;
                            if (Math.floor(i / 60) > p.ADOBE_MC_TTL_IN_MIN || t[S] !== e) return;
                            r(t)
                        }
                    }, f._mergeServerState = function(e) {
                        if (e) try {
                            if (e = function(e) {
                                    return P.isObject(e) ? e : P.parseJSON(e)
                                }(e), e[f.marketingCloudOrgID]) {
                                var t = e[f.marketingCloudOrgID];
                                ! function(e) {
                                    P.isObject(e) && f.setCustomerIDs(e)
                                }(t.customerIDs),
                                function(e) {
                                    e = e || {}, f._supplementalDataIDCurrent = e.supplementalDataIDCurrent || "", f._supplementalDataIDCurrentConsumed = e.supplementalDataIDCurrentConsumed || {}, f._supplementalDataIDLast = e.supplementalDataIDLast || "", f._supplementalDataIDLastConsumed = e.supplementalDataIDLastConsumed || {}
                                }(t.sdid)
                            }
                        } catch (e) {
                            throw new Error("`serverState` has an invalid format.")
                        }
                    }, f._timeout = null, f._loadData = function(e, t, n, i) {
                        t = f._addQuerystringParam(t, "d_fieldgroup", e, 1), i.url = f._addQuerystringParam(i.url, "d_fieldgroup", e, 1), i.corsUrl = f._addQuerystringParam(i.corsUrl, "d_fieldgroup", e, 1), V.fieldGroupObj[e] = !0, i === Object(i) && i.corsUrl && "XMLHttpRequest" === f._requestProcs.corsMetadata.corsType ? f._requestProcs.fireCORS(i, n, e) : f.useCORSOnly || f._loadJSONP(e, t, n)
                    }, f._loadJSONP = function(e, t, n) {
                        var i, r = 0,
                            a = 0;
                        if (t && m) {
                            for (i = 0; !r && 2 > i;) {
                                try {
                                    r = m.getElementsByTagName(i > 0 ? "HEAD" : "head"), r = r && r.length > 0 ? r[0] : 0
                                } catch (e) {
                                    r = 0
                                }
                                i++
                            }
                            if (!r) try {
                                m.body && (r = m.body)
                            } catch (e) {
                                r = 0
                            }
                            if (r)
                                for (i = 0; !a && 2 > i;) {
                                    try {
                                        a = m.createElement(i > 0 ? "SCRIPT" : "script")
                                    } catch (e) {
                                        a = 0
                                    }
                                    i++
                                }
                        }
                        if (!t || !r || !a) return void(n && n());
                        a.type = "text/javascript", a.src = t, r.firstChild ? r.insertBefore(a, r.firstChild) : r.appendChild(a);
                        var s = f.loadTimeout;
                        n && (null == f._timeout && (f._timeout = {}), f._timeout[e] = setTimeout(function() {
                            n(!0)
                        }, s)), f._log.requests.push(t)
                    }, f._clearTimeout = function(e) {
                        null != f._timeout && f._timeout[e] && (clearTimeout(f._timeout[e]), f._timeout[e] = 0)
                    }, f._isAllowedDone = !1, f._isAllowedFlag = !1, f.isAllowed = function() {
                        return f._isAllowedDone || (f._isAllowedDone = !0, (f.cookieRead(f.cookieName) || f.cookieWrite(f.cookieName, "T", 1)) && (f._isAllowedFlag = !0)), f._isAllowedFlag
                    }, f._fields = null, f._fieldsExpired = null;
                    var D = "MC",
                        I = "MCMID",
                        S = "MCORGID",
                        C = "MCCIDH",
                        v = "MCSYNCS",
                        A = "MCSYNCSOP",
                        y = "MCIDTS",
                        M = "MCOPTOUT",
                        b = "A",
                        E = "MCAID",
                        O = "AAM",
                        k = "MCAAMLH",
                        T = "MCAAMB",
                        L = "NONE";
                    f._settingsDigest = 0, f._getSettingsDigest = function() {
                        if (!f._settingsDigest) {
                            var e = f.version;
                            f.audienceManagerServer && (e += "|" + f.audienceManagerServer), f.audienceManagerServerSecure && (e += "|" + f.audienceManagerServerSecure), f._settingsDigest = f._hash(e)
                        }
                        return f._settingsDigest
                    }, f._readVisitorDone = !1, f._readVisitor = function() {
                        if (!f._readVisitorDone) {
                            f._readVisitorDone = !0;
                            var e, t, n, i, r, a, s = f._getSettingsDigest(),
                                o = !1,
                                c = f.cookieRead(f.cookieName),
                                l = new Date;
                            if (null == f._fields && (f._fields = {}), c && "T" !== c)
                                for (c = c.split("|"), c[0].match(/^[\-0-9]+$/) && (parseInt(c[0], 10) !== s && (o = !0), c.shift()), c.length % 2 == 1 && c.pop(), e = 0; e < c.length; e += 2) t = c[e].split("-"), n = t[0], i = c[e + 1], t.length > 1 ? (r = parseInt(t[1], 10), a = t[1].indexOf("s") > 0) : (r = 0, a = !1), o && (n === C && (i = ""), r > 0 && (r = l.getTime() / 1e3 - 60)), n && i && (f._setField(n, i, 1), r > 0 && (f._fields["expire" + n] = r + (a ? "s" : ""), (l.getTime() >= 1e3 * r || a && !f.cookieRead(f.sessionCookieName)) && (f._fieldsExpired || (f._fieldsExpired = {}), f._fieldsExpired[n] = !0)));
                            !f._getField(E) && P.isTrackingServerPopulated() && (c = f.cookieRead("s_vi")) && (c = c.split("|"), c.length > 1 && c[0].indexOf("v1") >= 0 && (i = c[1], e = i.indexOf("["), e >= 0 && (i = i.substring(0, e)), i && i.match(p.VALID_VISITOR_ID_REGEX) && f._setField(E, i)))
                        }
                    }, f._appendVersionTo = function(e) {
                        var t = "vVersion|" + f.version,
                            n = e ? f._getCookieVersion(e) : null;
                        return n ? P.areVersionsDifferent(n, f.version) && (e = e.replace(p.VERSION_REGEX, t)) : e += (e ? "|" : "") + t, e
                    }, f._writeVisitor = function() {
                        var e, t, n = f._getSettingsDigest();
                        for (e in f._fields) h(e) && f._fields[e] && "expire" !== e.substring(0, 6) && (t = f._fields[e], n += (n ? "|" : "") + e + (f._fields["expire" + e] ? "-" + f._fields["expire" + e] : "") + "|" + t);
                        n = f._appendVersionTo(n), f.cookieWrite(f.cookieName, n, 1)
                    }, f._getField = function(e, t) {
                        return null == f._fields || !t && f._fieldsExpired && f._fieldsExpired[e] ? null : f._fields[e]
                    }, f._setField = function(e, t, n) {
                        null == f._fields && (f._fields = {}), f._fields[e] = t, n || f._writeVisitor()
                    }, f._getFieldList = function(e, t) {
                        var n = f._getField(e, t);
                        return n ? n.split("*") : null
                    }, f._setFieldList = function(e, t, n) {
                        f._setField(e, t ? t.join("*") : "", n)
                    }, f._getFieldMap = function(e, t) {
                        var n = f._getFieldList(e, t);
                        if (n) {
                            var i, r = {};
                            for (i = 0; i < n.length; i += 2) r[n[i]] = n[i + 1];
                            return r
                        }
                        return null
                    }, f._setFieldMap = function(e, t, n) {
                        var i, r = null;
                        if (t) {
                            r = [];
                            for (i in t) h(i) && (r.push(i), r.push(t[i]))
                        }
                        f._setFieldList(e, r, n)
                    }, f._setFieldExpire = function(e, t, n) {
                        var i = new Date;
                        i.setTime(i.getTime() + 1e3 * t), null == f._fields && (f._fields = {}), f._fields["expire" + e] = Math.floor(i.getTime() / 1e3) + (n ? "s" : ""), 0 > t ? (f._fieldsExpired || (f._fieldsExpired = {}), f._fieldsExpired[e] = !0) : f._fieldsExpired && (f._fieldsExpired[e] = !1), n && (f.cookieRead(f.sessionCookieName) || f.cookieWrite(f.sessionCookieName, "1"))
                    }, f._findVisitorID = function(e) {
                        return e && ("object" == typeof e && (e = e.d_mid ? e.d_mid : e.visitorID ? e.visitorID : e.id ? e.id : e.uuid ? e.uuid : "" + e), e && "NOTARGET" === (e = e.toUpperCase()) && (e = L), e && (e === L || e.match(p.VALID_VISITOR_ID_REGEX)) || (e = "")), e
                    }, f._setFields = function(e, t) {
                        if (f._clearTimeout(e), null != f._loading && (f._loading[e] = !1), V.fieldGroupObj[e] && V.setState(e, !1), e === D) {
                            !0 !== V.isClientSideMarketingCloudVisitorID && (V.isClientSideMarketingCloudVisitorID = !1);
                            var n = f._getField(I);
                            if (!n || f.overwriteCrossDomainMCIDAndAID) {
                                if (!(n = "object" == typeof t && t.mid ? t.mid : f._findVisitorID(t))) {
                                    if (f._use1stPartyMarketingCloudServer) return void f.getAnalyticsVisitorID(null, !1, !0);
                                    n = f._generateID(0, I)
                                }
                                f._setField(I, n)
                            }
                            n && n !== L || (n = ""), "object" == typeof t && ((t.d_region || t.dcs_region || t.d_blob || t.blob) && f._setFields(O, t), f._use1stPartyMarketingCloudServer && t.mid && f._setFields(b, {
                                id: t.id
                            })), f._callAllCallbacks(I, [n])
                        }
                        if (e === O && "object" == typeof t) {
                            var i = 604800;
                            void 0 != t.id_sync_ttl && t.id_sync_ttl && (i = parseInt(t.id_sync_ttl, 10));
                            var r = f._getField(k);
                            r || (r = t.d_region, r || (r = t.dcs_region), r && (f._setFieldExpire(k, i), f._setField(k, r))), r || (r = ""), f._callAllCallbacks(k, [r]);
                            var a = f._getField(T);
                            (t.d_blob || t.blob) && (a = t.d_blob, a || (a = t.blob), f._setFieldExpire(T, i), f._setField(T, a)), a || (a = ""), f._callAllCallbacks(T, [a]), !t.error_msg && f._newCustomerIDsHash && f._setField(C, f._newCustomerIDsHash)
                        }
                        if (e === b) {
                            var s = f._getField(E);
                            s && !f.overwriteCrossDomainMCIDAndAID || (s = f._findVisitorID(t), s ? s !== L && f._setFieldExpire(T, -1) : s = L, f._setField(E, s)), s && s !== L || (s = ""), f._callAllCallbacks(E, [s])
                        }
                        if (f.idSyncDisableSyncs) w.idCallNotProcesssed = !0;
                        else {
                            w.idCallNotProcesssed = !1;
                            var o = {};
                            o.ibs = t.ibs, o.subdomain = t.subdomain, w.processIDCallData(o)
                        }
                        if (t === Object(t)) {
                            var c, l;
                            f.isAllowed() && (c = f._getField(M)), c || (c = L, t.d_optout && t.d_optout instanceof Array && (c = t.d_optout.join(",")), l = parseInt(t.d_ottl, 10), isNaN(l) && (l = 7200), f._setFieldExpire(M, l, !0), f._setField(M, c)), f._callAllCallbacks(M, [c])
                        }
                    }, f._loading = null, f._getRemoteField = function(e, t, n, i, r) {
                        var a, s = "",
                            o = P.isFirstPartyAnalyticsVisitorIDCall(e);
                        if (f.isAllowed())
                            if (f._readVisitor(), s = f._getField(e, !0 === N[e]), function() {
                                    return (!s || f._fieldsExpired && f._fieldsExpired[e]) && (!f.disableThirdPartyCalls || o)
                                }()) {
                                if (e === I || e === M ? a = D : e === k || e === T ? a = O : e === E && (a = b), a) return !t || null != f._loading && f._loading[a] || (null == f._loading && (f._loading = {}), f._loading[a] = !0, f._loadData(a, t, function(t) {
                                    if (!f._getField(e)) {
                                        t && V.setState(a, !0);
                                        var n = "";
                                        e === I ? n = f._generateID(0, I) : a === O && (n = {
                                            error_msg: "timeout"
                                        }), f._setFields(a, n)
                                    }
                                }, r)), f._registerCallback(e, n), s || (t || f._setFields(a, {
                                    id: L
                                }), "")
                            } else s || (e === I ? (f._registerCallback(e, n), s = f._generateID(0, I), f.setMarketingCloudVisitorID(s)) : e === E ? (f._registerCallback(e, n), s = "", f.setAnalyticsVisitorID(s)) : (s = "", i = !0));
                        return e !== I && e !== E || s !== L || (s = "", i = !0), n && i && f._callCallback(n, [s]), s
                    }, f._setMarketingCloudFields = function(e) {
                        f._readVisitor(), f._setFields(D, e)
                    }, f.setMarketingCloudVisitorID = function(e) {
                        f._setMarketingCloudFields(e)
                    }, f._use1stPartyMarketingCloudServer = !1, f.getMarketingCloudVisitorID = function(e, t) {
                        if (f.isAllowed()) {
                            f.marketingCloudServer && f.marketingCloudServer.indexOf(".demdex.net") < 0 && (f._use1stPartyMarketingCloudServer = !0);
                            var n = f._getAudienceManagerURLData("_setMarketingCloudFields"),
                                i = n.url;
                            return f._getRemoteField(I, i, e, t, n)
                        }
                        return ""
                    }, f._mapCustomerIDs = function(e) {
                        f.getAudienceManagerBlob(e, !0)
                    }, _.AuthState = {
                        UNKNOWN: 0,
                        AUTHENTICATED: 1,
                        LOGGED_OUT: 2
                    }, f._currentCustomerIDs = {}, f._customerIDsHashChanged = !1, f._newCustomerIDsHash = "", f.setCustomerIDs = function(e) {
                        function t() {
                            f._customerIDsHashChanged = !1
                        }
                        if (f.isAllowed() && e) {
                            f._readVisitor();
                            var n, i;
                            for (n in e)
                                if (h(n) && (i = e[n]))
                                    if ("object" == typeof i) {
                                        var r = {};
                                        i.id && (r.id = i.id), void 0 != i.authState && (r.authState = i.authState), f._currentCustomerIDs[n] = r
                                    } else f._currentCustomerIDs[n] = {
                                        id: i
                                    };
                            var a = f.getCustomerIDs(),
                                s = f._getField(C),
                                o = "";
                            s || (s = 0);
                            for (n in a) h(n) && (i = a[n], o += (o ? "|" : "") + n + "|" + (i.id ? i.id : "") + (i.authState ? i.authState : ""));
                            f._newCustomerIDsHash = f._hash(o), f._newCustomerIDsHash !== s && (f._customerIDsHashChanged = !0, f._mapCustomerIDs(t))
                        }
                    }, f.getCustomerIDs = function() {
                        f._readVisitor();
                        var e, t, n = {};
                        for (e in f._currentCustomerIDs) h(e) && (t = f._currentCustomerIDs[e], n[e] || (n[e] = {}), t.id && (n[e].id = t.id), void 0 != t.authState ? n[e].authState = t.authState : n[e].authState = _.AuthState.UNKNOWN);
                        return n
                    }, f._setAnalyticsFields = function(e) {
                        f._readVisitor(), f._setFields(b, e)
                    }, f.setAnalyticsVisitorID = function(e) {
                        f._setAnalyticsFields(e)
                    }, f.getAnalyticsVisitorID = function(e, t, n) {
                        if (!P.isTrackingServerPopulated() && !n) return f._callCallback(e, [""]), "";
                        if (f.isAllowed()) {
                            var i = "";
                            if (n || (i = f.getMarketingCloudVisitorID(function(t) {
                                    f.getAnalyticsVisitorID(e, !0)
                                })), i || n) {
                                var r = n ? f.marketingCloudServer : f.trackingServer,
                                    a = "";
                                f.loadSSL && (n ? f.marketingCloudServerSecure && (r = f.marketingCloudServerSecure) : f.trackingServerSecure && (r = f.trackingServerSecure));
                                var s = {};
                                if (r) {
                                    var o = "http" + (f.loadSSL ? "s" : "") + "://" + r + "/id",
                                        c = "d_visid_ver=" + f.version + "&mcorgid=" + encodeURIComponent(f.marketingCloudOrgID) + (i ? "&mid=" + encodeURIComponent(i) : "") + (f.idSyncDisable3rdPartySyncing ? "&d_coppa=true" : ""),
                                        l = ["s_c_il", f._in, "_set" + (n ? "MarketingCloud" : "Analytics") + "Fields"];
                                    a = o + "?" + c + "&callback=s_c_il%5B" + f._in + "%5D._set" + (n ? "MarketingCloud" : "Analytics") + "Fields", s.corsUrl = o + "?" + c, s.callback = l
                                }
                                return s.url = a, f._getRemoteField(n ? I : E, a, e, t, s)
                            }
                        }
                        return ""
                    }, f._setAudienceManagerFields = function(e) {
                        f._readVisitor(), f._setFields(O, e)
                    }, f._getAudienceManagerURLData = function(e) {
                        var t = f.audienceManagerServer,
                            n = "",
                            i = f._getField(I),
                            r = f._getField(T, !0),
                            a = f._getField(E),
                            s = a && a !== L ? "&d_cid_ic=AVID%01" + encodeURIComponent(a) : "";
                        if (f.loadSSL && f.audienceManagerServerSecure && (t = f.audienceManagerServerSecure), t) {
                            var o, c, l = f.getCustomerIDs();
                            if (l)
                                for (o in l) h(o) && (c = l[o], s += "&d_cid_ic=" + encodeURIComponent(o) + "%01" + encodeURIComponent(c.id ? c.id : "") + (c.authState ? "%01" + c.authState : ""));
                            e || (e = "_setAudienceManagerFields");
                            var u = "http" + (f.loadSSL ? "s" : "") + "://" + t + "/id",
                                d = "d_visid_ver=" + f.version + "&d_rtbd=json&d_ver=2" + (!i && f._use1stPartyMarketingCloudServer ? "&d_verify=1" : "") + "&d_orgid=" + encodeURIComponent(f.marketingCloudOrgID) + "&d_nsid=" + (f.idSyncContainerID || 0) + (i ? "&d_mid=" + encodeURIComponent(i) : "") + (f.idSyncDisable3rdPartySyncing ? "&d_coppa=true" : "") + (r ? "&d_blob=" + encodeURIComponent(r) : "") + s,
                                g = ["s_c_il", f._in, e];
                            return n = u + "?" + d + "&d_cb=s_c_il%5B" + f._in + "%5D." + e, {
                                url: n,
                                corsUrl: u + "?" + d,
                                callback: g
                            }
                        }
                        return {
                            url: n
                        }
                    }, f.getAudienceManagerLocationHint = function(e, t) {
                        if (f.isAllowed() && f.getMarketingCloudVisitorID(function(t) {
                                f.getAudienceManagerLocationHint(e, !0)
                            })) {
                            var n = f._getField(E);
                            if (!n && P.isTrackingServerPopulated() && (n = f.getAnalyticsVisitorID(function(t) {
                                    f.getAudienceManagerLocationHint(e, !0)
                                })), n || !P.isTrackingServerPopulated()) {
                                var i = f._getAudienceManagerURLData(),
                                    r = i.url;
                                return f._getRemoteField(k, r, e, t, i)
                            }
                        }
                        return ""
                    }, f.getLocationHint = f.getAudienceManagerLocationHint, f.getAudienceManagerBlob = function(e, t) {
                        if (f.isAllowed() && f.getMarketingCloudVisitorID(function(t) {
                                f.getAudienceManagerBlob(e, !0)
                            })) {
                            var n = f._getField(E);
                            if (!n && P.isTrackingServerPopulated() && (n = f.getAnalyticsVisitorID(function(t) {
                                    f.getAudienceManagerBlob(e, !0)
                                })), n || !P.isTrackingServerPopulated()) {
                                var i = f._getAudienceManagerURLData(),
                                    r = i.url;
                                return f._customerIDsHashChanged && f._setFieldExpire(T, -1), f._getRemoteField(T, r, e, t, i)
                            }
                        }
                        return ""
                    }, f._supplementalDataIDCurrent = "", f._supplementalDataIDCurrentConsumed = {}, f._supplementalDataIDLast = "", f._supplementalDataIDLastConsumed = {}, f.getSupplementalDataID = function(e, t) {
                        f._supplementalDataIDCurrent || t || (f._supplementalDataIDCurrent = f._generateID(1));
                        var n = f._supplementalDataIDCurrent;
                        return f._supplementalDataIDLast && !f._supplementalDataIDLastConsumed[e] ? (n = f._supplementalDataIDLast, f._supplementalDataIDLastConsumed[e] = !0) : n && (f._supplementalDataIDCurrentConsumed[e] && (f._supplementalDataIDLast = f._supplementalDataIDCurrent, f._supplementalDataIDLastConsumed = f._supplementalDataIDCurrentConsumed, f._supplementalDataIDCurrent = n = t ? "" : f._generateID(1), f._supplementalDataIDCurrentConsumed = {}), n && (f._supplementalDataIDCurrentConsumed[e] = !0)), n
                    }, _.OptOut = {
                        GLOBAL: "global"
                    }, f.getOptOut = function(e, t) {
                        if (f.isAllowed()) {
                            var n = f._getAudienceManagerURLData("_setMarketingCloudFields"),
                                i = n.url;
                            return f._getRemoteField(M, i, e, t, n)
                        }
                        return ""
                    }, f.isOptedOut = function(e, t, n) {
                        if (f.isAllowed()) {
                            t || (t = _.OptOut.GLOBAL);
                            var i = f.getOptOut(function(n) {
                                var i = n === _.OptOut.GLOBAL || n.indexOf(t) >= 0;
                                f._callCallback(e, [i])
                            }, n);
                            return i ? i === _.OptOut.GLOBAL || i.indexOf(t) >= 0 : null
                        }
                        return !1
                    }, f.appendVisitorIDsTo = function(e) {
                        var t = p.ADOBE_MC,
                            n = [
                                [I, f._getField(I)],
                                [E, f._getField(E)],
                                [S, f.marketingCloudOrgID]
                            ],
                            i = o(n);
                        try {
                            return f._addQuerystringParam(e, t, i)
                        } catch (t) {
                            return e
                        }
                    }, f.appendSupplementalDataIDTo = function(e, t) {
                        if (!(t = t || f.getSupplementalDataID(P.generateRandomString(), !0))) return e;
                        var n = p.ADOBE_MC_SDID,
                            i = "SDID=" + encodeURIComponent(t) + "|";
                        i += S + "=" + encodeURIComponent(f.marketingCloudOrgID);
                        try {
                            return f._addQuerystringParam(e, n, i)
                        } catch (t) {
                            return e
                        }
                    }, f._xd = {
                        postMessage: function(e, t, n) {
                            var i = 1;
                            t && (p.POST_MESSAGE_ENABLED ? n.postMessage(e, t.replace(/([^:]+:\/\/[^\/]+).*/, "$1")) : t && (n.location = t.replace(/#.*$/, "") + "#" + +new Date + i++ + "&" + e))
                        },
                        receiveMessage: function(e, t) {
                            var n;
                            try {
                                p.POST_MESSAGE_ENABLED && (e && (n = function(n) {
                                    return "string" == typeof t && n.origin !== t || "[object Function]" === Object.prototype.toString.call(t) && !1 === t(n.origin) ? !1 : void e(n)
                                }), g.addEventListener ? g[e ? "addEventListener" : "removeEventListener"]("message", n, !1) : g[e ? "attachEvent" : "detachEvent"]("\xe5", n))
                            } catch (e) {}
                        }
                    };
                    var P = {
                        addListener: function() {
                            return m.addEventListener ? function(e, t, n) {
                                e.addEventListener(t, function(e) {
                                    "function" == typeof n && n(e)
                                }, !1)
                            } : m.attachEvent ? function(e, t, n) {
                                e.attachEvent("on" + t, function(e) {
                                    "function" == typeof n && n(e)
                                })
                            } : void 0
                        }(),
                        map: function(e, t) {
                            if (Array.prototype.map) return e.map(t);
                            if (void 0 === e || null == e) throw new TypeError;
                            var n = Object(e),
                                i = n.length >>> 0;
                            if ("function" != typeof t) throw new TypeError;
                            for (var r = new Array(i), a = arguments[1], s = 0; i > s; s++) s in n && (r[s] = t.call(a, n[s], s, n));
                            return r
                        },
                        encodeAndBuildRequest: function(e, t) {
                            return this.map(e, function(e) {
                                return encodeURIComponent(e)
                            }).join(t)
                        },
                        parseHash: function(e) {
                            var t = e.indexOf("#");
                            return t > 0 ? e.substr(t) : ""
                        },
                        hashlessUrl: function(e) {
                            var t = e.indexOf("#");
                            return t > 0 ? e.substr(0, t) : e
                        },
                        addQueryParamAtLocation: function(e, t, n) {
                            var i = e.split("&");
                            return n = null != n ? n : i.length, i.splice(n, 0, t), i.join("&")
                        },
                        isFirstPartyAnalyticsVisitorIDCall: function(e, t, n) {
                            if (e !== E) return !1;
                            var i;
                            return t || (t = f.trackingServer), n || (n = f.trackingServerSecure), !("string" != typeof(i = f.loadSSL ? n : t) || !i.length) && i.indexOf("2o7.net") < 0 && i.indexOf("omtrdc.net") < 0
                        },
                        isObject: function(e) {
                            return Boolean(e && e === Object(e))
                        },
                        isLessThan: function(e, t) {
                            return f._compareVersions(e, t) < 0
                        },
                        areVersionsDifferent: function(e, t) {
                            return 0 !== f._compareVersions(e, t)
                        },
                        removeCookie: function(e) {
                            document.cookie = encodeURIComponent(e) + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
                        },
                        isTrackingServerPopulated: function() {
                            return !!f.trackingServer || !!f.trackingServerSecure
                        },
                        parseJSON: function(e, t) {
                            function i(e, n) {
                                var r, a, s = e[n];
                                if (s && "object" == typeof s)
                                    for (r in s) Object.prototype.hasOwnProperty.call(s, r) && (a = i(s, r), void 0 !== a ? s[r] = a : delete s[r]);
                                return t.call(e, n, s)
                            }
                            if ("object" == typeof JSON && "function" == typeof JSON.parse) return JSON.parse(e, t);
                            var n, r = /^[\],:{}\s]*$/,
                                a = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                                s = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                                o = /(?:^|:|,)(?:\s*\[)+/g,
                                l = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
                            if (e = String(e), l.lastIndex = 0, l.test(e) && (e = e.replace(l, function(e) {
                                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                                })), r.test(e.replace(a, "@").replace(s, "]").replace(o, ""))) return n = eval("(" + e + ")"), "function" == typeof t ? i({
                                "": n
                            }, "") : n;
                            throw new SyntaxError("JSON.parse")
                        },
                        getTimestampInSeconds: function() {
                            return Math.round((new Date).getTime() / 1e3)
                        },
                        parsePipeDelimetedKeyValues: function(e) {
                            for (var t = {}, n = e.split("|"), i = 0, r = n.length; r > i; i++) {
                                var a = n[i].split("=");
                                t[a[0]] = decodeURIComponent(a[1])
                            }
                            return t
                        },
                        generateRandomString: function(e) {
                            e = e || 5;
                            for (var t = "", n = "abcdefghijklmnopqrstuvwxyz0123456789"; e--;) t += n[Math.floor(Math.random() * n.length)];
                            return t
                        }
                    };
                    f._helpers = P;
                    var R = {
                        corsMetadata: function() {
                            var e = "none",
                                t = !0;
                            return "undefined" != typeof XMLHttpRequest && XMLHttpRequest === Object(XMLHttpRequest) && ("withCredentials" in new XMLHttpRequest ? e = "XMLHttpRequest" : "undefined" != typeof XDomainRequest && XDomainRequest === Object(XDomainRequest) && (t = !1), Object.prototype.toString.call(g.HTMLElement).indexOf("Constructor") > 0 && (t = !1)), {
                                corsType: e,
                                corsCookiesEnabled: t
                            }
                        }(),
                        getCORSInstance: function() {
                            return "none" === this.corsMetadata.corsType ? null : new g[this.corsMetadata.corsType]
                        },
                        fireCORS: function(e, t, n) {
                            function i(t) {
                                var n;
                                try {
                                    if ((n = JSON.parse(t)) !== Object(n)) return void r.handleCORSError(e, null, "Response is not JSON")
                                } catch (t) {
                                    return void r.handleCORSError(e, t, "Error parsing response as JSON")
                                }
                                try {
                                    for (var i = e.callback, a = g, s = 0; s < i.length; s++) a = a[i[s]];
                                    a(n)
                                } catch (t) {
                                    r.handleCORSError(e, t, "Error forming callback function")
                                }
                            }
                            var r = this;
                            t && (e.loadErrorHandler = t);
                            try {
                                var a = this.getCORSInstance();
                                a.open("get", e.corsUrl + "&ts=" + (new Date).getTime(), !0), "XMLHttpRequest" === this.corsMetadata.corsType && (a.withCredentials = !0, a.timeout = f.loadTimeout, a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), a.onreadystatechange = function() {
                                    4 === this.readyState && 200 === this.status && i(this.responseText)
                                }), a.onerror = function(t) {
                                    r.handleCORSError(e, t, "onerror")
                                }, a.ontimeout = function(t) {
                                    r.handleCORSError(e, t, "ontimeout")
                                }, a.send(), f._log.requests.push(e.corsUrl)
                            } catch (t) {
                                this.handleCORSError(e, t, "try-catch")
                            }
                        },
                        handleCORSError: function(e, t, n) {
                            f.CORSErrors.push({
                                corsData: e,
                                error: t,
                                description: n
                            }), e.loadErrorHandler && ("ontimeout" === n ? e.loadErrorHandler(!0) : e.loadErrorHandler(!1))
                        }
                    };
                    f._requestProcs = R;
                    var w = {
                        THROTTLE_START: 3e4,
                        MAX_SYNCS_LENGTH: 649,
                        throttleTimerSet: !1,
                        id: null,
                        onPagePixels: [],
                        iframeHost: null,
                        getIframeHost: function(e) {
                            if ("string" == typeof e) {
                                var t = e.split("/");
                                return t[0] + "//" + t[2]
                            }
                        },
                        subdomain: null,
                        url: null,
                        getUrl: function() {
                            var e, t = "http://fast.",
                                n = "?d_nsid=" + f.idSyncContainerID + "#" + encodeURIComponent(m.location.href);
                            return this.subdomain || (this.subdomain = "nosubdomainreturned"), f.loadSSL && (t = f.idSyncSSLUseAkamai ? "https://fast." : "https://"), e = t + this.subdomain + ".demdex.net/dest5.html" + n, this.iframeHost = this.getIframeHost(e), this.id = "destination_publishing_iframe_" + this.subdomain + "_" + f.idSyncContainerID, e
                        },
                        checkDPIframeSrc: function() {
                            var e = "?d_nsid=" + f.idSyncContainerID + "#" + encodeURIComponent(m.location.href);
                            "string" == typeof f._dpIframeSrc && f._dpIframeSrc.length && (this.id = "destination_publishing_iframe_" + (new Date).getTime() + "_" + f.idSyncContainerID, this.iframeHost = this.getIframeHost(f._dpIframeSrc), this.url = f._dpIframeSrc + e)
                        },
                        idCallNotProcesssed: null,
                        doAttachIframe: !1,
                        startedAttachingIframe: !1,
                        iframeHasLoaded: null,
                        iframeIdChanged: null,
                        newIframeCreated: null,
                        originalIframeHasLoadedAlready: null,
                        sendingMessages: !1,
                        messages: [],
                        messagesPosted: [],
                        messagesReceived: [],
                        messageSendingInterval: p.POST_MESSAGE_ENABLED ? 15 : 100,
                        jsonWaiting: [],
                        jsonProcessed: [],
                        canSetThirdPartyCookies: !0,
                        receivedThirdPartyCookiesNotification: !1,
                        readyToAttachIframe: function() {
                            return !f.idSyncDisable3rdPartySyncing && (this.doAttachIframe || f._doAttachIframe) && this.subdomain && "nosubdomainreturned" !== this.subdomain && this.url && !this.startedAttachingIframe
                        },
                        attachIframe: function() {
                            function e() {
                                i = document.createElement("iframe"), i.sandbox = "allow-scripts allow-same-origin", i.title = "Adobe ID Syncing iFrame", i.id = n.id, i.style.cssText = "display: none; width: 0; height: 0;", i.src = n.url, n.newIframeCreated = !0, t(), document.body.appendChild(i)
                            }
                            function t() {
                                P.addListener(i, "load", function() {
                                    i.className = "aamIframeLoaded", n.iframeHasLoaded = !0, n.requestToProcess()
                                })
                            }
                            this.startedAttachingIframe = !0;
                            var n = this,
                                i = document.getElementById(this.id);
                            i ? "IFRAME" !== i.nodeName ? (this.id += "_2", this.iframeIdChanged = !0, e()) : (this.newIframeCreated = !1, "aamIframeLoaded" !== i.className ? (this.originalIframeHasLoadedAlready = !1, t()) : (this.originalIframeHasLoadedAlready = !0, this.iframeHasLoaded = !0, this.iframe = i, this.requestToProcess())) : e(), this.iframe = i
                        },
                        requestToProcess: function(e) {
                            var t = this;
                            e === Object(e) && (this.jsonWaiting.push(e), this.processSyncOnPage(e)), (this.receivedThirdPartyCookiesNotification || !p.POST_MESSAGE_ENABLED || this.iframeHasLoaded) && this.jsonWaiting.length && (this.process(this.jsonWaiting.shift()), this.requestToProcess()), !f.idSyncDisableSyncs && this.iframeHasLoaded && this.messages.length && !this.sendingMessages && (this.throttleTimerSet || (this.throttleTimerSet = !0, setTimeout(function() {
                                t.messageSendingInterval = p.POST_MESSAGE_ENABLED ? 15 : 150
                            }, this.THROTTLE_START)), this.sendingMessages = !0, this.sendMessages())
                        },
                        processSyncOnPage: function(e) {
                            var t, n, i, r;
                            if ((t = e.ibs) && t instanceof Array && (n = t.length))
                                for (i = 0; n > i; i++) r = t[i], r.syncOnPage && this.checkFirstPartyCookie(r, "", "syncOnPage")
                        },
                        process: function(e) {
                            var t, n, i, r, a, s = encodeURIComponent;
                            if ((t = e.ibs) && t instanceof Array && (n = t.length))
                                for (i = 0; n > i; i++) r = t[i], a = [s("ibs"), s(r.id || ""), s(r.tag || ""), P.encodeAndBuildRequest(r.url || [], ","), s(r.ttl || ""), "", "", r.fireURLSync ? "true" : "false"], r.syncOnPage || (this.canSetThirdPartyCookies ? this.addMessage(a.join("|")) : r.fireURLSync && this.checkFirstPartyCookie(r, a.join("|")));
                            this.jsonProcessed.push(e)
                        },
                        checkFirstPartyCookie: function(e, t, n) {
                            var i = "syncOnPage" === n,
                                r = i ? A : v;
                            f._readVisitor();
                            var a, s, o = f._getField(r),
                                c = !1,
                                l = !1,
                                u = Math.ceil((new Date).getTime() / p.MILLIS_PER_DAY);
                            o ? (a = o.split("*"), s = this.pruneSyncData(a, e.id, u), c = s.dataPresent, l = s.dataValid, c && l || this.fireSync(i, e, t, a, r, u)) : (a = [], this.fireSync(i, e, t, a, r, u))
                        },
                        pruneSyncData: function(e, t, n) {
                            var i, r, a, s = !1,
                                o = !1;
                            for (r = 0; r < e.length; r++) i = e[r], a = parseInt(i.split("-")[1], 10), i.match("^" + t + "-") ? (s = !0, a > n ? o = !0 : (e.splice(r, 1), r--)) : n >= a && (e.splice(r, 1), r--);
                            return {
                                dataPresent: s,
                                dataValid: o
                            }
                        },
                        manageSyncsSize: function(e) {
                            if (e.join("*").length > this.MAX_SYNCS_LENGTH)
                                for (e.sort(function(e, t) {
                                        return parseInt(e.split("-")[1], 10) - parseInt(t.split("-")[1], 10)
                                    }); e.join("*").length > this.MAX_SYNCS_LENGTH;) e.shift()
                        },
                        fireSync: function(e, t, n, i, r, a) {
                            var s = this;
                            if (e) {
                                if ("img" === t.tag) {
                                    var o, c, l, u, d = t.url,
                                        h = f.loadSSL ? "https:" : "http:";
                                    for (o = 0, c = d.length; c > o; o++) {
                                        l = d[o], u = /^\/\//.test(l);
                                        var g = new Image;
                                        P.addListener(g, "load", function(e, t, n, i) {
                                            return function() {
                                                s.onPagePixels[e] = null, f._readVisitor();
                                                var a, o = f._getField(r),
                                                    c = [];
                                                if (o) {
                                                    a = o.split("*");
                                                    var l, u, d;
                                                    for (l = 0, u = a.length; u > l; l++) d = a[l], d.match("^" + t.id + "-") || c.push(d)
                                                }
                                                s.setSyncTrackingData(c, t, n, i)
                                            }
                                        }(this.onPagePixels.length, t, r, a)), g.src = (u ? h : "") + l, this.onPagePixels.push(g)
                                    }
                                }
                            } else this.addMessage(n), this.setSyncTrackingData(i, t, r, a)
                        },
                        addMessage: function(e) {
                            var t = encodeURIComponent,
                                n = t(f._enableErrorReporting ? "---destpub-debug---" : "---destpub---");
                            this.messages.push(n + e)
                        },
                        setSyncTrackingData: function(e, t, n, i) {
                            e.push(t.id + "-" + (i + Math.ceil(t.ttl / 60 / 24))), this.manageSyncsSize(e), f._setField(n, e.join("*"))
                        },
                        sendMessages: function() {
                            var e, t = this;
                            this.messages.length ? (e = this.messages.shift(), f._xd.postMessage(e, this.url, this.iframe.contentWindow), this.messagesPosted.push(e), setTimeout(function() {
                                t.sendMessages()
                            }, this.messageSendingInterval)) : this.sendingMessages = !1
                        },
                        receiveMessage: function(e) {
                            var t, n = /^---destpub-to-parent---/;
                            "string" == typeof e && n.test(e) && (t = e.replace(n, "").split("|"), "canSetThirdPartyCookies" === t[0] && (this.canSetThirdPartyCookies = "true" === t[1], this.receivedThirdPartyCookiesNotification = !0, this.requestToProcess()), this.messagesReceived.push(e))
                        },
                        processIDCallData: function(e) {
                            (null == this.url || e.subdomain && "nosubdomainreturned" === this.subdomain) && ("string" == typeof f._subdomain && f._subdomain.length ? this.subdomain = f._subdomain : this.subdomain = e.subdomain || "", this.url = this.getUrl()), e.ibs instanceof Array && e.ibs.length && (this.doAttachIframe = !0), this.readyToAttachIframe() && (f.idSyncAttachIframeOnWindowLoad ? (_.windowLoaded || "complete" === m.readyState || "loaded" === m.readyState) && this.attachIframe() : this.attachIframeASAP()), "function" == typeof f.idSyncIDCallResult ? f.idSyncIDCallResult(e) : this.requestToProcess(e), "function" == typeof f.idSyncAfterIDCallResult && f.idSyncAfterIDCallResult(e)
                        },
                        canMakeSyncIDCall: function(e, t) {
                            return f._forceSyncIDCall || !e || t - e > p.DAYS_BETWEEN_SYNC_ID_CALLS
                        },
                        attachIframeASAP: function() {
                            function e() {
                                t.startedAttachingIframe || (document.body ? t.attachIframe() : setTimeout(e, 30))
                            }
                            var t = this;
                            e()
                        }
                    };
                    f._destinationPublishing = w, f.timeoutMetricsLog = [];
                    var F, V = {
                        isClientSideMarketingCloudVisitorID: null,
                        MCIDCallTimedOut: null,
                        AnalyticsIDCallTimedOut: null,
                        AAMIDCallTimedOut: null,
                        fieldGroupObj: {},
                        setState: function(e, t) {
                            switch (e) {
                                case D:
                                    !1 === t ? !0 !== this.MCIDCallTimedOut && (this.MCIDCallTimedOut = !1) : this.MCIDCallTimedOut = t;
                                    break;
                                case b:
                                    !1 === t ? !0 !== this.AnalyticsIDCallTimedOut && (this.AnalyticsIDCallTimedOut = !1) : this.AnalyticsIDCallTimedOut = t;
                                    break;
                                case O:
                                    !1 === t ? !0 !== this.AAMIDCallTimedOut && (this.AAMIDCallTimedOut = !1) : this.AAMIDCallTimedOut = t
                            }
                        }
                    };
                    f.isClientSideMarketingCloudVisitorID = function() {
                            return V.isClientSideMarketingCloudVisitorID
                        }, f.MCIDCallTimedOut = function() {
                            return V.MCIDCallTimedOut
                        }, f.AnalyticsIDCallTimedOut = function() {
                            return V.AnalyticsIDCallTimedOut
                        }, f.AAMIDCallTimedOut = function() {
                            return V.AAMIDCallTimedOut
                        }, f.idSyncGetOnPageSyncInfo = function() {
                            return f._readVisitor(), f._getField(A)
                        }, f.idSyncByURL = function(e) {
                            var t = l(e || {});
                            if (t.error) return t.error;
                            var n, i, r = e.url,
                                a = encodeURIComponent,
                                s = w;
                            return r = r.replace(/^https:/, "").replace(/^http:/, ""), n = P.encodeAndBuildRequest(["", e.dpid, e.dpuuid || ""], ","), i = ["ibs", a(e.dpid), "img", a(r), t.ttl, "", n], s.addMessage(i.join("|")), s.requestToProcess(), "Successfully queued"
                        }, f.idSyncByDataSource = function(e) {
                            return e === Object(e) && "string" == typeof e.dpuuid && e.dpuuid.length ? (e.url = "//dpm.demdex.net/ibs:dpid=" + e.dpid + "&dpuuid=" + e.dpuuid, f.idSyncByURL(e)) : "Error: config or config.dpuuid is empty"
                        }, f._compareVersions = function(e, t) {
                            if (e === t) return 0;
                            var n = e.toString().split("."),
                                i = t.toString().split(".");
                            return u(n.concat(i)) ? (c(n, i), d(n, i)) : NaN
                        }, f._getCookieVersion = function(e) {
                            e = e || f.cookieRead(f.cookieName);
                            var t = p.VERSION_REGEX.exec(e);
                            return t && t.length > 1 ? t[1] : null
                        }, f._resetAmcvCookie = function(e) {
                            var t = f._getCookieVersion();
                            t && !P.isLessThan(t, e) || P.removeCookie(f.cookieName)
                        }, e.indexOf("@") < 0 && (e += "@AdobeOrg"), f.marketingCloudOrgID = e, f.cookieName = "AMCV_" + e, f.sessionCookieName = "AMCVS_" + e, f.cookieDomain = f._getDomain(), f.cookieDomain === g.location.hostname && (f.cookieDomain = ""), f.loadSSL = g.location.protocol.toLowerCase().indexOf("https") >= 0,
                        f.loadTimeout = 3e4, f.CORSErrors = [], f.marketingCloudServer = f.audienceManagerServer = "dpm.demdex.net";
                    var N = {};
                    if (N[k] = !0, N[T] = !0, t && "object" == typeof t) {
                        var x;
                        for (x in t) h(x) && (f[x] = t[x]);
                        f.idSyncContainerID = f.idSyncContainerID || 0, f.resetBeforeVersion && f._resetAmcvCookie(f.resetBeforeVersion), f._attemptToPopulateIdsFromUrl(), f._attemptToPopulateSdidFromUrl(), f._readVisitor();
                        var U = f._getField(y),
                            j = Math.ceil((new Date).getTime() / p.MILLIS_PER_DAY);
                        !f.idSyncDisableSyncs && w.canMakeSyncIDCall(U, j) && (f._setFieldExpire(T, -1), f._setField(y, j)), f.getMarketingCloudVisitorID(), f.getAudienceManagerLocationHint(), f.getAudienceManagerBlob(), f._mergeServerState(f.serverState)
                    } else f._attemptToPopulateIdsFromUrl(), f._attemptToPopulateSdidFromUrl();
                    if (!f.idSyncDisableSyncs) {
                        w.checkDPIframeSrc();
                        var H = function() {
                            var e = w;
                            e.readyToAttachIframe() && e.attachIframe()
                        };
                        P.addListener(g, "load", function() {
                            _.windowLoaded = !0, H()
                        });
                        try {
                            f._xd.receiveMessage(function(e) {
                                w.receiveMessage(e.data)
                            }, w.iframeHost)
                        } catch (e) {}
                    }
                    f.whitelistIframeDomains && p.POST_MESSAGE_ENABLED && (f.whitelistIframeDomains = f.whitelistIframeDomains instanceof Array ? f.whitelistIframeDomains : [f.whitelistIframeDomains], f.whitelistIframeDomains.forEach(function(t) {
                        var n = new a(e, t),
                            i = s(f, n);
                        f._xd.receiveMessage(i, t)
                    }))
                };
            o.getInstance = function(e, t) {
                if (!e) throw new Error("Visitor requires Adobe Marketing Cloud Org ID");
                e.indexOf("@") < 0 && (e += "@AdobeOrg");
                var n = function() {
                    var t = i.s_c_il;
                    if (t)
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            if (r && "Visitor" === r._c && r.marketingCloudOrgID === e) return r
                        }
                }();
                if (n) return n;
                var a = new o(e),
                    s = a.isAllowed();
                return function() {
                        i.s_c_il.splice(--i.s_c_in, 1)
                    }(),
                    function() {
                        try {
                            return i.self !== i.parent
                        } catch (e) {
                            return !0
                        }
                    }() && !s && i.parent ? new r(e, t, a, i.parent) : new o(e, t)
            }, n(), i.Visitor = o, t.exports = o
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "./ChildVisitor": 1,
        "./Message": 2,
        "./utils/makeChildMessageListener": 9
    }],
    4: [function(e, t, n) {
        n.MESSAGES = {
            HANDSHAKE: "HANDSHAKE",
            GETSTATE: "GETSTATE",
            PARENTSTATE: "PARENTSTATE"
        }, n.STATE_KEYS_MAP = {
            MCMID: "MCMID",
            MCAID: "MCAID",
            MCAAMB: "MCAAMB",
            MCAAMLH: "MCAAMLH",
            MCOPTOUT: "MCOPTOUT",
            CUSTOMERIDS: "CUSTOMERIDS"
        }, n.ASYNC_API_MAP = {
            MCMID: "getMarketingCloudVisitorID",
            MCAID: "getAnalyticsVisitorID",
            MCAAMB: "getAudienceManagerBlob",
            MCAAMLH: "getAudienceManagerLocationHint",
            MCOPTOUT: "getOptOut"
        }, n.SYNC_API_MAP = {
            CUSTOMERIDS: "getCustomerIDs"
        }, n.ALL_APIS = {
            MCMID: "getMarketingCloudVisitorID",
            MCAAMB: "getAudienceManagerBlob",
            MCAAMLH: "getAudienceManagerLocationHint",
            MCOPTOUT: "getOptOut",
            MCAID: "getAnalyticsVisitorID",
            CUSTOMERIDS: "getCustomerIDs"
        }, n.FIELDGROUP_TO_FIELD = {
            MC: "MCMID",
            A: "MCAID",
            AAM: "MCAAMB"
        }
    }, {}],
    5: [function(e, t, n) {
        var i = e("../enums"),
            r = i.STATE_KEYS_MAP;
        t.exports = function(e) {
            function t() {}
            function n(t, n) {
                var i = this;
                return function() {
                    var t = e(0, r.MCMID),
                        a = {};
                    return a[r.MCMID] = t, i.setStateAndPublish(a), n(t), t
                }
            }
            this.getMarketingCloudVisitorID = function(e) {
                e = e || t;
                var i = this.findField(r.MCMID, e),
                    a = n.call(this, r.MCMID, e);
                return void 0 !== i ? i : a()
            }
        }
    }, {
        "../enums": 4
    }],
    6: [function(e, t, n) {
        var i = e("../enums"),
            r = i.ASYNC_API_MAP;
        t.exports = function() {
            Object.keys(r).forEach(function(e) {
                this[r[e]] = function(t) {
                    this.callbackRegistry.add(e, t)
                }
            }, this)
        }
    }, {
        "../enums": 4
    }],
    7: [function(e, t, n) {
        var i = e("../enums"),
            r = i.MESSAGES,
            a = i.ASYNC_API_MAP,
            s = i.SYNC_API_MAP;
        t.exports = function() {
            function e() {}
            function t(e, t) {
                var n = this;
                return function() {
                    return n.callbackRegistry.add(e, t), n.messageParent(r.GETSTATE), ""
                }
            }
            function n(n) {
                this[a[n]] = function(i) {
                    i = i || e;
                    var r = this.findField(n, i),
                        a = t.call(this, n, i);
                    return void 0 !== r ? r : a()
                }
            }
            function i(t) {
                this[s[t]] = function() {
                    return this.findField(t, e) || {}
                }
            }
            Object.keys(a).forEach(n, this), Object.keys(s).forEach(i, this)
        }
    }, {
        "../enums": 4
    }],
    8: [function(e, t, n) {
        function i() {
            return {
                callbacks: {},
                add: function(e, t) {
                    this.callbacks[e] = this.callbacks[e] || [];
                    var n = this.callbacks[e].push(t) - 1;
                    return function() {
                        this.callbacks[e].splice(n, 1)
                    }
                },
                execute: function(e, t) {
                    if (this.callbacks[e]) {
                        t = void 0 === t ? [] : t, t = t instanceof Array ? t : [t];
                        try {
                            for (; this.callbacks[e].length;) {
                                var n = this.callbacks[e].shift();
                                "function" == typeof n ? n.apply(null, t) : n instanceof Array && n[1].apply(n[0], t)
                            }
                            delete this.callbacks[e]
                        } catch (e) {}
                    }
                },
                executeAll: function(e, t) {
                    (t || e && !r.isObjectEmpty(e)) && Object.keys(this.callbacks).forEach(function(t) {
                        var n = void 0 !== e[t] ? e[t] : "";
                        this.execute(t, n)
                    }, this)
                },
                hasCallbacks: function() {
                    return Boolean(Object.keys(this.callbacks).length)
                }
            }
        }
        var r = e("./utils");
        t.exports = i
    }, {
        "./utils": 11
    }],
    9: [function(e, t, n) {
        var i = e("../enums"),
            r = e("./utils"),
            a = i.MESSAGES,
            s = i.ALL_APIS,
            o = i.ASYNC_API_MAP,
            c = i.FIELDGROUP_TO_FIELD;
        t.exports = function(e, t) {
            function n() {
                var t = {};
                return Object.keys(s).forEach(function(n) {
                    var i = s[n],
                        a = e[i]();
                    r.isValueEmpty(a) || (t[n] = a)
                }), t
            }
            function i() {
                var t = [];
                return e._loading && Object.keys(e._loading).forEach(function(n) {
                    if (e._loading[n]) {
                        var i = c[n];
                        t.push(i)
                    }
                }), t.length ? t : null
            }
            function l(t) {
                return function n(r) {
                    var a = i();
                    if (a) {
                        var s = o[a[0]];
                        e[s](n, !0)
                    } else t()
                }
            }
            function u(e, i) {
                var r = n();
                t.send(e, i, r)
            }
            function f(e) {
                h(e), u(e, a.HANDSHAKE)
            }
            function d(e) {
                l(function() {
                    u(e, a.PARENTSTATE)
                })()
            }
            function h(n) {
                function i(i) {
                    r.call(e, i), t.send(n, a.PARENTSTATE, {
                        CUSTOMERIDS: e.getCustomerIDs()
                    })
                }
                var r = e.setCustomerIDs;
                e.setCustomerIDs = i
            }
            return function(e) {
                t.isInvalid(e) || (t.parse(e).prefix === a.HANDSHAKE ? f : d)(e.source)
            }
        }
    }, {
        "../enums": 4,
        "./utils": 11
    }],
    10: [function(e, t, n) {
        Object.keys = Object.keys || function(e) {
            var t = [];
            for (var n in e) t.hasOwnProperty.call(e, n) && t.push(n);
            return t
        }, Array.prototype.forEach = Array.prototype.forEach || function(e, t) {
            for (var n = this, i = 0, r = n.length; r > i; i++) e.call(t, n[i], i, n)
        }, Object.assign = Object.assign || function(e, t) {
            t = t || {};
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
        }
    }, {}],
    11: [function(e, t, n) {
        n.isObjectEmpty = function(e) {
            return e === Object(e) && 0 === Object.keys(e).length
        }, n.isValueEmpty = function(e) {
            return "" === e || n.isObjectEmpty(e)
        }
    }, {}]
}, {}, [1, 2, 3, 4]),
// All code and conventions are protected by copyright
function(e, t, n) {
    function i() {
        I.addEventHandler(e, "orientationchange", i.orientationChange)
    }
    function r(t) {
        t = t || I.rules, this.rules = I.filter(t, function(e) {
            return "inview" === e.event
        }), this.elements = [], this.eventHandler = I.bind(this.track, this), I.addEventHandler(e, "scroll", this.eventHandler), I.addEventHandler(e, "load", this.eventHandler)
    }
    function a() {
        this.rules = I.filter(I.rules, function(e) {
            return "videoplayed" === e.event.substring(0, 11)
        }), this.eventHandler = I.bind(this.onUpdateTime, this)
    }
    function s() {
        I.getToolsByType("nielsen").length > 0 && I.domReady(I.bind(this.initialize, this))
    }
    function o(e) {
        this.delay = 250, this.FB = e, I.domReady(I.bind(function() {
            I.poll(I.bind(this.initialize, this), this.delay, 8)
        }, this))
    }
    function c() {
        this.defineEvents(), this.visibilityApiHasPriority = !0, t.addEventListener ? this.setVisibilityApiPriority(!1) : this.attachDetachOlderEventListeners(!0, t, "focusout");
        I.bindEvent("aftertoolinit", function() {
            I.fireEvent(I.visibility.isHidden() ? "tabblur" : "tabfocus")
        })
    }
    function l() {
        this.lastURL = I.URL(), this._fireIfURIChanged = I.bind(this.fireIfURIChanged, this), this._onPopState = I.bind(this.onPopState, this), this._onHashChange = I.bind(this.onHashChange, this), this._pushState = I.bind(this.pushState, this), this._replaceState = I.bind(this.replaceState, this), this.initialize()
    }
    function u() {
        var e = I.filter(I.rules, function(e) {
            return 0 === e.event.indexOf("dataelementchange")
        });
        this.dataElementsNames = I.map(e, function(e) {
            var t = e.event.match(/dataelementchange\((.*)\)/i);
            return t[1]
        }, this), this.initPolling()
    }
    function f() {
        this.rules = I.filter(I.rules, function(e) {
            return "elementexists" === e.event
        })
    }
    function d() {
        var e = this.eventRegex = /^hover\(([0-9]+)\)$/,
            t = this.rules = [];
        I.each(I.rules, function(n) {
            var i = n.event.match(e);
            i && t.push([Number(n.event.match(e)[1]), n.selector])
        })
    }
    function h(t) {
        I.domReady(I.bind(function() {
            this.twttr = t || e.twttr, this.initialize()
        }, this))
    }
    function g(e) {
        I.BaseTool.call(this, e), this.styleElements = {}, this.targetPageParamsStore = {}
    }
    function p(e) {
        I.BaseTool.call(this, e), this.defineListeners(), this.beaconMethod = "plainBeacon", this.adapt = new p.DataAdapters, this.dataProvider = new p.DataProvider.Aggregate
    }
    function m(e) {
        I.BaseTool.call(this, e), this.varBindings = {}, this.events = [], this.products = [], this.customSetupFuns = []
    }
    function v() {
        I.BaseTool.call(this), this.asyncScriptCallbackQueue = [], this.argsForBlockingScripts = []
    }
    function y(e) {
        I.BaseTool.call(this, e), this.name = e.name || "Basic"
    }
    function b(e) {
        I.BaseTool.call(this, e), this.name = e.name || "VisitorID", this.initialize()
    }
    function S(e) {
        I.BaseTool.call(this, e)
    }
    function _(e) {
        I.BaseTool.call(this, e)
    }
    var E = Object.prototype.toString,
        C = e._satellite && e._satellite.override,
        I = {
            initialized: !1,
            $data: function(e, t, i) {
                if (e) {
                    var r = "__satellite__",
                        a = I.dataCache,
                        s = e[r];
                    s || (s = e[r] = I.uuid++);
                    var o = a[s];
                    return o || (o = a[s] = {}), i === n ? o[t] : void(o[t] = i)
                }
            },
            uuid: 1,
            dataCache: {},
            keys: function(e) {
                var t = [];
                for (var n in e) e.hasOwnProperty(n) && t.push(n);
                return t
            },
            values: function(e) {
                var t = [];
                for (var n in e) e.hasOwnProperty(n) && t.push(e[n]);
                return t
            },
            isArray: Array.isArray || function(e) {
                return "[object Array]" === E.apply(e)
            },
            isObject: function(e) {
                return null != e && !I.isArray(e) && "object" == typeof e
            },
            isString: function(e) {
                return "string" == typeof e
            },
            isNumber: function(e) {
                return "[object Number]" === E.apply(e) && !I.isNaN(e)
            },
            isNaN: function(e) {
                return e !== e
            },
            isRegex: function(e) {
                return e instanceof RegExp
            },
            isLinkTag: function(e) {
                return !(!e || !e.nodeName || "a" !== e.nodeName.toLowerCase())
            },
            each: function(e, t, n) {
                for (var i = 0, r = e.length; r > i; i++) t.call(n, e[i], i, e)
            },
            map: function(e, t, n) {
                for (var i = [], r = 0, a = e.length; a > r; r++) i.push(t.call(n, e[r], r, e));
                return i
            },
            filter: function(e, t, n) {
                for (var i = [], r = 0, a = e.length; a > r; r++) {
                    var s = e[r];
                    t.call(n, s, r, e) && i.push(s)
                }
                return i
            },
            any: function(e, t, n) {
                for (var i = 0, r = e.length; r > i; i++) {
                    var a = e[i];
                    if (t.call(n, a, i, e)) return !0
                }
                return !1
            },
            every: function(e, t, n) {
                for (var i = !0, r = 0, a = e.length; a > r; r++) {
                    var s = e[r];
                    i = i && t.call(n, s, r, e)
                }
                return i
            },
            contains: function(e, t) {
                return -1 !== I.indexOf(e, t)
            },
            indexOf: function(e, t) {
                if (e.indexOf) return e.indexOf(t);
                for (var n = e.length; n--;)
                    if (t === e[n]) return n;
                return -1
            },
            find: function(e, t, n) {
                if (!e) return null;
                for (var i = 0, r = e.length; r > i; i++) {
                    var a = e[i];
                    if (t.call(n, a, i, e)) return a
                }
                return null
            },
            textMatch: function(e, t) {
                if (null == t) throw new Error("Illegal Argument: Pattern is not present");
                return null == e ? !1 : "string" == typeof t ? e === t : t instanceof RegExp ? t.test(e) : !1
            },
            stringify: function(e, t) {
                if (t = t || [], I.isObject(e)) {
                    if (I.contains(t, e)) return "<Cycle>";
                    t.push(e)
                }
                if (I.isArray(e)) return "[" + I.map(e, function(e) {
                    return I.stringify(e, t)
                }).join(",") + "]";
                if (I.isString(e)) return '"' + String(e) + '"';
                if (I.isObject(e)) {
                    var n = [];
                    for (var i in e) e.hasOwnProperty(i) && n.push(i + ": " + I.stringify(e[i], t));
                    return "{" + n.join(", ") + "}"
                }
                return String(e)
            },
            trim: function(e) {
                return null == e ? null : e.trim ? e.trim() : e.replace(/^ */, "").replace(/ *$/, "")
            },
            bind: function(e, t) {
                return function() {
                    return e.apply(t, arguments)
                }
            },
            throttle: function(e, t) {
                var n = null;
                return function() {
                    var i = this,
                        r = arguments;
                    clearTimeout(n), n = setTimeout(function() {
                        e.apply(i, r)
                    }, t)
                }
            },
            domReady: function(e) {
                function n(e) {
                    for (d = 1; e = r.shift();) e()
                }
                var i, r = [],
                    a = !1,
                    s = t,
                    o = s.documentElement,
                    c = o.doScroll,
                    l = "DOMContentLoaded",
                    u = "addEventListener",
                    f = "onreadystatechange",
                    d = /^loade|^c/.test(s.readyState);
                return s[u] && s[u](l, i = function() {
                    s.removeEventListener(l, i, a), n()
                }, a), c && s.attachEvent(f, i = function() {
                    /^c/.test(s.readyState) && (s.detachEvent(f, i), n())
                }), e = c ? function(t) {
                    self != top ? d ? t() : r.push(t) : function() {
                        try {
                            o.doScroll("left")
                        } catch (n) {
                            return setTimeout(function() {
                                e(t)
                            }, 50)
                        }
                        t()
                    }()
                } : function(e) {
                    d ? e() : r.push(e)
                }
            }(),
            loadScript: function(e, n) {
                var i = t.createElement("script");
                I.scriptOnLoad(e, i, n), i.src = e, t.getElementsByTagName("head")[0].appendChild(i)
            },
            scriptOnLoad: function(e, t, n) {
                function i(e) {
                    e && I.logError(e), n && n(e)
                }
                "onload" in t ? (t.onload = function() {
                    i()
                }, t.onerror = function() {
                    i(new Error("Failed to load script " + e))
                }) : "readyState" in t && (t.onreadystatechange = function() {
                    var e = t.readyState;
                    ("loaded" === e || "complete" === e) && (t.onreadystatechange = null, i())
                })
            },
            loadScriptOnce: function(e, t) {
                I.loadedScriptRegistry[e] || I.loadScript(e, function(n) {
                    n || (I.loadedScriptRegistry[e] = !0), t && t(n)
                })
            },
            loadedScriptRegistry: {},
            loadScriptSync: function(e) {
                return t.write ? I.domReadyFired ? void I.notify('Cannot load sync the "' + e + '" script after DOM Ready.', 1) : (e.indexOf('"') > -1 && (e = encodeURI(e)), void t.write('<script src="' + e + '"></script>')) : void I.notify('Cannot load sync the "' + e + '" script because "document.write" is not available', 1)
            },
            pushAsyncScript: function(e) {
                I.tools["default"].pushAsyncScript(e)
            },
            pushBlockingScript: function(e) {
                I.tools["default"].pushBlockingScript(e)
            },
            addEventHandler: e.addEventListener ? function(e, t, n) {
                e.addEventListener(t, n, !1)
            } : function(e, t, n) {
                e.attachEvent("on" + t, n)
            },
            removeEventHandler: e.removeEventListener ? function(e, t, n) {
                e.removeEventListener(t, n, !1)
            } : function(e, t, n) {
                e.detachEvent("on" + t, n)
            },
            preventDefault: e.addEventListener ? function(e) {
                e.preventDefault()
            } : function(e) {
                e.returnValue = !1
            },
            stopPropagation: function(e) {
                e.cancelBubble = !0, e.stopPropagation && e.stopPropagation()
            },
            containsElement: function(e, t) {
                return e.contains ? e.contains(t) : !!(16 & e.compareDocumentPosition(t))
            },
            matchesCss: function(n) {
                function i(e, t) {
                    var n = t.tagName;
                    return n ? e.toLowerCase() === n.toLowerCase() : !1
                }
                var r = n.matchesSelector || n.mozMatchesSelector || n.webkitMatchesSelector || n.oMatchesSelector || n.msMatchesSelector;
                return r ? function(n, i) {
                    if (i === t || i === e) return !1;
                    try {
                        return r.call(i, n)
                    } catch (a) {
                        return !1
                    }
                } : n.querySelectorAll ? function(e, t) {
                    var n = t.parentNode;
                    if (!n) return !1;
                    if (e.match(/^[a-z]+$/i)) return i(e, t);
                    try {
                        for (var r = t.parentNode.querySelectorAll(e), a = r.length; a--;)
                            if (r[a] === t) return !0
                    } catch (s) {}
                    return !1
                } : function(e, t) {
                    if (e.match(/^[a-z]+$/i)) return i(e, t);
                    try {
                        return I.Sizzle.matches(e, [t]).length > 0
                    } catch (n) {
                        return !1
                    }
                }
            }(t.documentElement),
            cssQuery: function(e) {
                return e.querySelectorAll ? function(t, n) {
                    var i;
                    try {
                        i = e.querySelectorAll(t)
                    } catch (r) {
                        i = []
                    }
                    n(i)
                } : function(e, t) {
                    if (I.Sizzle) {
                        var n;
                        try {
                            n = I.Sizzle(e)
                        } catch (i) {
                            n = []
                        }
                        t(n)
                    } else I.sizzleQueue.push([e, t])
                }
            }(t),
            hasAttr: function(e, t) {
                return e.hasAttribute ? e.hasAttribute(t) : e[t] !== n
            },
            inherit: function(e, t) {
                var n = function() {};
                n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
            },
            extend: function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            },
            toArray: function() {
                try {
                    var e = Array.prototype.slice;
                    return e.call(t.documentElement.childNodes, 0)[0].nodeType,
                        function(t) {
                            return e.call(t, 0)
                        }
                } catch (n) {
                    return function(e) {
                        for (var t = [], n = 0, i = e.length; i > n; n++) t.push(e[n]);
                        return t
                    }
                }
            }(),
            equalsIgnoreCase: function(e, t) {
                return null == e ? null == t : null == t ? !1 : String(e).toLowerCase() === String(t).toLowerCase()
            },
            poll: function(e, t, n) {
                function i() {
                    I.isNumber(n) && r++ >= n || e() || setTimeout(i, t)
                }
                var r = 0;
                t = t || 1e3, i()
            },
            escapeForHtml: function(e) {
                return e ? String(e).replace(/\&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#x27;").replace(/\//g, "&#x2F;") : e
            }
        };
    I.availableTools = {}, I.availableEventEmitters = [], I.fireOnceEvents = ["condition", "elementexists"], I.initEventEmitters = function() {
        I.eventEmitters = I.map(I.availableEventEmitters, function(e) {
            return new e
        })
    }, I.eventEmitterBackgroundTasks = function() {
        I.each(I.eventEmitters, function(e) {
            "backgroundTasks" in e && e.backgroundTasks()
        })
    }, I.initTools = function(e) {
        var t = {
                "default": new v
            },
            n = I.settings.euCookieName || "sat_track";
        for (var i in e)
            if (e.hasOwnProperty(i)) {
                var r, a, s;
                if (r = e[i], r.euCookie) {
                    var o = "true" !== I.readCookie(n);
                    if (o) continue
                }
                if (a = I.availableTools[r.engine], !a) {
                    var c = [];
                    for (var l in I.availableTools) I.availableTools.hasOwnProperty(l) && c.push(l);
                    throw new Error("No tool engine named " + r.engine + ", available: " + c.join(",") + ".")
                }
                s = new a(r), s.id = i, t[i] = s
            }
        return t
    }, I.preprocessArguments = function(e, t, n, i, r) {
        function a(e) {
            return i && I.isString(e) ? e.toLowerCase() : e
        }
        function s(e) {
            var c = {};
            for (var l in e)
                if (e.hasOwnProperty(l)) {
                    var u = e[l];
                    I.isObject(u) ? c[l] = s(u) : I.isArray(u) ? c[l] = o(u, i) : c[l] = a(I.replace(u, t, n, r))
                }
            return c
        }
        function o(e, i) {
            for (var r = [], o = 0, c = e.length; c > o; o++) {
                var l = e[o];
                I.isString(l) ? l = a(I.replace(l, t, n)) : l && l.constructor === Object && (l = s(l)), r.push(l)
            }
            return r
        }
        return e ? o(e, i) : e
    }, I.execute = function(e, t, n, i) {
        function r(r) {
            var a = i[r || "default"];
            if (a) try {
                a.triggerCommand(e, t, n)
            } catch (s) {
                I.logError(s)
            }
        }
        if (!_satellite.settings.hideActivity)
            if (i = i || I.tools, e.engine) {
                var a = e.engine;
                for (var s in i)
                    if (i.hasOwnProperty(s)) {
                        var o = i[s];
                        o.settings && o.settings.engine === a && r(s)
                    }
            } else e.tool instanceof Array ? I.each(e.tool, function(e) {
                r(e)
            }) : r(e.tool)
    }, I.Logger = {
        outputEnabled: !1,
        messages: [],
        keepLimit: 100,
        flushed: !1,
        LEVELS: [null, null, "log", "info", "warn", "error"],
        message: function(e, t) {
            var n = this.LEVELS[t] || "log";
            this.messages.push([n, e]), this.messages.length > this.keepLimit && this.messages.shift(), this.outputEnabled && this.echo(n, e)
        },
        getHistory: function() {
            return this.messages
        },
        clearHistory: function() {
            this.messages = []
        },
        setOutputState: function(e) {
            this.outputEnabled != e && (this.outputEnabled = e, e ? this.flush() : this.flushed = !1)
        },
        echo: function(t, n) {
            e.console && e.console[t]("SATELLITE: " + n)
        },
        flush: function() {
            this.flushed || (I.each(this.messages, function(e) {
                e[2] !== !0 && (this.echo(e[0], e[1]), e[2] = !0)
            }, this), this.flushed = !0)
        }
    }, I.notify = I.bind(I.Logger.message, I.Logger), I.cleanText = function(e) {
        return null == e ? null : I.trim(e).replace(/\s+/g, " ")
    }, I.cleanText.legacy = function(e) {
        return null == e ? null : I.trim(e).replace(/\s{2,}/g, " ").replace(/[^\000-\177]*/g, "")
    }, I.text = function(e) {
        return e.textContent || e.innerText
    }, I.specialProperties = {
        text: I.text,
        cleanText: function(e) {
            return I.cleanText(I.text(e))
        }
    }, I.getObjectProperty = function(e, t, i) {
        for (var r, a = t.split("."), s = e, o = I.specialProperties, c = 0, l = a.length; l > c; c++) {
            if (null == s) return n;
            var u = a[c];
            if (i && "@" === u.charAt(0)) {
                var f = u.slice(1);
                s = o[f](s)
            } else if (s.getAttribute && (r = u.match(/^getAttribute\((.+)\)$/))) {
                var d = r[1];
                s = s.getAttribute(d)
            } else s = s[u]
        }
        return s
    }, I.getToolsByType = function(e) {
        if (!e) throw new Error("Tool type is missing");
        var t = [];
        for (var n in I.tools)
            if (I.tools.hasOwnProperty(n)) {
                var i = I.tools[n];
                i.settings && i.settings.engine === e && t.push(i)
            }
        return t
    }, I.setVar = function() {
        var e = I.data.customVars;
        if (null == e && (I.data.customVars = {}, e = I.data.customVars), "string" == typeof arguments[0]) {
            var t = arguments[0];
            e[t] = arguments[1]
        } else if (arguments[0]) {
            var n = arguments[0];
            for (var i in n) n.hasOwnProperty(i) && (e[i] = n[i])
        }
    }, I.dataElementSafe = function(e, t) {
        if (arguments.length > 2) {
            var n = arguments[2];
            "pageview" === t ? I.dataElementSafe.pageviewCache[e] = n : "session" === t ? I.setCookie("_sdsat_" + e, n) : "visitor" === t && I.setCookie("_sdsat_" + e, n, 730)
        } else {
            if ("pageview" === t) return I.dataElementSafe.pageviewCache[e];
            if ("session" === t || "visitor" === t) return I.readCookie("_sdsat_" + e)
        }
    }, I.dataElementSafe.pageviewCache = {}, I.realGetDataElement = function(t) {
        var n;
        return t.selector ? I.hasSelector && I.cssQuery(t.selector, function(e) {
            if (e.length > 0) {
                var i = e[0];
                "text" === t.property ? n = i.innerText || i.textContent : t.property in i ? n = i[t.property] : I.hasAttr(i, t.property) && (n = i.getAttribute(t.property))
            }
        }) : t.queryParam ? n = t.ignoreCase ? I.getQueryParamCaseInsensitive(t.queryParam) : I.getQueryParam(t.queryParam) : t.cookie ? n = I.readCookie(t.cookie) : t.jsVariable ? n = I.getObjectProperty(e, t.jsVariable) : t.customJS ? n = t.customJS() : t.contextHub && (n = t.contextHub()), I.isString(n) && t.cleanText && (n = I.cleanText(n)), n
    }, I.getDataElement = function(e, t, i) {
        if (i = i || I.dataElements[e], null == i) return I.settings.undefinedVarsReturnEmpty ? "" : null;
        var r = I.realGetDataElement(i);
        return r === n && i.storeLength ? r = I.dataElementSafe(e, i.storeLength) : r !== n && i.storeLength && I.dataElementSafe(e, i.storeLength, r), r || t || (r = i["default"] || ""), I.isString(r) && i.forceLowerCase && (r = r.toLowerCase()), r
    }, I.getVar = function(i, r, a) {
        var s, o, c = I.data.customVars,
            l = a ? a.target || a.srcElement : null,
            u = {
                uri: I.URI(),
                protocol: t.location.protocol,
                hostname: t.location.hostname
            };
        if (I.dataElements && i in I.dataElements) return I.getDataElement(i);
        if (o = u[i.toLowerCase()], o === n)
            if ("this." === i.substring(0, 5)) i = i.slice(5), o = I.getObjectProperty(r, i, !0);
            else if ("event." === i.substring(0, 6)) i = i.slice(6), o = I.getObjectProperty(a, i);
        else if ("target." === i.substring(0, 7)) i = i.slice(7), o = I.getObjectProperty(l, i);
        else if ("window." === i.substring(0, 7)) i = i.slice(7), o = I.getObjectProperty(e, i);
        else if ("param." === i.substring(0, 6)) i = i.slice(6), o = I.getQueryParam(i);
        else if (s = i.match(/^rand([0-9]+)$/)) {
            var f = Number(s[1]),
                d = (Math.random() * (Math.pow(10, f) - 1)).toFixed(0);
            o = Array(f - d.length + 1).join("0") + d
        } else o = I.getObjectProperty(c, i);
        return o
    }, I.getVars = function(e, t, n) {
        var i = {};
        return I.each(e, function(e) {
            i[e] = I.getVar(e, t, n)
        }), i
    }, I.replace = function(e, t, n, i) {
        return "string" != typeof e ? e : e.replace(/%(.*?)%/g, function(e, r) {
            var a = I.getVar(r, t, n);
            return null == a ? I.settings.undefinedVarsReturnEmpty ? "" : e : i ? I.escapeForHtml(a) : a
        })
    }, I.escapeHtmlParams = function(e) {
        return e.escapeHtml = !0, e
    }, I.searchVariables = function(e, t, n) {
        if (!e || 0 === e.length) return "";
        for (var i = [], r = 0, a = e.length; a > r; r++) {
            var s = e[r],
                o = I.getVar(s, t, n);
            i.push(s + "=" + escape(o))
        }
        return "?" + i.join("&")
    }, I.fireRule = function(e, t, n) {
        var i = e.trigger;
        if (i) {
            for (var r = 0, a = i.length; a > r; r++) {
                var s = i[r];
                I.execute(s, t, n)
            }
            I.contains(I.fireOnceEvents, e.event) && (e.expired = !0)
        }
    }, I.isLinked = function(e) {
        for (var t = e; t; t = t.parentNode)
            if (I.isLinkTag(t)) return !0;
        return !1
    }, I.firePageLoadEvent = function(e) {
        for (var n = t.location, i = {
                type: e,
                target: n
            }, r = I.pageLoadRules, a = I.evtHandlers[i.type], s = r.length; s--;) {
            var o = r[s];
            I.ruleMatches(o, i, n) && (I.notify('Rule "' + o.name + '" fired.', 1), I.fireRule(o, n, i))
        }
        for (var c in I.tools)
            if (I.tools.hasOwnProperty(c)) {
                var l = I.tools[c];
                l.endPLPhase && l.endPLPhase(e)
            }
        a && I.each(a, function(e) {
            e(i)
        })
    }, I.track = function(e) {
        e = e.replace(/^\s*/, "").replace(/\s*$/, "");
        for (var t = 0; t < I.directCallRules.length; t++) {
            var n = I.directCallRules[t];
            if (n.name === e) return I.notify('Direct call Rule "' + e + '" fired.', 1), void I.fireRule(n, location, {
                type: e
            })
        }
        I.notify('Direct call Rule "' + e + '" not found.', 1)
    }, I.basePath = function() {
        return I.data.host ? ("https:" === t.location.protocol ? "https://" + I.data.host.https : "http://" + I.data.host.http) + "/" : this.settings.basePath
    }, I.setLocation = function(t) {
        e.location = t
    }, I.parseQueryParams = function(e) {
        var t = function(e) {
            var t = e;
            try {
                t = decodeURIComponent(e)
            } catch (n) {}
            return t
        };
        if ("" === e || I.isString(e) === !1) return {};
        0 === e.indexOf("?") && (e = e.substring(1));
        var n = {},
            i = e.split("&");
        return I.each(i, function(e) {
            e = e.split("="), e[1] && (n[t(e[0])] = t(e[1]))
        }), n
    }, I.getCaseSensitivityQueryParamsMap = function(e) {
        var t = I.parseQueryParams(e),
            n = {};
        for (var i in t) t.hasOwnProperty(i) && (n[i.toLowerCase()] = t[i]);
        return {
            normal: t,
            caseInsensitive: n
        }
    }, I.updateQueryParams = function() {
        I.QueryParams = I.getCaseSensitivityQueryParamsMap(e.location.search)
    }, I.updateQueryParams(), I.getQueryParam = function(e) {
        return I.QueryParams.normal[e]
    }, I.getQueryParamCaseInsensitive = function(e) {
        return I.QueryParams.caseInsensitive[e.toLowerCase()]
    }, I.encodeObjectToURI = function(e) {
        if (I.isObject(e) === !1) return "";
        var t = [];
        for (var n in e) e.hasOwnProperty(n) && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
        return t.join("&")
    }, I.readCookie = function(e) {
        for (var i = e + "=", r = t.cookie.split(";"), a = 0; a < r.length; a++) {
            for (var s = r[a];
                " " == s.charAt(0);) s = s.substring(1, s.length);
            if (0 === s.indexOf(i)) return s.substring(i.length, s.length)
        }
        return n
    }, I.setCookie = function(e, n, i) {
        var r;
        if (i) {
            var a = new Date;
            a.setTime(a.getTime() + 24 * i * 60 * 60 * 1e3), r = "; expires=" + a.toGMTString()
        } else r = "";
        t.cookie = e + "=" + n + r + "; path=/"
    }, I.removeCookie = function(e) {
        I.setCookie(e, "", -1)
    }, I.getElementProperty = function(e, t) {
        if ("@" === t.charAt(0)) {
            var i = I.specialProperties[t.substring(1)];
            if (i) return i(e)
        }
        return "innerText" === t ? I.text(e) : t in e ? e[t] : e.getAttribute ? e.getAttribute(t) : n
    }, I.propertiesMatch = function(e, t) {
        if (e)
            for (var n in e)
                if (e.hasOwnProperty(n)) {
                    var i = e[n],
                        r = I.getElementProperty(t, n);
                    if ("string" == typeof i && i !== r) return !1;
                    if (i instanceof RegExp && !i.test(r)) return !1
                }
        return !0
    }, I.isRightClick = function(e) {
        var t;
        return e.which ? t = 3 == e.which : e.button && (t = 2 == e.button), t
    }, I.ruleMatches = function(e, t, n, i) {
        var r = e.condition,
            a = e.conditions,
            s = e.property,
            o = t.type,
            c = e.value,
            l = t.target || t.srcElement,
            u = n === l;
        if (e.event !== o && ("custom" !== e.event || e.customEvent !== o)) return !1;
        if (!I.ruleInScope(e)) return !1;
        if ("click" === e.event && I.isRightClick(t)) return !1;
        if (e.isDefault && i > 0) return !1;
        if (e.expired) return !1;
        if ("inview" === o && t.inviewDelay !== e.inviewDelay) return !1;
        if (!u && (e.bubbleFireIfParent === !1 || 0 !== i && e.bubbleFireIfChildFired === !1)) return !1;
        if (e.selector && !I.matchesCss(e.selector, n)) return !1;
        if (!I.propertiesMatch(s, n)) return !1;
        if (null != c)
            if ("string" == typeof c) {
                if (c !== n.value) return !1
            } else if (!c.test(n.value)) return !1;
        if (r) try {
            if (!r.call(n, t, l)) return I.notify('Condition for rule "' + e.name + '" not met.', 1), !1
        } catch (f) {
            return I.notify('Condition for rule "' + e.name + '" not met. Error: ' + f.message, 1), !1
        }
        if (a) {
            var d = I.find(a, function(i) {
                try {
                    return !i.call(n, t, l)
                } catch (r) {
                    return I.notify('Condition for rule "' + e.name + '" not met. Error: ' + r.message, 1), !0
                }
            });
            if (d) return I.notify("Condition " + d.toString() + ' for rule "' + e.name + '" not met.', 1), !1
        }
        return !0
    }, I.evtHandlers = {}, I.bindEvent = function(e, t) {
        var n = I.evtHandlers;
        n[e] || (n[e] = []), n[e].push(t)
    }, I.whenEvent = I.bindEvent, I.unbindEvent = function(e, t) {
        var n = I.evtHandlers;
        if (n[e]) {
            var i = I.indexOf(n[e], t);
            n[e].splice(i, 1)
        }
    }, I.bindEventOnce = function(e, t) {
        var n = function() {
            I.unbindEvent(e, n), t.apply(null, arguments)
        };
        I.bindEvent(e, n)
    }, I.isVMLPoisoned = function(e) {
        if (!e) return !1;
        try {
            e.nodeName
        } catch (t) {
            if ("Attribute only valid on v:image" === t.message) return !0
        }
        return !1
    }, I.handleEvent = function(e) {
        if (!I.$data(e, "eventProcessed")) {
            var t = e.type.toLowerCase(),
                n = e.target || e.srcElement,
                i = 0,
                r = I.rules,
                a = (I.tools, I.evtHandlers[e.type]);
            if (I.isVMLPoisoned(n)) return void I.notify("detected " + t + " on poisoned VML element, skipping.", 1);
            a && I.each(a, function(t) {
                t(e)
            });
            var s = n && n.nodeName;
            s ? I.notify("detected " + t + " on " + n.nodeName, 1) : I.notify("detected " + t, 1);
            for (var o = n; o; o = o.parentNode) {
                var c = !1;
                if (I.each(r, function(t) {
                        I.ruleMatches(t, e, o, i) && (I.notify('Rule "' + t.name + '" fired.', 1), I.fireRule(t, o, e), i++, t.bubbleStop && (c = !0))
                    }), c) break
            }
            I.$data(e, "eventProcessed", !0)
        }
    }, I.onEvent = t.querySelectorAll ? function(e) {
        I.handleEvent(e)
    } : function() {
        var e = [],
            t = function(t) {
                t.selector ? e.push(t) : I.handleEvent(t)
            };
        return t.pendingEvents = e, t
    }(), I.fireEvent = function(e, t) {
        I.onEvent({
            type: e,
            target: t
        })
    }, I.registerEvents = function(e, t) {
        for (var n = t.length - 1; n >= 0; n--) {
            var i = t[n];
            I.$data(e, i + ".tracked") || (I.addEventHandler(e, i, I.onEvent), I.$data(e, i + ".tracked", !0))
        }
    }, I.registerEventsForTags = function(e, n) {
        for (var i = e.length - 1; i >= 0; i--)
            for (var r = e[i], a = t.getElementsByTagName(r), s = a.length - 1; s >= 0; s--) I.registerEvents(a[s], n)
    }, I.setListeners = function() {
        var e = ["click", "submit"];
        I.each(I.rules, function(t) {
            "custom" === t.event && t.hasOwnProperty("customEvent") && !I.contains(e, t.customEvent) && e.push(t.customEvent)
        }), I.registerEvents(t, e)
    }, I.getUniqueRuleEvents = function() {
        return I._uniqueRuleEvents || (I._uniqueRuleEvents = [], I.each(I.rules, function(e) {
            -1 === I.indexOf(I._uniqueRuleEvents, e.event) && I._uniqueRuleEvents.push(e.event)
        })), I._uniqueRuleEvents
    }, I.setFormListeners = function() {
        if (!I._relevantFormEvents) {
            var e = ["change", "focus", "blur", "keypress"];
            I._relevantFormEvents = I.filter(I.getUniqueRuleEvents(), function(t) {
                return -1 !== I.indexOf(e, t)
            })
        }
        I._relevantFormEvents.length && I.registerEventsForTags(["input", "select", "textarea", "button"], I._relevantFormEvents)
    }, I.setVideoListeners = function() {
        if (!I._relevantVideoEvents) {
            var e = ["play", "pause", "ended", "volumechange", "stalled", "loadeddata"];
            I._relevantVideoEvents = I.filter(I.getUniqueRuleEvents(), function(t) {
                return -1 !== I.indexOf(e, t)
            })
        }
        I._relevantVideoEvents.length && I.registerEventsForTags(["video"], I._relevantVideoEvents)
    }, I.readStoredSetting = function(t) {
        try {
            return t = "sdsat_" + t, e.localStorage.getItem(t)
        } catch (n) {
            return I.notify("Cannot read stored setting from localStorage: " + n.message, 2), null
        }
    }, I.loadStoredSettings = function() {
        var e = I.readStoredSetting("debug"),
            t = I.readStoredSetting("hide_activity");
        e && (I.settings.notifications = "true" === e), t && (I.settings.hideActivity = "true" === t)
    }, I.isRuleActive = function(e, t) {
        function n(e, t) {
            return t = r(t, {
                hour: e[h](),
                minute: e[g]()
            }), Math.floor(Math.abs((e.getTime() - t.getTime()) / 864e5))
        }
        function i(e, t) {
            function n(e) {
                return 12 * e[f]() + e[d]()
            }
            return Math.abs(n(e) - n(t))
        }
        function r(e, t) {
            var n = new Date(e.getTime());
            for (var i in t)
                if (t.hasOwnProperty(i)) {
                    var r = t[i];
                    switch (i) {
                        case "hour":
                            n[p](r);
                            break;
                        case "minute":
                            n[m](r);
                            break;
                        case "date":
                            n[v](r)
                    }
                }
            return n
        }
        function a(e, t) {
            var n = e[h](),
                i = e[g](),
                r = t[h](),
                a = t[g]();
            return 60 * n + i > 60 * r + a
        }
        function s(e, t) {
            var n = e[h](),
                i = e[g](),
                r = t[h](),
                a = t[g]();
            return 60 * r + a > 60 * n + i
        }
        var o = e.schedule;
        if (!o) return !0;
        var c = o.utc,
            l = c ? "getUTCDate" : "getDate",
            u = c ? "getUTCDay" : "getDay",
            f = c ? "getUTCFullYear" : "getFullYear",
            d = c ? "getUTCMonth" : "getMonth",
            h = c ? "getUTCHours" : "getHours",
            g = c ? "getUTCMinutes" : "getMinutes",
            p = c ? "setUTCHours" : "setHours",
            m = c ? "setUTCMinutes" : "setMinutes",
            v = c ? "setUTCDate" : "setDate";
        if (t = t || new Date, o.repeat) {
            if (a(o.start, t)) return !1;
            if (s(o.end, t)) return !1;
            if (t < o.start) return !1;
            if (o.endRepeat && t >= o.endRepeat) return !1;
            if ("daily" === o.repeat) {
                if (o.repeatEvery) {
                    var y = n(o.start, t);
                    if (y % o.repeatEvery !== 0) return !1
                }
            } else if ("weekly" === o.repeat) {
                if (o.days) {
                    if (!I.contains(o.days, t[u]())) return !1
                } else if (o.start[u]() !== t[u]()) return !1;
                if (o.repeatEvery) {
                    var b = n(o.start, t);
                    if (b % (7 * o.repeatEvery) !== 0) return !1
                }
            } else if ("monthly" === o.repeat) {
                if (o.repeatEvery) {
                    var S = i(o.start, t);
                    if (S % o.repeatEvery !== 0) return !1
                }
                if (o.nthWeek && o.mthDay) {
                    if (o.mthDay !== t[u]()) return !1;
                    var _ = Math.floor((t[l]() - t[u]() + 1) / 7);
                    if (o.nthWeek !== _) return !1
                } else if (o.start[l]() !== t[l]()) return !1
            } else if ("yearly" === o.repeat) {
                if (o.start[d]() !== t[d]()) return !1;
                if (o.start[l]() !== t[l]()) return !1;
                if (o.repeatEvery) {
                    var b = Math.abs(o.start[f]() - t[f]());
                    if (b % o.repeatEvery !== 0) return !1
                }
            }
        } else {
            if (o.start > t) return !1;
            if (o.end < t) return !1
        }
        return !0
    }, I.isOutboundLink = function(e) {
        if (!e.getAttribute("href")) return !1;
        var t = e.hostname,
            n = (e.href, e.protocol);
        if ("http:" !== n && "https:" !== n) return !1;
        var i = I.any(I.settings.domainList, function(e) {
            return I.isSubdomainOf(t, e)
        });
        return i ? !1 : t !== location.hostname
    }, I.isLinkerLink = function(e) {
        return e.getAttribute && e.getAttribute("href") ? I.hasMultipleDomains() && e.hostname != location.hostname && !e.href.match(/^javascript/i) && !I.isOutboundLink(e) : !1
    }, I.isSubdomainOf = function(e, t) {
        if (e === t) return !0;
        var n = e.length - t.length;
        return n > 0 ? I.equalsIgnoreCase(e.substring(n), t) : !1
    }, I.getVisitorId = function() {
        var e = I.getToolsByType("visitor_id");
        return 0 === e.length ? null : e[0].getInstance()
    }, I.URI = function() {
        var e = t.location.pathname + t.location.search;
        return I.settings.forceLowerCase && (e = e.toLowerCase()), e
    }, I.URL = function() {
        var e = t.location.href;
        return I.settings.forceLowerCase && (e = e.toLowerCase()), e
    }, I.filterRules = function() {
        function e(e) {
            return I.isRuleActive(e) ? !0 : !1
        }
        I.rules = I.filter(I.rules, e), I.pageLoadRules = I.filter(I.pageLoadRules, e)
    }, I.ruleInScope = function(e, n) {
        function i(e, t) {
            function n(e) {
                return t.match(e)
            }
            var i = e.include,
                a = e.exclude;
            if (i && r(i, t)) return !0;
            if (a) {
                if (I.isString(a) && a === t) return !0;
                if (I.isArray(a) && I.any(a, n)) return !0;
                if (I.isRegex(a) && n(a)) return !0
            }
            return !1
        }
        function r(e, t) {
            function n(e) {
                return t.match(e)
            }
            return I.isString(e) && e !== t ? !0 : I.isArray(e) && !I.any(e, n) ? !0 : I.isRegex(e) && !n(e) ? !0 : !1
        }
        n = n || t.location;
        var a = e.scope;
        if (!a) return !0;
        var s = a.URI,
            o = a.subdomains,
            c = a.domains,
            l = a.protocols,
            u = a.hashes;
        return s && i(s, n.pathname + n.search) ? !1 : o && i(o, n.hostname) ? !1 : c && r(c, n.hostname) ? !1 : l && r(l, n.protocol) ? !1 : u && i(u, n.hash) ? !1 : !0
    }, I.backgroundTasks = function() {
        +new Date;
        I.setFormListeners(), I.setVideoListeners(), I.loadStoredSettings(), I.registerNewElementsForDynamicRules(), I.eventEmitterBackgroundTasks(); + new Date
    }, I.registerNewElementsForDynamicRules = function() {
        function e(t, n) {
            var i = e.cache[t];
            return i ? n(i) : void I.cssQuery(t, function(i) {
                e.cache[t] = i, n(i)
            })
        }
        e.cache = {}, I.each(I.dynamicRules, function(t) {
            e(t.selector, function(e) {
                I.each(e, function(e) {
                    var n = "custom" === t.event ? t.customEvent : t.event;
                    I.$data(e, "dynamicRules.seen." + n) || (I.$data(e, "dynamicRules.seen." + n, !0), I.propertiesMatch(t.property, e) && I.registerEvents(e, [n]))
                })
            })
        })
    }, I.ensureCSSSelector = function() {
        return t.querySelectorAll ? void(I.hasSelector = !0) : (I.loadingSizzle = !0, I.sizzleQueue = [], void I.loadScript(I.basePath() + "selector.js", function() {
            if (!I.Sizzle) return void I.logError(new Error("Failed to load selector.js"));
            var e = I.onEvent.pendingEvents;
            I.each(e, function(e) {
                I.handleEvent(e)
            }, this), I.onEvent = I.handleEvent, I.hasSelector = !0, delete I.loadingSizzle, I.each(I.sizzleQueue, function(e) {
                I.cssQuery(e[0], e[1])
            }), delete I.sizzleQueue
        }))
    }, I.errors = [], I.logError = function(e) {
        I.errors.push(e), I.notify(e.name + " - " + e.message, 5)
    }, I.pageBottom = function() {
        I.initialized && (I.pageBottomFired = !0, I.firePageLoadEvent("pagebottom"))
    }, I.stagingLibraryOverride = function() {
        var e = "true" === I.readStoredSetting("stagingLibrary");
        if (e) {
            for (var n, i, r, a = t.getElementsByTagName("script"), s = /^(.*)satelliteLib-([a-f0-9]{40})\.js$/, o = /^(.*)satelliteLib-([a-f0-9]{40})-staging\.js$/, c = 0, l = a.length; l > c && (r = a[c].getAttribute("src"), !r || (n || (n = r.match(s)), i || (i = r.match(o)), !i)); c++);
            if (n && !i) {
                var u = n[1] + "satelliteLib-" + n[2] + "-staging.js";
                if (t.write) t.write('<script src="' + u + '"></script>');
                else {
                    var f = t.createElement("script");
                    f.src = u, t.head.appendChild(f)
                }
                return !0
            }
        }
        return !1
    }, I.checkAsyncInclude = function() {
        e.satellite_asyncLoad && I.notify('You may be using the async installation of Satellite. In-page HTML and the "pagebottom" event will not work. Please update your Satellite installation for these features.', 5)
    }, I.hasMultipleDomains = function() {
        return !!I.settings.domainList && I.settings.domainList.length > 1
    }, I.handleOverrides = function() {
        if (C)
            for (var e in C) C.hasOwnProperty(e) && (I.data[e] = C[e])
    }, I.privacyManagerParams = function() {
        var e = {};
        I.extend(e, I.settings.privacyManagement);
        var t = [];
        for (var n in I.tools)
            if (I.tools.hasOwnProperty(n)) {
                var i = I.tools[n],
                    r = i.settings;
                if (!r) continue;
                "sc" === r.engine && t.push(i)
            }
        var a = I.filter(I.map(t, function(e) {
            return e.getTrackingServer()
        }), function(e) {
            return null != e
        });
        e.adobeAnalyticsTrackingServers = a;
        for (var s = ["bannerText", "headline", "introductoryText", "customCSS"], o = 0; o < s.length; o++) {
            var c = s[o],
                l = e[c];
            if (l)
                if ("text" === l.type) e[c] = l.value;
                else {
                    if ("data" !== l.type) throw new Error("Invalid type: " + l.type);
                    e[c] = I.getVar(l.value)
                }
        }
        return e
    }, I.prepareLoadPrivacyManager = function() {
        function t(e) {
            function t() {
                a++, a === r.length && (n(), clearTimeout(s), e())
            }
            function n() {
                I.each(r, function(e) {
                    I.unbindEvent(e.id + ".load", t)
                })
            }
            function i() {
                n(), e()
            }
            var r = I.filter(I.values(I.tools), function(e) {
                return e.settings && "sc" === e.settings.engine
            });
            if (0 === r.length) return e();
            var a = 0;
            I.each(r, function(e) {
                I.bindEvent(e.id + ".load", t)
            });
            var s = setTimeout(i, 5e3)
        }
        I.addEventHandler(e, "load", function() {
            t(I.loadPrivacyManager)
        })
    }, I.loadPrivacyManager = function() {
        var e = I.basePath() + "privacy_manager.js";
        I.loadScript(e, function() {
            var e = I.privacyManager;
            e.configure(I.privacyManagerParams()), e.openIfRequired()
        })
    }, I.init = function(t) {
        if (!I.stagingLibraryOverride()) {
            I.configurationSettings = t;
            var i = t.tools;
            delete t.tools;
            for (var r in t) t.hasOwnProperty(r) && (I[r] = t[r]);
            I.data.customVars === n && (I.data.customVars = {}), I.data.queryParams = I.QueryParams.normal, I.handleOverrides(), I.detectBrowserInfo(), I.trackVisitorInfo && I.trackVisitorInfo(), I.loadStoredSettings(), I.Logger.setOutputState(I.settings.notifications), I.checkAsyncInclude(), I.ensureCSSSelector(), I.filterRules(), I.dynamicRules = I.filter(I.rules, function(e) {
                return e.eventHandlerOnElement
            }), I.tools = I.initTools(i), I.initEventEmitters(), I.firePageLoadEvent("aftertoolinit"), I.settings.privacyManagement && I.prepareLoadPrivacyManager(), I.hasSelector && I.domReady(I.eventEmitterBackgroundTasks), I.setListeners(), I.domReady(function() {
                I.poll(function() {
                    I.backgroundTasks()
                }, I.settings.recheckEvery || 3e3)
            }), I.domReady(function() {
                I.domReadyFired = !0, I.pageBottomFired || I.pageBottom(), I.firePageLoadEvent("domready")
            }), I.addEventHandler(e, "load", function() {
                I.firePageLoadEvent("windowload")
            }), I.firePageLoadEvent("pagetop"), I.initialized = !0
        }
    }, I.pageLoadPhases = ["aftertoolinit", "pagetop", "pagebottom", "domready", "windowload"], I.loadEventBefore = function(e, t) {
        return I.indexOf(I.pageLoadPhases, e) <= I.indexOf(I.pageLoadPhases, t)
    }, I.flushPendingCalls = function(e) {
        e.pending && (I.each(e.pending, function(t) {
            var n = t[0],
                i = t[1],
                r = t[2],
                a = t[3];
            n in e ? e[n].apply(e, [i, r].concat(a)) : e.emit ? e.emit(n, i, r, a) : I.notify("Failed to trigger " + n + " for tool " + e.id, 1)
        }), delete e.pending)
    }, I.setDebug = function(t) {
        try {
            e.localStorage.setItem("sdsat_debug", t)
        } catch (n) {
            I.notify("Cannot set debug mode: " + n.message, 2)
        }
    }, I.getUserAgent = function() {
        return navigator.userAgent
    }, I.detectBrowserInfo = function() {
        function e(e) {
            return function(t) {
                for (var n in e)
                    if (e.hasOwnProperty(n)) {
                        var i = e[n],
                            r = i.test(t);
                        if (r) return n
                    }
                return "Unknown"
            }
        }
        var t = e({
                "IE Edge Mobile": /Windows Phone.*Edge/,
                "IE Edge": /Edge/,
                OmniWeb: /OmniWeb/,
                "Opera Mini": /Opera Mini/,
                "Opera Mobile": /Opera Mobi/,
                Opera: /Opera/,
                Chrome: /Chrome|CriOS|CrMo/,
                Firefox: /Firefox|FxiOS/,
                "IE Mobile": /IEMobile/,
                IE: /MSIE|Trident/,
                "Mobile Safari": /Mobile(\/[0-9A-z]+)? Safari/,
                Safari: /Safari/
            }),
            n = e({
                Blackberry: /BlackBerry|BB10/,
                "Symbian OS": /Symbian|SymbOS/,
                Maemo: /Maemo/,
                Android: /Android/,
                Linux: / Linux /,
                Unix: /FreeBSD|OpenBSD|CrOS/,
                Windows: /[\( ]Windows /,
                iOS: /iPhone|iPad|iPod/,
                MacOS: /Macintosh;/
            }),
            i = e({
                Nokia: /Symbian|SymbOS|Maemo/,
                "Windows Phone": /Windows Phone/,
                Blackberry: /BlackBerry|BB10/,
                Android: /Android/,
                iPad: /iPad/,
                iPod: /iPod/,
                iPhone: /iPhone/,
                Desktop: /.*/
            }),
            r = I.getUserAgent();
        I.browserInfo = {
            browser: t(r),
            os: n(r),
            deviceType: i(r)
        }
    }, I.isHttps = function() {
        return "https:" == t.location.protocol
    }, I.BaseTool = function(e) {
        this.settings = e || {}, this.forceLowerCase = I.settings.forceLowerCase, "forceLowerCase" in this.settings && (this.forceLowerCase = this.settings.forceLowerCase)
    }, I.BaseTool.prototype = {
        triggerCommand: function(e, t, n) {
            var i = this.settings || {};
            if (this.initialize && this.isQueueAvailable() && this.isQueueable(e) && n && I.loadEventBefore(n.type, i.loadOn)) return void this.queueCommand(e, t, n);
            var r = e.command,
                a = this["$" + r],
                s = a ? a.escapeHtml : !1,
                o = I.preprocessArguments(e.arguments, t, n, this.forceLowerCase, s);
            a ? a.apply(this, [t, n].concat(o)) : this.$missing$ ? this.$missing$(r, t, n, o) : I.notify("Failed to trigger " + r + " for tool " + this.id, 1)
        },
        endPLPhase: function(e) {},
        isQueueable: function(e) {
            return "cancelToolInit" !== e.command
        },
        isQueueAvailable: function() {
            return !this.initialized && !this.initializing
        },
        flushQueue: function() {
            this.pending && (I.each(this.pending, function(e) {
                this.triggerCommand.apply(this, e)
            }, this), this.pending = [])
        },
        queueCommand: function(e, t, n) {
            this.pending || (this.pending = []), this.pending.push([e, t, n])
        },
        $cancelToolInit: function() {
            this._cancelToolInit = !0
        }
    }, e._satellite = I, I.visibility = {
        isHidden: function() {
            var e = this.getHiddenProperty();
            return e ? t[e] : !1
        },
        isVisible: function() {
            return !this.isHidden()
        },
        getHiddenProperty: function() {
            var e = ["webkit", "moz", "ms", "o"];
            if ("hidden" in t) return "hidden";
            for (var n = 0; n < e.length; n++)
                if (e[n] + "Hidden" in t) return e[n] + "Hidden";
            return null
        },
        getVisibilityEvent: function() {
            var e = this.getHiddenProperty();
            return e ? e.replace(/[H|h]idden/, "") + "visibilitychange" : null
        }
    }, I.ecommerce = {
        addItem: function() {
            var e = [].slice.call(arguments);
            I.onEvent({
                type: "ecommerce.additem",
                target: e
            })
        },
        addTrans: function() {
            var e = [].slice.call(arguments);
            I.data.saleData.sale = {
                orderId: e[0],
                revenue: e[2]
            }, I.onEvent({
                type: "ecommerce.addtrans",
                target: e
            })
        },
        trackTrans: function() {
            I.onEvent({
                type: "ecommerce.tracktrans",
                target: []
            })
        }
    }, i.orientationChange = function(t) {
        var n = 0 === e.orientation ? "portrait" : "landscape";
        t.orientation = n, I.onEvent(t)
    }, I.availableEventEmitters.push(i), r.offset = function(n) {
        var i = null,
            r = null;
        try {
            var a = n.getBoundingClientRect(),
                s = t,
                o = s.documentElement,
                c = s.body,
                l = e,
                u = o.clientTop || c.clientTop || 0,
                f = o.clientLeft || c.clientLeft || 0,
                d = l.pageYOffset || o.scrollTop || c.scrollTop,
                h = l.pageXOffset || o.scrollLeft || c.scrollLeft;
            i = a.top + d - u, r = a.left + h - f
        } catch (g) {}
        return {
            top: i,
            left: r
        }
    }, r.getViewportHeight = function() {
        var n = e.innerHeight,
            i = t.compatMode;
        return i && (n = "CSS1Compat" == i ? t.documentElement.clientHeight : t.body.clientHeight), n
    }, r.getScrollTop = function() {
        return t.documentElement.scrollTop ? t.documentElement.scrollTop : t.body.scrollTop
    }, r.isElementInDocument = function(e) {
        return t.body.contains(e)
    }, r.isElementInView = function(e) {
        if (!r.isElementInDocument(e)) return !1;
        var t = r.getViewportHeight(),
            n = r.getScrollTop(),
            i = r.offset(e).top,
            a = e.offsetHeight;
        return null !== i ? !(n > i + a || i > n + t) : !1
    }, r.prototype = {
        backgroundTasks: function() {
            var e = this.elements;
            I.each(this.rules, function(t) {
                I.cssQuery(t.selector, function(n) {
                    var i = 0;
                    I.each(n, function(t) {
                        I.contains(e, t) || (e.push(t), i++)
                    }), i && I.notify(t.selector + " added " + i + " elements.", 1)
                })
            }), this.track()
        },
        checkInView: function(e, t, n) {
            var i = I.$data(e, "inview");
            if (r.isElementInView(e)) {
                i || I.$data(e, "inview", !0);
                var a = this;
                this.processRules(e, function(n, i, r) {
                    if (t || !n.inviewDelay) I.$data(e, i, !0), I.onEvent({
                        type: "inview",
                        target: e,
                        inviewDelay: n.inviewDelay
                    });
                    else if (n.inviewDelay) {
                        var s = I.$data(e, r);
                        s || (s = setTimeout(function() {
                            a.checkInView(e, !0, n.inviewDelay)
                        }, n.inviewDelay), I.$data(e, r, s))
                    }
                }, n)
            } else {
                if (!r.isElementInDocument(e)) {
                    var s = I.indexOf(this.elements, e);
                    this.elements.splice(s, 1)
                }
                i && I.$data(e, "inview", !1), this.processRules(e, function(t, n, i) {
                    var r = I.$data(e, i);
                    r && clearTimeout(r)
                }, n)
            }
        },
        track: function() {
            for (var e = this.elements.length - 1; e >= 0; e--) this.checkInView(this.elements[e])
        },
        processRules: function(e, t, n) {
            var i = this.rules;
            n && (i = I.filter(this.rules, function(e) {
                return e.inviewDelay == n
            })), I.each(i, function(n, i) {
                var r = n.inviewDelay ? "viewed_" + n.inviewDelay : "viewed",
                    a = "inview_timeout_id_" + i;
                I.$data(e, r) || I.matchesCss(n.selector, e) && t(n, r, a)
            })
        }
    }, I.availableEventEmitters.push(r), a.prototype = {
        backgroundTasks: function() {
            var e = this.eventHandler;
            I.each(this.rules, function(t) {
                I.cssQuery(t.selector || "video", function(t) {
                    I.each(t, function(t) {
                        I.$data(t, "videoplayed.tracked") || (I.addEventHandler(t, "timeupdate", I.throttle(e, 100)), I.$data(t, "videoplayed.tracked", !0))
                    })
                })
            })
        },
        evalRule: function(e, t) {
            var n = t.event,
                i = e.seekable,
                r = i.start(0),
                a = i.end(0),
                s = e.currentTime,
                o = t.event.match(/^videoplayed\(([0-9]+)([s%])\)$/);
            if (o) {
                var c = o[2],
                    l = Number(o[1]),
                    u = "%" === c ? function() {
                        return 100 * (s - r) / (a - r) >= l
                    } : function() {
                        return s - r >= l
                    };
                !I.$data(e, n) && u() && (I.$data(e, n, !0), I.onEvent({
                    type: n,
                    target: e
                }))
            }
        },
        onUpdateTime: function(e) {
            var t = this.rules,
                n = e.target;
            if (n.seekable && 0 !== n.seekable.length)
                for (var i = 0, r = t.length; r > i; i++) this.evalRule(n, t[i])
        }
    }, I.availableEventEmitters.push(a), s.prototype = {
        obue: !1,
        initialize: function() {
            this.attachCloseListeners()
        },
        obuePrevUnload: function() {},
        obuePrevBeforeUnload: function() {},
        newObueListener: function() {
            this.obue || (this.obue = !0, this.triggerBeacons())
        },
        attachCloseListeners: function() {
            this.prevUnload = e.onunload, this.prevBeforeUnload = e.onbeforeunload, e.onunload = I.bind(function(t) {
                this.prevUnload && setTimeout(I.bind(function() {
                    this.prevUnload.call(e, t)
                }, this), 1), this.newObueListener()
            }, this), e.onbeforeunload = I.bind(function(t) {
                this.prevBeforeUnload && setTimeout(I.bind(function() {
                    this.prevBeforeUnload.call(e, t)
                }, this), 1), this.newObueListener()
            }, this)
        },
        triggerBeacons: function() {
            I.fireEvent("leave", t)
        }
    }, I.availableEventEmitters.push(s), o.prototype = {
        initialize: function() {
            return this.FB = this.FB || e.FB, this.FB && this.FB.Event && this.FB.Event.subscribe ? (this.bind(), !0) : void 0
        },
        bind: function() {
            this.FB.Event.subscribe("edge.create", function() {
                I.notify("tracking a facebook like", 1), I.onEvent({
                    type: "facebook.like",
                    target: t
                })
            }), this.FB.Event.subscribe("edge.remove", function() {
                I.notify("tracking a facebook unlike", 1), I.onEvent({
                    type: "facebook.unlike",
                    target: t
                })
            }), this.FB.Event.subscribe("message.send", function() {
                I.notify("tracking a facebook share", 1), I.onEvent({
                    type: "facebook.send",
                    target: t
                })
            })
        }
    }, I.availableEventEmitters.push(o), c.prototype = {
        defineEvents: function() {
            this.oldBlurClosure = function() {
                I.fireEvent("tabblur", t)
            }, this.oldFocusClosure = I.bind(function() {
                this.visibilityApiHasPriority ? I.fireEvent("tabfocus", t) : null != I.visibility.getHiddenProperty() ? I.visibility.isHidden() || I.fireEvent("tabfocus", t) : I.fireEvent("tabfocus", t)
            }, this)
        },
        attachDetachModernEventListeners: function(e) {
            var n = 0 == e ? "removeEventHandler" : "addEventHandler";
            I[n](t, I.visibility.getVisibilityEvent(), this.handleVisibilityChange)
        },
        attachDetachOlderEventListeners: function(t, n, i) {
            var r = 0 == t ? "removeEventHandler" : "addEventHandler";
            I[r](n, i, this.oldBlurClosure), I[r](e, "focus", this.oldFocusClosure)
        },
        handleVisibilityChange: function() {
            I.visibility.isHidden() ? I.fireEvent("tabblur", t) : I.fireEvent("tabfocus", t)
        },
        setVisibilityApiPriority: function(t) {
            this.visibilityApiHasPriority = t, this.attachDetachOlderEventListeners(!1, e, "blur"), this.attachDetachModernEventListeners(!1), t ? null != I.visibility.getHiddenProperty() ? this.attachDetachModernEventListeners(!0) : this.attachDetachOlderEventListeners(!0, e, "blur") : (this.attachDetachOlderEventListeners(!0, e, "blur"), null != I.visibility.getHiddenProperty() && this.attachDetachModernEventListeners(!0))
        },
        oldBlurClosure: null,
        oldFocusClosure: null,
        visibilityApiHasPriority: !0
    }, I.availableEventEmitters.push(c), l.prototype = {
        initialize: function() {
            this.setupHistoryAPI(), this.setupHashChange()
        },
        fireIfURIChanged: function() {
            var e = I.URL();
            this.lastURL !== e && (this.fireEvent(), this.lastURL = e)
        },
        fireEvent: function() {
            I.updateQueryParams(), I.onEvent({
                type: "locationchange",
                target: t
            })
        },
        setupSPASupport: function() {
            this.setupHistoryAPI(), this.setupHashChange()
        },
        setupHistoryAPI: function() {
            var t = e.history;
            t && (t.pushState && (this.originalPushState = t.pushState, t.pushState = this._pushState), t.replaceState && (this.originalReplaceState = t.replaceState, t.replaceState = this._replaceState)), I.addEventHandler(e, "popstate", this._onPopState)
        },
        pushState: function() {
            var e = this.originalPushState.apply(history, arguments);
            return this.onPushState(), e
        },
        replaceState: function() {
            var e = this.originalReplaceState.apply(history, arguments);
            return this.onReplaceState(), e
        },
        setupHashChange: function() {
            I.addEventHandler(e, "hashchange", this._onHashChange)
        },
        onReplaceState: function() {
            setTimeout(this._fireIfURIChanged, 0)
        },
        onPushState: function() {
            setTimeout(this._fireIfURIChanged, 0)
        },
        onPopState: function() {
            setTimeout(this._fireIfURIChanged, 0)
        },
        onHashChange: function() {
            setTimeout(this._fireIfURIChanged, 0)
        },
        uninitialize: function() {
            this.cleanUpHistoryAPI(), this.cleanUpHashChange()
        },
        cleanUpHistoryAPI: function() {
            history.pushState === this._pushState && (history.pushState = this.originalPushState), history.replaceState === this._replaceState && (history.replaceState = this.originalReplaceState), I.removeEventHandler(e, "popstate", this._onPopState)
        },
        cleanUpHashChange: function() {
            I.removeEventHandler(e, "hashchange", this._onHashChange)
        }
    }, I.availableEventEmitters.push(l), u.prototype.getStringifiedValue = e.JSON && e.JSON.stringify || I.stringify, u.prototype.initPolling = function() {
        0 !== this.dataElementsNames.length && (this.dataElementsStore = this.getDataElementsValues(), I.poll(I.bind(this.checkDataElementValues, this), 1e3))
    }, u.prototype.getDataElementsValues = function() {
        var e = {};
        return I.each(this.dataElementsNames, function(t) {
            var n = I.getVar(t);
            e[t] = this.getStringifiedValue(n)
        }, this), e
    }, u.prototype.checkDataElementValues = function() {
        I.each(this.dataElementsNames, I.bind(function(e) {
            var n = this.getStringifiedValue(I.getVar(e)),
                i = this.dataElementsStore[e];
            n !== i && (this.dataElementsStore[e] = n, I.onEvent({
                type: "dataelementchange(" + e + ")",
                target: t
            }))
        }, this))
    }, I.availableEventEmitters.push(u), f.prototype.backgroundTasks = function() {
        I.each(this.rules, function(e) {
            I.cssQuery(e.selector, function(e) {
                if (e.length > 0) {
                    var t = e[0];
                    if (I.$data(t, "elementexists.seen")) return;
                    I.$data(t, "elementexists.seen", !0), I.onEvent({
                        type: "elementexists",
                        target: t
                    })
                }
            })
        })
    }, I.availableEventEmitters.push(f), d.prototype = {
        backgroundTasks: function() {
            var e = this;
            I.each(this.rules, function(t) {
                var n = t[1],
                    i = t[0];
                I.cssQuery(n, function(t) {
                    I.each(t, function(t) {
                        e.trackElement(t, i)
                    })
                })
            }, this)
        },
        trackElement: function(e, t) {
            var n = this,
                i = I.$data(e, "hover.delays");
            i ? I.contains(i, t) || i.push(t) : (I.addEventHandler(e, "mouseover", function(t) {
                n.onMouseOver(t, e)
            }), I.addEventHandler(e, "mouseout", function(t) {
                n.onMouseOut(t, e)
            }), I.$data(e, "hover.delays", [t]))
        },
        onMouseOver: function(e, t) {
            var n = e.target || e.srcElement,
                i = e.relatedTarget || e.fromElement,
                r = (t === n || I.containsElement(t, n)) && !I.containsElement(t, i);
            r && this.onMouseEnter(t)
        },
        onMouseEnter: function(e) {
            var t = I.$data(e, "hover.delays"),
                n = I.map(t, function(t) {
                    return setTimeout(function() {
                        I.onEvent({
                            type: "hover(" + t + ")",
                            target: e
                        })
                    }, t)
                });
            I.$data(e, "hover.delayTimers", n)
        },
        onMouseOut: function(e, t) {
            var n = e.target || e.srcElement,
                i = e.relatedTarget || e.toElement,
                r = (t === n || I.containsElement(t, n)) && !I.containsElement(t, i);
            r && this.onMouseLeave(t)
        },
        onMouseLeave: function(e) {
            var t = I.$data(e, "hover.delayTimers");
            t && I.each(t, function(e) {
                clearTimeout(e)
            })
        }
    }, I.availableEventEmitters.push(d), h.prototype = {
        initialize: function() {
            var e = this.twttr;
            e && "function" == typeof e.ready && e.ready(I.bind(this.bind, this))
        },
        bind: function() {
            this.twttr.events.bind("tweet", function(e) {
                e && (I.notify("tracking a tweet button", 1), I.onEvent({
                    type: "twitter.tweet",
                    target: t
                }))
            })
        }
    }, I.availableEventEmitters.push(h), I.inherit(g, I.BaseTool), I.extend(g.prototype, {
        name: "tnt",
        endPLPhase: function(e) {
            "aftertoolinit" === e && this.initialize()
        },
        initialize: function() {
            I.notify("Test & Target: Initializing", 1), this.initializeTargetPageParams(), this.load()
        },
        initializeTargetPageParams: function() {
            e.targetPageParams && this.updateTargetPageParams(this.parseTargetPageParamsResult(e.targetPageParams())), this.updateTargetPageParams(this.settings.pageParams), this.setTargetPageParamsFunction()
        },
        load: function() {
            var e = this.getMboxURL(this.settings.mboxURL);
            this.settings.initTool !== !1 ? this.settings.loadSync ? (I.loadScriptSync(e), this.onScriptLoaded()) : (I.loadScript(e, I.bind(this.onScriptLoaded, this)), this.initializing = !0) : this.initialized = !0
        },
        getMboxURL: function(t) {
            var n = t;
            return I.isObject(t) && (n = "https:" === e.location.protocol ? t.https : t.http), n.match(/^https?:/) ? n : I.basePath() + n
        },
        onScriptLoaded: function() {
            I.notify("Test & Target: loaded.", 1), this.flushQueue(), this.initialized = !0, this.initializing = !1
        },
        $addMbox: function(e, t, n) {
            var i = n.mboxGoesAround,
                r = i + "{visibility: hidden;}",
                a = this.appendStyle(r);
            i in this.styleElements || (this.styleElements[i] = a), this.initialized ? this.$addMBoxStep2(null, null, n) : this.initializing && this.queueCommand({
                command: "addMBoxStep2",
                arguments: [n]
            }, e, t)
        },
        $addMBoxStep2: function(n, i, r) {
            var a = this.generateID(),
                s = this;
            I.addEventHandler(e, "load", I.bind(function() {
                I.cssQuery(r.mboxGoesAround, function(n) {
                    var i = n[0];
                    if (i) {
                        var o = t.createElement("div");
                        o.id = a, i.parentNode.replaceChild(o, i), o.appendChild(i), e.mboxDefine(a, r.mboxName);
                        var c = [r.mboxName];
                        r.arguments && (c = c.concat(r.arguments)), e.mboxUpdate.apply(null, c), s.reappearWhenCallComesBack(i, a, r.timeout, r)
                    }
                })
            }, this)), this.lastMboxID = a
        },
        $addTargetPageParams: function(e, t, n) {
            this.updateTargetPageParams(n)
        },
        generateID: function() {
            var e = "_sdsat_mbox_" + String(Math.random()).substring(2) + "_";
            return e
        },
        appendStyle: function(e) {
            var n = t.getElementsByTagName("head")[0],
                i = t.createElement("style");
            return i.type = "text/css", i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(t.createTextNode(e)), n.appendChild(i), i
        },
        reappearWhenCallComesBack: function(e, t, n, i) {
            function r() {
                var e = a.styleElements[i.mboxGoesAround];
                e && (e.parentNode.removeChild(e), delete a.styleElements[i.mboxGoesAround])
            }
            var a = this;
            I.cssQuery('script[src*="omtrdc.net"]', function(e) {
                var t = e[0];
                if (t) {
                    I.scriptOnLoad(t.src, t, function() {
                        I.notify("Test & Target: request complete", 1), r(), clearTimeout(i)
                    });
                    var i = setTimeout(function() {
                        I.notify("Test & Target: bailing after " + n + "ms", 1), r()
                    }, n)
                } else I.notify("Test & Target: failed to find T&T ajax call, bailing", 1), r()
            })
        },
        updateTargetPageParams: function(e) {
            var t = {};
            for (var n in e) e.hasOwnProperty(n) && (t[I.replace(n)] = I.replace(e[n]));
            I.extend(this.targetPageParamsStore, t)
        },
        getTargetPageParams: function() {
            return this.targetPageParamsStore
        },
        setTargetPageParamsFunction: function() {
            e.targetPageParams = I.bind(this.getTargetPageParams, this)
        },
        parseTargetPageParamsResult: function(e) {
            var t = e;
            return I.isArray(e) && (e = e.join("&")), I.isString(e) && (t = I.parseQueryParams(e)), t
        }
    }), I.availableTools.tnt = g, I.inherit(p, I.BaseTool), I.extend(p.prototype, {
        name: "Nielsen",
        endPLPhase: function(e) {
            switch (e) {
                case "pagetop":
                    this.initialize();
                    break;
                case "pagebottom":
                    this.enableTracking && (this.queueCommand({
                        command: "sendFirstBeacon",
                        arguments: []
                    }), this.flushQueueWhenReady())
            }
        },
        defineListeners: function() {
            this.onTabFocus = I.bind(function() {
                this.notify("Tab visible, sending view beacon when ready", 1), this.tabEverVisible = !0, this.flushQueueWhenReady()
            }, this), this.onPageLeave = I.bind(function() {
                this.notify("isHuman? : " + this.isHuman(), 1), this.isHuman() && this.sendDurationBeacon()
            }, this), this.onHumanDetectionChange = I.bind(function(e) {
                this == e.target.target && (this.human = e.target.isHuman)
            }, this)
        },
        initialize: function() {
            this.initializeTracking(), this.initializeDataProviders(), this.initializeNonHumanDetection(), this.tabEverVisible = I.visibility.isVisible(), this.tabEverVisible ? this.notify("Tab visible, sending view beacon when ready", 1) : I.bindEventOnce("tabfocus", this.onTabFocus), this.initialized = !0
        },
        initializeTracking: function() {
            this.initialized || (this.notify("Initializing tracking", 1), this.addRemovePageLeaveEvent(this.enableTracking), this.addRemoveHumanDetectionChangeEvent(this.enableTracking), this.initialized = !0)
        },
        initializeDataProviders: function() {
            var e, t = this.getAnalyticsTool();
            this.dataProvider.register(new p.DataProvider.VisitorID(I.getVisitorId())), t ? (e = new p.DataProvider.Generic("rsid", function() {
                return t.settings.account
            }), this.dataProvider.register(e)) : this.notify("Missing integration with Analytics: rsid will not be sent.")
        },
        initializeNonHumanDetection: function() {
            I.nonhumandetection ? (I.nonhumandetection.init(), this.setEnableNonHumanDetection(0 == this.settings.enableNonHumanDetection ? !1 : !0), this.settings.nonHumanDetectionDelay > 0 && this.setNonHumanDetectionDelay(1e3 * parseInt(this.settings.nonHumanDetectionDelay))) : this.notify("NHDM is not available.")
        },
        getAnalyticsTool: function() {
            return this.settings.integratesWith ? I.tools[this.settings.integratesWith] : void 0
        },
        flushQueueWhenReady: function() {
            this.enableTracking && this.tabEverVisible && I.poll(I.bind(function() {
                return this.isReadyToTrack() ? (this.flushQueue(), !0) : void 0
            }, this), 100, 20)
        },
        isReadyToTrack: function() {
            return this.tabEverVisible && this.dataProvider.isReady()
        },
        $setVars: function(e, t, n) {
            for (var i in n) {
                var r = n[i];
                "function" == typeof r && (r = r()), this.settings[i] = r
            }
            this.notify("Set variables done", 2), this.prepareContextData()
        },
        $setEnableTracking: function(e, t, n) {
            this.notify("Will" + (n ? "" : " not") + " track time on page", 1), this.enableTracking != n && (this.addRemovePageLeaveEvent(n), this.addRemoveHumanDetectionChangeEvent(n), this.enableTracking = n)
        },
        $sendFirstBeacon: function(e, t, n) {
            this.sendViewBeacon()
        },
        setEnableNonHumanDetection: function(e) {
            e ? I.nonhumandetection.register(this) : I.nonhumandetection.unregister(this)
        },
        setNonHumanDetectionDelay: function(e) {
            I.nonhumandetection.register(this, e)
        },
        addRemovePageLeaveEvent: function(e) {
            this.notify((e ? "Attach onto" : "Detach from") + " page leave event", 1);
            var t = 0 == e ? "unbindEvent" : "bindEvent";
            I[t]("leave", this.onPageLeave)
        },
        addRemoveHumanDetectionChangeEvent: function(e) {
            this.notify((e ? "Attach onto" : "Detach from") + " human detection change event", 1);
            var t = 0 == e ? "unbindEvent" : "bindEvent";
            I[t]("humandetection.change", this.onHumanDetectionChange)
        },
        sendViewBeacon: function() {
            this.notify("Tracked page view.", 1), this.sendBeaconWith()
        },
        sendDurationBeacon: function() {
            if (!I.timetracking || "function" != typeof I.timetracking.timeOnPage || null == I.timetracking.timeOnPage()) return void this.notify("Could not track close due missing time on page", 5);
            this.notify("Tracked close", 1), this.sendBeaconWith({
                timeOnPage: Math.round(I.timetracking.timeOnPage() / 1e3),
                duration: "D",
                timer: "timer"
            });
            var e, t = "";
            for (e = 0; e < this.magicConst; e++) t += "0"
        },
        sendBeaconWith: function(e) {
            this.enableTracking && this[this.beaconMethod].call(this, this.prepareUrl(e))
        },
        plainBeacon: function(e) {
            var t = new Image;
            t.src = e, t.width = 1, t.height = 1, t.alt = ""
        },
        navigatorSendBeacon: function(e) {
            navigator.sendBeacon(e)
        },
        prepareUrl: function(e) {
            var t = this.settings;
            return I.extend(t, this.dataProvider.provide()), I.extend(t, e), this.preparePrefix(this.settings.collectionServer) + this.adapt.convertToURI(this.adapt.toNielsen(this.substituteVariables(t)))
        },
        preparePrefix: function(e) {
            return "//" + encodeURIComponent(e) + ".imrworldwide.com/cgi-bin/gn?"
        },
        substituteVariables: function(e) {
            var t = {};
            for (var n in e) e.hasOwnProperty(n) && (t[n] = I.replace(e[n]));
            return t
        },
        prepareContextData: function() {
            if (!this.getAnalyticsTool()) return void this.notify("Adobe Analytics missing.");
            var e = this.settings;
            e.sdkVersion = _satellite.publishDate, this.getAnalyticsTool().$setVars(null, null, {
                contextData: this.adapt.toAnalytics(this.substituteVariables(e))
            })
        },
        isHuman: function() {
            return this.human
        },
        onTabFocus: function() {},
        onPageLeave: function() {},
        onHumanDetectionChange: function() {},
        notify: function(e, t) {
            I.notify(this.logPrefix + e, t)
        },
        beaconMethod: "plainBeacon",
        adapt: null,
        enableTracking: !1,
        logPrefix: "Nielsen: ",
        tabEverVisible: !1,
        human: !0,
        magicConst: 2e6
    }), p.DataProvider = {}, p.DataProvider.Generic = function(e, t) {
        this.key = e, this.valueFn = t
    }, I.extend(p.DataProvider.Generic.prototype, {
        isReady: function() {
            return !0
        },
        getValue: function() {
            return this.valueFn()
        },
        provide: function() {
            this.isReady() || p.prototype.notify("Not yet ready to provide value for: " + this.key, 5);
            var e = {};
            return e[this.key] = this.getValue(), e
        }
    }), p.DataProvider.VisitorID = function(e, t, n) {
        this.key = t || "uuid", this.visitorInstance = e, this.visitorInstance && (this.visitorId = e.getMarketingCloudVisitorID([this, this._visitorIdCallback])), this.fallbackProvider = n || new p.UUID
    }, I.inherit(p.DataProvider.VisitorID, p.DataProvider.Generic), I.extend(p.DataProvider.VisitorID.prototype, {
        isReady: function() {
            return null === this.visitorInstance ? !0 : !!this.visitorId
        },
        getValue: function() {
            return this.visitorId || this.fallbackProvider.get()
        },
        _visitorIdCallback: function(e) {
            this.visitorId = e
        }
    }), p.DataProvider.Aggregate = function() {
        this.providers = [];
        for (var e = 0; e < arguments.length; e++) this.register(arguments[e])
    }, I.extend(p.DataProvider.Aggregate.prototype, {
        register: function(e) {
            this.providers.push(e)
        },
        isReady: function() {
            return I.every(this.providers, function(e) {
                return e.isReady()
            })
        },
        provide: function() {
            var e = {};
            return I.each(this.providers, function(t) {
                I.extend(e, t.provide())
            }), e
        }
    }), p.UUID = function() {}, I.extend(p.UUID.prototype, {
        generate: function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                var t = 16 * Math.random() | 0,
                    n = "x" == e ? t : 3 & t | 8;
                return n.toString(16)
            })
        },
        get: function() {
            var e = I.readCookie(this.key("uuid"));
            return e ? e : (e = this.generate(), I.setCookie(this.key("uuid"), e), e)
        },
        key: function(e) {
            return "_dtm_nielsen_" + e
        }
    }), p.DataAdapters = function() {}, I.extend(p.DataAdapters.prototype, {
        toNielsen: function(e) {
            var t = (new Date).getTime(),
                i = {
                    c6: "vc,",
                    c13: "asid,",
                    c15: "apn,",
                    c27: "cln,",
                    c32: "segA,",
                    c33: "segB,",
                    c34: "segC,",
                    c35: "adrsid,",
                    c29: "plid,",
                    c30: "bldv,",
                    c40: "adbid,"
                },
                r = {
                    ci: e.clientId,
                    c6: e.vcid,
                    c13: e.appId,
                    c15: e.appName,
                    prv: 1,
                    forward: 0,
                    ad: 0,
                    cr: e.duration || "V",
                    rt: "text",
                    st: "dcr",
                    prd: "dcr",
                    r: t,
                    at: e.timer || "view",
                    c16: e.sdkVersion,
                    c27: e.timeOnPage || 0,
                    c40: e.uuid,
                    c35: e.rsid,
                    ti: t,
                    sup: 0,
                    c32: e.segmentA,
                    c33: e.segmentB,
                    c34: e.segmentC,
                    asn: e.assetName,
                    c29: e.playerID,
                    c30: e.buildVersion
                };
            for (key in r)
                if (r[key] !== n && null != r[key] && r[key] !== n && null != r && "" != r) {
                    var a = encodeURIComponent(r[key]);
                    i.hasOwnProperty(key) && a && (a = i[key] + a), r[key] = a
                }
            return this.filterObject(r)
        },
        toAnalytics: function(e) {
            return this.filterObject({
                "a.nielsen.clientid": e.clientId,
                "a.nielsen.vcid": e.vcid,
                "a.nielsen.appid": e.appId,
                "a.nielsen.appname": e.appName,
                "a.nielsen.accmethod": "0",
                "a.nielsen.ctype": "text",
                "a.nielsen.sega": e.segmentA,
                "a.nielsen.segb": e.segmentB,
                "a.nielsen.segc": e.segmentC,
                "a.nielsen.asset": e.assetName
            })
        },
        convertToURI: function(e) {
            if (I.isObject(e) === !1) return "";
            var t = [];
            for (var n in e) e.hasOwnProperty(n) && t.push(n + "=" + e[n]);
            return t.join("&")
        },
        filterObject: function(e) {
            for (var t in e) !e.hasOwnProperty(t) || null != e[t] && e[t] !== n || delete e[t];
            return e
        }
    }), I.availableTools.nielsen = p, I.inherit(m, I.BaseTool), I.extend(m.prototype, {
        name: "SC",
        endPLPhase: function(e) {
            var t = this.settings.loadOn;
            e === t && this.initialize(e)
        },
        initialize: function(t) {
            if (!this._cancelToolInit)
                if (this.settings.initVars = this.substituteVariables(this.settings.initVars, {
                        type: t
                    }), this.settings.initTool !== !1) {
                    var n = this.settings.sCodeURL || I.basePath() + "s_code.js";
                    "object" == typeof n && (n = "https:" === e.location.protocol ? n.https : n.http), n.match(/^https?:/) || (n = I.basePath() + n), this.settings.initVars && this.$setVars(null, null, this.settings.initVars), I.loadScript(n, I.bind(this.onSCodeLoaded, this)), this.initializing = !0
                } else this.initializing = !0, this.pollForSC()
        },
        getS: function(t, n) {
            var i = n && n.hostname || e.location.hostname,
                r = this.concatWithToolVarBindings(n && n.setVars || this.varBindings),
                a = n && n.addEvent || this.events,
                s = this.getAccount(i),
                o = e.s_gi;
            if (!o) return null;
            if (this.isValidSCInstance(t) || (t = null), !s && !t) return I.notify("Adobe Analytics: tracker not initialized because account was not found", 1), null;
            var t = t || o(s),
                c = "D" + I.appVersion;
            "undefined" != typeof t.tagContainerMarker ? t.tagContainerMarker = c : "string" == typeof t.version && t.version.substring(t.version.length - 5) !== "-" + c && (t.version += "-" + c), t.sa && this.settings.skipSetAccount !== !0 && this.settings.initTool !== !1 && t.sa(this.settings.account), this.applyVarBindingsOnTracker(t, r), a.length > 0 && (t.events = a.join(","));
            var l = I.getVisitorId();
            return l && (t.visitor = I.getVisitorId()), t
        },
        onSCodeLoaded: function(e) {
            this.initialized = !0, this.initializing = !1;
            var t = ["Adobe Analytics: loaded", e ? " (manual)" : "", "."];
            I.notify(t.join(""), 1), I.fireEvent(this.id + ".load", this.getS()), e || (this.flushQueueExceptTrackLink(), this.sendBeacon()), this.flushQueue()
        },
        getAccount: function(t) {
            return e.s_account ? e.s_account : t && this.settings.accountByHost ? this.settings.accountByHost[t] || this.settings.account : this.settings.account
        },
        getTrackingServer: function() {
            var t = this,
                n = t.getS();
            if (n) {
                if (n.ssl && n.trackingServerSecure) return n.trackingServerSecure;
                if (n.trackingServer) return n.trackingServer
            }
            var i = t.getAccount(e.location.hostname);
            if (!i) return null;
            var r, a, s, o = "",
                c = n && n.dc;
            return r = i, a = r.indexOf(","), a >= 0 && (r = r.gb(0, a)), r = r.replace(/[^A-Za-z0-9]/g, ""), o || (o = "2o7.net"), c = c ? ("" + c).toLowerCase() : "d1", "2o7.net" == o && ("d1" == c ? c = "112" : "d2" == c && (c = "122"), s = ""), a = r + "." + c + "." + s + o
        },
        sendBeacon: function() {
            var t = this.getS(e[this.settings.renameS || "s"]);
            return t ? this.settings.customInit && this.settings.customInit(t) === !1 ? void I.notify("Adobe Analytics: custom init suppressed beacon", 1) : (this.settings.executeCustomPageCodeFirst && this.applyVarBindingsOnTracker(t, this.varBindings), this.executeCustomSetupFuns(t), t.t(), this.clearVarBindings(), this.clearCustomSetup(), void I.notify("Adobe Analytics: tracked page view", 1)) : void I.notify("Adobe Analytics: page code not loaded", 1)
        },
        pollForSC: function() {
            I.poll(I.bind(function() {
                return "function" == typeof e.s_gi ? (this.onSCodeLoaded(!0), !0) : void 0
            }, this))
        },
        flushQueueExceptTrackLink: function() {
            if (this.pending) {
                for (var e = [], t = 0; t < this.pending.length; t++) {
                    var n = this.pending[t],
                        i = n[0];
                    "trackLink" === i.command ? e.push(n) : this.triggerCommand.apply(this, n)
                }
                this.pending = e
            }
        },
        isQueueAvailable: function() {
            return !this.initialized
        },
        substituteVariables: function(e, t) {
            var n = {};
            for (var i in e)
                if (e.hasOwnProperty(i)) {
                    var r = e[i];
                    n[i] = I.replace(r, location, t)
                }
            return n
        },
        $setVars: function(e, t, n) {
            for (var i in n)
                if (n.hasOwnProperty(i)) {
                    var r = n[i];
                    "function" == typeof r && (r = r()), this.varBindings[i] = r
                }
            I.notify("Adobe Analytics: set variables.", 2)
        },
        $customSetup: function(e, t, n) {
            this.customSetupFuns.push(function(i) {
                n.call(e, t, i)
            })
        },
        isValidSCInstance: function(e) {
            return !!e && "function" == typeof e.t && "function" == typeof e.tl
        },
        concatWithToolVarBindings: function(e) {
            var t = this.settings.initVars || {};
            return I.map(["trackingServer", "trackingServerSecure"], function(n) {
                t[n] && !e[n] && (e[n] = t[n])
            }), e
        },
        applyVarBindingsOnTracker: function(e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        },
        clearVarBindings: function() {
            this.varBindings = {}
        },
        clearCustomSetup: function() {
            this.customSetupFuns = []
        },
        executeCustomSetupFuns: function(t) {
            I.each(this.customSetupFuns, function(n) {
                n.call(e, t)
            })
        },
        $trackLink: function(e, t, n) {
            n = n || {};
            var i = n.type,
                r = n.linkName;
            !r && e && e.nodeName && "a" === e.nodeName.toLowerCase() && (r = e.innerHTML), r || (r = "link clicked");
            var a = n && n.setVars,
                s = n && n.addEvent || [],
                o = this.getS(null, {
                    setVars: a,
                    addEvent: s
                });
            if (!o) return void I.notify("Adobe Analytics: page code not loaded", 1);
            var c = o.linkTrackVars,
                l = o.linkTrackEvents,
                u = this.definedVarNames(a);
            n && n.customSetup && n.customSetup.call(e, t, o), s.length > 0 && u.push("events"), o.products && u.push("products"), u = this.mergeTrackLinkVars(o.linkTrackVars, u), s = this.mergeTrackLinkVars(o.linkTrackEvents, s), o.linkTrackVars = this.getCustomLinkVarsList(u);
            var f = I.map(s, function(e) {
                return e.split(":")[0]
            });
            o.linkTrackEvents = this.getCustomLinkVarsList(f), o.tl(!0, i || "o", r), I.notify(["Adobe Analytics: tracked link ", "using: linkTrackVars=", I.stringify(o.linkTrackVars), "; linkTrackEvents=", I.stringify(o.linkTrackEvents)].join(""), 1), o.linkTrackVars = c, o.linkTrackEvents = l
        },
        mergeTrackLinkVars: function(e, t) {
            return e && (t = e.split(",").concat(t)), t
        },
        getCustomLinkVarsList: function(e) {
            var t = I.indexOf(e, "None");
            return t > -1 && e.length > 1 && e.splice(t, 1), e.join(",")
        },
        definedVarNames: function(e) {
            e = e || this.varBindings;
            var t = [];
            for (var n in e) e.hasOwnProperty(n) && /^(eVar[0-9]+)|(prop[0-9]+)|(hier[0-9]+)|campaign|purchaseID|channel|server|state|zip|pageType$/.test(n) && t.push(n);
            return t
        },
        $trackPageView: function(e, t, n) {
            var i = n && n.setVars,
                r = n && n.addEvent || [],
                a = this.getS(null, {
                    setVars: i,
                    addEvent: r
                });
            return a ? (a.linkTrackVars = "", a.linkTrackEvents = "", this.executeCustomSetupFuns(a), n && n.customSetup && n.customSetup.call(e, t, a), a.t(), this.clearVarBindings(), this.clearCustomSetup(), void I.notify("Adobe Analytics: tracked page view", 1)) : void I.notify("Adobe Analytics: page code not loaded", 1)
        },
        $postTransaction: function(t, n, i) {
            var r = I.data.transaction = e[i],
                a = this.varBindings,
                s = this.settings.fieldVarMapping;
            if (I.each(r.items, function(e) {
                    this.products.push(e)
                }, this), a.products = I.map(this.products, function(e) {
                    var t = [];
                    if (s && s.item)
                        for (var n in s.item)
                            if (s.item.hasOwnProperty(n)) {
                                var i = s.item[n];
                                t.push(i + "=" + e[n]), "event" === i.substring(0, 5) && this.events.push(i)
                            }
                    var r = ["", e.product, e.quantity, e.unitPrice * e.quantity];
                    return t.length > 0 && r.push(t.join("|")), r.join(";")
                }, this).join(","), s && s.transaction) {
                var o = [];
                for (var c in s.transaction)
                    if (s.transaction.hasOwnProperty(c)) {
                        var i = s.transaction[c];
                        o.push(i + "=" + r[c]), "event" === i.substring(0, 5) && this.events.push(i)
                    }
                a.products.length > 0 && (a.products += ","), a.products += ";;;;" + o.join("|")
            }
        },
        $addEvent: function(e, t) {
            for (var n = 2, i = arguments.length; i > n; n++) this.events.push(arguments[n])
        },
        $addProduct: function(e, t) {
            for (var n = 2, i = arguments.length; i > n; n++) this.products.push(arguments[n])
        }
    }), I.availableTools.sc = m, I.inherit(v, I.BaseTool), I.extend(v.prototype, {
        name: "Default",
        $loadIframe: function(t, n, i) {
            var r = i.pages,
                a = i.loadOn,
                s = I.bind(function() {
                    I.each(r, function(e) {
                        this.loadIframe(t, n, e)
                    }, this)
                }, this);
            a || s(), "domready" === a && I.domReady(s), "load" === a && I.addEventHandler(e, "load", s)
        },
        loadIframe: function(e, n, i) {
            var r = t.createElement("iframe");
            r.style.display = "none";
            var a = I.data.host,
                s = i.data,
                o = this.scriptURL(i.src),
                c = I.searchVariables(s, e, n);
            a && (o = I.basePath() + o), o += c, r.src = o;
            var l = t.getElementsByTagName("body")[0];
            l ? l.appendChild(r) : I.domReady(function() {
                t.getElementsByTagName("body")[0].appendChild(r)
            })
        },
        scriptURL: function(e) {
            var t = I.settings.scriptDir || "";
            return t + e
        },
        $loadScript: function(t, n, i) {
            var r = i.scripts,
                a = i.sequential,
                s = i.loadOn,
                o = I.bind(function() {
                    a ? this.loadScripts(t, n, r) : I.each(r, function(e) {
                        this.loadScripts(t, n, [e])
                    }, this)
                }, this);
            s ? "domready" === s ? I.domReady(o) : "load" === s && I.addEventHandler(e, "load", o) : o()
        },
        loadScripts: function(e, t, n) {
            function i() {
                if (a.length > 0 && r) {
                    var c = a.shift();
                    c.call(e, t, s)
                }
                var l = n.shift();
                if (l) {
                    var u = I.data.host,
                        f = o.scriptURL(l.src);
                    u && (f = I.basePath() + f), r = l, I.loadScript(f, i)
                }
            }
            try {
                var r, n = n.slice(0),
                    a = this.asyncScriptCallbackQueue,
                    s = t.target || t.srcElement,
                    o = this
            } catch (c) {
                console.error("scripts is", I.stringify(n))
            }
            i()
        },
        $loadBlockingScript: function(e, t, n) {
            var i = n.scripts,
                r = (n.loadOn, I.bind(function() {
                    I.each(i, function(n) {
                        this.loadBlockingScript(e, t, n)
                    }, this)
                }, this));
            r()
        },
        loadBlockingScript: function(e, t, n) {
            var i = this.scriptURL(n.src),
                r = I.data.host,
                a = t.target || t.srcElement;
            r && (i = I.basePath() + i), this.argsForBlockingScripts.push([e, t, a]), I.loadScriptSync(i)
        },
        pushAsyncScript: function(e) {
            this.asyncScriptCallbackQueue.push(e)
        },
        pushBlockingScript: function(e) {
            var t = this.argsForBlockingScripts.shift(),
                n = t[0];
            e.apply(n, t.slice(1))
        },
        $writeHTML: I.escapeHtmlParams(function(e, n) {
            if (I.domReadyFired || !t.write) return void I.notify("Command writeHTML failed. You should try appending HTML using the async option.", 1);
            if ("pagebottom" !== n.type && "pagetop" !== n.type) return void I.notify("You can only use writeHTML on the `pagetop` and `pagebottom` events.", 1);
            for (var i = 2, r = arguments.length; r > i; i++) {
                var a = arguments[i].html;
                a = I.replace(a, e, n), t.write(a)
            }
        }),
        linkNeedsDelayActivate: function(t, n) {
            n = n || e;
            var i = t.tagName,
                r = t.getAttribute("target"),
                a = t.getAttribute("href");
            return i && "a" !== i.toLowerCase() ? !1 : a ? r ? "_blank" === r ? !1 : "_top" === r ? n.top === n : "_parent" === r ? !1 : "_self" === r ? !0 : n.name ? r === n.name : !0 : !0 : !1
        },
        $delayActivateLink: function(e, t) {
            if (this.linkNeedsDelayActivate(e)) {
                I.preventDefault(t);
                var n = I.settings.linkDelay || 100;
                setTimeout(function() {
                    I.setLocation(e.href)
                }, n)
            }
        },
        isQueueable: function(e) {
            return "writeHTML" !== e.command
        }
    }), I.availableTools["default"] = v, I.inherit(y, I.BaseTool), I.extend(y.prototype, {
        initialize: function() {
            var e = this.settings;
            if (this.settings.initTool !== !1) {
                var t = e.url;
                t = "string" == typeof t ? I.basePath() + t : I.isHttps() ? t.https : t.http, I.loadScript(t, I.bind(this.onLoad, this)), this.initializing = !0
            } else this.initialized = !0
        },
        isQueueAvailable: function() {
            return !this.initialized
        },
        onLoad: function() {
            this.initialized = !0, this.initializing = !1, this.settings.initialBeacon && this.settings.initialBeacon(), this.flushQueue()
        },
        endPLPhase: function(e) {
            var t = this.settings.loadOn;
            e === t && (I.notify(this.name + ": Initializing at " + e, 1), this.initialize())
        },
        $fire: function(e, t, n) {
            return this.initializing ? void this.queueCommand({
                command: "fire",
                arguments: [n]
            }, e, t) : void n.call(this.settings, e, t)
        }
    }), I.availableTools.am = y, I.availableTools.adlens = y, I.availableTools.aem = y, I.availableTools.__basic = y, I.extend(b.prototype, {
        getInstance: function() {
            return this.instance
        },
        initialize: function() {
            var e, t = this.settings;
            I.notify("Visitor ID: Initializing tool", 1), e = this.createInstance(t.mcOrgId, t.initVars), null !== e && (t.customerIDs && this.applyCustomerIDs(e, t.customerIDs), t.autoRequest && e.getMarketingCloudVisitorID(), this.instance = e)
        },
        createInstance: function(e, t) {
            if (!I.isString(e)) return I.notify('Visitor ID: Cannot create instance using mcOrgId: "' + e + '"', 4), null;
            e = I.replace(e), I.notify('Visitor ID: Create instance using mcOrgId: "' + e + '"', 1), t = this.parseValues(t);
            var n = Visitor.getInstance(e, t);
            return I.notify("Visitor ID: Set variables: " + I.stringify(t), 1), n
        },
        applyCustomerIDs: function(e, t) {
            var n = this.parseIds(t);
            e.setCustomerIDs(n), I.notify("Visitor ID: Set Customer IDs: " + I.stringify(n), 1)
        },
        parseValues: function(e) {
            if (I.isObject(e) === !1) return {};
            var t = {};
            for (var n in e) e.hasOwnProperty(n) && (t[n] = I.replace(e[n]));
            return t
        },
        parseIds: function(e) {
            var t = {};
            if (I.isObject(e) === !1) return {};
            for (var n in e)
                if (e.hasOwnProperty(n)) {
                    var i = I.replace(e[n].id);
                    i !== e[n].id && i && (t[n] = {}, t[n].id = i, t[n].authState = Visitor.AuthState[e[n].authState])
                }
            return t
        }
    }), I.availableTools.visitor_id = b;
    var k = {
        allowLinker: function() {
            return I.hasMultipleDomains()
        },
        cookieDomain: function() {
            var t = I.settings.domainList,
                n = I.find(t, function(t) {
                    var n = e.location.hostname;
                    return I.equalsIgnoreCase(n.slice(n.length - t.length), t)
                }),
                i = n ? "." + n : "auto";
            return i;
        }
    };
    I.inherit(S, I.BaseTool), I.extend(S.prototype, {
        name: "GAUniversal",
        endPLPhase: function(e) {
            var t = this.settings,
                n = t.loadOn;
            e === n && (I.notify("GAU: Initializing at " + e, 1), this.initialize(), this.flushQueue(), this.trackInitialPageView())
        },
        getTrackerName: function() {
            return this.settings.trackerSettings.name || ""
        },
        isPageCodeLoadSuppressed: function() {
            return this.settings.initTool === !1 || this._cancelToolInit === !0
        },
        initialize: function() {
            if (this.isPageCodeLoadSuppressed()) return this.initialized = !0, void I.notify("GAU: Page code not loaded (suppressed).", 1);
            var t = "ga";
            e[t] = e[t] || this.createGAObject(), e.GoogleAnalyticsObject = t, I.notify("GAU: Page code loaded.", 1), I.loadScriptOnce(this.getToolUrl());
            var n = this.settings;
            if (k.allowLinker() && n.allowLinker !== !1 ? this.createAccountForLinker() : this.createAccount(), this.executeInitCommands(), n.customInit) {
                var i = n.customInit,
                    r = i(e[t], this.getTrackerName());
                r === !1 && (this.suppressInitialPageView = !0)
            }
            this.initialized = !0
        },
        createGAObject: function() {
            var e = function() {
                e.q.push(arguments)
            };
            return e.q = [], e.l = 1 * new Date, e
        },
        createAccount: function() {
            this.create()
        },
        createAccountForLinker: function() {
            var e = {};
            k.allowLinker() && (e.allowLinker = !0), this.create(e), this.call("require", "linker"), this.call("linker:autoLink", this.autoLinkDomains(), !1, !0)
        },
        create: function(e) {
            var t = this.settings.trackerSettings;
            t = I.preprocessArguments([t], location, null, this.forceLowerCase)[0], t.trackingId = I.replace(this.settings.trackerSettings.trackingId, location), t.cookieDomain || (t.cookieDomain = k.cookieDomain()), I.extend(t, e || {}), this.call("create", t)
        },
        autoLinkDomains: function() {
            var e = location.hostname;
            return I.filter(I.settings.domainList, function(t) {
                return t !== e
            })
        },
        executeInitCommands: function() {
            var e = this.settings;
            e.initCommands && I.each(e.initCommands, function(e) {
                var t = e.splice(2, e.length - 2);
                e = e.concat(I.preprocessArguments(t, location, null, this.forceLowerCase)), this.call.apply(this, e)
            }, this)
        },
        trackInitialPageView: function() {
            this.suppressInitialPageView || this.isPageCodeLoadSuppressed() || this.call("send", "pageview")
        },
        call: function() {
            return "function" != typeof ga ? void I.notify("GA Universal function not found!", 4) : void(this.isCallSuppressed() || (arguments[0] = this.cmd(arguments[0]), this.log(I.toArray(arguments)), ga.apply(e, arguments)))
        },
        isCallSuppressed: function() {
            return this._cancelToolInit === !0
        },
        $missing$: function(e, t, n, i) {
            i = i || [], i = [e].concat(i), this.call.apply(this, i)
        },
        getToolUrl: function() {
            var e = this.settings,
                t = I.isHttps();
            return e.url ? t ? e.url.https : e.url.http : (t ? "https://ssl" : "http://www") + ".google-analytics.com/analytics.js"
        },
        cmd: function(e) {
            var t = ["send", "set", "get"],
                n = this.getTrackerName();
            return n && -1 !== I.indexOf(t, e) ? n + "." + e : e
        },
        log: function(e) {
            var t = e[0],
                n = this.getTrackerName() || "default",
                i = "GA Universal: sent command " + t + " to tracker " + n;
            if (e.length > 1) {
                I.stringify(e.slice(1));
                i += " with parameters " + I.stringify(e.slice(1))
            }
            i += ".", I.notify(i, 1)
        }
    }), I.availableTools.ga_universal = S, I.inherit(_, I.BaseTool), I.extend(_.prototype, {
        name: "GA",
        initialize: function() {
            var t = this.settings,
                n = e._gaq,
                i = t.initCommands || [],
                r = t.customInit;
            if (n || (_gaq = []), this.isSuppressed()) I.notify("GA: page code not loaded(suppressed).", 1);
            else {
                if (!n && !_.scriptLoaded) {
                    var a = I.isHttps(),
                        s = (a ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
                    t.url && (s = a ? t.url.https : t.url.http), I.loadScript(s), _.scriptLoaded = !0, I.notify("GA: page code loaded.", 1)
                }
                var o = (t.domain, t.trackerName),
                    c = k.allowLinker(),
                    l = I.replace(t.account, location);
                I.settings.domainList || [];
                _gaq.push([this.cmd("setAccount"), l]), c && _gaq.push([this.cmd("setAllowLinker"), c]), _gaq.push([this.cmd("setDomainName"), k.cookieDomain()]), I.each(i, function(e) {
                    var t = [this.cmd(e[0])].concat(I.preprocessArguments(e.slice(1), location, null, this.forceLowerCase));
                    _gaq.push(t)
                }, this), r && (this.suppressInitialPageView = !1 === r(_gaq, o)), t.pageName && this.$overrideInitialPageView(null, null, t.pageName)
            }
            this.initialized = !0, I.fireEvent(this.id + ".configure", _gaq, o)
        },
        isSuppressed: function() {
            return this._cancelToolInit || this.settings.initTool === !1
        },
        tracker: function() {
            return this.settings.trackerName
        },
        cmd: function(e) {
            var t = this.tracker();
            return t ? t + "._" + e : "_" + e
        },
        $overrideInitialPageView: function(e, t, n) {
            this.urlOverride = n
        },
        trackInitialPageView: function() {
            if (!this.isSuppressed() && !this.suppressInitialPageView)
                if (this.urlOverride) {
                    var e = I.preprocessArguments([this.urlOverride], location, null, this.forceLowerCase);
                    this.$missing$("trackPageview", null, null, e)
                } else this.$missing$("trackPageview")
        },
        endPLPhase: function(e) {
            var t = this.settings.loadOn;
            e === t && (I.notify("GA: Initializing at " + e, 1), this.initialize(), this.flushQueue(), this.trackInitialPageView())
        },
        call: function(e, t, n, i) {
            if (!this._cancelToolInit) {
                var r = (this.settings, this.tracker()),
                    a = this.cmd(e),
                    i = i ? [a].concat(i) : [a];
                _gaq.push(i), r ? I.notify("GA: sent command " + e + " to tracker " + r + (i.length > 1 ? " with parameters [" + i.slice(1).join(", ") + "]" : "") + ".", 1) : I.notify("GA: sent command " + e + (i.length > 1 ? " with parameters [" + i.slice(1).join(", ") + "]" : "") + ".", 1)
            }
        },
        $missing$: function(e, t, n, i) {
            this.call(e, t, n, i)
        },
        $postTransaction: function(t, n, i) {
            var r = I.data.customVars.transaction = e[i];
            this.call("addTrans", t, n, [r.orderID, r.affiliation, r.total, r.tax, r.shipping, r.city, r.state, r.country]), I.each(r.items, function(e) {
                this.call("addItem", t, n, [e.orderID, e.sku, e.product, e.category, e.unitPrice, e.quantity])
            }, this), this.call("trackTrans", t, n)
        },
        delayLink: function(e, t) {
            var n = this;
            if (k.allowLinker() && e.hostname.match(this.settings.linkerDomains) && !I.isSubdomainOf(e.hostname, location.hostname)) {
                I.preventDefault(t);
                var i = I.settings.linkDelay || 100;
                setTimeout(function() {
                    n.call("link", e, t, [e.href])
                }, i)
            }
        },
        popupLink: function(t, n) {
            if (e._gat) {
                I.preventDefault(n);
                var i = this.settings.account,
                    r = e._gat._createTracker(i),
                    a = r._getLinkerUrl(t.href);
                e.open(a)
            }
        },
        $link: function(e, t) {
            "_blank" === e.getAttribute("target") ? this.popupLink(e, t) : this.delayLink(e, t)
        },
        $trackEvent: function(e, t) {
            var n = Array.prototype.slice.call(arguments, 2);
            if (n.length >= 4 && null != n[3]) {
                var i = parseInt(n[3], 10);
                I.isNaN(i) && (i = 1), n[3] = i
            }
            this.call("trackEvent", e, t, n)
        }
    }), I.availableTools.ga = _, _satellite.init({
        tools: {
            "0a7b952a556c43e93af085cdb03987da98b5c5ef": {
                engine: "aem",
                name: "AEM"
            },
            "041e0a21e9c65b5d8370cc500d71d3c14b4714f8": {
                engine: "am",
                loadOn: "pagetop",
                name: "AudienceManager",
                initTool: !0,
                url: "9708e57c8de6ec6716f79f649f73ccd0435014fb/dil-contents-041e0a21e9c65b5d8370cc500d71d3c14b4714f8-staging.js"
            },
            "22ac00d90aa1fd5f244c4d32570dccab": {
                engine: "sc",
                loadOn: "pagetop",
                account: "chakhursamc",
                euCookie: !1,
                sCodeURL: "9708e57c8de6ec6716f79f649f73ccd0435014fb/s-code-contents-0f3e2adb553a4f4d35bacc3df758ce09a92e221e-staging.js",
                renameS: "s",
                initVars: {
                    charSet: "UTF-8",
                    currencyCode: "GBP",
                    trackingServer: "chakhursamc.d3.sc.omtrdc.net",
                    pageName: "%Page Name%",
                    channel: "%Site section%",
                    trackInlineStats: !0,
                    trackDownloadLinks: !0,
                    linkDownloadFileTypes: "avi,css,csv,doc,docx,eps,exe,jpg,js,m4v,mov,mp3,pdf,png,ppt,pptx,rar,svg,tab,txt,vsd,vxd,wav,wma,wmv,xls,xlsx,xml,zip",
                    trackExternalLinks: !0,
                    linkInternalFilters: "javascript:,mailto:,tel:",
                    linkLeaveQueryString: !1,
                    dynamicVariablePrefix: "D=",
                    eVar1: "%Page Name%",
                    eVar2: "%crmid%",
                    eVar3: "%Logged In%",
                    eVar4: "%Campaign Code%",
                    prop1: "D=v1",
                    prop2: "D=v2"
                },
                customInit: function(e) {
                    e.loadModule("AudienceManagement"), e.AudienceManagement.setup({
                        partner: "chrisakhurst",
                        containerNSID: 0,
                        disableDefaultRequest: !0,
                        disableScriptAttachment: !0
                    })
                }
            },
            "57839157254be9218ad4e307836dd8cb2a88ef54": {
                engine: "tnt",
                mboxURL: "9708e57c8de6ec6716f79f649f73ccd0435014fb/mbox-contents-57839157254be9218ad4e307836dd8cb2a88ef54-staging.js",
                loadSync: !0,
                pageParams: {
                    "AAM-Cookie": "%Customer Level%"
                }
            },
            eedbcf6a607b55c2cf1ab48f96bea479def1bf34: {
                engine: "visitor_id",
                loadOn: "pagetop",
                name: "VisitorID",
                mcOrgId: "23D13BC75244578E0A490D4D@AdobeOrg",
                autoRequest: !0,
                initVars: {
                    trackingServer: "chakhursamc.d3.sc.omtrdc.net",
                    serverState: "%serverState%"
                },
                customerIDs: {
                    crmid: {
                        id: "%crmid%",
                        authState: "AUTHENTICATED"
                    }
                }
            }
        },
        pageLoadRules: [{
            name: "Colour",
            trigger: [{
                engine: "sc",
                command: "setVars",
                arguments: [{
                    prop3: "%Colour%"
                }]
            }],
            conditions: [function() {
                return _satellite.textMatch(_satellite.getQueryParam("colour"), /[a-z0-9]/i)
            }],
            event: "pagetop"
        }],
        rules: [{
            name: "(Rule for AAM integration)",
            event: "22ac00d90aa1fd5f244c4d32570dccab.load",
            trigger: [{
                tool: "041e0a21e9c65b5d8370cc500d71d3c14b4714f8",
                command: "fire",
                arguments: [function(e) {
                    var t = "chakhursamc",
                        n = DIL.create({
                            partner: "chrisakhurst",
                            uuidCookie: {
                                name: "aam_uuid",
                                days: 30
                            },
                            visitorService: {
                                namespace: "23D13BC75244578E0A490D4D@AdobeOrg"
                            }
                        }),
                        i = s_gi(t);
                    DIL.modules.siteCatalyst.init(i, n, {
                        names: ["pageName", "channel", "campaign", "products", "events", "pe", "referrer", "server", "purchaseID", "zip", "state"],
                        iteratedNames: [{
                            name: "eVar",
                            maxIndex: 100
                        }, {
                            name: "prop",
                            maxIndex: 75
                        }, {
                            name: "pev",
                            maxIndex: 3
                        }, {
                            name: "hier",
                            maxIndex: 4
                        }]
                    })
                }]
            }]
        }],
        directCallRules: [],
        settings: {
            trackInternalLinks: !0,
            libraryName: "satelliteLib-73956fb78a3a18934d9d9faf1e9eab2ade48ecb5",
            isStaging: !0,
            allowGATTcalls: !1,
            downloadExtensions: /\.(?:doc|docx|eps|jpg|png|svg|xls|ppt|pptx|pdf|xlsx|tab|csv|zip|txt|vsd|vxd|xml|js|css|rar|exe|wma|mov|avi|wmv|mp3|wav|m4v)($|\&|\?)/i,
            notifications: !1,
            utilVisible: !1,
            domainList: ["localhost"],
            scriptDir: "9708e57c8de6ec6716f79f649f73ccd0435014fb/scripts/",
            tagTimeout: 3e3
        },
        data: {
            URI: t.location.pathname + t.location.search,
            browser: {},
            cartItems: [],
            revenue: "",
            host: {
                http: "assets.adobedtm.com",
                https: "assets.adobedtm.com"
            }
        },
        dataElements: {
            "AEM Page name": {
                contextHub: function() {
                    try {
                        return ContextHub.getItem("pagedata").title
                    } catch (e) {
                        I.notify(e.name + " - " + e.message, 4)
                    }
                },
                storeLength: "pageview"
            },
            "Campaign Code": {
                queryParam: "cmp",
                storeLength: "pageview",
                ignoreCase: 1
            },
            Colour: {
                queryParam: "colour",
                storeLength: "pageview",
                ignoreCase: 1
            },
            crmid: {
                jsVariable: "dataLayer.crmid",
                storeLength: "pageview"
            },
            serverState: {
                jsVariable: "serverState",
                storeLength: "pageview"
            },
            "Customer Level": {
                cookie: "aam_webpage",
                storeLength: "pageview"
            },
            "Logged In": {
                customJS: function() {
                    return "" != _satellite.getVar("crmid") ? "Logged In" : void 0
                },
                "default": "Not-Logged In",
                storeLength: "pageview"
            },
            "Page Name": {
                jsVariable: "dataLayer.pagename",
                storeLength: "pageview"
            },
            "Site Section": {
                contextHub: function() {
                    try {
                        return ContextHub.getItem("pagedata").sitesection
                    } catch (e) {
                        I.notify(e.name + " - " + e.message, 4)
                    }
                },
                storeLength: "pageview"
            }
        },
        appVersion: "7QN",
        buildDate: "2017-06-12 16:29:29 UTC",
        publishDate: "2017-01-04 15:14:55 UTC"
    })
}(window, document);