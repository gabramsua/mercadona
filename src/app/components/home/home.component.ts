import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import Constants from 'src/constants';
import { Tornillo } from 'src/models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit  {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['nombre', 'precio', 'formato', 'marca', 'id'];
  dataSource = new MatTableDataSource<Tornillo>([]);


  constructor(private _service: AuthService) { }

  ngOnInit(): void {
    this._service.tornillos$.subscribe((tornillos: Tornillo[]) => {
      this.dataSource.data = tornillos;
    })

    this.getAllTornillos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllTornillos() {
    this._service.getAll(Constants.END_POINTS.TORNILLOS)
  }

  delete(id: string) {
    console.log('delete ', id)
  }

}
