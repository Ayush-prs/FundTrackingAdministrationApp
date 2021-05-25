import { OnDestroy, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FundSubscription } from './models/fund-subscription';
import { CosmosClientService } from './shared/cosmosclient.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy{
  modalmessage = "successful";
  title = 'apps-tracker-admin';
  selectedTab: number = 1;
  addFundData: FundSubscription = new FundSubscription('','');
  fundslist: Array<FundSubscription>= [];
  subscriptions: Subscription[] = [];
  @ViewChild('tabelement', { static: false }) listEle!: ElementRef;
  @ViewChild('myPopup', { static: false }) pop!: ElementRef;
  @ViewChild('modalbutton', { static: false }) modal!: ElementRef;

  constructor(private httclient: CosmosClientService) {
    
  }

  fetchFundsList() {
    this.subscriptions.push(
      this.httclient.getData().subscribe((data: Array<FundSubscription>) =>{
      this.fundslist = data;
      console.log(data);
    },
    (error)=> {
      console.log(error);
    }));
  }
  ngAfterViewInit() {
     
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    } )
  }

  onAdd(form:NgForm){
    if(form.valid == true)
    {
      this.subscriptions.push(this.httclient.addData(this.addFundData).subscribe((data:any) => {
        console.log(data);
        if(data === true) {
          this.modalmessage = "Sucessfully subscribed to " + this.addFundData.fundname + " !";
          this.modal.nativeElement.click();
          form.resetForm();
        } else {
          this.modalmessage = "Unsuccessful. Server was unable to process the request";
          this.modal.nativeElement.click();
          form.resetForm();
        }
      },
      (error) => {
        this.modalmessage = "Unsuccessful. Server was unable to process the request";
        this.modal.nativeElement.click();
        form.resetForm();
      }));
    }

  }

  onTabClicked(value : number)
  {
   var i = 1;
   Array.from(this.listEle.nativeElement.querySelectorAll('div')).forEach(
     (ele: any) => {
        ele.classList.remove('active');
        if(i === value) {
          ele.classList.add('active');
        }
        i++;
      }
    );
    this.selectedTab = value;  
  }
}
