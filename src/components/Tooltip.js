import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const TOOLTIP_DISTANCE = 20

// -------------------------------------------------------------
// Components.
// -------------------------------------------------------------

const Container = styled.div`
  position: relative;
`

const Content = styled.div``

const Tooltip = styled.div`
  z-index: 999;
  position: absolute;

  left: ${props => props.x}px;
  top: ${props => props.y}px;

  color: white;
  padding: 0.5rem 1.5rem;
  background: ${props => (props.color ? props.color : '#333')};
  border-radius: 4px;
  box-shadow: 0 5px 10px hsla(0, 0%, 0%, 0.15);

  font-size: 1.25rem;
  line-height: normal;
  text-transform: uppercase;
  text-align: center;

  opacity: 0;
  transition: all 0.225s ease-in;
  transform: translateY(0);
  transform-origin: ${props => (props.bottom ? 'top' : 'bottom')};

  &.is-opened {
    opacity: 1;
    transform: translateY(${props => (props.bottom ? '10' : '-10')}px);
  }
`

// -------------------------------------------------------------
// Export.
// -------------------------------------------------------------

// TODO: use the new ref API when Gatsby will support the latest React.
export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {open: false}
  }

  componentDidMount() {
    const tooltipNode = ReactDOM.findDOMNode(this.refs.tooltip)
    tooltipNode.style.display = 'none'
  }

  handleIn = e => {
    if (this.state.open) return

    const containerNode = ReactDOM.findDOMNode(this.refs.container)
    const tooltipNode = ReactDOM.findDOMNode(this.refs.tooltip)

    /* We need to delete the default display since the tooltip is now initialized. */
    tooltipNode.style.display = ''

    const {x, y, bottom} = this.getPosition(containerNode, tooltipNode)

    this.setState({open: true, x, y, bottom})
  }

  handleOut = e => {
    this.setState({open: false})
  }

  getPosition(container, tooltip) {
    const containerRect = container.getBoundingClientRect()
    const tooltipRect = tooltip.getBoundingClientRect()

    // If the tooltip is too close to the top edge of the screen,
    // we show it at the bottom of the container instead of the top.
    const bottom = containerRect.top < 100

    // Center.
    const x = containerRect.width / 2 - tooltipRect.width / 2

    // Change the y depending on the position of the tooltip (top or bottom).
    const y = bottom
      ? containerRect.height / 2 + TOOLTIP_DISTANCE
      : containerRect.height / 2 - tooltipRect.height - TOOLTIP_DISTANCE

    return {x, y, bottom}
  }

  render() {
    const style = {
      visibility: this.state.open ? 'visible' : 'hidden'
    }

    const openedClass = this.state.open ? ' is-opened' : ''

    return (
      <Container ref="container">
        <Content onMouseOver={this.handleIn} onMouseOut={this.handleOut}>
          {this.props.children}
        </Content>
        <Tooltip
          style={style}
          className={'tooltip' + openedClass}
          color={this.props.color}
          x={this.state.x}
          y={this.state.y}
          bottom={this.state.bottom}
          ref="tooltip"
        >
          <div>{this.props.text}</div>
        </Tooltip>
      </Container>
    )
  }
}
