import { Repository } from 'typeorm';
import { FactCheck } from './entities/fact-check.entity';
import { CreateFactCheckDto } from './dto/create-fact-check.dto';
export declare class FactCheckingService {
    private readonly repo;
    constructor(repo: Repository<FactCheck>);
    create(dto: CreateFactCheckDto): Promise<FactCheck>;
    findByClaimId(claimId: string): Promise<FactCheck[]>;
    findOne(id: string): Promise<FactCheck>;
    remove(id: string): Promise<void>;
}
