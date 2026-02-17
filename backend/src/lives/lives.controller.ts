import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { LivesService } from './lives.service';
import { CreateLiveDto } from './dto/create-live.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('lives')
export class LivesController {
  constructor(private readonly livesService: LivesService) {}

  // IMPORTANTE: Rotas mais específicas ANTES de rotas genéricas
  // Rooms Endpoints PRIMEIRO (porque são mais específicas)
  @Post('rooms')
  @UseGuards(JwtGuard)
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.livesService.createRoom(createRoomDto);
  }

  @Get('rooms')
  findAllRooms() {
    return this.livesService.findAllRooms();
  }

  @Get('rooms/:id')
  findRoomById(@Param('id') id: string) {
    return this.livesService.findRoomById(id);
  }

  @Post('rooms/:roomId/lives/:liveId')
  @UseGuards(JwtGuard)
  addLiveToRoom(
    @Param('roomId') roomId: string,
    @Param('liveId') liveId: string,
  ) {
    return this.livesService.addLiveToRoom(roomId, liveId);
  }

  @Delete('rooms/:roomId/lives/:liveId')
  @UseGuards(JwtGuard)
  removeLiveFromRoom(
    @Param('roomId') roomId: string,
    @Param('liveId') liveId: string,
  ) {
    return this.livesService.removeLiveFromRoom(roomId, liveId);
  }

  @Delete('rooms/:id')
  @UseGuards(JwtGuard)
  deleteRoom(@Param('id') id: string) {
    return this.livesService.deleteRoom(id);
  }

  // Lives Endpoints DEPOIS (porque são menos específicas)
  @Post()
  @UseGuards(JwtGuard)
  createLive(@Body() createLiveDto: CreateLiveDto) {
    return this.livesService.createLive(createLiveDto);
  }

  @Get()
  findAllLives() {
    return this.livesService.findAllLives();
  }

  @Get(':id')
  findLiveById(@Param('id') id: string) {
    return this.livesService.findLiveById(id);
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  updateLive(@Param('id') id: string, @Body() updates: Partial<any>) {
    return this.livesService.updateLive(id, updates);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  deleteLive(@Param('id') id: string) {
    return this.livesService.deleteLive(id);
  }
}
