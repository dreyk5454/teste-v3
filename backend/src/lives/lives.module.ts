import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivesController } from './lives.controller';
import { LivesService } from './lives.service';
import { Live } from './entities/live.entity';
import { Room } from './entities/room.entity';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Live, Room]), RedisModule],
  controllers: [LivesController],
  providers: [LivesService],
})
export class LivesModule {}
