import { Constructor } from '@angular/cdk/table';
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export const UnsubscribeOnDestroy = <T extends Constructor<any>>(
  base: T = class {} as T
) =>
  class extends base implements OnDestroy {
    destroyed$ = new Subject<void>();

    /**
     * DO NOT this.destroyed$.complete();
     * It is not necessary:
     * https://stackoverflow.com/questions/44289859/do-i-need-to-complete-a-subject-for-it-to-be-garbage-collected
     */
    ngOnDestroy(): void {
      this.destroyed$.next();
    }
  };
