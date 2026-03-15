import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FactCheckingService } from './fact-checking.service';
import { CreateFactCheckDto } from './dto/create-fact-check.dto';

@Controller('fact-checking')
export class FactCheckingController {
  constructor(private readonly factCheckingService: FactCheckingService) {}

  @Post()
  create(@Body() createFactCheckDto: CreateFactCheckDto) {
    return this.factCheckingService.create(createFactCheckDto);
  }

  @Get('by-claim/:claimId')
  findByClaim(@Param('claimId') claimId: string) {
    return this.factCheckingService.findByClaimId(claimId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.factCheckingService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.factCheckingService.remove(id);
  }
}
