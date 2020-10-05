import React, {Component} from 'react';
import {Bubble} from 'react-chartjs-2';
  
  
  const chartDiv = {
    backgroundColor: 'white',
    height: '300px',
    width: '600px',
    overflowX:' hidden',
  }

  class Chart extends Component {
    constructor(props) {
      super(props);
      this.state = {chartData: props.chartData}
      console.log(this.state.chartData)
    }
  
   static defaultProps ={
    displayTitle: true,
    displayLegend: true,
   }
  
    render() {
      return (
      <div className="container" style={chartDiv}>
      <Bubble data = {this.state.chartData}
        options = {
          {
            options: {
              title: {
                display: this.props.displayTitle,
                text: 'Stations',
                fontSize: '100'
              },
              legend: {
                display: this.props.displayLegend,
                position: 'right',
              },
              layout: {
                padding: {
                  left: 50,
                  right: 0,
                  bottom: 0,
                  top: 0,
                },
              },
            }
          }
        }
      />
      </div>
      );
    } 
  }
  export default Chart;
  
