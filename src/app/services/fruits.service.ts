import { Injectable } from '@angular/core';
import { Fruit } from '../models/fruit.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FruitsService {
  private fruitsPath = 'fruits';

  constructor(private httpClient: HttpClient) {}

  public getFruits(): Observable<Fruit[]> {
    return this.httpClient.get<Fruit[]>(
      `${environment.apiUrl}/${this.fruitsPath}`
    );
  }

  public getFruit(id: number): Observable<Fruit> {
    return this.httpClient.get<Fruit>(
      `${environment.apiUrl}/${this.fruitsPath}/${id}`
    );
  }

  public updateFruit(fruit: Fruit) {
    return this.httpClient.patch<Fruit>(
      `${environment.apiUrl}/${this.fruitsPath}/${fruit.id}`,
      fruit
    );
  }
}
