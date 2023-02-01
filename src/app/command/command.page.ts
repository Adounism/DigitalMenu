import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-command',
  templateUrl: './command.page.html',
  styleUrls: ['./command.page.scss'],
})
export class CommandPage implements OnInit {
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  primary ="rgba(36,39,46,255)";

  form!: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private router : Router,
     private location: Geolocation) { }

  options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600
  };


  ngOnInit() {
    this.getCurrentLocation();
    this.form = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      numeroTelephone: [''],
      quartier: [''],
      // rue: [''],
      // porte: ['']
    });
  }

  submitForm() {

    if(this.latitude && this.longitude){
      let adresse = {
        latitude: this.latitude,
        longitude : this.longitude,
        city: this.form.value.quartier
      }
      localStorage.setItem("latitude",  this.latitude);
      localStorage.setItem("longitude",  this.longitude);
      localStorage.setItem("city",  this.form.value.quartier);
      localStorage.setItem("firstName", this.form.value.nom);
      localStorage.setItem("lastName", this.form.value.prenom);
      localStorage.setItem("contact", this.form.value.numeroTelephone);

      this.router.navigate(['/food']);


    }

  }


  getCurrentLocation() {
    this.location.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
