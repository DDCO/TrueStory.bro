import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PredictionsService } from './predictions.service';
import { CreatePredictionDto } from './dto/create-prediction.dto';

@Controller('predictions')
export class PredictionsController {
  constructor(private readonly predictionsService: PredictionsService) {}

  @Post()
  create(@Body() createPredictionDto: CreatePredictionDto) {
    return this.predictionsService.create(createPredictionDto);
  }

  @Get('by-claim/:claimId')
  findByClaim(@Param('claimId') claimId: string) {
    return this.predictionsService.findByClaimId(claimId);
  }

  @Get('by-claim/:claimId/aggregate')
  getAggregate(@Param('claimId') claimId: string) {
    return this.predictionsService.getAggregateForClaim(claimId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.predictionsService.findOne(id);
  }
}
