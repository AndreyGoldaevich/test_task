import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
})
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  @OnEvent('onboardingCompleted')
  onboardingCompleted() {
    this.server.emit('onboardingCompleted');
  }

  @OnEvent('onboardingStarted')
  onboardingStarted() {
    this.server.emit('onboardingStarted');
  }
}
