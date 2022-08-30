import React, { Component } from "react";
import axios from "axios";
import {Button, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";

export default class MovieForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieSearch: "",
      movieTitle:'',
      movieOverview:'',
      movieDate:'',
      movieScore: ''
    };
  }

  setQuery = (e) => {
    this.setState({movieSearch: e.target.value})
  }

  getMovie = async(event) => {
    
    try {
        event.preventDefault();
        const API = `http://localhost:3010/movie/${this.state.movieSearch}`;
        const res = await axios.get(API);
        console.log(res.data);
        this.setState({movieTitle:res.data.title})
        this.setState({movieOverview:res.data.overview})
        this.setState({movieDate:res.data.release_date})
        this.setState({movieScore:res.data.vote_average})
    } catch (error) {
        console.log(error)
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit = {this.getMovie}>
            <Form.Group>
                <Form.Label>Movie</Form.Label>
                <Form.Control required type = "text" onChange = {this.setQuery} style = {{width:'18rem'}}></Form.Control>
            </Form.Group>
        <Button type = 'submit'>Explore!</Button>
        </Form>
        <Card style = {{maxWidth:"22rem"}}>
        <Card.Body style = {{display: 'flex', flexDirection: 'column'}}>
            <Card.Title style = {{display : 'flex', justifyContent: 'center'}}>{this.state.movieTitle}</Card.Title>
            <Card.Text style = {{display: 'flex', justifyContent:'center'}}>{this.state.movieOverview}</Card.Text>
            <Card.Text style = {{display: 'flex', justifyContent:'center'}}>{this.state.movieDate}</Card.Text>
        </Card.Body>
        </Card>

      </div>
    );
  }
}
