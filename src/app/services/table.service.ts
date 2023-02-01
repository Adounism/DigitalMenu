import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Table } from '../model/table';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  tables: Table[] = [];
  private tablesSubject = new BehaviorSubject<Table[]>([]);
  tables$ = this.tablesSubject.asObservable();

  constructor() { }

  updateTables(tables: Table[]) {
    this.tables = tables;
    this.tablesSubject.next(this.tables);
  }
}
