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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactCheck = exports.FactCheckType = void 0;
const typeorm_1 = require("typeorm");
const claim_entity_1 = require("../../claims/entities/claim.entity");
const user_entity_1 = require("../../users/entities/user.entity");
var FactCheckType;
(function (FactCheckType) {
    FactCheckType["Challenge"] = "challenge";
    FactCheckType["Confirm"] = "confirm";
    FactCheckType["CounterEvidence"] = "counter_evidence";
    FactCheckType["Context"] = "context";
})(FactCheckType || (exports.FactCheckType = FactCheckType = {}));
let FactCheck = class FactCheck {
};
exports.FactCheck = FactCheck;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FactCheck.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FactCheck.prototype, "claimId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FactCheck.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: FactCheckType }),
    __metadata("design:type", String)
], FactCheck.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], FactCheck.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], FactCheck.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => claim_entity_1.Claim, (c) => c.factChecks, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'claimId' }),
    __metadata("design:type", claim_entity_1.Claim)
], FactCheck.prototype, "claim", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (u) => u.factChecks, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], FactCheck.prototype, "user", void 0);
exports.FactCheck = FactCheck = __decorate([
    (0, typeorm_1.Entity)('fact_checks')
], FactCheck);
//# sourceMappingURL=fact-check.entity.js.map