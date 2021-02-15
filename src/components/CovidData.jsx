import React, {useState, useEffect} from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import "./CovidData.css";
import DonutChart from 'react-donut-chart';
import { green } from '@material-ui/core/colors';

const CovidData = () => {

  const[data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.covid19india.org/data.json").then((apiData) => apiData.json())
    .then((actualData) => setData(actualData.statewise));
  }, [])

    return (
        <div className="covid-data my-2">
          <div className="covid-heading">
          <span className="icon"><LocationOnIcon /></span>
          <h2 className="text-uppercase ml-2"> India Covid-19 Tracker</h2>
          </div>
          <p className="">Let's all pray to make our earth Covid-19 free soon, Stay Safe and do TheLocate</p>
          <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover container">
  <thead className="thead-light">
    <tr>
      <th scope="col" className="text-warning">#</th>
      <th scope="col" className="text-warning">STATE</th>
      <th scope="col" className="text-warning">CONFIRMED</th>
      <th scope="col" className="text-warning">ACTIVE</th>
      <th scope="col" className="text-warning">RECOVERED</th>
      <th scope="col" className="text-warning">DECEASED</th>
    </tr>
  </thead>
  <tbody>
    {data.map((data, index) => {
      if(index > 0){
        return <tr>
        <td>{index}</td>
        <td>{data.state}</td>
        <td>{data.confirmed}</td>
        <td>{data.active}</td>
        <td>{data.recovered}</td>
        <td>{data.deaths}</td>
        </tr>
      }
    })}
  </tbody>
</table>
          </div>
        </div>
    )
}

export default CovidData;