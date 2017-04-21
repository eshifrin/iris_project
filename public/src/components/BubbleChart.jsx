import React from 'react';
import { Bubble } from 'react-chartjs-2';

const data = {
  labels: ['January'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [
        {x:15,y:20,r:30},
        {x:9,y:21,r:10},
        {x:11,y:22,r:55},
        {x:10,y:13,r:15},
        {x:12,y:4,r:10}
      ]
    }
  ]
};

export default React.createClass({
  displayName: 'BubbleExample',

  render() {
    return (
      <div>
        <h2>Bubble Example</h2>
        <Bubble data={data} />
      </div>
    );
  }
});
