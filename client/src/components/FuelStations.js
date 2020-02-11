import React, { Component } from 'react';
import Sidebar from "react-sidebar";
import axios from "axios";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import FuelStationsBarEntry from './FuelStationsBarEntry';
import FuelStationMap from './FuelStationMap';

const mql = window.matchMedia(`(min-width: 500px)`);

export default class FuelStations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mql: window.matchMedia(`(min-width: 500px)`),
      sidebarDocked: true,
      sidebarOpen: true,
      zip: "",
      fuelstations: [],
      sortOrder: "distance",
      testMode: true,         //test mode is controlled by servers routes/fuelApi.js with the intend to limit the api calls to tankerkönig 
      selectedKey: "",
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  UNSAFE_componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }
 
  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarDocked: open, sidebarOpen: open });
  }
 
  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  handleSidebarEntryClick = (id) => {
    //console.log("Sidebar-Entry clicked: ", id);
    {/*toggle*/}
    if ((this.state.selectedKey === "") || ((this.state.selectedKey !== id))) {
      this.setState({ selectedKey: id }); 
    }
    else this.setState({ selectedKey: "" }); 
  }

  handleInputChanges = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });   
  }

  handleInputChangesSort = (value) => {
    this.setState({
      sortOrder: value,
      selectedKey: "",
    });   
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    let fuelStationRequestUrl = "/api/getFuelStations?zip=" + (this.state.zip === "" ? "85053" : this.state.zip);
    //console.log(fuelStationRequestUrl);
    console.log("Frontend: FuelStations: FuelStations.js  - before Backend call");
    axios.get(fuelStationRequestUrl)
    .then(response => {
      console.log("Frontend: FuelStations: FuelStations.js - response received: ");
      //console.log(response.data);
      //console.log(response.data.stations);
      //console.log(response.data.testMode);

      //prepare some of the data
      let prepStations = response.data.stations.map(station => {
        station.street = this.fixCaseOrientation(station.street);
        station.place  = this.fixCaseOrientation(station.place);
        return station;
      });

      this.setState({ 
        fuelstations: prepStations,
        testMode: response.data.testMode
      });
    })
  }

  fixCaseOrientation = (inputStr) => {
    let newStr = inputStr.split('').map(char => {
      if (char === '-') {
        return ' ';
      }
      else return char
    }).join('');    
    let streetArr = newStr.split(' ');
    let fixedArr = [];
    for (let word of streetArr) {
      let fixedWord = "";
      for (let i=0; i<word.length; i++) {
        fixedWord += (i === 0 ? word[i].toUpperCase() : word[i].toLowerCase());
      }
      fixedArr.push(fixedWord);
    }
    return fixedArr.join(' ');
  }

  calculateMapCenter = (currFuelStations) => {
    let googleMapsCenter = {lat: 48.731, lng: 11.187};
    if (currFuelStations.length > 0) {
      googleMapsCenter = currFuelStations.reduce(function (acc, cur) {
        let res = {minLat: cur.lat, maxLat: cur.lat, minLng: cur.lng, maxLng: cur.lng}
        acc.minLat > cur.lat ? res.minLat = cur.lat : res.minLat = acc.minLat
        acc.minLng > cur.lng ? res.minLng = cur.lng : res.minLng = acc.minLng
        acc.maxLat < cur.lat ? res.maxLat = cur.lat : res.maxLat = acc.maxLat
        acc.maxLng < cur.lng ? res.maxLng = cur.lng : res.maxLng = acc.maxLng
        return res;
      },{minLat: 999999, maxLat: 0, minLng: 999999, maxLng: 0});

      let centerLat = Math.round((googleMapsCenter.minLat+((googleMapsCenter.maxLat-googleMapsCenter.minLat)/2))*1000)/1000;
      let centerLng = Math.round((googleMapsCenter.minLng+((googleMapsCenter.maxLng-googleMapsCenter.minLng)/2))*1000)/1000;
      googleMapsCenter = { lat: centerLat, lng: centerLng };
    }
    //console.log("google maps center coords: ", googleMapsCenter);
    return googleMapsCenter;
  }

  prepareFuelStations = (currFuelStations, sortOrder) => {
    //console.log("Frontend: FuelStations: FuelStationsBody.js - testMode:", this.props.testMode ? 'ON' : 'OFF');
    //console.log("Frontend: FuelStations: FuelStationsBody.js - fuelstation props:", this.props.fuelstations);
    //console.log("Frontend: FuelStations: FuelStationsBody.js - sortOrder props:", this.props.sortOrder);
    let googleMapsMarker = [{lat: 48.731, lng: 11.187, index: 0}];
    if (currFuelStations.length > 0) {
      googleMapsMarker = currFuelStations.sort(function(stationA, stationB) {
        switch(sortOrder) {
          case "distance":
            if (stationA.dist > stationB.dist) { //ascending
              return 1;
            } else if (stationA.dist < stationB.dist) {
              return -1;
            } else return 0;
          case "e5price":
            if (stationA.e5 === null) { //compensate for empty values
              return 1;
            } else if (stationB.e5 === null) { //compensate for empty values
              return -1;
            } else if ((stationA.e5 - stationB.e5) === 0) {
              return stationA.dist - stationB.dist;
            } else return stationA.e5 - stationB.e5;
          case "e10price":
            if (stationA.e10 === null) { //compensate for empty values
              return 1;
            } else if (stationB.e10 === null) { //compensate for empty values
              return -1;
            } else if ((stationA.e10 - stationB.e10) === 0) {
              return stationA.dist - stationB.dist;
            } else return stationA.e10 - stationB.e10;
          case "dieselprice":
            if (stationA.diesel === null) { //compensate for empty values
              return 1;
            } else if (stationB.diesel === null) { //compensate for empty values
              return -1;
            } else if ((stationA.diesel - stationB.diesel) === 0) {
              return stationA.dist - stationB.dist;
            } else return stationA.diesel - stationB.diesel;
          default:
            return 0;
        }
      }).map((oneFuelStation, index) => {
        oneFuelStation['index'] = index;
        if (!oneFuelStation.hasOwnProperty('city')) {
          oneFuelStation['city'] = oneFuelStation.place;  //renamed place to city as this solves an unexpected error in index.js
          delete oneFuelStation['place'];
        }
        (index === 0) ? oneFuelStation['color'] = "red" : oneFuelStation['color'] = "blue";
        return oneFuelStation;
      });
    }
    //console.log("sorted markers: ", googleMapsMarker);
    return googleMapsMarker;
  }

  addBrandIcons = (stations) => {
    let enrichedStations = stations;
    if (enrichedStations.length > 0) {
      let currBrand = "Default";
      if (!stations[0].hasOwnProperty('iconUrl')) {
        enrichedStations = stations.map(station => {
          currBrand = String(station.brand).toLowerCase();
          station.iconUrl = './fuelStationIcons/' + currBrand + '.png'; //no error handling yet - but works fine from display point of view
          if (station.iconUrl.includes('undefined')) {
            station.iconUrl = './fuelStationIcons/default.png';
          }
          //console.log("brandIcons: ", station);
          return station;
        });
      }
    }
    return enrichedStations;
  }
 
  render() {
    let currFuelStations = this.state.fuelstations;
    let sortOrder = this.state.sortOrder;
    let googleMapsCenter = this.calculateMapCenter(currFuelStations);
    let googleMapsMarker = this.prepareFuelStations(currFuelStations, sortOrder);
    googleMapsMarker = this.addBrandIcons(googleMapsMarker);
    //console.log(googleMapsMarker);
    let sidebar = (
      <div style={{textAlign: 'left'}}>
        <div style={{position: 'sticky', top: '0px', backgroundColor: '#343a40', display: 'flex', justifyContent: 'center', zIndex: 1, borderTop: '1px solid #17a2b8'}}>
          <div>
            <form onSubmit={this.handleFormSubmit} style={{paddingLeft: '5px', paddingTop: '5px'}}>
              <label htmlFor='zip' style={{color: '#17a2b8', fontWeight: 'bold'}}>Plz:</label>
              <input id='zip' name='zip' type='text' minLength='5' maxLength='5' onChange={this.handleInputChanges} style={{height: '31px', width: '9ch', marginLeft: '10px', padding: '0px', borderRadius: '3px', backgroundColor: '#343a40', borderColor: '#17a2b8', color: '#17a2b8', fontWeight: 'bold', textAlign: 'center'}} placeholder='z.B. 85083' />
              <Button type="submit" style={{margin: '-3px 5px 0px 1px', padding: '4px 21px', fontWeight: 'bold'}} size='sm' variant='outline-info'>OK</Button>
            </form>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle id="dropdown-basic-button" variant="outline-info"><b>{'Sortierung: '}</b>{this.state.sortOrder}</Dropdown.Toggle>
              <Dropdown.Menu className="fuelSortColors">
              <Dropdown.Divider className="fuelSortDivider" />
                <Dropdown.Item onSelect={() => this.handleInputChangesSort('distance')} style={{color: '#17a2b8'}}>Entfernung</Dropdown.Item>
                <Dropdown.Divider className="fuelSortDivider" />
                <Dropdown.Item onSelect={() => this.handleInputChangesSort('e5price')} style={{color: '#17a2b8'}}>E5-Preis</Dropdown.Item>
                <Dropdown.Divider className="fuelSortDivider" />
                <Dropdown.Item onSelect={() => this.handleInputChangesSort('e10price')} style={{color: '#17a2b8'}}>E10-Preis</Dropdown.Item>
                <Dropdown.Divider className="fuelSortDivider" />
                <Dropdown.Item onSelect={() => this.handleInputChangesSort('dieselprice')} style={{color: '#17a2b8'}}>Diesel-Preis</Dropdown.Item>
                <Dropdown.Divider className="fuelSortDivider" />
              </Dropdown.Menu>
            </Dropdown>{' '}
          </div>
        </div>
        <hr style={{marginTop: '5px', marginBottom: '3px', backgroundColor: '#17a2b8', height: '1px'}}/>
        {googleMapsMarker.map(oneStation => {
          if (oneStation.brand !== undefined) {
            return <FuelStationsBarEntry key={oneStation.id} {...oneStation} handler={this.handleSidebarEntryClick} />
          }
          return null;
        })}
      </div>
    );

    let mainContent = (
      googleMapsMarker.length > 0 ? <FuelStationMap key={googleMapsMarker.id} selectedKey={this.state.selectedKey} center={googleMapsCenter} markers={googleMapsMarker} sidebarButton={this.onSetSidebarOpen} sidebarButtonState={this.state.sidebarOpen}/> : <div><h1>Google API does not respond. Please to enter a Zip Code into the sidbar (left side) and press OK.</h1></div>
    );

    return (
      <div id="sidebar">
        <Sidebar
          children={mainContent}
          styles={{root:{top: 42, backgroundColor: '#343a40'}}}
          sidebar={sidebar}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
        >
        </Sidebar>
      </div>
    );
  }
}
