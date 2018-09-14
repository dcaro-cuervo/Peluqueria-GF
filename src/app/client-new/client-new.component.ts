import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { ClientService } from '../client.service';
import { Client } from '../client';


@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.css']
})
export class ClientNewComponent implements OnInit {

  clients: Client[];

  constructor(
  	private clientService: ClientService,
  	private location: Location
  ) { }

  ngOnInit() {
  	this.getClients();
  }

  getClients(): void {
  	this.clientService.getclients()
  		.subscribe(clients => this.clients = clients);
  }

  goBack(): void {
  	this.location.back();
  }  

  add(name: string, phone: number, birthday: string, 
  		workDetail: string, tone: string, attentionDay: string): void {
    name = name.trim();
    
    if (!name) {return; }
    this.clientService.addclient({ name, phone, birthday, workDetail, tone, attentionDay } as Client)
    	.subscribe(client => { this.clients.push(client); });

    this.goBack();
  }
}
