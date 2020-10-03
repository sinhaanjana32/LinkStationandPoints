import React, { Component } from "react";
import "./App.css";
import Chart from "./Chart";

class App extends Component {
constructor(props) {
super(props);
this.state = {
Mobile: [
{ x: 0, y: 0 },
{ x: 100, y: 100 },
{ x: 15, y: 10 },
{ x: 18, y: 18 },
],
powerStation: [
{ x: 0, y: 0, r: 10 },
{ x: 20, y: 20, r: 5 },
{ x: 10, y: 0, r: 12 },
],

chartData: {},

bestStation: [
{
jx: 0,
jy: 0,
mx: 0,
my: 0,

power: 0,
},
],

unreachablePoints: [
{
ix: 0,
iy: 0,
},
],
};

console.log(this.state.Mobile.length);
console.log(this.state.powerStation.length);
}

calculateDistance(dx, dy) {
return Math.floor(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)));
}

mainCalculation() {

  let pow
const result = this.state.powerStation.reduce(
(acc, station) => {
let distance1;
this.state.Mobile.forEach((item) => {
const dx =  station.x -item.x;
const dy =  station.y- item.y;
distance1 = this.calculateDistance(dx, dy);
console.log(  item.x +','+ item.y + 'is'+ distance1)


if (station.r > distance1) {
pow = Math.pow(station.r - distance1, 2);

acc.bestStation.push({
power: pow,
mx: station.x,
my: station.y,
jx: item.x,
jy: item.y
});
return;
}
if (distance1 > station.r)  {
  console.log(  item.x +','+ item.y + ' range is'+ distance1 +'gt'+  station.r)
  
 pow = 0;
  if (
  acc.unreachablePoints.find(
  (k) => k.ix === item.x && k.iy === item.y
  ) === undefined
  )
  acc.unreachablePoints.push({
  ix: item.x,
  iy: item.y,
  });
} else return;

});
return acc;
},
{ bestStation: [], unreachablePoints: [] });
this.setState({...this.state,...result})
}



renderItems() {
console.log(this.state);
return this.state.bestStation.map((items) => (
<p style={{ color: "green" }}>
{" "}
Best Link station for {items.jx} {items.jy} is {items.mx}, {items.my}{" "}with power {items.power}
</p>
));
}

render2nditems() {
return this.state.unreachablePoints.map((points) => (
<p style={{ color: "blue" }}>
{" "}
No Link station within reach for [x: {points.ix} y:{points.iy}]
</p>
));
}

componentDidMount() {
this.mainCalculation();
}

getChartData() {
this.setState({
chartData: {
datasets: [
{
label: "Power Station",

data: this.state.powerStation,
backgroundColor: "yellow",
borderWidth: "4",
borderColor: "grey",
},
{
label: "Mobile",
data: this.state.Mobile,
backgroundColor: "red",
borderWidth: "1",
borderColor: "black",
},
],
},
});
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
{this.renderItems()}
{this.render2nditems()}
</div>
);
}
}

export default App;
