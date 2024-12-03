import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class NotificationsService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  onboardingCompleted() {
    this.eventEmitter.emit('onboardingCompleted');
  }

  onboardingStarted() {
    this.eventEmitter.emit('onboardingStarted');
  }
}
