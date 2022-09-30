import { AuthenticationService } from './../../core/services/auth.service';
import { ReservoirService } from './../../core/services/reservoir.service';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-maintainer',
  templateUrl: './add-maintainer.component.html',
  styleUrls: ['./add-maintainer.component.scss']
})
export class AddMaintainerComponent implements OnInit {

  listOfUsers: any;
  roles: any;
  reservoirs: any;

  @ViewChild("addContent") addContent;
  @ViewChild("editContent") editContent;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private reservoirService: ReservoirService,
  ) { }

  myForm: FormGroup;

  ngOnInit(): void {
    this.findAllUsers();



    this.myForm = new FormGroup({
      id: new FormControl(''),

      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      phone: new FormControl(''),

      roles: new FormControl(''),
      reservoirs: new FormControl(''),
      // message: new FormControl('')
    });

  }


  changeWebsite(evnet: any) {
    console.log(evnet);
  }

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

  submit() {

    console.log("this.myForm.value " , this.myForm.value);
    if (this.editMode) {
      this.userService.assignReservoirToUser(this.myForm.value)
        .subscribe(res => {
          console.log("🚀 ~  ~ res", res)
          this.modalService.dismissAll();
          this.findAllUsers();
          this.myForm.reset();
        },
          (err) => {
            console.log(err);
          }
        )
    }


  }


  addMaintainer() {

    console.log(this.myForm.value);

    this.userService.addUser(this.myForm.value)
      .subscribe(res => {
        console.log("🚀 ~  ~ res", res)
        this.modalService.dismissAll();
        this.findAllUsers();
        this.myForm.reset();
      },
        (err) => {
          console.log(err);
        }
      )

  }




  findAllRoles() {
    this.userService.findAllRoles().subscribe(res => {
      console.log("🚀 ~ findAll ~ res", res)
      this.roles = res;
    },
      (err) => {
        console.log(err);
      }
    )

  }

  findAllReservoirs() {
    this.reservoirService.findAll().subscribe(res => {
      console.log("🚀 ~ findAll ~ res", res)
      this.reservoirs = res;
    },
      (err) => {
        console.log(err);
      }
    )
  }


  openModal() {
    this.modalService.open(this.editContent, { centered: true });
    this.findAllReservoirs();
    this.findAllRoles();

  }
  addModal() {
    this.modalService.open(this.addContent, { centered: true });
    // this.findAllReservoirs();
    this.findAllRoles();

  }

  editMode = false;
  editModal(id) {
    this.editMode = true;
    this.modalService.open(this.editContent, { centered: true });
    this.findAllReservoirs();
    this.findAllRoles();


    let user = this.listOfUsers.find(user => user.id == id);
    console.log("user ", user);


    let roleIDs: number[] = [];
    user?.roles?.forEach(role => {
      roleIDs.push(role?.id)
    });


    let reservoirIDs: number[] = [];
    user?.reservoirs?.forEach(reservoir => {
      reservoirIDs.push(reservoir?.id)
    });

    let editUser = {
      id: user?.id,
      username: user?.username,
      password: user?.plainPassword,
      email: user?.email,
      phone: user?.phone,
      roles: roleIDs,
      reservoirs: reservoirIDs
    };

    this.myForm.patchValue(editUser)

  }
}

