import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { Fruit } from '../../models/fruit.model';
import { FruitsService } from '../../services/fruits.service';

@Component({
  selector: 'app-fruit-list',
  templateUrl: './fruit-list.page.html',
  styleUrls: ['./fruit-list.page.scss'],
})
export class FruitListPage implements OnInit {
  public fruits: Fruit[];
  public state: 'loading' | 'loaded' | 'error';
  constructor(private fruitsService: FruitsService) {}

  ngOnInit() {
    this.loadData();
  }
  private loadData(): void {
    this.state = 'loading';
    this.fruitsService.getFruits().subscribe(
      (fruits: Fruit[]) => {
        this.fruits = fruits;
        this.state = 'loaded';
      },
      (error) => {
        this.state = 'error';
      }
    );
  }
  ionViewWillEnter() {
    this.loadData();
  }

  public reloadData(): void {
    this.loadData();
  }
}
