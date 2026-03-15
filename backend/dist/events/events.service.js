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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_entity_1 = require("./entities/event.entity");
const event_entity_2 = require("./entities/event.entity");
const event_confirmation_entity_1 = require("./entities/event-confirmation.entity");
const CONFIRMATION_THRESHOLD = 3;
const REPUTATION_BYPASS = 100;
let EventsService = class EventsService {
    constructor(repo, confirmationRepo) {
        this.repo = repo;
        this.confirmationRepo = confirmationRepo;
    }
    canBypassConfirmation(user) {
        return user.verifiedReporter === true || user.reputationScore >= REPUTATION_BYPASS;
    }
    async create(dto, user) {
        const status = this.canBypassConfirmation(user) ? event_entity_2.EventStatus.Confirmed : event_entity_2.EventStatus.Unverified;
        const event = this.repo.create({ ...dto, status, createdById: user.id });
        return this.repo.save(event);
    }
    async findAll() {
        return this.repo
            .createQueryBuilder('e')
            .where("e.status = :status OR e.createdById IS NULL", { status: event_entity_2.EventStatus.Confirmed })
            .orderBy('e.createdAt', 'DESC')
            .getMany();
    }
    async findMyProposed(userId) {
        return this.repo.find({
            where: { createdById: userId },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id, currentUserId) {
        const event = await this.repo.findOne({ where: { id } });
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        const isPublic = event.status === event_entity_2.EventStatus.Confirmed || event.createdById == null;
        const isMine = event.createdById === currentUserId;
        const canViewUnverified = event.status === event_entity_2.EventStatus.Unverified && currentUserId != null;
        if (!isPublic && !isMine && !canViewUnverified)
            throw new common_1.ForbiddenException('Event not yet public');
        return event;
    }
    async findBySlug(slug, currentUserId) {
        const event = await this.repo.findOne({ where: { slug } });
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        const isPublic = event.status === event_entity_2.EventStatus.Confirmed || event.createdById == null;
        const isMine = event.createdById === currentUserId;
        const canViewUnverified = event.status === event_entity_2.EventStatus.Unverified && currentUserId != null;
        if (!isPublic && !isMine && !canViewUnverified)
            throw new common_1.ForbiddenException('Event not yet public');
        return event;
    }
    async getConfirmationCount(eventId) {
        return this.confirmationRepo.count({ where: { eventId } });
    }
    async addConfirmation(eventId, user) {
        const event = await this.repo.findOne({ where: { id: eventId } });
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        if (event.status === event_entity_2.EventStatus.Confirmed)
            throw new common_1.ForbiddenException('Event already confirmed');
        const existing = await this.confirmationRepo.findOne({ where: { eventId, userId: user.id } });
        if (existing)
            throw new common_1.ForbiddenException('Already confirmed this event');
        await this.confirmationRepo.save(this.confirmationRepo.create({ eventId, userId: user.id }));
        const count = await this.getConfirmationCount(eventId);
        if (count >= CONFIRMATION_THRESHOLD) {
            event.status = event_entity_2.EventStatus.Confirmed;
            await this.repo.save(event);
        }
        const updated = await this.repo.findOne({ where: { id: eventId } });
        return { event: updated ?? event, count };
    }
    async hasUserConfirmed(eventId, userId) {
        return (await this.confirmationRepo.findOne({ where: { eventId, userId } })) != null;
    }
    async update(id, dto) {
        await this.findOne(id);
        await this.repo.update(id, dto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.findOne(id);
        await this.repo.delete(id);
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __param(1, (0, typeorm_1.InjectRepository)(event_confirmation_entity_1.EventConfirmation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EventsService);
//# sourceMappingURL=events.service.js.map