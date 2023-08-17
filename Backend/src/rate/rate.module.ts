import { Module } from '@nestjs/common';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from './rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rate])],
  controllers: [RateController],
  providers: [RateService]
})
export class RateModule {}
