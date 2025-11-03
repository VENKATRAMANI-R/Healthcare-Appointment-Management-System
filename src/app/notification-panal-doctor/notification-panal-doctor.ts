import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { UserNotification } from '../UserNotification';
import { Subject, takeUntil } from 'rxjs';
import { NotificationServiceDoctor } from '../notification-service-doctor';

@Component({
  selector: 'app-notification-panal-doctor',
  imports: [DatePipe,CommonModule],
  templateUrl: './notification-panal-doctor.html',
  styleUrl: './notification-panal-doctor.css'
})
export class NotificationPanalDoctor {
  notifications: UserNotification[] = [];
    loading = true;
    error = '';
    doctorId: number =0;
  
    constructor(
      private notificationServiceDoctor: NotificationServiceDoctor,
      private cdr: ChangeDetectorRef
    ) {}
    private destroy$ = new Subject<void>();
  
    ngOnInit(): void {
      this.doctorId = localStorage.getItem('doctorId') ? Number(localStorage.getItem('doctorId')) : 0;
      this.notificationServiceDoctor.getNotifications(this.doctorId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: data => {
            this.notifications = data;
            this.cdr.markForCheck();
            this.loading = false;
            this.cdr.markForCheck();
          },
          error: err => {
            this.error = 'Failed to load notifications';
            this.loading = false;
            this.cdr.markForCheck();
          }
        });
    }
  
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}
