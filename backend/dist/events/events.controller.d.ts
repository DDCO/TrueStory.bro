import { JwtService } from '@nestjs/jwt';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from '../users/entities/user.entity';
export declare class EventsController {
    private readonly eventsService;
    private readonly jwtService;
    constructor(eventsService: EventsService, jwtService: JwtService);
    private getOptionalUserId;
    create(createEventDto: CreateEventDto, req: {
        user: User;
    }): Promise<import("./entities/event.entity").Event>;
    findAll(): Promise<import("./entities/event.entity").Event[]>;
    findMyProposed(req: {
        user: User;
    }): Promise<import("./entities/event.entity").Event[]>;
    findBySlug(slug: string, req: {
        user?: User;
        headers?: {
            authorization?: string;
        };
    }): Promise<import("./entities/event.entity").Event>;
    findOne(id: string, req: {
        user?: User;
        headers?: {
            authorization?: string;
        };
    }): Promise<import("./entities/event.entity").Event>;
    confirm(id: string, req: {
        user: User;
    }): Promise<{
        event: import("./entities/event.entity").Event;
        count: number;
    }>;
    getConfirmationCount(id: string): Promise<{
        count: number;
    }>;
    hasCurrentUserConfirmed(id: string, req: {
        user: User;
    }): Promise<{
        confirmed: boolean;
    }>;
    update(id: string, updateEventDto: UpdateEventDto, req: {
        user: User;
    }): Promise<import("./entities/event.entity").Event>;
    remove(id: string, req: {
        user: User;
    }): Promise<void>;
}
