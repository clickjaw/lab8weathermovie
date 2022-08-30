import React, { Component } from "react";
import axios from "axios";
import {Button, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";


export default class WeatherForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityName:'' , 
      lat:'',
      lon:'',
      movieTitle:'',
      movieOverview:'',
      movieDate:'',
      temp:'',
      src:''
    };
  }

  setQuery = (e) => {
    this.setState({weatherSearch: e.target.value})
  }

  getWeather = async(event) => {
    
    try {
        event.preventDefault();
        const APIweather = `http://localhost:3010/weather/${this.state.weatherSearch}`;
        const APImovie = `http://localhost:3010/movie/${this.state.weatherSearch}`;
        const resWeather = await axios.get(APIweather);
        const resMovie = await axios.get(APImovie);
        this.setState({cityName:resWeather.data.location.name})
        this.setState({lat:resWeather.data.location.lat})
        this.setState({lon:resWeather.data.location.lon})
        this.setState({movieTitle:resMovie.data.title})
        this.setState({movieOverview:resMovie.data.overview})
        this.setState({movieDate:resMovie.data.release_date})

        const APIlocation = `https://maps.locationiq.com/v3/staticmap?key=pk.f33dffa5bc3e6218c310d007c07dfff3&center=${this.state.lat},${this.state.lon}&zoom=5&size=300x200&format=png&maptype=dark&markers=icon:small-yellow-cutout|${this.state.lat},${this.state.lon}`;
        this.setState({ src: APIlocation });

        let celsius = resWeather.data.current.temperature;
        console.log(`celcius ${celsius}`)
        let faren = ((celsius * (9/5)) + 32);
        let farenRound = Math.ceil(faren)
        this.setState({temp:farenRound})

        
    } catch (error) {
        console.log(error)
    }
  }


 

  render() {
    return (
      <div>
        <Form onSubmit = {this.getWeather}>
            <Form.Group>
                <Form.Label>Weather</Form.Label>
                <Form.Control required type = "text" onChange = {this.setQuery} style = {{width:'18rem'}}></Form.Control>
            </Form.Group>
        <Button type = 'submit' onClick = {this.createMap}>Explore!</Button>
        </Form>
        <Card style = {{maxWidth:"22rem"}}>
        <Card.Body className = "cardBodyTemp"style = {{display: 'flex', flexDirection: 'column'}}>
            <Card.Title style = {{display : 'flex', justifyContent: 'center'}}>City: {this.state.cityName}</Card.Title>
            <Card.Text style = {{display: 'flex', justifyContent:'center'}}>Temp:{this.state.temp}º</Card.Text>
            <Card.Text style = {{display: 'flex', justifyContent:'center'}}>Lat:{this.state.lat}</Card.Text>
            <Card.Text style = {{display: 'flex', justifyContent:'center'}}>Lon:{this.state.lon}</Card.Text>
        </Card.Body>
        <Card.Body style = {{display: 'flex', justifyContent:'center'}}>
            <img style={{width: '300px', height: '200px'}} alt='a map' src={this.state.src}/>
        </Card.Body>
        <Card>
            <Card.Body className = "cardBodyMovie" style = {{display: 'grid'}}>
            <Card.Title style = {{display: 'grid', justifyContent:'center'}}>{this.state.movieTitle}</Card.Title>
            <Card.Text style = {{display: 'flex', justifyContent:'center'}}>{this.state.movieDate}</Card.Text>
            <Card.Text style = {{display: 'flex', justifyContent:'center'}}>{this.state.movieOverview}</Card.Text>
            </Card.Body>
        </Card>
        </Card>

      </div>
    );
  }
}
