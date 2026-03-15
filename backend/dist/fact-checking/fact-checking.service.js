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
exports.FactCheckingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fact_check_entity_1 = require("./entities/fact-check.entity");
let FactCheckingService = class FactCheckingService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const factCheck = this.repo.create(dto);
        return this.repo.save(factCheck);
    }
    async findByClaimId(claimId) {
        return this.repo.find({
            where: { claimId },
            relations: ['user'],
            order: { createdAt: 'ASC' },
        });
    }
    async findOne(id) {
        const fc = await this.repo.findOne({
            where: { id },
            relations: ['claim', 'user'],
        });
        if (!fc)
            throw new common_1.NotFoundException('Fact check not found');
        return fc;
    }
    async remove(id) {
        await this.findOne(id);
        await this.repo.delete(id);
    }
};
exports.FactCheckingService = FactCheckingService;
exports.FactCheckingService = FactCheckingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(fact_check_entity_1.FactCheck)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FactCheckingService);
//# sourceMappingURL=fact-checking.service.js.map