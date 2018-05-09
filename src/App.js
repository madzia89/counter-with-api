import React, {Component} from 'react';


class App extends Component {

        state = {
            counter: 0
        }

        decHandler = () => {
            this.setState({
                counter: this.state.counter - 1
            })
        }

        incHandler = () => {
            this.setState({
                counter: this.state.counter + 1
            })
        }
    render() {
        return (
            <div>
                <h1>{this.state.counter}</h1>
                <button onClick={this.decHandler}>-</button>
                <button onClick={this.incHandler}>+</button>
            </div>
        )
    }
}


export default App;
