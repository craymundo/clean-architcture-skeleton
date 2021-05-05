import { Injectable } from '@angular/core';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

import { Logger } from '../logger';
import { EVENTS, MediatorManager } from '../mediator';

const TIMEOUT_CANCEL_IDLE = 5;

@Injectable({
  providedIn: 'root',
})
export class IdleService {
  log = Logger.create(this.constructor.name);

  constructor(private idle: Idle) {}

  create(timeout: number): void {
    this.idle.setIdle(timeout);
    this.idle.setTimeout(TIMEOUT_CANCEL_IDLE);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleStart.subscribe(() => this.log.info("You've gone idle!"));
    this.idle.onIdleEnd.subscribe(() => {
      this.reset();
    });
    this.idle.onTimeoutWarning.subscribe((countdown) =>
      this.log.info(`You will time out in ${countdown} seconds!`)
    );
    this.idle.onTimeout.subscribe(() => {
      this.logout();
    });

    this.reset();
  }

  reset(): void {
    this.idle.watch();
  }

  logout(): void {
    MediatorManager.publish(EVENTS.OAUTH_LOGOUT);
  }
}
