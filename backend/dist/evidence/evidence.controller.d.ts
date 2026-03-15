import { EvidenceService } from './evidence.service';
import { CreateEvidenceDto } from './dto/create-evidence.dto';
export declare class EvidenceController {
    private readonly evidenceService;
    constructor(evidenceService: EvidenceService);
    create(createEvidenceDto: CreateEvidenceDto): Promise<import("./entities/evidence.entity").Evidence>;
    findByClaim(claimId: string): Promise<import("./entities/evidence.entity").Evidence[]>;
    findOne(id: string): Promise<import("./entities/evidence.entity").Evidence>;
    remove(id: string): Promise<void>;
}
