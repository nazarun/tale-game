import React from "react";

import List from './List';

// import "./Todo.css";

class TodoList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            todos: [
                {id: 1, text: "learn react", done: true},
                {id: 2, text: "build an react app", done: false},
                {id: 3, text: "modify", done: true},
                {id: 4, text: "test", done: false}
            ],
            text: "",
            filter: "",
            filteredTodos: [],
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    getTodos() {
        return this.state.filter ? this.state.filteredTodos : this.state.todos;
    }

    handleSubmit = e => {
        e.preventDefault();
        let newTodo = {
            id: this.state.todos.length + 1,
            text: this.state.text,
            done: false
        };
        this.setState({
            todos: this.state.todos.concat(newTodo),
            text: ""
        });
    };

    handleChange = e => {
        e.preventDefault();
        let text = e.target.value;
        this.setState({
            text,
            filter: '',
        });
    };

    handleClean = () => {
        let filtered = this.state.todos.filter(item => (
            item.done === false
        ));

        this.setState({
            todos: filtered
        });
    }

    handleCheck = (e, id) => {
        e.persist();

        const listToChange = this.state.todos;
        const index = listToChange.findIndex(item => item.id === id);
        listToChange[index].done = !listToChange[index].done;

        this.setState({
            todos: listToChange,
        });
    }

    handleFilter = e => {
        e.preventDefault();

        let filtered = this.state.todos.filter(item =>
            item.text.toLowerCase().includes(e.target.value.toLowerCase())
        );

        this.setState({
            filter: e.target.value,
            filteredTodos: filtered
        });
    }

    render() {
        return (
            <div className="Todo">
                <div>
                    <input
                        type="text"
                        placeholder="filter tasks"
                        value={this.state.filter}
                        onChange={e => {
                            this.handleFilter(e)
                        }}
                    />
                    <a href="#" onClick={this.handleClean}>hide done items</a>
                </div>
                <List
                    todos={this.getTodos()}
                    handleCheck={this.handleCheck}
                />

                <form
                    onSubmit={e => {
                        this.handleSubmit(e);
                    }}
                >
                    <input
                        type="text"
                        value={this.state.text}
                        onChange={e => {
                            this.handleChange(e);
                        }}
                    />
                    <button
                        className="add_btn"
                        type="submit"
                    >
                        Add
                    </button>
                </form>
            </div>
        );
    }
}

export default TodoList;
