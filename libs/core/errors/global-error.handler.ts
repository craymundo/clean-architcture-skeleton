import { ErrorHandler, Injectable } from '@angular/core';
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';
import { Platform } from '@ionic/angular';
import * as ErrorStackParser from 'error-stack-parser';

import { Logger } from '../logger/logger.manager';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  log = Logger.create('GLOBAL_ERROR_HANDLER');
  crashlytics: FirebaseCrashlytics;

  constructor(
    private platform: Platform,
    private firebaseCrashlytics: FirebaseCrashlytics
  ) {
    this.crashlytics = this.firebaseCrashlytics.initialise();
  }

  handleError(error: Error): void {
    this.log.error(error.message || error.toString());

    if (this.platform.is('cordova')) {
      if (error instanceof Error) {
        this.handleTags(error);
      }

      this.crashlytics.log(error.message);
      this.crashlytics.logException(error.message);
    }
  }

  handleTags(error: Error): void {
    try {
      const stackFrames = ErrorStackParser.parse(error);

      if (stackFrames.length < 1) return;

      const tags = stackFrames[0];

      this.crashlytics.setString('message', error.message || error.toString());

      if (tags.fileName) {
        this.crashlytics.setString('fileName', tags.fileName);
      }

      if (tags.functionName) {
        this.crashlytics.setString('functionName', tags.functionName);
      }

      if (tags.columnNumber) {
        this.crashlytics.setInt('columnNumber', tags.columnNumber);
      }

      if (tags.source) {
        this.crashlytics.setString('source', tags.source);
      }

      if (tags.args) {
        this.crashlytics.setString('args', JSON.stringify(tags.args));
      }
    } catch (ex) {}
  }
}
