import { ErrorHandler } from '@angular/core';

export class GlobalErrorHandler extends ErrorHandler {
  public override handleError(error: any): void {
    console.log('GlobalErrorHandler error=', error);
    console.log('GlobalErrorHandler stack=', error.stack);
  }
}
