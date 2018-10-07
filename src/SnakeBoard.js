import React, { Component } from 'react';
import SnakeSegment from './SnakeSegment.js'
import './App.css';

class SnakeBoard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      fruits: [],
      running: true,
      snakeDirection: [-1, 0],
      snakeGrowth: 0,
      snakeSegments: [
        {x: this.props.width / 2, y: this.props.height / 2},
        {x: this.props.width / 2 + 10, y: this.props.height / 2}
      ]
    }

  }

  componentDidMount() {
    document.addEventListener('keydown', this.changeDirection)
    this.tick();
  }

  changeDirection = key => {
    switch(key.keyCode) {
      case 38:
        this.setState({ snakeDirection: [0, -1] })
        break
      case 39:
        this.setState({ snakeDirection: [1, 0] })
        break
      case 40:
        this.setState({ snakeDirection: [0, 1] })
        break
      case 37:
        this.setState({ snakeDirection: [-1, 0] })
        break
      default:
        console.log('lol')
    }
  }

  moveSnake = () => {
    const snakeSegments = [
      {
        x: (this.state.snakeSegments[0].x + this.state.snakeDirection[0] * this.props.segmentRadius + this.props.width) % this.props.width,
        y: (this.state.snakeSegments[0].y + this.state.snakeDirection[1] * this.props.segmentRadius + this.props.height) % this.props.height
      }, ...this.state.snakeSegments.slice(0, -1)
    ]
    this.setState({snakeSegments})
  }

  tick = () => {
    setInterval(() => this.moveSnake(), this.props.tickDelay)

  }

  render() {
    return (
      <svg width={this.props.width} height={this.props.height} >
        <rect width={this.props.width} height={this.props.height} style={{fill:'rgb(0,0,255)', strokeWidth:3, stroke:'rgb(0,0,0)'}} />
        {
          this.state.snakeSegments.map(
            (segment, index) => <SnakeSegment key={index} x={segment.x} y={segment.y} r={this.props.segmentRadius / 2} />
          )
        }
      </svg>
    )
  }
}

export default SnakeBoard;
