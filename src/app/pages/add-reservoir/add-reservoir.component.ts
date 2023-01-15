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
  image: any = "assets/images/reservoir.jpg";
  fileToUpload: any;

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  imageId: number;

  constructor(
    private modalService: NgbModal,
    private reservoirService: ReservoirService
  ) {}

  myForm: FormGroup;

  ngOnInit(): void {
    this.findAll();

    this.myForm = new FormGroup({
      id: new FormControl(),
      imageId: new FormControl(),
      name: new FormControl(""),
      region: new FormControl(""),
      capacity: new FormControl(""),
      fullHeight: new FormControl(""),
      // message: new FormControl('')
    });
  }

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.retrievedImage = reader.result);
      reader.readAsDataURL(file);
    }
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    if (this.selectedFile.name) {
      //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
      const uploadImageData = new FormData();
      uploadImageData.append(
        "imageFile",
        this.selectedFile,
        this.selectedFile.name
      );

      //Make a call to the Spring Boot Application to save the image
      this.reservoirService
        .onUpload(uploadImageData)
        .subscribe((response: any) => {
          const imageModel = response.body;
          if (response.status === 200) {
            this.imageId = imageModel.id;
            this.message = "Image uploaded successfully";
          } else {
            this.message = "Image not uploaded successfully";
          }
        });
    }

    setTimeout(() => {
      this.saveData();
    }, 1000);
  }

  // //Gets called when the user clicks on retieve image button to get the image from back end
  // getImage() {
  //   //Make a call to Sprinf Boot to get the Image Bytes.
  //   this.reservoirService.getImage(this.imageName).subscribe((res) => {
  //     this.retrieveResonse = res;

  //     this.base64Data = this.retrieveResonse.picByte;
  //     this.retrievedImage = "data:image/jpeg;base64," + this.base64Data;
  //   });
  // }

  imageURL_Change(file: FileList) {
    console.log(
      "🚀 ~ file: add-reservoir.component.ts:38 ~ AddReservoirComponent ~ imageURL_Change ~ file",
      file
    );

    this.fileToUpload = file.item(0);
    console.log(
      "🚀 ~ file: add-reservoir.component.ts:41 ~ AddReservoirComponent ~ imageURL_Change ~ file.item(0)",
      file.item(0)
    );
    // Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image = event.target.result;
      console.log(
        "🚀 ~ file: add-reservoir.component.ts:45 ~ AddReservoirComponent ~ imageURL_Change ~ event.target.result;",
        event.target.result
      );
    };

    reader.readAsDataURL(this.fileToUpload);
    // this.myForm.patchValue({
    //   image: this.fileToUpload,
    // });

    console.log(
      "🚀 ~ file: add-reservoir.component.ts:49 ~ AddReservoirComponent ~ imageURL_Change ~ this.image",
      this.image
    );
  }

  findAll() {
    this.reservoirService.findAll().subscribe(
      (res) => {
        console.log(
          "🚀 ~ file: add-reservoir.component.ts ~ line 23 ~ AddReservoirComponent ~ this.reservoirService.findAll ~ res",
          res
        );
        this.listOfReservoirs = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editMode = false;
  editModal(id) {
    this.myForm.reset();
    this.editMode = true;
    this.modalService.open(this.content, { centered: true });

    let user = this.listOfReservoirs.find((user) => user.id == id);
    console.log(
      "🚀 ~ file: add-reservoir.component.ts:161 ~ AddReservoirComponent ~ editModal ~ user",
      user
    );

    let editUser = {
      id: user?.id,
      name: user?.name,
      region: user?.region,
      capacity: user?.capacity,
      fullHeight: user?.fullHeight,
    };

    if (user?.imageModel != null) {
      this.base64Data = user.imageModel.picByte;
      this.retrievedImage =
        "data:" + user.imageModel.type + ";base64," + this.base64Data;
    } else {
      this.base64Data = null;
      this.retrievedImage = null;
    }

    this.myForm.patchValue(editUser);
  }

  delteReservoir(id: number) {
    console.log(id);

    if (id != null)
      this.reservoirService.delteReservoir(id).subscribe((resposne) => {
        console.log("resposne", resposne);
        this.ngOnInit();
      });
  }

  submit() {
    this.onUpload();
  }

  private saveData() {
    console.log(
      "🚀 ~ file: add-reservoir.component.ts:181 ~ AddReservoirComponent ~ saveData ~ this.imageId",
      this.imageId
    );

    if (this.imageId) {
      this.myForm.patchValue({ imageId: this.imageId });
    }

    if (!this.editMode) {
      this.reservoirService.addReservoir(this.myForm.value).subscribe(
        (res) => {
          console.log(res);
          this.modalService.dismissAll();
          this.findAll();
          this.myForm.reset();
          this.editMode = false;
        },
        (error) => alert("something went wrong!")
      );
    } else {
      this.reservoirService.addReservoir(this.myForm.value).subscribe(
        (res) => {
          console.log(res);
          this.modalService.dismissAll();
          this.findAll();
          this.myForm.reset();
        },
        (error) => alert("something went wrong!")
      );
    }

    this.myForm.reset();
  }

  addModal() {
    this.base64Data = null;
    this.retrievedImage = null;
    this.myForm.reset();
    this.modalService.open(this.content, { centered: true });
  }

  openModal() {
    this.modalService.open(this.content, { centered: true });
  }
}
