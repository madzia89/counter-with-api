import React, {Component} from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


class App extends Component {

    state = {
        newTask: '',
        allTasks: null //najlepiej null żeby późnej dać loading w czasie gdy jest null
    }

    componentDidMount() {
        this.loadTasks()
    }

    loadTasks = () => (
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
                this.setState({
                    tasks: dataInArray
                })
            })
    )

    saveAtDbs = () => {
        fetch('https://jfddl4-sandbox.firebaseio.com/magda/tasks/.json',
            {
                method: "POST",
                body: JSON.stringify(this.state.newTask)
            }).then(this.loadTasks)
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
                {
                    !this.state.tasks ?
                        'loading...'
                        :
                        <ol>
                            {this.state.tasks.map(
                                task => <li key={task.key}>{task.value}</li>
                            )
                            }
                        </ol>
                }

            </div>
        )
    }
}


export default App;
