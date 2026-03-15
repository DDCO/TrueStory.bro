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
exports.PredictionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const prediction_entity_1 = require("./entities/prediction.entity");
let PredictionsService = class PredictionsService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const prediction = this.repo.create(dto);
        return this.repo.save(prediction);
    }
    async findByClaimId(claimId) {
        return this.repo.find({
            where: { claimId },
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const prediction = await this.repo.findOne({
            where: { id },
            relations: ['claim', 'user'],
        });
        if (!prediction)
            throw new common_1.NotFoundException('Prediction not found');
        return prediction;
    }
    async getAggregateForClaim(claimId) {
        const result = await this.repo
            .createQueryBuilder('p')
            .select('AVG(p.probability)', 'avg')
            .addSelect('COUNT(p.id)', 'count')
            .where('p.claimId = :claimId', { claimId })
            .getRawOne();
        return {
            avg: result?.avg ? parseFloat(result.avg) : 0,
            count: result?.count ? parseInt(result.count, 10) : 0,
        };
    }
};
exports.PredictionsService = PredictionsService;
exports.PredictionsService = PredictionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(prediction_entity_1.Prediction)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PredictionsService);
//# sourceMappingURL=predictions.service.js.map