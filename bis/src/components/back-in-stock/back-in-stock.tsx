import { Component, Host, h, State, Prop } from '@stencil/core';
import { DetailedView, GenericView, HiddenView, ErrorView, ProductError } from './interface/views';
import arrowUp from './svg/chevron-up-solid.svg';
import arrowDown from './svg/chevron-down-solid.svg';
import bell from './svg/bell-solid.svg';

@Component({
  tag: 'back-in-stock',
  styleUrl: 'back-in-stock.css',
  shadow: true,
})

export class BackInStock {
  @Prop() partNumber:string;
  @Prop() view?: string = "d";
  @State() detailedInformation: DetailedView[] = [{ day: 0, month: 0, year: 0, units: 0 }];
  @State() genericInformation: GenericView = { day: 0, month: 0, year: 0 };
  @State() hiddenInformation: HiddenView = { inventory: 0 };
  @State() error: ErrorView | ProductError = {"errorMessage": ""};
  @State() showContent: boolean = false;

  componentWillLoad(){
    fetch(`http://desktop-aqbb5k6:9090/ws/rest/products/v2/Products/${this.partNumber}/?view=${this.view}`, {
      headers:{
        "Authorization": "Basic Y2hhbmdlIG1lIHBsZWFzZSE="
      }
    })
      .then(response =>{
        return(response.json())
      }).then(jsonResponse =>{
        if(jsonResponse["error"]){
          this.error= jsonResponse["error"]
        }
        else if(this.view === "d"){
          let shipments = jsonResponse["Estimated Shipment"]
          this.detailedInformation = shipments.map(shipment =>{
            let date = shipment["date"].split('-');
            return({
              day: parseInt(date[1]),
              month: parseInt(date[2]),
              year: parseInt(date[0]),
              units: parseInt(shipment["units"])
            });
          });
        }else if(this.view === "g"){
          let shipdate = jsonResponse["Estimated Shipdate"]
          let date = shipdate.split('-');
          this.genericInformation = {
            day: parseInt(date[1]),
            month: parseInt(date[2]),
            year: parseInt(date[0])
          }
        }else if(this.view == "h"){
          this.hiddenInformation = {
            inventory: jsonResponse['inventory']
          }
        }
        // console.log(this.detailedInformation);
        // console.log(this.error);
      })
  }

  render() {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Nov", "Dec"];
    let displayContent;

    if(this.view === "d"){
      displayContent = this.detailedInformation.map(data => {
        return(
          <span class={`${this.showContent ? "show": "hide"}`}>+ {data["units"]} units on {data["day"]} {months[data["month"]-1]} {data["year"]} <br /></span>
        );
      })
    }else if(this.view === "g"){
      displayContent = <span class={`${this.showContent ? "show": "hide"}`}>More units on {this.genericInformation["day"]} {months[this.genericInformation["month"]-1]} {this.genericInformation["year"]}</span>
    }else if(this.view === "h"){
      displayContent = <span class={`${this.showContent ? "show": "hide"}`}></span>
    }
    return (
      <Host>
        {/* <button onClick={() => this.showContent = !this.showContent}>Out of stock</button> */}
        {/* <p onClick={() => this.showContent = !this.showContent}>Out of stock</p> */}
        <p onClick={() => this.showContent = !this.showContent} class="collapse">{this.view === "h" ? this.hiddenInformation['inventory']: "Out of stock"} {this.showContent ? <img src={arrowUp} class="arrow-up" /> : <img src={arrowDown} class="arrow-up" />}</p>
        {displayContent}
        <br />
        <p class="collapse"><img src={bell} class="arrow-up" /> Inventory alert </p>
      </Host>
    );
  }

}
