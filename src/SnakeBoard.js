import React, { Component } from 'react';
import SnakeSegment from './SnakeSegment.js'
import SnakeFruit from './SnakeFruit.js'
import './App.css';

class SnakeBoard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      fruits: [],
      running: true,
      snakeDirection: [1, 0],
      snakeGrowth: 0,
      snakeSegments: []
    }
  }

  componentDidMount() {
    this.setState({ snakeSegments: this.getInitialSnake() })
    document.addEventListener('keydown', this.changeDirection)
    this.tick()
  }

  getInitialSnake() {
    const snakeSegments = []
    for (let i = 0; i < this.props.initialSnakeSize; i++) {
      const segment = {
        x: this.props.width / 2 - this.props.snakeSegmentSize * i,
        y: this.props.height / 2,
        size: this.props.snakeSegmentSize
      }
      snakeSegments.push(segment)
    }
    return snakeSegments
  }

  changeDirection = key => {
    const {snakeDirection} = this.state
    switch(key.keyCode) {
      case 38:
        if (snakeDirection[1] !== 1) {
          this.setState({ snakeDirection: [0, -1] })
        }
        break
      case 39:
        if (snakeDirection[0] !== -1) {
          this.setState({ snakeDirection: [1, 0] })
        }
        break
      case 40:
        if (snakeDirection[1] !== -1) {
          this.setState({ snakeDirection: [0, 1] })
        }
        break
      case 37:
        if (snakeDirection[0] !== 1) {
          this.setState({ snakeDirection: [-1, 0] })
        }
        break
      default:
        console.log('lol')
    }
  }

  moveSnake = () => {
    const snakeSegments = [
      {
        ...this.state.snakeSegments[0],
        x: (this.state.snakeSegments[0].x + this.state.snakeDirection[0] * this.props.snakeSegmentSize + this.props.width) % this.props.width,
        y: (this.state.snakeSegments[0].y + this.state.snakeDirection[1] * this.props.snakeSegmentSize + this.props.height) % this.props.height
      }
    ]
    if (this.state.snakeGrowth) {
      return snakeSegments.concat(this.state.snakeSegments)
    } else {
      return snakeSegments.concat(this.state.snakeSegments.slice(0, -1))
    }
  }

  appendFruit = () => {
    const newFruitChance = Math.random()
    if (newFruitChance < this.props.newFruitProbability) {
      const fruits = this.state.fruits.slice()
      const fruit = {
        x: this.props.width * Math.random(),
        y: this.props.height * Math.random(),
        size: this.props.fruitSize,
        age: 0
      }
      fruits.push(fruit)
      return this.removeFruits(fruits)
    }
    return this.removeFruits(this.state.fruits)
  }

  removeFruits = (existingFruits) => {
    const fruits = existingFruits.slice()
    fruits.forEach(fruit => fruit.age++)
    const fruitsWithoutExpired = fruits.filter(fruit => fruit.age < this.props.fruitExpiration)
    return fruitsWithoutExpired
  }

  doItemsCollide = (a, b) => {
  const minRequiredDistance = (a.size / 2) + (b.size / 2)

  return (
    Math.abs(a.x - b.x) < minRequiredDistance
    && Math.abs(a.y - b.y) < minRequiredDistance
  )}

  hasCollision = item => {
    return this.state.snakeSegments.some(segment => this.doItemsCollide(item, segment))
  }

  handleGameState = () => {
    this.setState({
      snakeSegments: this.moveSnake(),
      fruits: this.appendFruit().filter(fruit => !this.hasCollision(fruit)),
      snakeGrowth: !!this.appendFruit().filter(fruit => this.hasCollision(fruit)).length
    })
  }

  tick = () => {
    setInterval(() => this.handleGameState(), this.props.tickDelay)
  }

  render() {
    return (
      <svg width={this.props.width} height={this.props.height} >
        <rect width={this.props.width} height={this.props.height} style={{fill:'rgb(0,0,255)', strokeWidth:3, stroke:'rgb(0,0,0)'}} />
        {
          this.state.snakeSegments.map(
            (segment, index) => <SnakeSegment key={index} x={segment.x} y={segment.y} r={this.props.snakeSegmentSize / 2} />
          )
        }
        {
          this.state.fruits.map(
            (fruit, index) => <SnakeFruit key={index} x={fruit.x} y={fruit.y} r={this.props.fruitSize / 2} />
          )
        }
      </svg>
    )
  }
}

export default SnakeBoard;
