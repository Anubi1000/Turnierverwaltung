import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TournamentValueType } from './tournamentValue.dto';

export type TournamentDocument = HydratedDocument<Tournament>;

@Schema()
export class Tournament {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  values: [
    {
      id: string;
      name: string;
      type: TournamentValueType;
      formula?: string;
    },
  ];
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament);
