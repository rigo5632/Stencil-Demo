import { Component, Host, h, State, Prop } from '@stencil/core';
import { APIResponse, defaultResponse } from './interface/views';
import arrowUp from './svg/chevron-up-solid.svg';
import arrowDown from './svg/chevron-down-solid.svg';
import bell from './svg/bell-solid.svg';
import axios from 'axios';

@Component({
  tag: 'back-in-stock',
  styleUrl: 'back-in-stock.css',
  shadow: true,
})

export class BackInStock {
  @Prop() partNumber:string;
  @Prop() view?: string = "h";
  @State() apiInformation: APIResponse = defaultResponse;
  @State() showContent: boolean = false;


  async fetchProductAPI(){
    const response = await axios.get(`http://localhost:8080/product/${this.partNumber}/?view=${this.view}`);
    this.apiInformation = response.data;
  }

  componentWillLoad(){
    this.fetchProductAPI();
  }

  render() {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Nov", "Dec"];
    let displayContent:HTMLSpanElement[];
    
    if(this.view === "d"){
      displayContent = this.apiInformation['Estimated Shipment'].map(shipment => {
        const date = shipment.date.split('-');
        return(
          <span class={`${this.showContent ? "show": "hide"}`}>+ {shipment.units} units on {parseInt(date[1])} {months[parseInt(date[2])-1]} {parseInt(date[0])}<br /></span>
        );
      })
    }else if(this.view === "g"){
        const date = this.apiInformation['Estimated Shipdate'].split('-')
      displayContent = <span class={`${this.showContent ? "show": "hide"}`}>More units on {parseInt(date[1])} {months[parseInt(date[2])-1]} {parseInt(date[0])} </span>
    }else if(this.view === "h"){
      displayContent = <span class={`${this.showContent ? "show": "hide"}`}></span>
    }

    return (
      <Host>
        <p onClick={() => this.showContent = !this.showContent} class="collapse">Out of Stock {this.showContent ? <img src={arrowUp} class="arrow-up" /> : <img src={arrowDown} class="arrow-up" />}</p>
          {displayContent}
          <br />
        <p class="collapse"><img src={bell} class="arrow-up" /> Inventory alert </p>
      </Host>
    );
  }

}
