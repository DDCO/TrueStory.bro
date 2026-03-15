import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { EventConfirmation } from './entities/event-confirmation.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from '../users/entities/user.entity';
export declare class EventsService {
    private readonly repo;
    private readonly confirmationRepo;
    constructor(repo: Repository<Event>, confirmationRepo: Repository<EventConfirmation>);
    private canBypassConfirmation;
    create(dto: CreateEventDto, user: User): Promise<Event>;
    findAll(): Promise<Event[]>;
    findMyProposed(userId: string): Promise<Event[]>;
    findOne(id: string, currentUserId?: string | null): Promise<Event>;
    findBySlug(slug: string, currentUserId?: string | null): Promise<Event>;
    getConfirmationCount(eventId: string): Promise<number>;
    addConfirmation(eventId: string, user: User): Promise<{
        event: Event;
        count: number;
    }>;
    hasUserConfirmed(eventId: string, userId: string): Promise<boolean>;
    update(id: string, dto: UpdateEventDto): Promise<Event>;
    remove(id: string): Promise<void>;
}
