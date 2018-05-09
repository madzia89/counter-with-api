import React, {Component} from 'react';


class App extends Component {

    state = {
        counter: ''
    }

    decHandler = () => {
        this.setState({
            counter: this.state.counter - 1
        }, this.saveToDb)
    }

    incHandler = () => {
        this.setState({
            counter: this.state.counter + 1
        }, this.saveToDb)
    }

    componentDidMount = () => {
        fetch('https://jfddl4-sandbox.firebaseio.com/magda/counter/.json')
            .then(response => response.json())
            .then(actualCounterVal => this.setState({
                    counter: actualCounterVal
                })
            )
    }

    saveToDb = () => fetch('https://jfddl4-sandbox.firebaseio.com/magda/counter/.json',
        {
            method: "PUT",
            body: JSON.stringify(this.state.counter)
        }
    )


    render() {
        return (
            <div>
                <h2>Da kaunter</h2>
                <h2>{this.state.counter}</h2>
                <button onClick={this.decHandler}>-</button>
                <button onClick={this.incHandler}>+</button>
            </div>
        )
    }
}


export default App;
