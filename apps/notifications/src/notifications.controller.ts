import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotifiyEmailDto } from './dto/notify-email.dto';
import {} from '@app/core-lib';
import {
  NotificationsServiceController,
  NotificationsServiceControllerMethods,
} from '@app/core-lib/types/notifications';

@Controller()
@NotificationsServiceControllerMethods()
export class NotificationsController implements NotificationsServiceController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  async notifiyEmail(data: NotifiyEmailDto) {
    return this.notificationsService.notifyEmail(data);
  }
}
