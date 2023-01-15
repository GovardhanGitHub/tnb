import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Reservoir } from "../models/reservoirdto";

@Injectable({
  providedIn: "root",
})
export class ReservoirService {
  constructor(private http: HttpClient) {}

  rootURL = "/reservoir";

  addReservoir( body: any) {
    let url = this.rootURL + "/addReservoir";
    return this.http.post(url, body);
  }

  delteReservoir(body: number) {
    let url = this.rootURL + "/delete";
    return this.http.post(url, body);
  }

  updateReservoir( body: any) {
    let url = this.rootURL + "/addReservoir";
    return this.http.post(url, body);
  }




  getImage(imageId: any) {
    //Make a call to Sprinf Boot to get the Image Bytes.
    return this.http.get("/image/get/" + imageId);
  }

  onUpload(uploadImageData: any) {
    return this.http.post("/image/upload", uploadImageData, {
      observe: "response",
    });
  }





  findReservoirEveryDayUpdateByDate(body: any) {
    const headerDict = {
      "Content-Type": "application/json",
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    let url = this.rootURL + "/findReservoirEveryDayUpdateByDate";
    return this.http.post(url, { date: body }, requestOptions);
  }

  updateReservoirEveryDayDetails(body: any) {
    let url = this.rootURL + "/updateEveryDayDetails";
    return this.http.post(url, body);
  }

  editEveryDayDetails(body: any) {
    let url = this.rootURL + "/editEveryDayDetails";
    return this.http.post(url, body);
  }

  getReservoirEveryDayDetails(id: number) {
    let url = this.rootURL + "/getReservoirEveryDayDetails/" + id;
    return this.http.get(url);
  }

  findTodayReservoirEveryDayDetails(id: number) {
    let url = this.rootURL + "/findTodayReservoirEveryDayDetails/" + id;
    return this.http.get(url);
  }

  findByDateReservoirEveryDayDetails(id: number, date) {
    let url =
      this.rootURL + "/findByDateReservoirEveryDayDetails/" + id + "/" + date;
    return this.http.get(url);
  }

  findReservoirById(id: number) {
    let url = this.rootURL + "/findReservoirById/" + id;
    return this.http.get(url);
  }

  findAll() {
    let url = this.rootURL + "/findAll";
    console.log(
      "🚀 ~ file: reservoir.service.ts ~ line 20 ~ ReservoirService ~ findAll ~ url",
      url
    );
    return this.http.get(url);
  }
}
