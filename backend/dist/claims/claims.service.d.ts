import { Repository } from 'typeorm';
import { Claim } from './entities/claim.entity';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
export declare class ClaimsService {
    private readonly repo;
    constructor(repo: Repository<Claim>);
    create(dto: CreateClaimDto): Promise<Claim>;
    findAll(): Promise<Claim[]>;
    findByEventId(eventId: string): Promise<Claim[]>;
    findOne(id: string): Promise<Claim>;
    update(id: string, dto: UpdateClaimDto): Promise<Claim>;
    remove(id: string): Promise<void>;
}
