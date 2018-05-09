import React, {Component} from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


class App extends Component {

    state = {
        newTask: ''
    }

    componentDidMount() {
        fetch('https://jfddl4-sandbox.firebaseio.com/magda/tasks/.json',
            {
                method: "GET",
            }).then(response => response.json())

            .then(data => {
                const dataInArray = (
                    Object.entries(data) //zamienia obiekt na tablicę tablic
                        //poniższy map zamienia tablicę tablic na tablicę obiektów
                        .map(el => ({
                            key: el[0],
                            value: el[1]
                        }))
                )
                console.log(dataInArray)
            })
    }

    saveAtDbs = () => {
        fetch('https://jfddl4-sandbox.firebaseio.com/magda/tasks/.json',
            {
                method: "POST",
                body: JSON.stringify(this.state.newTask)
            })
        this.setState({newTask: ''})
    }

    newTaskHandler = (event, value) => {
        this.setState({
            newTask: value
        })
    }


    sendFunction = () => {
        this.saveAtDbs(
            this.state.newTask
        )
    }

    render() {
        return (
            <div>
                <TextField
                    name={"field-for-tasks"}
                    value={this.state.newTask}
                    onChange={this.newTaskHandler}
                    fullWidth={true}
                />
                <RaisedButton
                    fullWidth={true}
                    secondary={true}
                    label={'do it!'}
                    onClick={this.sendFunction}
                />

            </div>
        )
    }
}


export default App;
