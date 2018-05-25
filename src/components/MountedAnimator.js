import React from 'react'

// -------------------------------------------------------------
// Mounted Animator HOC.
// -------------------------------------------------------------

// Simple animator which triggers an animation when the component is mounted.
// Two props: `duration` (default by Popmotion) and `delay` (default: 0).
// Expect a `posed` component from React Pose.
export function withMountedAnimator(WrappedComponent) {
  return class MountedAnimator extends React.Component {
    state = {isMounted: false}

    componentDidMount() {
      setTimeout(() => {
        this.setState({isMounted: true})
      }, this.props.delay || 0)
    }

    render() {
      return (
        <WrappedComponent
          pose={this.state.isMounted ? 'mounted' : 'unmounted'}
          duration={this.props.duration}
        >
          {this.props.children}
        </WrappedComponent>
      )
    }
  }
}
