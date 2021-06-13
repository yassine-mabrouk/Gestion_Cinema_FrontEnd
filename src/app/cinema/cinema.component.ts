import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../service/cinema.service'

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public cinema: any;
  public villes: any;
  public currentVille: any;
  public salles: any;
  public currentCinema: any;
  public currentProjection: any;
  public selectedTickts: any;
  constructor(public service: CinemaService) { }

  ngOnInit(): void {
    this.service.getAllVilles().subscribe(data => {
      this.villes = data;
    }, err => console.log("cannot get data" + err));


  }


  onGetCinemas(v) {

    this.currentVille = v;
    this.salles = undefined;
    this.service.getCinemas(v).subscribe(data => {
      this.cinema = data;
    }, err => console.log("cannot get data" + err));
  }
  onGetSalles(c) {
    this.currentCinema = c;
    this.service.getSalles(c).subscribe(data => {
      this.salles = data;
      this.salles._embedded.salles.forEach(salle => {
        this.service.getProjections(salle).subscribe(data => {
          salle.projections = data;
        }, err => console.log("cannot get data" + err));

      });
    }, err => console.log("cannot get data" + err));

  }
  onGetTicketPlace(p) {
    this.currentProjection = p;
    this.service.getTicktsPlacers(p)
      .subscribe(data => {
        this.currentProjection.tickets = data;
        this.selectedTickts = [];
      }, err => console.log("cannot get salles" + err));
  }
  onSelectTicket(t) {

    if (!t.selected) {
      t.selected = true;
      this.selectedTickts.push(t);
    } else {
      t.selected = false;
      this.selectedTickts.splice(this.selectedTickts.indexOf((t), 1));
    }
    console.log(this.selectedTickts);
    // variavle ajoute 

    // t.reserve = true;
  }
  getTicketsClass(t) {

    let str = "btn ticket ";
    if (t.reserve == true) {
      str += " btn-warning"
    } else if (t.selected) {
      str += " btn-info clik"
    } else {
      str += " btn-success clik"
    }
    return str;
  }
  onPayerTickets(dataForm) {
    let tickets = [];
    this.selectedTickts.forEach(t => {
      tickets.push(t.id);
    });
    dataForm.tickets = tickets;
    this.service.payerTickets(dataForm)
      .subscribe(data => {
        console.log(" paiement bein effectue  ")
        this.onGetTicketPlace(this.currentProjection);

      }, err => console.log("cannot payer Ticktes "))
  }
}
