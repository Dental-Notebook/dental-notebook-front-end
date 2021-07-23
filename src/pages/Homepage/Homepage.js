import React, { useState, useEffect, useContext } from "react";
import "../Homepage/Homepage.css";
import axios from "axios";
import moment from "moment";
import { AppointmentsContext } from "../../contexts/AppointmentsContext";
import EditAppointment from "../../components/EditAppointment/EditAppointment";
import Footer from "../../components/Footer/Footer";
import AddAppointment from "../../components/AddAppointment/AddAppointment";
import calendar_icon from "../../assets/calendar-light.svg";

const Homepage = () => {
  const [todos, setTodos] = useState([]);
  const [isAddNewTodoShown, setIsAddNewTodoShown] = useState(false);
  const [addNewTodo, setAddNewTodo] = useState({
    todo_item: "",
  });
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const [appointmentId, setAppointmentId] = useState(0);
  const [isAddNewAppointmentShown, setIsAddNewAppointmentShown] =
    useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const { appointments } = useContext(AppointmentsContext);

  /* ==============APPOINTMENTS=============== */
  const currentDate = moment().format("dddd Do MMMM YYYY");

  /* ==============TODOS=============== */
  const fetchTodos = () => {
    axios
      .get("/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => alert(error));
  };

  /* ==============HANDLE APPOINTMENT ID ON CLICK=============== */
  const handleAppointmentIdOnClick = (id) => {
    setAppointmentId(id);
    setIsEditModeActive(true);
  };

  /* ==============DELETE TODOS=============== */
  const handleDelete = (todoId) => {
    const deleteConfirmation = window.confirm(
      "Are you sure you want to delete this to do item?"
    );

    if (deleteConfirmation) {
      axios
        .delete(`/todos/${todoId}`)
        .then((response) => {
          const filteredTodos = todos.filter((todo) => todo.id !== todoId);
          setTodos(filteredTodos);
        })
        .catch((error) => alert(error));
    }
  };

  /* ==============ADD TODO=============== */
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

  const handleClickAddTodoButton = () => {
    setIsAddNewTodoShown(true);
    setAddNewTodo({
      todo_item: "",
    });
  };

  return (
    <div>
      <div className="title-container">
        <img
          src={calendar_icon}
          alt="calendar_icon"
          className="calendar-icon"
        />
        <h1 className="current-date-text">{currentDate}</h1>
      </div>
      <div className="appointments-container">
        <h1 className="appointments-title">Appointments</h1>
        {isAddNewAppointmentShown ? (
          <AddAppointment
            setIsAddNewAppointmentShown={setIsAddNewAppointmentShown}
          />
        ) : null}
        {appointments
          .sort((a, b) => (a.appointment_date > b.appointment_date ? 1 : -1))
          .filter(
            (appointment) =>
              moment(appointment.appointment_date).format(
                "dddd Do MMMM YYYY"
              ) === moment.utc(moment()).format("dddd Do MMMM YYYY")
          )
          .map((appointment) => (
            <div
              key={appointment.appointments_id}
              className="each-appointments-container"
            >
              <button
                className="appointment-button"
                onClick={() =>
                  handleAppointmentIdOnClick(appointment.appointments_id)
                }
              >
                <p>{moment(appointment.appointment_date).format("HH:mm")}</p>
                <p>
                  {appointment.firstname} {appointment.lastname}
                </p>
              </button>
              {isEditModeActive &&
              appointment.appointments_id === appointmentId ? (
                <EditAppointment
                  {...appointment}
                  setIsEditModeActive={setIsEditModeActive}
                />
              ) : null}
            </div>
          ))}
      </div>
      <div className="todos-container">
        <h1>To do</h1>
        {todos.map((todo) => (
          <div key={todo.id}>
            <p>{todo.todo_item}</p>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        ))}
      </div>

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
        ) : (
          <button onClick={handleClickAddTodoButton}>+ Add to do</button>
        )}
      </div>

      <Footer setIsAddNewAppointmentShown={setIsAddNewAppointmentShown} />
    </div>
  );
};

export default Homepage;
