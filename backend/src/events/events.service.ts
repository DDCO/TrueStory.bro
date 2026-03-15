import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { EventStatus } from './entities/event.entity';
import { EventConfirmation } from './entities/event-confirmation.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from '../users/entities/user.entity';

const CONFIRMATION_THRESHOLD = 3;
const REPUTATION_BYPASS = 100;

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,
    @InjectRepository(EventConfirmation)
    private readonly confirmationRepo: Repository<EventConfirmation>,
  ) {}

  private canBypassConfirmation(user: User): boolean {
    return user.verifiedReporter === true || user.reputationScore >= REPUTATION_BYPASS;
  }

  async create(dto: CreateEventDto, user: User): Promise<Event> {
    const status = this.canBypassConfirmation(user) ? EventStatus.Confirmed : EventStatus.Unverified;
    const event = this.repo.create({ ...dto, status, createdById: user.id });
    return this.repo.save(event);
  }

  /** Public list: only confirmed events, or legacy events (no createdById). */
  async findAll(): Promise<Event[]> {
    return this.repo
      .createQueryBuilder('e')
      .where("e.status = :status OR e.createdById IS NULL", { status: EventStatus.Confirmed })
      .orderBy('e.createdAt', 'DESC')
      .getMany();
  }

  /** Events proposed by this user (unverified or confirmed). */
  async findMyProposed(userId: string): Promise<Event[]> {
    return this.repo.find({
      where: { createdById: userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, currentUserId?: string | null): Promise<Event> {
    const event = await this.repo.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    const isPublic = event.status === EventStatus.Confirmed || event.createdById == null;
    const isMine = event.createdById === currentUserId;
    const canViewUnverified = event.status === EventStatus.Unverified && currentUserId != null;
    if (!isPublic && !isMine && !canViewUnverified) throw new ForbiddenException('Event not yet public');
    return event;
  }

  async findBySlug(slug: string, currentUserId?: string | null): Promise<Event> {
    const event = await this.repo.findOne({ where: { slug } });
    if (!event) throw new NotFoundException('Event not found');
    const isPublic = event.status === EventStatus.Confirmed || event.createdById == null;
    const isMine = event.createdById === currentUserId;
    const canViewUnverified = event.status === EventStatus.Unverified && currentUserId != null;
    if (!isPublic && !isMine && !canViewUnverified) throw new ForbiddenException('Event not yet public');
    return event;
  }

  async getConfirmationCount(eventId: string): Promise<number> {
    return this.confirmationRepo.count({ where: { eventId } });
  }

  async addConfirmation(eventId: string, user: User): Promise<{ event: Event; count: number }> {
    const event = await this.repo.findOne({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Event not found');
    if (event.status === EventStatus.Confirmed) throw new ForbiddenException('Event already confirmed');
    const existing = await this.confirmationRepo.findOne({ where: { eventId, userId: user.id } });
    if (existing) throw new ForbiddenException('Already confirmed this event');
    await this.confirmationRepo.save(this.confirmationRepo.create({ eventId, userId: user.id }));
    const count = await this.getConfirmationCount(eventId);
    if (count >= CONFIRMATION_THRESHOLD) {
      event.status = EventStatus.Confirmed;
      await this.repo.save(event);
    }
    const updated = await this.repo.findOne({ where: { id: eventId } });
    return { event: updated ?? event, count };
  }

  async hasUserConfirmed(eventId: string, userId: string): Promise<boolean> {
    return (await this.confirmationRepo.findOne({ where: { eventId, userId } })) != null;
  }

  async update(id: string, dto: UpdateEventDto): Promise<Event> {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }
}
