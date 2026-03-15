import { Claim } from '../../claims/entities/claim.entity';
import { User } from '../../users/entities/user.entity';
export declare enum EventStatus {
    Unverified = "unverified",
    Confirmed = "confirmed"
}
export declare class Event {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    status: EventStatus;
    createdById: string | null;
    createdAt: Date;
    updatedAt: Date;
    createdBy: User | null;
    claims: Claim[];
}
