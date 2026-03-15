import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EvidenceService } from './evidence.service';
import { CreateEvidenceDto } from './dto/create-evidence.dto';

@Controller('evidence')
export class EvidenceController {
  constructor(private readonly evidenceService: EvidenceService) {}

  @Post()
  create(@Body() createEvidenceDto: CreateEvidenceDto) {
    return this.evidenceService.create(createEvidenceDto);
  }

  @Get('by-claim/:claimId')
  findByClaim(@Param('claimId') claimId: string) {
    return this.evidenceService.findByClaimId(claimId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evidenceService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evidenceService.remove(id);
  }
}
