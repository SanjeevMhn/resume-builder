import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-template-layout',
  imports: [RouterOutlet],
  templateUrl: './template-layout.html',
  styleUrl: './template-layout.scss',
})
export class TemplateLayout {
  @ViewChild('zoomSection', { static: true }) zoomSection!: ElementRef;
  zoomLevel = 1;
  zoomStep = 0.1;
  maxZoom = 2;

  @HostListener('document:keydown', ['$event'])
  handleZoom(event: KeyboardEvent) {
    if (event.ctrlKey && event.key == '=') {
      event.preventDefault();

      this.zoomLevel = Math.min(this.zoomLevel + this.zoomStep, this.maxZoom);
      this.zoomSection.nativeElement.style.transform = `scale(${this.zoomLevel})`;

      if (this.zoomLevel > 1.5) {
        this.zoomSection.nativeElement.style.marginTop = `${
          this.zoomLevel * 5
        }rem`;
      }
      this.zoomSection.nativeElement.style.paddingTop = `${
        this.zoomLevel * 5
      }rem`;
      this.zoomSection.nativeElement.style.transformOrigin = 'center center';
    }

    if (event.ctrlKey && event.key == '-') {
      event.preventDefault();

      this.zoomLevel = Math.max(1, this.zoomLevel - this.zoomStep);
      this.zoomSection.nativeElement.style.marginTop = `${
        this.zoomLevel * 5
      }rem`;
      this.zoomSection.nativeElement.style.paddingTop = `${
        this.zoomLevel * 5
      }rem`;

      if (this.zoomLevel < 1.25) {
        this.zoomSection.nativeElement.style.marginTop = `0rem`;
        this.zoomSection.nativeElement.style.paddingTop = `0rem`;
      }
      this.zoomSection.nativeElement.style.transform = `scale(${this.zoomLevel})`;
      this.zoomSection.nativeElement.style.transformOrigin = 'center center';
    }

    if (event.ctrlKey && event.key == '0') {
      this.zoomSection.nativeElement.style.marginTop = `0rem`;
      this.zoomSection.nativeElement.style.paddingTop = `0rem`;
      this.zoomSection.nativeElement.style.transform = `scale(1)`;
      this.zoomLevel = 1;
    }
  }
}
