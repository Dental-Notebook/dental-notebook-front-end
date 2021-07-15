import { useState, useContext } from "react";
import axios from "axios";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AppointmentsContext } from "../../contexts/AppointmentsContext";
import AddAppointment from "../../components/AddAppointment/AddAppointment";
import EditAppointment from "../../components/EditAppointment/EditAppointment";

const Appointments = () => {
  const [calendarDate, setCalendarDate] = useState(new Date());
  const { appointments, setAppointments } = useContext(AppointmentsContext);
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const [appointmentId, setAppointmentId] = useState(0);
  const [isAddNewAppointmentShown, setIsAddNewAppointmentShown] =
    useState(false);

  /* ==============DELETE APPOINTMENTS=============== */
  const handleDeleteAppointment = (appointmentId) => {
    axios
      .delete(`/appointments/${appointmentId}`)
      .then((response) => {
        const filteredAppointments = appointments.filter(
          (appointment) => appointment.appointments_id !== appointmentId
        );
        setAppointments(filteredAppointments);
      })
      .catch((error) => alert(error));
  };

  const handleAppointmentIdOnClick = (id) => {
    setAppointmentId(id);
    setIsEditModeActive(true);
  };

  return (
    <div>
      <h1>Appointments</h1>
      <Calendar onChange={setCalendarDate} value={calendarDate} />
      {appointments
        .sort((a, b) => (a.appointment_date > b.appointment_date ? 1 : -1))
        .filter(
          (appointment) =>
            moment(appointment.appointment_date).format("dddd Do MMMM YYYY") ===
            moment(calendarDate).format("dddd Do MMMM YYYY")
        )
        .map((appointment) => (
          <div key={appointment.appointments_id}>
            <button
              onClick={() =>
                handleAppointmentIdOnClick(appointment.appointments_id)
              }
            >
              <p>{moment(appointment.appointment_date).format("HH:mm")}</p>
              <p>
                {appointment.firstname} {appointment.lastname}
              </p>
            </button>
            <button
              onClick={() =>
                handleDeleteAppointment(appointment.appointments_id)
              }
            >
              X
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
      {isAddNewAppointmentShown ? (
        <AddAppointment
          setIsAddNewAppointmentShown={setIsAddNewAppointmentShown}
        />
      ) : (
        <button onClick={() => setIsAddNewAppointmentShown(true)}>
          ADD APPOINTMENT
        </button>
      )}
    </div>
  );
};

export default Appointments;
