import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOnboardingDto {
  @IsBoolean()
  @ApiProperty()
  completed_onboarding: boolean;
}
