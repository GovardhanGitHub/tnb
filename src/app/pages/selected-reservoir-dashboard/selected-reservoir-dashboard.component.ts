import { ActivatedRoute, Params } from '@angular/router';
import { ReservoirService } from './../../core/services/reservoir.service';
import { Reservoir, ReservoirDetails } from './../../core/models/reservoirdto';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginResponseDto } from 'src/app/core/models/loginResponseDto';
import { ChartType } from 'src/app/core/models/chartType';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReservoirEveryDayUpdateDto } from 'src/app/core/models/ReservoirEveryDayUpdateDto';
import { ReservoirDetailsResponseDto } from 'src/app/core/models/ReservoirDetailsResponse';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-selected-reservoir-dashboard',
  templateUrl: './selected-reservoir-dashboard.component.html',
  styleUrls: ['./selected-reservoir-dashboard.component.scss']
})
export class SelectedReservoirDashboardComponent implements OnInit {

  // authentication.name
  constructor(private userService: UserService,
    private reservoirService: ReservoirService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  @ViewChild("editContent") content;
  transactions;
  authUser: LoginResponseDto;
  user: any = {};
  userId: number;
  reservoirId: number;
  isReservoirAssigned = false;
  myForm: FormGroup;
  reservoirEveryDayUpdateDto: ReservoirEveryDayUpdateDto = {} as ReservoirEveryDayUpdateDto;
  reservoirFullHeight: number;
  reservoirCapacity: number;
  reservoirName: string;
  isAdmin = false;
  todayDate = "";

  ngOnInit(): void {

    this.todayDate = new Date(Date.now()).toLocaleString().split(',')[0]
    console.log("today date ", this.todayDate);



    this.authUser = JSON.parse(
      localStorage.getItem("authUser")
    ) as LoginResponseDto;

    this.route.params.subscribe((params: Params) => this.id = params['id']);
    console.log("id,", this.id);
    // this._fetchData();

    if (this.id == null) {
      this.findMaintainerByName(this.authUser?.authentication.principal?.username);
    } else {
      this.isAdmin = true;
      this.findReservoirById(this.id)
      this.findReservoirDetailsById(this.id);
    }


    this.myForm = new FormGroup(
      {
        id: new FormControl(''),
        // fullHeight: new FormControl(''),
        // capacity: new FormControl(''),
        date: new FormControl('', Validators.required),
        presentDepthOfStorage: new FormControl('', Validators.max(this.reservoirFullHeight)),
        presentStorage: new FormControl('', Validators.max(this.reservoirCapacity)),
        inflow: new FormControl(''),
        outflow: new FormControl(''),
        rainfall: new FormControl(''),
        // message: new FormControl('')
      });
  }

  id: any;
  openModal() {
    this.modalService.open(this.content, { centered: true });
  }


  get mf() {
    return this.myForm.controls;
  }

  convertFt2Meter(valNum) {
    if (valNum > 0)
      return Number(valNum / 3.2808).toFixed(2) + " .m";
    else "NA"
  }

  findMaintainerByName(name) {
    console.log(name, "name");
    this.userService.findMaintainerByName(name)
      .subscribe(res => {
        console.log("res ", res);
        this.user = res
        if (this.user?.reservoirs.length > 0) {
          this.isReservoirAssigned = true;
          this.reservoirEveryDayUpdateDto.userId = this.user.id;
          this.reservoirEveryDayUpdateDto.reservoirId = this.user.reservoirs[0].id
          this.reservoirName = this.user?.reservoirs[0]?.name
          this.reservoirCapacity = this.user?.reservoirs[0]?.capacity
          this.reservoirFullHeight = this.user?.reservoirs[0]?.fullHeight

          this.findReservoirDetailsById(this.user.reservoirs[0].id)
        }
      });
  }
  from = '';
  to = '';
  onFrom(v) {
    this.from = v;
    this.onChagne()
  }

  onTo(v) {
    this.to = v
    this.onChagne()
  }

  onChagne() {
    console.log(this.from, this.to);
    if (this.from != '' && this.to != '') {
      let from = new Date(this.from);
      let to = new Date(this.to);
      this.reservoirDetailsList = this.backupReservoirDetailsResponseDto.filter(e => {
        console.log("e.date ", e.date);
        let date = new Date(e?.date)
        return (date >= from && date <= to)
      })

      this.fetchChartData(this.reservoirDetailsList);
    }
  }

  fetchChartData(reservoirDetailsList: ReservoirDetailsResponseDto[]) {
    console.log("ReservoirDetailsResponseDto[]", reservoirDetailsList);

    let xAxisDateWise: any[] = [];
    let presentDepth: any[] = [];

    reservoirDetailsList?.forEach(r => {
      if (r.date != null)
        xAxisDateWise.push(r.date);
      else
        xAxisDateWise.push(new Date(r.createdOn).toDateString());

      presentDepth.push(r.presentDepthOfStorage)
    });


    // this.dashedLineChart.xaxis.categories = xAxisDateWise;
    console.log("xAxisDateWise ", presentDepth, xAxisDateWise);

    this.dashedLineChart = {
      chart: {
        height: 324,
        type: 'area',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false,
        }
      },
      colors: ['#556ee6', '#f46a6a', '#34c38f'],
      // colors: ['#556ee6', '#f46a6a', '#34c38f'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [3, 4, 3],
        curve: 'smooth',
        dashArray: [0, 8, 5]
      },
      series: [{
        name: 'Present Depth Of Storage',
        data: presentDepth

        // [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
      }
        // {
        //   name: 'Page Views',
        //   data: [36, 42, 60, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        // },
        // {
        //   name: 'Total Visits',
        //   data: [89, 56, 74, 98, 72, 38, 64, 46, 84, 58, 46, 49]
        // }
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
        categories: xAxisDateWise

        // ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
        //   '10 Jan', '11 Jan', '12 Jan'
        // ],
      },


      tooltip: {
        y: [{
          title: {
            formatter: (val) => {
              return val + ' (ft)';
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
    // this.dashedLineChart.


  }

  reservoir: any = {}
  findReservoirById(id) {
    this.reservoirService.findReservoirById(id)
      .subscribe((res: any) => {
        this.reservoir = res
        if (this.reservoir != null) {
          this.reservoirName = this.reservoir?.name
          this.reservoirCapacity = this.reservoir?.capacity
          this.reservoirFullHeight = this.reservoir?.fullHeight
          this.findReservoirDetailsById(this.reservoir.id)
        }

      }, error => alert("error occur while fetching reservoir " + error));
  }





  reservoirDetailsList: ReservoirDetailsResponseDto[];
  backupReservoirDetailsResponseDto: ReservoirDetailsResponseDto[];
  findReservoirDetailsById(id) {
    this.reservoirService.getReservoirEveryDayDetails(id)
      .subscribe((res: ReservoirDetailsResponseDto[]) => {
        console.log("reservoir details :", res);
        this.reservoirDetailsList = res

        this.backupReservoirDetailsResponseDto = this.reservoirDetailsList
        this.fetchChartData(this.reservoirDetailsList);
      });
  }


  editMode = false;
  editModal(id) {
    this.editMode = true;
    this.modalService.open(this.content, { centered: true });


    let user = this.reservoirDetailsList.find(user => user.id == id);


    let editUser = {
      id: user?.id,
      presentDepthOfStorage: user?.presentDepthOfStorage,
      presentStorage: user?.presentStorage,
      inflow: user.inflow,
      rainfall: user.rainfall,
      outflow: user.outflow,
    };


    this.myForm.patchValue(editUser)

  }

  printDoc() {
    window.print();
  }

  submit() {
    if (this.myForm.valid) {
      if (!this.editMode) {
        console.log(this.myForm.value, "reservoirEveryDayUpdateDto");
        this.reservoirEveryDayUpdateDto = { ...this.reservoirEveryDayUpdateDto, ...this.myForm.value }
        if (this.reservoirEveryDayUpdateDto.reservoirId && this.reservoirEveryDayUpdateDto.userId && this.reservoirEveryDayUpdateDto?.date) {
          console.log(this.reservoirEveryDayUpdateDto);
          this.reservoirService.updateReservoirEveryDayDetails(this.reservoirEveryDayUpdateDto)
            .subscribe(res => {
              console.log(res);
              this.modalService.dismissAll();
              this.myForm.reset();
              this.ngOnInit();
            });
        } else {
          alert("data is missing")
        }
      } else {

        this.reservoirEveryDayUpdateDto = { ...this.myForm.value }
        console.log("else edit = this.reservoirEveryDayUpdateDto", this.reservoirEveryDayUpdateDto);

        if (this.reservoirEveryDayUpdateDto.id) {
          console.log(this.reservoirEveryDayUpdateDto);
          this.reservoirService.editEveryDayDetails(this.reservoirEveryDayUpdateDto)
            .subscribe(res => {
              console.log(res);
              this.modalService.dismissAll();
              this.editMode = false;
              this.ngOnInit();
            });
        } else {
          alert("without id edit operation is not performed..")
        }

      }
    }
    else {
      let newLine = "\r\n"
      let msg = "Enterd data is Invalid..please make sure to meet this critiria"
      msg += newLine;
      msg += "1. Date is required"
      msg += newLine;
      msg += "2. Present Depth Of Storage is lessthen Reservoir Full Height"
      msg += newLine;
      msg += "3. Present Storage is lessthen Reservoir Capacity"

      alert(msg)
      return;
    }


    this.myForm.reset();

  }




  linewithDataChart: ChartType;
  dashedLineChart: ChartType = {};
  splineAreaChart: ChartType;

  private _fetchData() {

    this.dashedLineChart = {
      chart: {
        height: 380,
        type: 'area',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false,
        }
      },
      colors: ['#556ee6', '#f46a6a', '#34c38f'],
      // colors: ['#556ee6', '#f46a6a', '#34c38f'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [3, 4, 3],
        curve: 'smooth',
        dashArray: [0, 8, 5]
      },
      series: [{
        name: 'Present Depth Of Storage',
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
      }
        // {
        //   name: 'Page Views',
        //   data: [36, 42, 60, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        // },
        // {
        //   name: 'Total Visits',
        //   data: [89, 56, 74, 98, 72, 38, 64, 46, 84, 58, 46, 49]
        // }
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



    this.splineAreaChart = {
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      series: [{
        name: 'series1',
        data: [34, 40, 28, 52, 42, 109, 100]
      }, {
        name: 'series2',
        data: [32, 60, 34, 46, 34, 52, 41]
      }],
      colors: ['#556ee6', '#34c38f'],
      xaxis: {
        type: 'datetime',
        // tslint:disable-next-line: max-line-length
        categories: ['2018-09-19T00:00:00', '2018-09-19T01:30:00', '2018-09-19T02:30:00', '2018-09-19T03:30:00', '2018-09-19T04:30:00', '2018-09-19T05:30:00', '2018-09-19T06:30:00'],
      },
      grid: {
        borderColor: '#f1f1f1',
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      }
    };


    this.linewithDataChart = {
      chart: {
        height: 380,
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
        name: 'High - 2018',
        data: [26, 24, 32, 36, 33, 31, 33]
      },
      {
        name: 'Low - 2018',
        data: [14, 11, 16, 12, 17, 13, 12]
      }],

      title: {
        text: 'Average High & Low Temperature',
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: 'Month'
        }
      },


      yaxis: {
        title: {
          text: 'Temperature'
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
