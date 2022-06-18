import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

declare var MediaRecorder: any;

@Component({
  selector: 'screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css'],
})
export class ScreenComponent implements OnInit {
  @Input() name: string;

  recS: boolean = false;
  mediaRecorder: any;
  chunks = [];
  audioFiles = [];
  constructor(private cd: ChangeDetectorRef, private dom: DomSanitizer) {}
  ngOnInit() {
    navigator['getUserMedia'](
      { audio: true },
      (stream) => {
        console.log(stream);
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.onstop = (e) => {
          console.log('data available after MediaRecorder.stop() called.');

          // var clipName = prompt('Enter a name for your sound clip');

          // var clipContainer = document.createElement('article');
          // var clipLabel = document.createElement('p');
          // var audio = document.createElement('audio');
          // var deleteButton = document.createElement('button');

          // clipContainer.classList.add('clip');
          // audio.setAttribute('controls', '');
          // deleteButton.innerHTML = 'Delete';
          // clipLabel.innerHTML = clipName;

          // clipContainer.appendChild(audio);
          // clipContainer.appendChild(clipLabel);
          // clipContainer.appendChild(deleteButton);
          // soundClips.appendChild(clipContainer);

          // audio.controls = true;
          var blob = new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' });
          this.chunks = [];
          var audioURL = URL.createObjectURL(blob);
          // audio.src = audioURL;
          this.audioFiles.push(this.dom.bypassSecurityTrustUrl(audioURL));
          console.log(audioURL);
          console.log('recorder stopped');
          this.cd.detectChanges();
        };
        this.mediaRecorder.ondataavailable = (e) => {
          this.chunks.push(e.data);
        };
      },
      () => {
        alert('Error capturing audio.');
      }
    );
  }
  onRecClick() {
    if (this.recS) {
      this.recS = false;
      this.mediaRecorder.stop();
      console.log(this.mediaRecorder.state);
      console.log('recorder stopped');
    } else {
      this.recS = true;
      this.mediaRecorder.start();
      console.log(this.mediaRecorder.state);
      console.log('recorder started');
    }
  }
}
