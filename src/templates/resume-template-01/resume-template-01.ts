import { Component } from '@angular/core';
import { LucideAngularModule, Mail, MapPin, Phone } from 'lucide-angular';

@Component({
  selector: 'app-resume-template-01',
  imports: [LucideAngularModule],
  templateUrl: './resume-template-01.html',
  styleUrl: './resume-template-01.scss',
})
export class ResumeTemplate01 {
  phoneIcon = Phone;
  emailIcon = Mail;
  locationIcon = MapPin;
}
