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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const user = this.repo.create(dto);
        return this.repo.save(user);
    }
    async findAll() {
        return this.repo.find({
            order: { reputationScore: 'DESC' },
        });
    }
    async findOne(id) {
        const user = await this.repo.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async findByGoogleId(googleId) {
        return this.repo.findOne({ where: { googleId } });
    }
    async findByFacebookId(facebookId) {
        return this.repo.findOne({ where: { facebookId } });
    }
    async findOrCreateByGoogle(profile) {
        let user = await this.findByGoogleId(profile.id);
        if (user)
            return user;
        const displayName = profile.displayName || profile.emails?.[0]?.value?.split('@')[0] || `User ${profile.id.slice(0, 8)}`;
        const email = profile.emails?.[0]?.value ?? null;
        user = this.repo.create({ displayName, email, googleId: profile.id });
        return this.repo.save(user);
    }
    async findOrCreateByFacebook(profile) {
        let user = await this.findByFacebookId(profile.id);
        if (user)
            return user;
        const displayName = profile.displayName || [profile.name?.givenName, profile.name?.familyName].filter(Boolean).join(' ') || profile.emails?.[0]?.value?.split('@')[0] || `User ${profile.id.slice(0, 8)}`;
        const email = profile.emails?.[0]?.value ?? null;
        user = this.repo.create({ displayName, email, facebookId: profile.id });
        return this.repo.save(user);
    }
    async adjustReputation(userId, delta) {
        const user = await this.findOne(userId);
        user.reputationScore = Math.max(0, user.reputationScore + delta);
        return this.repo.save(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map