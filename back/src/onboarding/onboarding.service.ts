import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { OnboardingModel } from './models/onboarding.model';
import { StatisticsModel } from './models/statistics.model';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class OnboardingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationsService,
  ) {}

  async create(): Promise<OnboardingModel> {
    const newOnboarding = await this.prisma.onboarding.create({
      data: {},
    });

    this.notificationService.onboardingStarted();

    return newOnboarding;
  }

  async update(
    id: number,
    completed_onboarding: boolean,
  ): Promise<OnboardingModel> {
    const updatedOnboarding = await this.prisma.onboarding.update({
      where: { id },
      data: {
        completed_onboarding,
      },
    });
    if (completed_onboarding) {
      this.notificationService.onboardingCompleted();
    }
    return updatedOnboarding;
  }

  async statistics(): Promise<StatisticsModel> {
    const allOnboardingsCount = await this.prisma.onboarding.count();
    const completedOnboardingsCount = await this.prisma.onboarding.count({
      where: {
        completed_onboarding: true,
      },
    });
    return { allOnboardingsCount, completedOnboardingsCount };
  }
}
