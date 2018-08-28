var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of as observableOf } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { NB_WINDOW } from '@nebular/theme';
import { NbAuthStrategy } from '../auth-strategy';
import { NbAuthResult } from '../../services/';
import { NbOAuth2ResponseType, auth2StrategyOptions } from './oauth2-strategy.options';
/**
 * OAuth2 authentication strategy.
 *
 * Strategy settings:
 *
 * ```ts
 * export enum NbOAuth2ResponseType {
 *   CODE = 'code',
 *   TOKEN = 'token',
 * }
 *
 * export enum NbOAuth2GrantType {
 *   AUTHORIZATION_CODE = 'authorization_code',
 *   REFRESH_TOKEN = 'refresh_token',
 * }
 *
 * export class NbOAuth2AuthStrategyOptions {
 *   name: string;
 *   baseEndpoint?: string = '';
 *   clientId: string = '';
 *   clientSecret: string = '';
 *   redirect?: { success?: string; failure?: string } = {
 *     success: '/',
 *     failure: null,
 *   };
 *   defaultErrors?: any[] = ['Something went wrong, please try again.'];
 *   defaultMessages?: any[] = ['You have been successfully authenticated.'];
 *   authorize?: {
 *     endpoint?: string;
 *     redirectUri?: string;
 *     responseType?: string;
 *     scope?: string;
 *     state?: string;
 *     params?: { [key: string]: string };
 *   } = {
 *     endpoint: 'authorize',
 *     responseType: NbOAuth2ResponseType.CODE,
 *   };
 *   token?: {
 *     endpoint?: string;
 *     grantType?: string;
 *     redirectUri?: string;
 *     class: NbAuthTokenClass,
 *   } = {
 *     endpoint: 'token',
 *     grantType: NbOAuth2GrantType.AUTHORIZATION_CODE,
 *     class: NbAuthOAuth2Token,
 *   };
 *   refresh?: {
 *     endpoint?: string;
 *     grantType?: string;
 *     scope?: string;
 *   } = {
 *     endpoint: 'token',
 *     grantType: NbOAuth2GrantType.REFRESH_TOKEN,
 *   };
 * }
 * ```
 *
 */
var NbOAuth2AuthStrategy = /** @class */ (function (_super) {
    __extends(NbOAuth2AuthStrategy, _super);
    function NbOAuth2AuthStrategy(http, route, window) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.route = route;
        _this.window = window;
        _this.redirectResultHandlers = (_a = {},
            _a[NbOAuth2ResponseType.CODE] = function () {
                return observableOf(_this.route.snapshot.queryParams).pipe(switchMap(function (params) {
                    if (params.code) {
                        return _this.requestToken(params.code);
                    }
                    return observableOf(new NbAuthResult(false, params, _this.getOption('redirect.failure'), _this.getOption('defaultErrors'), []));
                }));
            },
            _a[NbOAuth2ResponseType.TOKEN] = function () {
                return observableOf(_this.route.snapshot.fragment).pipe(map(function (fragment) { return _this.parseHashAsQueryParams(fragment); }), map(function (params) {
                    if (!params.error) {
                        return new NbAuthResult(true, params, _this.getOption('redirect.success'), [], _this.getOption('defaultMessages'), _this.createToken(params));
                    }
                    return new NbAuthResult(false, params, _this.getOption('redirect.failure'), _this.getOption('defaultErrors'), []);
                }));
            },
            _a);
        _this.redirectResults = (_b = {},
            _b[NbOAuth2ResponseType.CODE] = function () {
                return observableOf(_this.route.snapshot.queryParams).pipe(map(function (params) { return !!(params && (params.code || params.error)); }));
            },
            _b[NbOAuth2ResponseType.TOKEN] = function () {
                return observableOf(_this.route.snapshot.fragment).pipe(map(function (fragment) { return _this.parseHashAsQueryParams(fragment); }), map(function (params) { return !!(params && (params.access_token || params.error)); }));
            },
            _b);
        _this.defaultOptions = auth2StrategyOptions;
        return _this;
        var _a, _b;
    }
    NbOAuth2AuthStrategy.setup = function (options) {
        return [NbOAuth2AuthStrategy, options];
    };
    Object.defineProperty(NbOAuth2AuthStrategy.prototype, "responseType", {
        get: function () {
            return this.getOption('authorize.responseType');
        },
        enumerable: true,
        configurable: true
    });
    NbOAuth2AuthStrategy.prototype.authenticate = function () {
        var _this = this;
        return this.isRedirectResult()
            .pipe(switchMap(function (result) {
            if (!result) {
                _this.authorizeRedirect();
                return observableOf(new NbAuthResult(true));
            }
            return _this.getAuthorizationResult();
        }));
    };
    NbOAuth2AuthStrategy.prototype.getAuthorizationResult = function () {
        var redirectResultHandler = this.redirectResultHandlers[this.responseType];
        if (redirectResultHandler) {
            return redirectResultHandler.call(this);
        }
        throw new Error("'" + this.responseType + "' responseType is not supported,\n                      only 'token' and 'code' are supported now");
    };
    NbOAuth2AuthStrategy.prototype.refreshToken = function (token) {
        var _this = this;
        var url = this.getActionEndpoint('refresh');
        return this.http.post(url, this.buildRefreshRequestData(token))
            .pipe(map(function (res) {
            return new NbAuthResult(true, res, _this.getOption('redirect.success'), [], _this.getOption('defaultMessages'), _this.createToken(res));
        }), catchError(function (res) {
            var errors = [];
            if (res instanceof HttpErrorResponse) {
                errors = _this.getOption('defaultErrors');
            }
            else {
                errors.push('Something went wrong.');
            }
            return observableOf(new NbAuthResult(false, res, _this.getOption('redirect.failure'), errors, []));
        }));
    };
    NbOAuth2AuthStrategy.prototype.authorizeRedirect = function () {
        this.window.location.href = this.buildRedirectUrl();
    };
    NbOAuth2AuthStrategy.prototype.isRedirectResult = function () {
        return this.redirectResults[this.responseType].call(this);
    };
    NbOAuth2AuthStrategy.prototype.requestToken = function (code) {
        var _this = this;
        var url = this.getActionEndpoint('token');
        return this.http.post(url, this.buildCodeRequestData(code))
            .pipe(map(function (res) {
            return new NbAuthResult(true, res, _this.getOption('redirect.success'), [], _this.getOption('defaultMessages'), _this.createToken(res));
        }), catchError(function (res) {
            var errors = [];
            if (res instanceof HttpErrorResponse) {
                errors = _this.getOption('defaultErrors');
            }
            else {
                errors.push('Something went wrong.');
            }
            return observableOf(new NbAuthResult(false, res, _this.getOption('redirect.failure'), errors, []));
        }));
    };
    NbOAuth2AuthStrategy.prototype.buildCodeRequestData = function (code) {
        var params = {
            grant_type: this.getOption('token.grantType'),
            code: code,
            redirect_uri: this.getOption('token.redirectUri'),
            client_id: this.getOption('clientId'),
        };
        Object.entries(params)
            .forEach(function (_a) {
            var key = _a[0], val = _a[1];
            return !val && delete params[key];
        });
        return params;
    };
    NbOAuth2AuthStrategy.prototype.buildRefreshRequestData = function (token) {
        var params = {
            grant_type: this.getOption('refresh.grantType'),
            refresh_token: token.getRefreshToken(),
            scope: this.getOption('refresh.scope'),
        };
        Object.entries(params)
            .forEach(function (_a) {
            var key = _a[0], val = _a[1];
            return !val && delete params[key];
        });
        return params;
    };
    NbOAuth2AuthStrategy.prototype.buildRedirectUrl = function () {
        var params = __assign({ response_type: this.getOption('authorize.responseType'), client_id: this.getOption('clientId'), redirect_uri: this.getOption('authorize.redirectUri'), scope: this.getOption('authorize.scope'), state: this.getOption('authorize.state') }, this.getOption('authorize.params'));
        var endpoint = this.getActionEndpoint('authorize');
        var query = Object.entries(params)
            .filter(function (_a) {
            var key = _a[0], val = _a[1];
            return !!val;
        })
            .map(function (_a) {
            var key = _a[0], val = _a[1];
            return key + "=" + encodeURIComponent(val);
        })
            .join('&');
        return endpoint + "?" + query;
    };
    NbOAuth2AuthStrategy.prototype.parseHashAsQueryParams = function (hash) {
        return hash ? hash.split('&').reduce(function (acc, part) {
            var item = part.split('=');
            acc[item[0]] = decodeURIComponent(item[1]);
            return acc;
        }, {}) : {};
    };
    NbOAuth2AuthStrategy.prototype.register = function (data) {
        throw new Error('`register` is not supported by `NbOAuth2AuthStrategy`, use `authenticate`.');
    };
    NbOAuth2AuthStrategy.prototype.requestPassword = function (data) {
        throw new Error('`requestPassword` is not supported by `NbOAuth2AuthStrategy`, use `authenticate`.');
    };
    NbOAuth2AuthStrategy.prototype.resetPassword = function (data) {
        if (data === void 0) { data = {}; }
        throw new Error('`resetPassword` is not supported by `NbOAuth2AuthStrategy`, use `authenticate`.');
    };
    NbOAuth2AuthStrategy.prototype.logout = function () {
        return observableOf(new NbAuthResult(true));
    };
    NbOAuth2AuthStrategy.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NbOAuth2AuthStrategy.ctorParameters = function () { return [
        { type: HttpClient, },
        { type: ActivatedRoute, },
        { type: undefined, decorators: [{ type: Inject, args: [NB_WINDOW,] },] },
    ]; };
    return NbOAuth2AuthStrategy;
}(NbAuthStrategy));
export { NbOAuth2AuthStrategy };
//# sourceMappingURL=oauth2-strategy.js.map