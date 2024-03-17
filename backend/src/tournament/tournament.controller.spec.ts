import { TournamentController } from './tournament.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { TournamentService } from './tournament.service';
import { getModelToken } from '@nestjs/mongoose';
import { Tournament } from './tournament.schema';

describe('TournamentController', () => {
  let controller: TournamentController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TournamentController],
      providers: [
        TournamentService,
        {
          provide: getModelToken(Tournament.name),
          useValue: {
            find: jest.fn().mockReturnValue([]),
          },
        },
      ],
    }).compile();

    controller = app.get<TournamentController>(TournamentController);
  });

  describe('getAll', () => {
    it('should test', async () => {
      expect(await controller.getAll()).toStrictEqual([]);
    });
  });
});
