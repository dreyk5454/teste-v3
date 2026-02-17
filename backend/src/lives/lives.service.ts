import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Live } from './entities/live.entity';
import { Room } from './entities/room.entity';
import { RedisService } from '../redis/redis.service';
import { CreateLiveDto } from './dto/create-live.dto';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class LivesService {
  constructor(
    @InjectRepository(Live)
    private livesRepository: Repository<Live>,
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    private redisService: RedisService,
  ) {}

  // Lives
  async createLive(createLiveDto: CreateLiveDto): Promise<Live> {
    const live = this.livesRepository.create(createLiveDto);
    const savedLive = await this.livesRepository.save(live);
    await this.redisService.set(`live:${savedLive.id}`, JSON.stringify(savedLive));
    return savedLive;
  }

  async findAllLives(): Promise<Live[]> {
    return await this.livesRepository.find({ where: { isActive: true } });
  }

  async findLiveById(id: string): Promise<Live> {
    const cached = await this.redisService.get(`live:${id}`);
    if (cached) {
      return JSON.parse(cached);
    }
    const live = await this.livesRepository.findOne({ where: { id } });
    if (live) {
      await this.redisService.set(`live:${id}`, JSON.stringify(live));
    }
    return live;
  }

  async updateLive(id: string, updates: Partial<Live>): Promise<Live> {
    await this.livesRepository.update(id, updates);
    await this.redisService.del(`live:${id}`);
    return this.findLiveById(id);
  }

  async deleteLive(id: string): Promise<void> {
    await this.livesRepository.delete(id);
    await this.redisService.del(`live:${id}`);
  }

  async incrementViewers(liveId: string): Promise<void> {
    const live = await this.findLiveById(liveId);
    if (live) {
      live.viewers += 1;
      await this.updateLive(liveId, { viewers: live.viewers } as Live);
    }
  }

  async decrementViewers(liveId: string): Promise<void> {
    const live = await this.findLiveById(liveId);
    if (live && live.viewers > 0) {
      live.viewers -= 1;
      await this.updateLive(liveId, { viewers: live.viewers } as Live);
    }
  }

  // Rooms
  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = this.roomsRepository.create(createRoomDto);
    const savedRoom = await this.roomsRepository.save(room);
    await this.redisService.set(`room:${savedRoom.id}`, JSON.stringify(savedRoom));
    return savedRoom;
  }

  async findAllRooms(): Promise<Room[]> {
    return await this.roomsRepository.find();
  }

  async findRoomById(id: string): Promise<Room> {
    const cached = await this.redisService.get(`room:${id}`);
    if (cached) {
      return JSON.parse(cached);
    }
    const room = await this.roomsRepository.findOne({ where: { id } });
    if (room) {
      await this.redisService.set(`room:${id}`, JSON.stringify(room));
    }
    return room;
  }

  async addLiveToRoom(roomId: string, liveId: string): Promise<Room> {
    const room = await this.roomsRepository.findOne({ where: { id: roomId } });
    if (room) {
      if (!room.liveIds.includes(liveId)) {
        room.liveIds.push(liveId);
        await this.roomsRepository.save(room);
        await this.redisService.del(`room:${roomId}`);
      }
    }
    return this.findRoomById(roomId);
  }

  async removeLiveFromRoom(roomId: string, liveId: string): Promise<Room> {
    const room = await this.roomsRepository.findOne({ where: { id: roomId } });
    if (room) {
      room.liveIds = room.liveIds.filter((id) => id !== liveId);
      await this.roomsRepository.save(room);
      await this.redisService.del(`room:${roomId}`);
    }
    return this.findRoomById(roomId);
  }

  async deleteRoom(id: string): Promise<void> {
    await this.roomsRepository.delete(id);
    await this.redisService.del(`room:${id}`);
  }

  async incrementRoomViewers(roomId: string): Promise<void> {
    const room = await this.findRoomById(roomId);
    if (room) {
      room.viewers += 1;
      await this.roomsRepository.update(roomId, { viewers: room.viewers });
      await this.redisService.del(`room:${roomId}`);
    }
  }

  async decrementRoomViewers(roomId: string): Promise<void> {
    const room = await this.findRoomById(roomId);
    if (room && room.viewers > 0) {
      room.viewers -= 1;
      await this.roomsRepository.update(roomId, { viewers: room.viewers });
      await this.redisService.del(`room:${roomId}`);
    }
  }
}
