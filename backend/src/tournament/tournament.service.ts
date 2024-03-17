import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tournament } from './tournament.schema';
import { Model } from 'mongoose';
import { TournamentInfoDto } from './tournamentInfo.dto';
import { TournamentEditDto } from './tournamentEdit.dto';
import { TournamentValueType } from './tournamentValue.dto';
import { InvalidArgumentException } from '../util/InvalidArgumentException';

@Injectable()
export class TournamentService {
  private readonly logger = new Logger(TournamentService.name);

  constructor(
    @InjectModel(Tournament.name) private tournamentModel: Model<Tournament>,
  ) {}

  async getAllAsInfo(): Promise<TournamentInfoDto[]> {
    const documents = await this.tournamentModel.find({}, 'name');
    return documents.map((doc) => {
      return {
        id: doc.id,
        name: doc.name,
      };
    });
  }

  async create(tournament: TournamentEditDto) {
    if (tournament.values.filter((obj) => obj.id == 'points').length != 1) {
      throw new InvalidArgumentException(
        'Amount of result values was not correct.',
      );
    }

    tournament.values.forEach((value) => {
      if (value.type == TournamentValueType.Input && value.formula) {
        this.logger.debug(
          `Removing unneeded formula: ${JSON.stringify(value)}`,
        );
        value.type = undefined;
      }
    });

    await this.tournamentModel.create(tournament);
  }
}
