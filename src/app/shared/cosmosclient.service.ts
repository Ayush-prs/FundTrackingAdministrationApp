import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FundSubscription } from "../models/fund-subscription";

@Injectable({
    providedIn: 'root'
})

export class CosmosClientService {
    private cosmosUrl = "https://cosmosclient.azurewebsites.net/cosmos";
    private typeEndpoint = "/mutual funds search list"

    constructor(private client: HttpClient) {

    }

    addData(data: FundSubscription) : Observable<boolean> {
     return  this.client.post<boolean>(this.cosmosUrl,data);
    }

    getData() : Observable<Array<FundSubscription>> {
        return this.client.get<Array<FundSubscription>>(this.cosmosUrl + this.typeEndpoint)
    }

}