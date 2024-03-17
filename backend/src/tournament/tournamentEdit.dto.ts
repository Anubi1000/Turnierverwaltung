import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TournamentValueDto } from './tournamentValue.dto';
import { Type } from 'class-transformer';

export class TournamentEditDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @Type(() => TournamentValueDto)
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  readonly values: TournamentValueDto[];
}
