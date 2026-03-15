import { Event } from './event.entity';
import { User } from '../../users/entities/user.entity';
export declare class EventConfirmation {
    id: string;
    eventId: string;
    userId: string;
    createdAt: Date;
    event: Event;
    user: User;
}
