import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { SocketService } from '../../services/socket/socket.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-stream',
  template: `
    <div *ngIf="jobMeta">
      <div *ngIf="jobMeta?.meta?.description">
        {{jobMeta?.meta?.description}}
      </div>
      <div *ngIf="jobSync?.inNumberOf100">
        <label for="">Sync process: {{jobSync?.inNumberOf100}} %</label>
      </div>
      <md-progress-bar
        class="bim-progress"
        color="primary"
        mode="determinate"
        [value]="jobSync?.inNumberOf100">
      </md-progress-bar>
    </div>
  `,
})
export class StreamComponent implements OnInit {

  jobMeta;
  jobSync;

  @Output('onStreamStarted') onStreamStarted: EventEmitter<{}> = new EventEmitter();
  @Output('onStreamFinished') onStreamFinished: EventEmitter<{}> = new EventEmitter();

  constructor(private authService: AuthService, private socketService: SocketService) { }

  ngOnInit() {
    this.subscribeToStream();
  }

  subscribeToStream(): void {
    this.authService.getUser().subscribe((response: any) => {
      if (response.hasOwnProperty('company')) {
        this.socketService.socket.on(`${response.company._id}/jobs`, (data) => {
          this.jobMeta = data;
          this.onStreamStarted.emit(this.jobMeta);
          this.socketService.socket.on('job' + data._id, (sync) => {
            this.jobSync = sync;
            if (this.jobSync.hasOwnProperty('inNumberOf100')) {
              if (this.jobSync.inNumberOf100 === 100) {
                this.onStreamFinished.emit(this.jobSync);
              }
            }
          })
        })
      }
    })
  }
}
