import React, {Component} from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


class App extends Component {

    state = {
        counter: 0,
        newText: ''
    }


    componentDidMount() {
        this.readFromDb()
        this.readFromDbs()
    }

    readFromDb = () => {
        fetch('https://jfddl4-sandbox.firebaseio.com/magda/counter/.json')
            .then(response => response.json())
            .then(actualCounterVal => this.setState({
                    counter: actualCounterVal
                })
            )
    }
    readFromDbs = () => {
        fetch('https://jfddl4-sandbox.firebaseio.com/magda/text/.json')
            .then(response => response.json())
            .then(actualText => this.setState({
                    newText: actualText
                })
            )
    }


    saveToDb = (data) => fetch('https://jfddl4-sandbox.firebaseio.com/magda/counter/.json',
        {
            method: "PUT",
            body: JSON.stringify(data)
        }
    ).then(this.readFromDb)

    saveToDbs = (text) => fetch('https://jfddl4-sandbox.firebaseio.com/magda/text/.json',
        {
            method: "PUT",
            body: JSON.stringify(text)
        }
    ).then(this.readFromDbs)


    decHandler = () => {
        this.saveToDb(this.state.counter - 1)
    }

    incHandler = () => {
        this.saveToDb(this.state.counter + 1)
    }

    addText =() => {
        this.saveToDbs(
            this.state.newText
        )
    }

    newText = (event, newText) => {
        this.setState({
            newText: newText
        })
    }

    render() {
        return (
            <div>
                <h2>Da kaunter</h2>
                <h2>{this.state.counter}</h2>
                <button onClick={this.decHandler}>-</button>
                <button onClick={this.incHandler}>+</button>
                <div>
                    <TextField
                        onChange={this.newText}
                        value={this.state.newText}
                        name={'new-tet'}
                        placeholder={'Add new text'}
                        fullWidth={true}
                    />
                    <RaisedButton
                        onClick={this.addText}
                        primary={true}
                        fullWidth={true}
                        label={'ADD'}
                    />
                </div>
            </div>
        )
    }
}


export default App;
