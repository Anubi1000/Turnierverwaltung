import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TournamentModule } from './tournament/tournament.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TournamentModule,
    MongooseModule.forRoot('mongodb://root:example@localhost:27017/', {
      dbName: 'turnierverwaltung',
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
