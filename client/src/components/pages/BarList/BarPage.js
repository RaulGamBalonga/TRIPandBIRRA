import React, { Component } from "react";
import { Container } from 'react-bootstrap'
import BarService from "../../../services/bar.service";
import BarList from "./BarList";

const barService = new BarService()

class BarPage extends Component {
  constructor() {
    super()

    this.state = {
      bars: []
    }

  }

  componentDidMount() {
    this.refreshBars()
  }

  refreshBars = () => {
    barService.getAllBar()
      .then(response => {
        const bars = response.data

        this.setState({ bars: bars })
      })
      .catch(err => console.log(err))
  }

  render() {

    return (
      <Container >
        <h1>Listado de Bares</h1>
        <div className="barList">
          <BarList refreshBars={this.refreshBars} bars={this.state.bars} />
        </div>
        {}
      </Container>
    )
  }
}

export default BarPage