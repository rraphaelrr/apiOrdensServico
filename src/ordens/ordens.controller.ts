import { Controller, Get, Post, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrdensService } from './ordens.service';
import { CreateOrdemDto } from './dto/create-ordem.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Ordens')
@Controller('ordens')
export class OrdensController {
  constructor(private service: OrdensService) {}

  @Post()
  criar(@Body() dto: CreateOrdemDto) {
    return this.service.criar(dto);
  }

  @ApiBearerAuth('access-token') 
  @UseGuards(JwtAuthGuard)
  @Get()
  listar() {
    return this.service.listar();
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() dto: any) {
    return this.service.atualizar(Number(id), dto);
  }

  @ApiBearerAuth('access-token') 
  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  atualizarStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.service.atualizarStatus(Number(id), dto.status);
  }
}