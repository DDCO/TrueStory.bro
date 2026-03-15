"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookOAuthEnabledGuard = exports.GoogleOAuthEnabledGuard = void 0;
const common_1 = require("@nestjs/common");
let GoogleOAuthEnabledGuard = class GoogleOAuthEnabledGuard {
    canActivate() {
        if (process.env.GOOGLE_CLIENT_ID)
            return true;
        throw new common_1.ServiceUnavailableException('Google login is not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable.');
    }
};
exports.GoogleOAuthEnabledGuard = GoogleOAuthEnabledGuard;
exports.GoogleOAuthEnabledGuard = GoogleOAuthEnabledGuard = __decorate([
    (0, common_1.Injectable)()
], GoogleOAuthEnabledGuard);
let FacebookOAuthEnabledGuard = class FacebookOAuthEnabledGuard {
    canActivate() {
        if (process.env.FACEBOOK_APP_ID)
            return true;
        throw new common_1.ServiceUnavailableException('Facebook login is not configured. Set FACEBOOK_APP_ID and FACEBOOK_APP_SECRET to enable.');
    }
};
exports.FacebookOAuthEnabledGuard = FacebookOAuthEnabledGuard;
exports.FacebookOAuthEnabledGuard = FacebookOAuthEnabledGuard = __decorate([
    (0, common_1.Injectable)()
], FacebookOAuthEnabledGuard);
//# sourceMappingURL=oauth-enabled.guard.js.map