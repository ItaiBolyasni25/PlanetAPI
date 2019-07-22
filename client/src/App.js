import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import PlanetSearchForm from './components/PlanetSearchForm.js';
import PlanetCreateForm from './components/PlanetCreateForm.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      planets: [],
    }
    this.getPlanet = this.getPlanet.bind(this);
    this.getPlanets = this.getPlanets.bind(this);
  }

  queryAPI(url) {
    axios.get(url)
    .then((req,res) => {
      this.setState({planets: req.data});
    })
  }

  getPlanets() {
    this.queryAPI("http://localhost:5000/planets");
  }

  getPlanet(e) {
    e.preventDefault();
    const planetName = e.target.elements.planetSearchName.value;
    this.queryAPI(`http://localhost:5000/planets/${planetName}`);
  }

  componentDidMount() {
    this.getPlanets();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span>Celestial Bodies Collector V1</span>
        </header>
        <div class="container">
          <div class="row">
            <div class="col-md-4 text-left" id="welcomeText">
              <h2 class="text-center">Welcome to the Celestial Body Collector</h2>
              <p>This is a React based web application written by Itai Bolyasni.</p>
              <p>The application uses Express and NodeJS as the server side and LokiJS as the in-memory database.</p>
            </div>

            <div class="col-md-8" id="mainSection">
            <h3>Planet Collection</h3>
              <div id="planetSearchForm">
                <PlanetSearchForm getPlanet={this.getPlanet} />
              </div>
              

              <div id="planetList">
              {
                this.state.planets.length == 0 ? <h3>No Planets found.</h3> : 
                <table class="table table-striped">
                <thead>
                  <tr>
                    <th style={{width: "50px"}} scope="col">#</th>
                    <th scope="col">Planet Name</th>
                    <th scope="col">Solar System</th>
                  </tr>
                </thead>
                <tbody>
                { 
                  this.state.planets.map((element) => {
                  return (
                    <tr>
                      <td style={{width: "50px"}} key={"id"+element.$loki}>{element.$loki}</td>
                      <td key={"name"+element.name}>{element.name}</td>
                      <td key={"system"+element.SolarSystem}>{element.SolarSystem}</td>
                    </tr>
                  )
                  
                  })
                }
                </tbody>
                </table>
              }

              </div>

              <PlanetCreateForm />
              <div class="text-left mt-3 mb-2">
                <a href="#" style={{fontSize: "18px"}} class="text-left" onClick={this.getPlanets}> See all planets -> </a>
              </div>
              
            </div>
          </div>
        </div>
        


        
      </div>
    );
  }
}

export default App;