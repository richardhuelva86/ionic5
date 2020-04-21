import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNotTemporalEmailValidator } from '../../utils/validators';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.page.html',
  styleUrls: ['./reactive-form.page.scss'],
})
export class ReactiveFormPage implements OnInit {
  public state: string;
  public form: FormGroup;

  public user: User = {} as User;
  public sendToServer: boolean;
  public id: number;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private toastController: ToastController
  ) {}

  public ngOnInit(): void {
    this.state = 'loading';
    this.sendToServer = false;
    // this.basicFormInitialization();

    this.complexFormInitialization();
  }

  private basicFormInitialization(): void {
    this.form = this.formBuilder.group({
      name: '',
      birthDate: '',
      sex: '',
      phone: '',
      email: '',
    });

    const user = this.userService.getStaticUser();

    this.form.patchValue(user);
  }

  private complexFormInitialization(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      birthDate: ['', Validators.required],
      sex: ['', Validators.required],
      phone: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, isNotTemporalEmailValidator],
      ],
    });

    this.userService.getRemoteUser().subscribe(
      (user: User) => {
        this.form.patchValue(user);
        this.id = user.id;
        this.state = 'loaded';
      },
      (error) => {
        this.state = 'error';
      }
    );
  }

  public loadUser(): void {
    this.state = 'loading';
    this.complexFormInitialization();
  }

  public submitForm(): void {
    this.sendToServer = true;
    this.user = this.form.value;
    this.user.id = this.id;

    this.userService.updateRemoteUser(this.user).subscribe(
      (user: User) => {
        this.sendToServer = false;
        this.presentToastWithOptions('Datos guardados');
      },
      (error) => {
        console.log(error);
        this.sendToServer = false;
        this.presentToastWithOptions(error.statusText);
      }
    );
  }

  public async presentToastWithOptions(msg: string = '') {
    const toast = await this.toastController.create({
      header: 'Completado',
      message: msg,
      position: 'bottom',
      duration: 3000,
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    toast.present();
  }
}
