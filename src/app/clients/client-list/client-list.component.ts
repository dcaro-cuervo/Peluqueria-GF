import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject} from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Client }             from '../client';
import { ClientService }      from '../client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients$: Observable<Client[]>;
  private searchTerms : string;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.clients$ = this.route.paramMap.pipe(
      switchMap(params => {
        // get the value to search
        this.searchTerms = params.get('sTerms');
            if (this.searchTerms === null || this.searchTerms.trim() === '') {
              return this.clientService.getclients();
            }
            else {
              return this.clientService.searchClients(this.searchTerms);
            }
      })
    )
  }

  delete(clientToDelete: Client): void {
  	this.clients$ = this.clients$.pipe(map(clients => clients.filter(client => client !== clientToDelete)));
  	this.clientService.deleteclient(clientToDelete).subscribe();
  }
}
