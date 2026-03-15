import { FactCheckingService } from './fact-checking.service';
import { CreateFactCheckDto } from './dto/create-fact-check.dto';
export declare class FactCheckingController {
    private readonly factCheckingService;
    constructor(factCheckingService: FactCheckingService);
    create(createFactCheckDto: CreateFactCheckDto): Promise<import("./entities/fact-check.entity").FactCheck>;
    findByClaim(claimId: string): Promise<import("./entities/fact-check.entity").FactCheck[]>;
    findOne(id: string): Promise<import("./entities/fact-check.entity").FactCheck>;
    remove(id: string): Promise<void>;
}
