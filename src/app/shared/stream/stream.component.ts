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

  @Output('onStreamFinished') onStreamFinished: EventEmitter<{}> = new EventEmitter();

  constructor(private authService: AuthService, private socketService: SocketService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.authService.getUser().subscribe((response: any) => {
      if (response.hasOwnProperty('company')) {
        this.socketService.socket.on(`${response.company._id}/jobs`, (data) => {
          this.jobMeta = data;
          this.onStreamFinished.emit(this.jobMeta);
          this.socketService.socket.on('job/' + data.guid, (sync) => {
            this.jobSync = sync;
          })
        })
      }
    })
  }
}
