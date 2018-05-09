import React, {Component} from 'react';


class App extends Component {

    state = {
        counter: 0
    }


    componentDidMount() {
        this.readFromDb()
    }

    readFromDb = () => {
        fetch('https://jfddl4-sandbox.firebaseio.com/magda/counter/.json')
            .then(response => response.json())
            .then(actualCounterVal => this.setState({
                    counter: actualCounterVal
                })
            )
    }

    saveToDb = (data) => fetch('https://jfddl4-sandbox.firebaseio.com/magda/counter/.json',
        {
            method: "PUT",
            body: JSON.stringify(data)
        }
    ).then(this.readFromDb)


    decHandler = () => {
        this.saveToDb(this.state.counter - 1)
    }

    incHandler = () => {
        this.saveToDb(this.state.counter + 1)
    }


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
