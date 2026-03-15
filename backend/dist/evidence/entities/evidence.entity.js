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
exports.Evidence = exports.EvidenceType = void 0;
const typeorm_1 = require("typeorm");
const claim_entity_1 = require("../../claims/entities/claim.entity");
const user_entity_1 = require("../../users/entities/user.entity");
var EvidenceType;
(function (EvidenceType) {
    EvidenceType["Document"] = "document";
    EvidenceType["Video"] = "video";
    EvidenceType["Link"] = "link";
    EvidenceType["Statement"] = "statement";
    EvidenceType["Photo"] = "photo";
})(EvidenceType || (exports.EvidenceType = EvidenceType = {}));
let Evidence = class Evidence {
};
exports.Evidence = Evidence;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Evidence.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Evidence.prototype, "claimId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Evidence.prototype, "addedById", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EvidenceType }),
    __metadata("design:type", String)
], Evidence.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Evidence.prototype, "urlOrContent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Evidence.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Evidence.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => claim_entity_1.Claim, (c) => c.evidence, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'claimId' }),
    __metadata("design:type", claim_entity_1.Claim)
], Evidence.prototype, "claim", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'addedById' }),
    __metadata("design:type", user_entity_1.User)
], Evidence.prototype, "addedBy", void 0);
exports.Evidence = Evidence = __decorate([
    (0, typeorm_1.Entity)('evidence')
], Evidence);
//# sourceMappingURL=evidence.entity.js.map