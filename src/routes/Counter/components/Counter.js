import React from 'react'

class Counter extends React.Component {
  static loadData (store, params) {
    return new Promise(() => {
      store.dispatch({
        type    : 'COUNTER_INCREMENT',
        payload : 5
      })
    })
  }

  render () {
    return (
      <div style={{ margin: '0 auto' }}>
        <h2>Counter: {this.props.counter}</h2>
        <button className='btn btn-default' onClick={this.props.increment}>
          Increment
        </button>
        {' '}
        <button className='btn btn-default' onClick={this.props.doubleAsync}>
          Double (Async)
        </button>
      </div>
    )
  }
}

Counter.propTypes = {
  counter     : React.PropTypes.number.isRequired,
  doubleAsync : React.PropTypes.func.isRequired,
  increment   : React.PropTypes.func.isRequired
}

export default Counter
