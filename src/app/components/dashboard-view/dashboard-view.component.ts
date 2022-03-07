import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { map, catchError } from 'rxjs/operators';
import { filter } from 'rxjs/operators';

import { ChartType, Row } from 'angular-google-charts';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
})
export class DashboardViewComponent implements OnInit {
  // @ViewChild('mychart ', {static: false}) mychart: any;
  @ViewChild('chart ', { static: false }) chart;

  chartData: any;
  playersNames: any = [];
  playersNamesFilter: any = [];
  queryPlayers: any = [];
  playerNamesKeys;
  playersCheckBox: FormGroup = new FormGroup({});
  dataApi: any;

  constructor(
    private _playerService: PlayerService,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  chartSettings = {
    type: ChartType.ColumnChart,

    data: [],

    columnNames: new Array(),

    options: {
      hAxis: {
        title: 'Dates',
      },

      vAxis: {
        title: 'Sell',
      },
    },

    width: 1000,

    height: 400,
  };

  ngOnInit(): void {
    

    this.actRoute.data.subscribe((data) => {
      this.dataApi = data;
      this.transformDataIntoChart(data.routeResolver.data);
      this.generateChart();
      this.playersCheckBox = this.fb.group(this.playersNames);

      this.actRoute.queryParamMap.subscribe((params) => {
        let playersValue =  params.get('players');

        if (playersValue === null) {
          this.queryPlayers = new Array<string>();
        } else {
          this.queryPlayers = JSON.parse(playersValue);
        }
  
        this.queryPlayers.map(n => {
          this.playersCheckBox.get(n)?.patchValue(true);
          this.refreshChart();
        });
      });
    });
  }

  transformDataIntoChart(data: any) {
    // Removing null values from dates
    // this.chartData = data.DAILY.dates.filter((n: any) => n);

    console.log({ data });
    // Players Dictionary Object
    let players = data.DAILY.dataByMember.players;
    this.playerNamesKeys = Object.keys(players);

    // Transform dates into array and removes null values
    let result = data.DAILY.dates
      .filter((n: any) => n)
      .map((n: any) => [this.convertStringToDate(n)]);

    // Store players names
    // this.playersNamesFilter = Object.keys(players);

    
    this.playersNamesFilter = [];
    Object.keys(players).map((n: any) => {
      if(this.playersNames[n] === undefined) this.playersNames[n] = false;
      if (this.playersNames[n] === true) this.playersNamesFilter.push(n);
    });

    // this.

    // Looping through the array of players
    for (let iPlayer = 0; iPlayer < Object.keys(players).length; iPlayer++) {
      if (this.playersNames[Object.keys(players)[iPlayer]] === true) {
        let player: any = Object.values(players)[iPlayer];

        // Removing null values
        player.points = player.points.filter((n: any) => n);

        // Looping through the array of points of a player
        for (let iPoint = 0; iPoint < player.points.length; iPoint++) {
          const element = player.points[iPoint];
          if (player.points[iPoint] !== null)
            result[iPoint].push(player.points[iPoint]);
        }
      }
    }

    this.chartData = result.filter((n: any) => [n]);
  }

  generateChart() {
    // Format Dates to dd-MM-yyyy
    this.chartData.map((n: any) => {
      let newFormattedDate =
        n[0].getDate() + '-' + (n[0].getMonth() + 1) + '-' + n[0].getFullYear(); // The value returned by getMonth() is an integer between 0 and 11.
      n[0] = newFormattedDate;
    });

    this.chartSettings = {
      type: ChartType.ColumnChart,

      data: this.chartData,

      // Add Column Names, dates + players
      columnNames: ['Dates'].concat(this.playersNamesFilter),

      options: {
        hAxis: {
          title: 'Dates',
        },

        vAxis: {
          title: 'Players Scores Daily',
        },
      },

      width: 1000,

      height: 400,
    };
  }

  convertStringToDate(dateString: string): Date {
    let formattedString: string =
      dateString.slice(0, 4) +
      '-' +
      dateString.slice(4, 6) +
      '-' +
      dateString.slice(6, 8);
    return new Date(formattedString);
  }

  onSelect(event: any) {
    console.log({ event });
    this.playersNames = this.playersCheckBox.value;
  }

  refreshChart() {
    this.playersNames = this.playersCheckBox.value;
    this.chartData = undefined;

    this.transformDataIntoChart(this.dataApi.routeResolver.data);
    this.generateChart();
    // this.chart.draw();
  }

  onSelectPlayers() {
    this.refreshChart();
    const queryParams: any = {};
    const arrayOfValues = this.playersNamesFilter;
    queryParams.players = JSON.stringify(arrayOfValues);

    const navigationExtras: NavigationExtras = {
      queryParams
    };
    this.router.navigate(['/dashboard'], navigationExtras);
  }
}