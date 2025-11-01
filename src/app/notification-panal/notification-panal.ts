import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NotificationService } from '../notification-service';
import { CommonModule } from '@angular/common';
import { UserNotification } from '../UserNotification';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-notification-panal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-panal.html',
  styleUrls: ['./notification-panal.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationPanal implements OnInit {
  notifications: UserNotification[] = [];
  loading = true;
  error = '';

  constructor(
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.notificationService.getNotifications()
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
