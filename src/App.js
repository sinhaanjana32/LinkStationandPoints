import React, {Component} from 'react';
import './App.css';
import Chart from './Chart';


class App extends Component {
constructor() {
super();
this.state = {
  Mobile: [{x:0, y:0}, {x:100, y:100}, {x:15, y:10}, {x:18,y:18}], 
  powerStation: [{x:0, y:0, r:10, }, {x:20, y:20, r:5}, {x:10, y:0, r:12}],

  chartData: {},

    bestStation:[{
    jx:0,
    jy:0,
    mx:0,
    my:0,

    power:0
      
    }],

    unreachablePoints:[{
      ix:0,
      iy:0,
    }]

    }





console.log(this.state.Mobile.length)
console.log(this.state.powerStation.length)












var i, j, correct
for (i = 0;  i< this.state.Mobile.length; i++ ) {
for (j =0; j< this.state.powerStation.length; j++){
const distance = Math.floor(Math.sqrt(Math.pow((this.state.Mobile[i].x -this.state.powerStation[j].x ), 2) + Math.pow((this.state.Mobile[i].y -this.state.powerStation[j].y ), 2)))
console.log(distance)

if (this.state.powerStation[j].r > distance ) {
   correct = Math.pow((this.state.powerStation[j].r -  distance  ),2)
   console.log(correct)
 
 var newBestStation = this.state.bestStation
  newBestStation.push({
    jx:this.state.Mobile[i].x,
    jy: this.state.Mobile[i].y,
    power:correct,
    mx: this.state.powerStation[j].x,
    my: this.state.powerStation[j].y,

  })
  
   this.setState({bestStation:newBestStation})


} else if(this.state.powerStation[j].r < distance ) {
  correct = 0;
  var newunreachablePoints = this.state.unreachablePoints
  newunreachablePoints.push({
    ix:this.state.Mobile[i].x,
    iy:this.state.Mobile[i].y

  })
  this.setState({unreachablePoints:newunreachablePoints})

}
}
}



this.renderItems =   this.state.bestStation.map(items=>
  (
  <p style={{color:"green"}}> Best Link station for {items.jx} {items.jy} is {items.mx}, {items.my} with power {items.power}</p>)
)   



this.render2nditems = newunreachablePoints.map(points=>(
  <p style={{color:"blue"}}> No Link station within reach for [x: {points.ix} y:{points.iy}]</p>
  
  ))
  


}


getChartData(){
  this.setState({
    chartData:{
  
      datasets: [{
        label: 'Power Station',
      
        data:this.state.powerStation,
        backgroundColor: 'yellow',
        borderWidth: '4',
        borderColor: 'grey'
      }, 
      {
        label: 'Mobile', 
        data:this.state.Mobile,
        backgroundColor: 'red',
        borderWidth: '1',
        borderColor: 'black'
      }, 
    
    ]
    }
  });
  }
  

componentWillMount(){
  this.getChartData();
}




    





render(){

  return (

    <div  className="center">

      <div className="header">

        <h4 style={{color:"tomato"}}>The Link Station & Points </h4>

      </div>
       <Chart  chartData={this.state.chartData} />
         {this.renderItems}
            {this.render2nditems}

    </div>
  );


}


}

export default App;