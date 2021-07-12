import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import { AppointmentsContext } from "../../contexts/AppointmentsContext";

const Homepage = () => {
  const [todos, setTodos] = useState([]);
  const [isAddNewTodoShown, setIsAddNewTodoShown] = useState(false);
  const [addNewTodo, setAddNewTodo] = useState({
    todo_item: "",
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const { appointments } = useContext(AppointmentsContext);

  {
    /* ==============APPOINTMENTS=============== */
  }

  const currentDate = moment().format("dddd Do MMMM YYYY");

  {
    /* ==============TODOS=============== */
  }
  const fetchTodos = () => {
    axios
      .get("/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => alert(error));
  };

  {
    /* ==============DELETE TODOS=============== */
  }

  const handleDelete = (todoId) => {
    axios
      .delete(`/todos/${todoId}`)
      .then((response) => {
        const filteredTodos = todos.filter((todo) => todo.id !== todoId);
        setTodos(filteredTodos);
      })
      .catch((error) => alert(error));
  };

  {
    /* ==============ADD TODO=============== */
  }
  const handleAddNewTodo = (event) => {
    const { name, value } = event.target;
    setAddNewTodo({ [name]: value });
  };

  const handleSubmitNewAddTodo = (event) => {
    event.preventDefault();
    axios
      .post("/todos", addNewTodo)
      .then((response) => {
        setTodos([...todos, response.data]);
        setIsAddNewTodoShown(false);
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      <h1>{currentDate}</h1>
      <div>
        <h1>Appointments</h1>
        {appointments
          .filter(
            (appointment) =>
              moment(appointment.appointment_date).format(
                "dddd Do MMMM YYYY"
              ) === moment().format("dddd Do MMMM YYYY")
          )
          .map((appointment) => (
            <div>
              <p>{moment(appointment.appointment_date).format("HH:mm")}</p>
              <p>
                {appointment.firstname} {appointment.lastname}
              </p>
            </div>
          ))}
      </div>

      <h1>To do</h1>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.todo_item}</p>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
      ))}
      <div>
        {isAddNewTodoShown ? (
          <form onSubmit={handleSubmitNewAddTodo}>
            <label htmlFor="todo_item">Add to do item</label>
            <input
              value={addNewTodo.todo_item}
              onChange={handleAddNewTodo}
              name="todo_item"
              id="todo_item"
            />
            <button type="submit">ADD</button>
            <button onClick={() => setIsAddNewTodoShown(false)}>CANCEL</button>
          </form>
        ) : null}
      </div>
      <button onClick={() => setIsAddNewTodoShown(true)}>+ Add to do</button>
    </div>
  );
};

export default Homepage;
