import { Component, signal } from '@angular/core';
import { LucideAngularModule, Mail, MapPin, Pen, Pencil, Phone, SquarePen, X } from 'lucide-angular';
import {  FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-resume-template-01',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './resume-template-01.html',
  styleUrl: './resume-template-01.scss',
})
export class ResumeTemplate01 {
  phoneIcon = Phone;
  emailIcon = Mail;
  locationIcon = MapPin;
  penIcon = SquarePen
  closeIcon = X

  empImg = signal<{
    file: File | null,
    img: string;
  }>({
    file: null,
    img: ''
  });

  resumeForm = new FormGroup({
    username: new FormControl('Loremn Ipsunm',[Validators.required]),
    title: new FormControl('Sales Representative',[Validators.required]),
    phone: new FormControl('+123 828 900 123', [Validators.required]),
    email: new FormControl('lorem@gmail.com',[Validators.required,Validators.email]),
    address: new FormControl('Kupondole, Lalitpur', [Validators.required]),
  })


  onProfileImgUpload(event:any){
    let file = event.target.files[0]
    if(file){
      this.empImg.set({
        ...this.empImg(),
        file: file,
      })
      const reader = new FileReader();
      reader.onload = () => {
        let res = reader.result as string
        this.empImg.set({
          ...this.empImg(),
          img: res
        })
      }

      reader.readAsDataURL(file)
    }
  }

  onRemoveProfileImg(){
    this.empImg.set({
      file: null,
      img: ''
    })
  }


}
