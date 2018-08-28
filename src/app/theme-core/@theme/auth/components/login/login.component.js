import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';
import { NbAuthService } from '../../services/auth.service';
var NbLoginComponent = /** @class */ (function () {
    function NbLoginComponent(service, options, router) {
        if (options === void 0) { options = {}; }
        this.service = service;
        this.options = options;
        this.router = router;
        this.redirectDelay = 0;
        this.showMessages = {};
        this.strategy = '';
        this.errors = [];
        this.messages = [];
        this.user = {};
        this.submitted = false;
        this.socialLinks = [];
        this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
        this.showMessages = this.getConfigValue('forms.login.showMessages');
        this.strategy = this.getConfigValue('forms.login.strategy');
        this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    }
    NbLoginComponent.prototype.login = function () {
        var _this = this;
        this.errors = this.messages = [];
        this.submitted = true;
        this.service.authenticate(this.strategy, this.user).subscribe(function (result) {
            _this.submitted = false;
            if (result.isSuccess()) {
                _this.messages = result.getMessages();
            }
            else {
                _this.errors = result.getErrors();
            }
            var redirect = result.getRedirect();
            if (redirect) {
                setTimeout(function () {
                    return _this.router.navigateByUrl(redirect);
                }, _this.redirectDelay);
            }
        });
    };
    NbLoginComponent.prototype.getConfigValue = function (key) {
        return getDeepFromObject(this.options, key, null);
    };
    NbLoginComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-login',
                    template: "\n    <nb-auth-block>\n      <h2 class=\"title\">Login</h2>\n\n <form (ngSubmit)=\"login()\" #form=\"ngForm\" autocomplete=\"nope\">\n\n        <div *ngIf=\"showMessages.error && errors && errors.length > 0 && !submitted\"\n             class=\"alert alert-danger\" role=\"alert\">\n          <div><strong>Oh snap!</strong></div>\n          <div *ngFor=\"let error of errors\">{{ error }}</div>\n        </div>\n\n        <div *ngIf=\"showMessages.success && messages && messages.length > 0 && !submitted\"\n             class=\"alert alert-success\" role=\"alert\">\n          <div><strong>Hooray!</strong></div>\n          <div *ngFor=\"let message of messages\">{{ message }}</div>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-email\" class=\"sr-only\">Email</label>\n          <input name=\"email\" [(ngModel)]=\"user.email\" id=\"input-email\" pattern=\".+@.+..+\"\n                 class=\"form-control\" placeholder=\"Email\" #email=\"ngModel\"\n                 [class.form-control-danger]=\"email.invalid && email.touched\" autofocus\n                 [required]=\"getConfigValue('forms.validation.email.required')\">\n          <small class=\"form-text error\" *ngIf=\"email.invalid && email.touched && email.errors?.required\">\n            Email es requerido!\n          </small>\n          <small class=\"form-text error\"\n                 *ngIf=\"email.invalid && email.touched && email.errors?.pattern\">\n            Ingresa un email real!\n          </small>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-password\" class=\"sr-only\">Password</label>\n          <input name=\"password\" [(ngModel)]=\"user.password\" type=\"password\" id=\"input-password\"\n                 class=\"form-control\" placeholder=\"Password\" #password=\"ngModel\"\n                 [class.form-control-danger]=\"password.invalid && password.touched\"\n                 [required]=\"getConfigValue('forms.validation.password.required')\"\n                 [minlength]=\"getConfigValue('forms.validation.password.minLength')\"\n                 [maxlength]=\"getConfigValue('forms.validation.password.maxLength')\">\n          <small class=\"form-text error\" *ngIf=\"password.invalid && password.touched && password.errors?.required\">\n            El password es requerido!\n          </small>\n          <small\n            class=\"form-text error\"\n            *ngIf=\"password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)\">\n            El password debe contener\n            from {{ getConfigValue('forms.validation.password.minLength') }}\n            to {{ getConfigValue('forms.validation.password.maxLength') }}\n            caracteres\n          </small>\n        </div>\n\n       <button [disabled]=\"submitted || !form.valid\" class=\"btn btn-block btn-hero-success\"\n                [class.btn-pulse]=\"submitted\">\n          Ingresar\n        </button>\n      </form>\n\n      <div class=\"links\">\n\n        <ng-container *ngIf=\"socialLinks && socialLinks.length > 0\">\n          </ng-container>\n\n      </div>\n    </nb-auth-block>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbLoginComponent.ctorParameters = function () { return [
        { type: NbAuthService, },
        { type: undefined, decorators: [{ type: Inject, args: [NB_AUTH_OPTIONS,] },] },
        { type: Router, },
    ]; };
    return NbLoginComponent;
}());
export { NbLoginComponent };
//# sourceMappingURL=login.component.js.map