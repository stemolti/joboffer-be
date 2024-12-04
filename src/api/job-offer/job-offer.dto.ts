import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class JobOfferQueryDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  company: string;

  @IsString()
  city: string;

  @IsString()
  date: string;

  @IsBoolean()
  smartWorking: boolean;

  @IsNumber()
  salary: number;

  @IsNumber()
  contract: number;

  @IsOptional()
  @IsNumber()
  maxResults?: number;

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';
}
