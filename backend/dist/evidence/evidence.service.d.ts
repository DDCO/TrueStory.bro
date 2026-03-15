import { Repository } from 'typeorm';
import { Evidence } from './entities/evidence.entity';
import { CreateEvidenceDto } from './dto/create-evidence.dto';
export declare class EvidenceService {
    private readonly repo;
    constructor(repo: Repository<Evidence>);
    create(dto: CreateEvidenceDto): Promise<Evidence>;
    findByClaimId(claimId: string): Promise<Evidence[]>;
    findOne(id: string): Promise<Evidence>;
    remove(id: string): Promise<void>;
}
