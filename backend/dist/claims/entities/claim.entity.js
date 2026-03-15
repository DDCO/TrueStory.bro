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
exports.Claim = exports.ClaimStatus = void 0;
const typeorm_1 = require("typeorm");
const event_entity_1 = require("../../events/entities/event.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const evidence_entity_1 = require("../../evidence/entities/evidence.entity");
const fact_check_entity_1 = require("../../fact-checking/entities/fact-check.entity");
const prediction_entity_1 = require("../../predictions/entities/prediction.entity");
var ClaimStatus;
(function (ClaimStatus) {
    ClaimStatus["Unverified"] = "unverified";
    ClaimStatus["EvidenceProvided"] = "evidence_provided";
    ClaimStatus["MultipleConfirmations"] = "multiple_confirmations";
    ClaimStatus["Confirmed"] = "confirmed";
})(ClaimStatus || (exports.ClaimStatus = ClaimStatus = {}));
let Claim = class Claim {
};
exports.Claim = Claim;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Claim.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Claim.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Claim.prototype, "authorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Claim.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ClaimStatus, default: ClaimStatus.Unverified }),
    __metadata("design:type", String)
], Claim.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Claim.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.Event, (e) => e.claims, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'eventId' }),
    __metadata("design:type", event_entity_1.Event)
], Claim.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (u) => u.claims, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'authorId' }),
    __metadata("design:type", user_entity_1.User)
], Claim.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => evidence_entity_1.Evidence, (ev) => ev.claim),
    __metadata("design:type", Array)
], Claim.prototype, "evidence", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => fact_check_entity_1.FactCheck, (fc) => fc.claim),
    __metadata("design:type", Array)
], Claim.prototype, "factChecks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => prediction_entity_1.Prediction, (p) => p.claim),
    __metadata("design:type", Array)
], Claim.prototype, "predictions", void 0);
exports.Claim = Claim = __decorate([
    (0, typeorm_1.Entity)('claims')
], Claim);
//# sourceMappingURL=claim.entity.js.map