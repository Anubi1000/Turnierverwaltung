import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TournamentEditDto } from './tournamentEdit.dto';
import { TournamentService } from './tournament.service';
import { TournamentInfoDto } from './tournamentInfo.dto';
import { InvalidArgumentException } from '../util/InvalidArgumentException';

@ApiTags('tournament')
@Controller('/tournament')
export class TournamentController {
  private readonly logger = new Logger(TournamentController.name);

  constructor(private readonly tournamentService: TournamentService) {}

  @ApiOkResponse({
    description: 'Contains an array with all available tournaments.',
    type: [TournamentInfoDto],
  })
  @ApiOperation({
    description: 'Queries for all available tournaments.',
  })
  @Get()
  async getAll(): Promise<TournamentInfoDto[]> {
    this.logger.debug('Getting all tournaments');
    return await this.tournamentService.getAllAsInfo();
  }

  @ApiCreatedResponse({
    description: 'Indicates that the tournament has been created.',
  })
  @ApiBadRequestResponse({
    description: 'Indicates that the request was not in the correct format.',
  })
  @Post()
  async create(@Body() tournament: TournamentEditDto) {
    this.logger.debug(`Creating new tournament: ${JSON.stringify(tournament)}`);
    try {
      await this.tournamentService.create(tournament);
    } catch (error) {
      if (error instanceof InvalidArgumentException) {
        throw new BadRequestException(error.message);
      } else {
        throw error;
      }
    }
    return 'Created tournament.';
  }

  @ApiOkResponse({
    description: 'Contains the tournament with the specified id.',
    type: TournamentEditDto,
  })
  @ApiBadRequestResponse({
    description:
      'Indicates that the tournament with the specified id does not exist.',
  })
  @Get(':tournamentId')
  async getById(@Param('tournamentId') tournamentId: string) {}

  @ApiOkResponse({
    description: 'Indicates that the tournament has been deleted.',
  })
  @ApiBadRequestResponse({
    description:
      'Indicates that the tournament with the specified id does not exist or that properties should be updated that are not allowed to be updated.',
  })
  @Post(':tournamentId')
  async updateById(@Param('tournamentId') tournamentId: string) {}

  @ApiOkResponse({
    description: 'Indicates that the tournament has been updated.',
  })
  @ApiBadRequestResponse({
    description:
      'Indicates that the tournament with the specified id does not exist.',
  })
  @Delete(':tournamentId')
  async deleteById(@Param('tournamentId') tournamentId: string) {}
}
