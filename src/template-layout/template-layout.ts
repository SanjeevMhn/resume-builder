import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
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
  downloadIcon = Download

  floatingNav: Array<{
    id: number;
    name: string;
    icon: LucideIconData;
    link?: string;
  }> = [
    {
      id: 1,
      name: 'Home',
      icon: this.homeIcon,
      link: 'home',
    },
    {
      id: 2,
      name: 'Save',
      icon: this.saveIcon,
    },
    {
      id: 3,
      name: 'Favorite',
      icon: this.heartIcon,
    },
    {
      id: 4,
      name: 'Undo',
      icon: this.undoIcon,
    },
    {
      id: 5,
      name: 'Redo',
      icon: this.redoIcon,
    },
    {
      id: 6,
      name: 'Download',
      icon: this.downloadIcon
    }
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
}
