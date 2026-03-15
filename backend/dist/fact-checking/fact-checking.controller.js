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
exports.FactCheckingController = void 0;
const common_1 = require("@nestjs/common");
const fact_checking_service_1 = require("./fact-checking.service");
const create_fact_check_dto_1 = require("./dto/create-fact-check.dto");
let FactCheckingController = class FactCheckingController {
    constructor(factCheckingService) {
        this.factCheckingService = factCheckingService;
    }
    create(createFactCheckDto) {
        return this.factCheckingService.create(createFactCheckDto);
    }
    findByClaim(claimId) {
        return this.factCheckingService.findByClaimId(claimId);
    }
    findOne(id) {
        return this.factCheckingService.findOne(id);
    }
    remove(id) {
        return this.factCheckingService.remove(id);
    }
};
exports.FactCheckingController = FactCheckingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_fact_check_dto_1.CreateFactCheckDto]),
    __metadata("design:returntype", void 0)
], FactCheckingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('by-claim/:claimId'),
    __param(0, (0, common_1.Param)('claimId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FactCheckingController.prototype, "findByClaim", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FactCheckingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FactCheckingController.prototype, "remove", null);
exports.FactCheckingController = FactCheckingController = __decorate([
    (0, common_1.Controller)('fact-checking'),
    __metadata("design:paramtypes", [fact_checking_service_1.FactCheckingService])
], FactCheckingController);
//# sourceMappingURL=fact-checking.controller.js.map