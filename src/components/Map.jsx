import React, { useState ,useEffect} from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import LinearGradient from "./LinearGradient";
import "./Map.css";

const INDIA_TOPO_JSON = require('../india.topo.json');

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
  '#ffedea',
  '#ffcec5',
  '#ffad9f',
  '#ff8a75',
  '#ff5533',
  '#e2492d',
  '#be3d26',
  '#9a311f',
  '#782618'
];

const DEFAULT_COLOR = '#EEE';

const getRandomInt = () => {
  return parseInt(Math.random() * 100);
};

const geographyStyle = {
  default: {
    outline: 'none'
  },
  hover: {
    fill: '#ccc',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};


function Map() {
  const [ confirmed ,setConfirmed] =useState('' );
  const [ active ,setActive] =useState('');
  const [ recovered ,setRecovered] =useState('');
  const [ deceased ,setDeceased] =useState('');

  const [tooltipContent, setTooltipContent] = useState('');
  const [data,setData] = useState([]); 
  
  useEffect( () => {
    getData()
  }
  ,[])

  const getData =  async () => {
    const response = await fetch('https://api.covid19india.org/data.json')
    const data = await response.json()   
     setData(data.statewise)
     setConfirmed(data.statewise[0].confirmed)
     setActive(data.statewise[0].active)
     setRecovered(data.statewise[0].recovered)
     setDeceased(data.statewise[0].deaths)  

  }

  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: data.reduce((max, item) => (item.confirmed > max ? item.confirmed : max), 0)
  };

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.confirmed))
    .range(COLOR_RANGE);

    
  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.confirmed}`);
      document.getElementById("heading").innerText = `${geo.properties.name}`
      setConfirmed(current.confirmed)
      setActive(current.active)
      setRecovered(current.recovered)
      setDeceased(current.deaths)

    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
    document.getElementById("heading").innerText = 'States and UTs'
    setConfirmed(data[0].confirmed)
    setActive(data[0].active)
    setRecovered(data[0].recovered)
    setDeceased(data[0].deaths)
  };

  return (
    <div className="full-width-height">
      <h1 id="heading">States and UTs</h1>
      <div className="map my-5">
      <div className="confirmed">
      <h1>CONFIRMED</h1>
      {confirmed}
      </div>
       <div className="actived">
      <h1>ACTIVE</h1>
      {active}
      </div> 
      <div className="recovered">
      <h1>RECOVERED</h1>
        {recovered}
      </div>
       <div className="deceased"> 
      <h1>DECEASED</h1>
      {deceased}
      </div>
      </div>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={600}
          height={220}
          data-tip=""
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                //console.log(geo.id);
                const current = data.find(s => s.statecode === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? colorScale(current.confirmed) : DEFAULT_COLOR}
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        <LinearGradient data={gradientData} />
       
    </div>
  );
}

export default Map;