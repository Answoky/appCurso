import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AutentificacionService } from './../../../providers/autentificacion/autentificacion.service';

@Component({
  selector: 'app-inises',
  templateUrl: './inises.component.html',
  styleUrls: ['./inises.component.scss']
})
export class InisesComponent implements OnInit {

  loginForm: FormGroup;
  userdata: any;
  autenticando: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private autService: AutentificacionService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6)
      ]
      ]
    });
  }

  onSubmit() {
    this.autenticando = true;
    this.userdata = this.saveUserdata();
    this.autService.inicioSesion(this.userdata);
    setTimeout(() => {
      this.autenticando = false;
    },3000);
  }
  saveUserdata() {
    const saveUserdata = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    return saveUserdata;
  }

}
