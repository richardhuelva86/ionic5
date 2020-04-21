import { Component, OnInit } from '@angular/core';
import { Fruit } from '../../models/fruit.model';
import { FruitsService } from '../../services/fruits.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-fruit-details',
  templateUrl: './fruit-details.page.html',
  styleUrls: ['./fruit-details.page.scss'],
})
export class FruitDetailsPage implements OnInit {
  public fruit: Fruit = {} as Fruit;
  public form: FormGroup;
  public sendToServer: boolean;
  public state: 'loading' | 'loaded' | 'error';

  constructor(
    private fruitService: FruitsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.sendToServer = false;
    this.state = 'loading';
    this.basicFormInitialization();
  }

  private basicFormInitialization(): void {
    this.form = this.formBuilder.group({
      description: ['', [Validators.required]],
    });

    this.fruitService
      .getFruit(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(
        (fruit: Fruit) => {
          this.fruit = fruit;
          this.form.patchValue(this.fruit);
          this.state = 'loaded';
        },
        (error) => {
          this.state = 'error';
        }
      );
  }

  public reloadForm() {
    this.state = 'loading';
    this.basicFormInitialization();
  }

  public submitForm(): void {
    this.sendToServer = true;
    this.fruit.description = this.form.value.description;
    this.fruitService.updateFruit(this.fruit).subscribe(
      (fruit: Fruit) => {
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
