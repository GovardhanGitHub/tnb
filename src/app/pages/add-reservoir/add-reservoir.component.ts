import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ReservoirService } from "src/app/core/services/reservoir.service";

@Component({
  selector: "app-add-reservoir",
  templateUrl: "./add-reservoir.component.html",
  styleUrls: ["./add-reservoir.component.scss"],
})
export class AddReservoirComponent implements OnInit {
  listOfReservoirs;
  @ViewChild("content") content;
  imageUrl = "assets/images/reservoir.jpg";
  fileToUpload: any;

  constructor(
    private modalService: NgbModal,
    private reservoirService: ReservoirService
  ) { }

  myForm: FormGroup;

  ngOnInit(): void {
    this.findAll();


    this.myForm = new FormGroup({
      imageUrl: new FormControl(),
      id: new FormControl(),
      name: new FormControl(''),
      region: new FormControl(''),
      capacity: new FormControl(''),
      fullHeight: new FormControl(''),
      // message: new FormControl('')
    });

  }


  imageURL_Change(file: FileList) {
    this.fileToUpload = file.item(0);
    // Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    this.myForm.patchValue({
      imageUrl: this.imageUrl
    })
  }

  findAll() {
    this.reservoirService.findAll().subscribe(res => {
      console.log("🚀 ~ file: add-reservoir.component.ts ~ line 23 ~ AddReservoirComponent ~ this.reservoirService.findAll ~ res", res)
      this.listOfReservoirs = res;
    },
      (err) => {
        console.log(err);
      }
    )
  }


  editMode = false;
  editModal(id) {
    this.myForm.reset()
    this.editMode = true;
    this.modalService.open(this.content, { centered: true });

    let user = this.listOfReservoirs.find(user => user.id == id);
    console.log("user ", user);



    let editUser = {
      id: user?.id,
      name: user?.name,
      region: user?.region,
      capacity: user?.capacity,
      fullHeight: user?.fullHeight

    };

    this.myForm.patchValue(editUser)

  }


  delteReservoir(id: number) {
    console.log(id);

    if (id != null)
      this.reservoirService.delteReservoir(id)
        .subscribe(resposne => {
          console.log("resposne", resposne);
          this.ngOnInit();
        });
  }

  submit() {


    if (!this.editMode) {
      this.reservoirService.addReservoir(this.myForm.value)
        .subscribe(res => {
          console.log(res);
          this.modalService.dismissAll();
          this.findAll();
          this.myForm.reset();
          this.editMode = false;

        },
          error => alert("something went wrong!")
        );
    }
    else {
      this.reservoirService.addReservoir(this.myForm.value)
        .subscribe(res => {
          console.log(res);
          this.modalService.dismissAll();
          this.findAll();
          this.myForm.reset();

        },
          error => alert("something went wrong!")
        );

    }
    this.myForm.reset();
  }




  openModal() {
    this.modalService.open(this.content, { centered: true });
  }
}
