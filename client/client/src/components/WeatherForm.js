import React, { Component } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import useState from "react";

export default class WeatherForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityName: "",
      lat: "",
      lon: "",
      temp: "",
      weatherDes: "",
      movieTitle: "",
      movieOverview: "",
      movieDate: "",
      movieProject: "", //api poster path
      src: "",
      displayMap: false,
      displayPoster: false,
      isDay: "",
    };
  }

  setQuery = (e) => {
    this.setState({ weatherSearch: e.target.value });
  };

  getWeather = async (event) => {
    try {
      event.preventDefault();

      const APIweather = `http://localhost:3010/weather/${this.state.weatherSearch}`;
      const APImovie = `http://localhost:3010/movie/${this.state.weatherSearch}`;
      const resWeather = await axios.get(APIweather);
      const resMovie = await axios.get(APImovie);
      this.setState({ cityName: resWeather.data.location.name });
      this.setState({ lat: resWeather.data.location.lat });
      this.setState({ lon: resWeather.data.location.lon });
      this.setState({weatherDes: resWeather.data.current.weather_descriptions});
      this.setState({ isDay: resWeather.data.current.is_day });

      this.setState({ movieTitle: resMovie.data.title });
      this.setState({ movieOverview: resMovie.data.overview });
      this.setState({ movieDate: resMovie.data.release_date });
      this.setState({ movieProject: resMovie.data.poster_path });

      //   const APIlocation = `https://maps.locationiq.com/v3/staticmap?key=pk.f33dffa5bc3e6218c310d007c07dfff3&center=${this.state.lat},${this.state.lon}&zoom=5&size=300x200&format=png&maptype=dark&markers=icon:small-yellow-cutout|${this.state.lat},${this.state.lon}`;
      this.setState({ displayMap: true });
      this.setState({ displayPoster: true });

      let celsius = resWeather.data.current.temperature;
      let faren = celsius * (9 / 5) + 32;
      let farenRound = Math.ceil(faren);
      this.setState({ temp: farenRound });
    } catch (error) {
      console.log(error);
    }
  };

  dayTime = ()=>{
    if(this.state.isDay === "yes"){
        return("Sun is up!")
    }else{
        return("Shh... they're sleeping")
    }
  }

 
  render() {
    return (
      <div className = 'bigDiv'>
        <h1 className="citySearch">City Search</h1>
        <Form onSubmit={this.getWeather}>
          <Form.Group>
            <Form.Control placeholder = "Search City..."
              required
              type="text"
              onChange={this.setQuery}
              style={{ width: "18rem" }}
            ></Form.Control>
          </Form.Group>
          <Button type="submit">
            Explore!
          </Button>
        </Form>
        <Card style={{ maxWidth: "22rem" }}>
          <Card.Body
            className={this.state.isDay}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Card.Title style={{ display: "flex"}}>
              City: {this.state.cityName}
            </Card.Title>
            <Card.Text style={{ display: "flex"}}>
              Lat:{this.state.lat}
            </Card.Text>
            <Card.Text style={{ display: "flex" }}>
              Lon:{this.state.lon}
            </Card.Text>
            <Card.Text style={{ display: "flex", justifyContent: "center" }}>
                {this.dayTime()}
            </Card.Text>
          </Card.Body>
          <Accordion onChange = {this.dayColor}>
            <Accordion.Item eventKey="0"></Accordion.Item>
            <Accordion.Header className="aHeader">Weather</Accordion.Header>

            <Accordion.Body className={`${this.state.isDay}`}>
              Temperature: {this.state.temp}° <br />

              Currently: {this.state.weatherDes}
              <br />
              Daytime: {this.state.isDay.toUpperCase()}


            </Accordion.Body>
          </Accordion>
          <Accordion>
            <Accordion.Item eventKey="1">
              <Accordion.Header className="aHeader">Map</Accordion.Header>
              <Accordion.Body>
                {this.state.displayMap && (
                  <img
                    src={`https://maps.locationiq.com/v3/staticmap?key=pk.f33dffa5bc3e6218c310d007c07dfff3&center=${this.state.lat},${this.state.lon}&zoom=5&size=300x200&format=png&maptype=dark&markers=icon:small-yellow-cutout|${this.state.lat},${this.state.lon}`}
                    style={{ width: "300px", height: "200px" }}
                    alt="a map"
                  />
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion>
            <Accordion.Item eventKey="2">
              <Accordion.Header className="aHeader">Movies</Accordion.Header>
              <Accordion.Body
                style={{ display: "grid", justifyContent: "center" }}
              >
                {this.state.movieTitle}
              </Accordion.Body>
              <Accordion.Body
                style={{ display: "flex", justifyContent: "center" }}
              >
                {this.state.displayPoster && (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${this.state.movieProject}`}
                    alt={this.state.movieTitle}
                  />
                )}
              </Accordion.Body>
              <Accordion.Body
                style={{ display: "flex", justifyContent: "center" }}
              >
                {this.state.movieOverview}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card>
      </div>
    );
  }
}
