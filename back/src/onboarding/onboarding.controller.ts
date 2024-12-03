import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { UpdateOnboardingDto } from './dto/update-onboarding.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('onboarding')
@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post()
  @ApiOperation({ summary: 'Create new onboarding attempt' })
  async create() {
    return await this.onboardingService.create();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update onboarding attempt' })
  @ApiParam({ name: 'id', description: 'Onboarding id', type: Number })
  @ApiBody({ type: UpdateOnboardingDto })
  async update(
    @Param('id') id: number,
    @Body() { completed_onboarding }: UpdateOnboardingDto,
  ) {
    return await this.onboardingService.update(id, completed_onboarding);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Returns statistics on onboarding completion' })
  async statistics() {
    return await this.onboardingService.statistics();
  }
}
