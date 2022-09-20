import { User } from './../../core/models/auth.models';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ChartType } from "src/app/core/models/chartType";
import { ReservoirService } from "src/app/core/services/reservoir.service";
import { ReservoirDetailsResponseDto } from 'src/app/core/models/ReservoirDetailsResponse';
import { LoginResponseDto } from 'src/app/core/models/loginResponseDto';
import { Router } from '@angular/router';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {

  transactions = [];
  @ViewChild('content') content;
  reservoirList;
  isActive;

  constructor(
    private modalService: NgbModal,
    private reservoirService: ReservoirService,
    private userService: UserService,
    private _router: Router


  ) { }
  authUser: LoginResponseDto;
  ngOnInit(): void {

    this.authUser = JSON.parse(
      localStorage.getItem("authUser")
    ) as LoginResponseDto;

    this.findMaintainerByName(this.authUser?.authentication.principal?.username);
    this.findAll();
    this.findAllUsers();
    this._fetchData();
  }


  listOfUsers;
  findAllUsers() {
    this.userService.findAllUsers().subscribe(res => {
      console.log("🚀 ~ findAll ~ res", res)
      this.listOfUsers = res;
    },
      (err) => {
        console.log(err);
      }
    )
  }

  user: any;
  findMaintainerByName(name) {
    console.log(name, "name");
    this.userService.findMaintainerByName(name)
      .subscribe(res => {
        console.log("res ", res);
        this.user = res
      });
  }


  reservoirDetailsList: ReservoirDetailsResponseDto[];
  findReservoirDetailsById(id) {
    this.reservoirService.getReservoirEveryDayDetails(id)
      .subscribe((res: ReservoirDetailsResponseDto[]) => {
        console.log("reservoir details :", res);
        this.reservoirDetailsList = res
      });
  }


  openModal() {
    this.modalService.open(this.content, { centered: true });
  }

  redirectToDetailsPage(id: number) {
    this._router.navigate(['selectedReservoirDashboard', id])
  }


  findAll() {
    this.reservoirService.findAll().subscribe(res => {
      console.log("🚀 ~ file: add-reservoir.component.ts ~ line 23 ~ AddReservoirComponent ~ this.reservoirService.findAll ~ res", res)
      this.reservoirList = res;
    },
      (err) => {
        console.log(err);
      }
    )
  }


  weeklyreport() {

  }


  monthlyreport() {

  }

  yearlyreport() {

  }











  statData
  dashedLineChart: ChartType;
  linewithDataChart: ChartType;

  private _fetchData() {

    this.dashedLineChart = {
      chart: {
        height: 220,
        type: 'line',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false,
        }
      },
      colors: ['#556ee6', '#f46a6a', '#34c38f'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [3, 4, 3],
        curve: 'straight',
        dashArray: [0, 8, 5]
      },
      series: [{
        name: 'Session Duration',
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
      },
      {
        name: 'Page Views',
        data: [36, 42, 60, 42, 13, 18, 29, 37, 36, 51, 32, 35]
      },
      {
        name: 'Total Visits',
        data: [89, 56, 74, 98, 72, 38, 64, 46, 84, 58, 46, 49]
      }
      ],

      title: {
        text: 'Page Statistics',
        align: 'left'
      },

      markers: {
        size: 0,

        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
          '10 Jan', '11 Jan', '12 Jan'
        ],
      },
      tooltip: {
        y: [{
          title: {
            formatter: (val) => {
              return val + ' (mins)';
            }
          }
        }, {
          title: {
            formatter: (val) => {
              return val + ' per session';
            }
          }
        }, {
          title: {
            formatter: (val) => {
              return val;
            }
          }
        }]
      },
      grid: {
        borderColor: '#f1f1f1',
      }
    };


    this.linewithDataChart = {
      chart: {
        height: 290,
        type: 'line',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#556ee6', '#34c38f'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        width: [3, 3],
        curve: 'straight'
      },

      series: [{
        name: 'High - 2021',
        data: [26, 24, 32, 36, 33, 31, 33]
      },
      {
        name: 'Low - 2021',
        data: [14, 11, 16, 12, 17, 13, 12]
      }],

      title: {
        text: 'Present Depth of Storage in ft.',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.2
        },
        borderColor: '#f1f1f1'
      },
      markers: {
        style: 'inverted',
        size: 6
      },

      xaxis: {
        categories: ['res1', 'res 2', 'res 3', 'res 4', 'res 5', 'res 6', 'res 7'],
        title: {
          text: 'Reservoirs'
        }
      },


      yaxis: {
        title: {
          text: 'Depth'
        },
        min: 5,
        max: 40
      },



      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
      responsive: [{
        breakpoint: 600,
        options: {
          chart: {
            toolbar: {
              show: false
            }
          },
          legend: {
            show: false
          },
        }
      }]
    };


  }


}
