import React, { Component } from "react";
import "./App.css";
import Chart from "./Chart";

class App extends Component {
constructor(props) {
super(props);

  {/* Initialization of state*/}

this.state = {
Device: [
{ x: 0, y: 0 },
{ x: 100, y: 100 },
{ x: 15, y: 10 },
{ x: 18, y: 18 },
],
linkStation: [
{ x: 0, y: 0, r: 10 },
{ x: 20, y: 20, r: 5 },
{ x: 10, y: 0, r: 12 },
],

chartData: {},
bestStation: [],
unreachablePoints: [],
};
}




calculateDistance(dx, dy) {
return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
}

calulateP(distance, range){
    if(range > distance){
      return Math.pow(range - distance, 2);
    } else {
      return 0
    }
}

mainCalculation() {
var i, j;
for(i=0; i<this.state.Device.length; i++){
  let xp = 0; 
  let yp =0;
  let pMax =0;
 
 for(j=0; j<this.state.linkStation.length; j++) {

  const dx =  this.state.Device[i].x -this.state.linkStation[j].x;
  const dy =  this.state.Device[i].y- this.state.linkStation[j].y;
  const range = this.state.linkStation[j].r

  var distance = this.calculateDistance(dx, dy);
  var p = this.calulateP(distance,range)

  if(p > pMax){
    pMax = p;
    xp = this.state.linkStation[j].x
    yp = this.state.linkStation[j].y
  } 
   }
 if(pMax> 0){
  var newBestStation = this.state.bestStation
  newBestStation.push({
    jx:this.state.Device[i].x,
    jy: this.state.Device[i].y,
    power:pMax,
    mx: xp,
    my: yp,

  })
  this.setState({bestStation : newBestStation})

 }  else {

  var   newunreachablePoints = this.state.unreachablePoints
  newunreachablePoints.push({
    ix: this.state.Device[i].x,
    iy: this.state.Device[i].y,
    });
    this.setState({...this.state.unreachablePoints,...newunreachablePoints})
 }
}
}



renderReachableDevices() {
return    this.state.bestStation.map((items) => (
<p  style={{ color: "green" }}>
{" "}
Best Link station for {items.jx} {items.jy} is {items.mx}, {items.my}{" "}with power {items.power}
</p>
));
}



renderNonReachableDevices() {
return this.state.unreachablePoints.map((points) => (
<p style={{ color: "blue" }}>
{" "}
No Link station within reach for [x: {points.ix} y:{points.iy}]
</p>
));
}



getChartData() {
this.setState({
chartData: {
datasets: [
{
label: "Power Station",

data: this.state.linkStation,
backgroundColor: "yellow",
borderWidth: "4",
borderColor: "grey",
},
{
label: "Device",
data: this.state.Device,
backgroundColor: "red",
borderWidth: "1",
borderColor: "black",
},
],
},
});
}

componentDidMount() {
this.mainCalculation();
}

componentWillMount() {
this.getChartData();
}


render() {
return (
<div className="center">
<div className="header">
<h4 style={{ color: "tomato" }}>The Link Station & Points </h4>
</div>
<Chart chartData={this.state.chartData} />
  {/* rendering reachableDevices and nonReachableDevices seperately which will increase the scope of adding new Device and linkStation from Input*/}
{this.renderReachableDevices()}
{this.renderNonReachableDevices()}
</div>
);
}
}

export default App;
