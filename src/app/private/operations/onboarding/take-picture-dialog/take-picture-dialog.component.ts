import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-take-picture-dialog',
  templateUrl: './take-picture-dialog.component.html',
  styleUrls: ['./take-picture-dialog.component.scss']
})
export class TakePictureDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<TakePictureDialogComponent>) { }

  @ViewChild('video') videoElement: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  private video: any;
  photo: string;
  videoVisible: boolean = true;


  ngAfterViewInit() {
    if (this.videoElement) {
      this.video = this.videoElement.nativeElement;
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          this.video.srcObject = stream;
          this.video.play();
        })
        .catch((err) => {
          console.error('Error accessing webcam: ', err);
        });
    } else {
      console.error('Video element not found');
    }
  }



  ngOnInit() {
    this.video = this.videoElement.nativeElement;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.video.srcObject = stream;
        this.video.play();
      })
      .catch((err) => {
        console.error('Error accessing webcam: ', err);
      });
  }



  takePicture() {
    const context = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.width = this.video?.videoWidth || 0;
    this.canvas.nativeElement.height = this.video?.videoHeight || 0;
    context.drawImage(this.video, 0, 0);
    this.photo = this.canvas.nativeElement.toDataURL('image/png');
    //this.videoVisible = false; 
    //this.stopWebcam();
  }
  closeDialog(isDone: boolean) {
    console.log(" this.photo " + this.photo);
    this.stopWebcam();
    this.dialogRef.close(isDone ? this.photo : null);
    
  }

  stopWebcam() {
    if (this.video && this.video.srcObject) {
      const stream = this.video.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
      this.video.srcObject = null;
    }
  }

}


