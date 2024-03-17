import { IsEnum, IsNotEmpty, ValidateIf } from 'class-validator';

export enum TournamentValueType {
  Input = 'input',
  Calculated = 'calculated',
}

export class TournamentValueDto {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEnum(TournamentValueType)
  type: TournamentValueType;

  @ValidateIf((o) => o.type === TournamentValueType.Calculated)
  @IsNotEmpty()
  readonly formula?: string;
}
