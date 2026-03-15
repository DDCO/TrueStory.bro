import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly jwtService: JwtService,
  ) {}

  private getOptionalUserId(req: { headers?: { authorization?: string } }): string | undefined {
    const auth = req.headers?.authorization;
    if (!auth?.startsWith('Bearer ')) return undefined;
    try {
      const payload = this.jwtService.verify<{ sub: string }>(auth.slice(7));
      return payload.sub;
    } catch {
      return undefined;
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createEventDto: CreateEventDto, @Req() req: { user: User }) {
    return this.eventsService.create(createEventDto, req.user);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('proposed')
  @UseGuards(JwtAuthGuard)
  findMyProposed(@Req() req: { user: User }) {
    return this.eventsService.findMyProposed(req.user.id);
  }

  @Get('by-slug/:slug')
  findBySlug(@Param('slug') slug: string, @Req() req: { user?: User; headers?: { authorization?: string } }) {
    const userId = req.user?.id ?? this.getOptionalUserId(req);
    return this.eventsService.findBySlug(slug, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: { user?: User; headers?: { authorization?: string } }) {
    const userId = req.user?.id ?? this.getOptionalUserId(req);
    return this.eventsService.findOne(id, userId);
  }

  @Post(':id/confirm')
  @UseGuards(JwtAuthGuard)
  async confirm(@Param('id') id: string, @Req() req: { user: User }) {
    return this.eventsService.addConfirmation(id, req.user);
  }

  @Get(':id/confirmations')
  getConfirmationCount(@Param('id') id: string) {
    return this.eventsService.getConfirmationCount(id).then((count) => ({ count }));
  }

  @Get(':id/confirmations/me')
  @UseGuards(JwtAuthGuard)
  async hasCurrentUserConfirmed(@Param('id') id: string, @Req() req: { user: User }) {
    const confirmed = await this.eventsService.hasUserConfirmed(id, req.user.id);
    return { confirmed };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Req() req: { user: User },
  ) {
    const event = await this.eventsService.findOne(id, null);
    if (event.createdById !== req.user.id) throw new ForbiddenException('Not your event');
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() req: { user: User }) {
    const event = await this.eventsService.findOne(id, null);
    if (event.createdById !== req.user.id) throw new ForbiddenException('Not your event');
    return this.eventsService.remove(id);
  }
}
