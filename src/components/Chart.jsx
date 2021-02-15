import React, {useState, useEffect} from 'react';
import { Doughnut } from 'react-chartjs-2';
import "./Chart.css";

const Chart = () => {

    const recover = 200;

    const[covidData, setCovidData] = useState([]);

    const[confirmed, setConfirmed] = useState("");

    const[recovered, setRecovered] = useState("");

    const[active, setActive] = useState("");

    const[deceased, setDeceased] = useState("");

    const confirm = {confirmed};

    useEffect(() => {
        fetch("https://api.covid19india.org/data.json").then((apiData) => apiData.json()).
        then((actualData) => {
                console.log(actualData.statewise[0]);
                setConfirmed(actualData.statewise[0].confirmed);
                setRecovered(actualData.statewise[0].recovered);
                setActive(actualData.statewise[0].active);
                setDeceased(actualData.statewise[0].deaths);
        })
    }, [])

    const data = {
        labels: ['confirmed', 'recovered', 'active', 'deceased'],
        datasets:[
          {
            label: 'Sales 2020 (M)',
            data: [confirmed, recovered, active, deceased],
            backgroundColor: [
              "red",
              "green",
              "blue",
              "gray"
            ]
          },
        ]
      }
    
      const options = {
        title: {
          display: true,
          text: 'Covid-19 Doughnut Chart',
        },
        maintainAspectRatio: false
      }

    return (
        <div className="chart">
            <Doughnut data={data} options={options} className="doughnut" />
        </div>
    )
}

export default Chart;