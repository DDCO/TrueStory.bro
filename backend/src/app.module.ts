import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { ClaimsModule } from './claims/claims.module';
import { EvidenceModule } from './evidence/evidence.module';
import { FactCheckingModule } from './fact-checking/fact-checking.module';
import { PredictionsModule } from './predictions/predictions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    EventsModule,
    UsersModule,
    ClaimsModule,
    EvidenceModule,
    FactCheckingModule,
    PredictionsModule,
    AuthModule,
  ],
})
export class AppModule {}
