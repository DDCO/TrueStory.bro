import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactCheck } from './entities/fact-check.entity';
import { FactCheckingService } from './fact-checking.service';
import { FactCheckingController } from './fact-checking.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FactCheck])],
  controllers: [FactCheckingController],
  providers: [FactCheckingService],
  exports: [FactCheckingService],
})
export class FactCheckingModule {}
