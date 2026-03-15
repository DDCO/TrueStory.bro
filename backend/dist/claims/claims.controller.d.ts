import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
export declare class ClaimsController {
    private readonly claimsService;
    constructor(claimsService: ClaimsService);
    create(createClaimDto: CreateClaimDto): Promise<import("./entities/claim.entity").Claim>;
    findAll(): Promise<import("./entities/claim.entity").Claim[]>;
    findByEvent(eventId: string): Promise<import("./entities/claim.entity").Claim[]>;
    findOne(id: string): Promise<import("./entities/claim.entity").Claim>;
    update(id: string, updateClaimDto: UpdateClaimDto): Promise<import("./entities/claim.entity").Claim>;
    remove(id: string): Promise<void>;
}
