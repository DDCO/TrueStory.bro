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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvidenceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const evidence_entity_1 = require("./entities/evidence.entity");
let EvidenceService = class EvidenceService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const evidence = this.repo.create(dto);
        return this.repo.save(evidence);
    }
    async findByClaimId(claimId) {
        return this.repo.find({
            where: { claimId },
            relations: ['addedBy'],
            order: { createdAt: 'ASC' },
        });
    }
    async findOne(id) {
        const evidence = await this.repo.findOne({
            where: { id },
            relations: ['claim', 'addedBy'],
        });
        if (!evidence)
            throw new common_1.NotFoundException('Evidence not found');
        return evidence;
    }
    async remove(id) {
        await this.findOne(id);
        await this.repo.delete(id);
    }
};
exports.EvidenceService = EvidenceService;
exports.EvidenceService = EvidenceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(evidence_entity_1.Evidence)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EvidenceService);
//# sourceMappingURL=evidence.service.js.map