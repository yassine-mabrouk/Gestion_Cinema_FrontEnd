import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  public host: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public getAllVilles() {
    return this.http.get(this.host + "/villes");
  }

  public getCinemas(v: any) {
    return this.http.get(v._links.cinemas.href);
  }
  public getSalles(c: any) {
    return this.http.get(c._links.salles.href);
  }
  public getProjections(s: any) {
    let url = s._links.projections.href.replace("{?projection}", "");
    return this.http.get(url + "?projection=p1");
  }
  public getTicktsPlacers(p: any) {
    let url = p._links.tickets.href.replace("{?projection}", "");
    return this.http.get(url + "?projection=ticketProj");
  }
  public payerTickets(t: any) {
    return this.http.post(this.host + "/payerTickets", t);
  }

}

