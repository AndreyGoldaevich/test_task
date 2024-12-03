import { Module } from '@nestjs/common';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';
import { PrismaService } from '../db/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Module({
  controllers: [OnboardingController],
  providers: [OnboardingService, PrismaService, NotificationsService],
})
export class OnboardingModule {}
