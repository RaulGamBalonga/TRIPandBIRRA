import React, { Component } from "react";
import { Container } from 'react-bootstrap'
import BarService from "../../../services/bar.service";
import BarList from "./BarList";

class BarPage extends Component {
  constructor() {
    super()

    this.state = {
      coasters: []
    }

    this.service = new BarService()
  }

  componentDidMount() {
    this.refreshBars()
  }

  refreshBars = () => {
    this.service.getAllBar()
      .then(response => {
        const bars = response.data

        this.setState({ bars: bars })
      })
      .catch(err => console.log(err))
  }

  render() {

    return (
      <Container>
        <h1>Coaster List</h1>

        <CoasterList refreshCoasters={this.refreshCoasters} coasters={this.state.coasters} />

      </Container>
    )
  }
}

export default CoasterPage