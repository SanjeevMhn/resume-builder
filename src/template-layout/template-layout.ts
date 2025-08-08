import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  CornerUpLeft,
  CornerUpRight,
  Download,
  Heart,
  House,
  LucideAngularModule,
  LucideIconData,
  SaveIcon,
} from 'lucide-angular';

import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-template-layout',
  imports: [RouterOutlet, LucideAngularModule, RouterLink],
  templateUrl: './template-layout.html',
  styleUrl: './template-layout.scss',
})
export class TemplateLayout implements OnInit {
  homeIcon = House;
  saveIcon = SaveIcon;
  heartIcon = Heart;
  undoIcon = CornerUpLeft;
  redoIcon = CornerUpRight;
  downloadIcon = Download;

  floatingNav: Array<{
    id: number;
    name: string;
    icon: LucideIconData;
    link?: string;
  }> = [
    {
      id: 1,
      name: 'home',
      icon: this.homeIcon,
      link: 'home',
    },
    {
      id: 2,
      name: 'save',
      icon: this.saveIcon,
    },
    {
      id: 3,
      name: 'favorite',
      icon: this.heartIcon,
    },
    {
      id: 4,
      name: 'undo',
      icon: this.undoIcon,
    },
    {
      id: 5,
      name: 'redo',
      icon: this.redoIcon,
    },
    {
      id: 6,
      name: 'download',
      icon: this.downloadIcon,
    },
  ];

  @ViewChild('zoomSection', { static: true }) zoomSection!: ElementRef;
  zoomLevel = 1.8;
  zoomStep = 0.1;
  maxZoom = 3;

  ngOnInit(): void {
    this.zoomSection.nativeElement.style.transform = `scale(${this.zoomLevel})`;
    this.zoomSection.nativeElement.style.marginTop = `${this.zoomLevel * 7}rem`;
    this.zoomSection.nativeElement.style.paddingTop = `${
      this.zoomLevel * 7
    }rem`;
  }

  @HostListener('document:keydown', ['$event'])
  handleZoom(event: KeyboardEvent) {
    if (event.ctrlKey && event.key == '=') {
      event.preventDefault();

      this.zoomLevel = Math.min(this.zoomLevel + this.zoomStep, this.maxZoom);
      this.zoomSection.nativeElement.style.transform = `scale(${this.zoomLevel})`;

      if (this.zoomLevel > 1.5) {
        this.zoomSection.nativeElement.style.marginTop = `${
          this.zoomLevel * 8
        }rem`;
      }
      this.zoomSection.nativeElement.style.paddingTop = `${
        this.zoomLevel * 8
      }rem`;
      this.zoomSection.nativeElement.style.transformOrigin = 'center center';
    }

    if (event.ctrlKey && event.key == '-') {
      event.preventDefault();

      this.zoomLevel = Math.max(1, this.zoomLevel - this.zoomStep);
      this.zoomSection.nativeElement.style.marginTop = `${
        this.zoomLevel * 8
      }rem`;
      this.zoomSection.nativeElement.style.paddingTop = `${
        this.zoomLevel * 8
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

  handleAction(btn: any) {
    if (btn == 'download') {
      this.zoomSection.nativeElement.style.marginTop = `0rem`;
      this.zoomSection.nativeElement.style.paddingTop = `0rem`;
      this.zoomSection.nativeElement.style.transform = `scale(1)`;
      this.zoomLevel = 1;
      const template = document.getElementById('template');
      html2canvas(template!,{
        scale: 5,
        useCORS: true
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        let fileWidth = 210;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, fileWidth, fileHeight);
        pdf.save('resume-01');
      });
    }
  }
}
