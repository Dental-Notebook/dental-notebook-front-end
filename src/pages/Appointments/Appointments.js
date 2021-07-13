import { useState, useContext } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AppointmentsContext } from "../../contexts/AppointmentsContext";
import AddAppointment from "../../components/AddAppointment/AddAppointment";

const Appointments = () => {
  const [calendarDate, setCalendarDate] = useState(new Date());
  const { appointments } = useContext(AppointmentsContext);

  return (
    <div>
      <Calendar onChange={setCalendarDate} value={calendarDate} />
      {appointments
        .filter(
          (appointment) =>
            moment(appointment.appointment_date).format("dddd Do MMMM YYYY") ===
            moment(calendarDate).format("dddd Do MMMM YYYY")
        )
        .map((appointment) => (
          <button key={appointment.appointments_id}>
            <p>{moment(appointment.appointment_date).format("HH:mm")}</p>
            <p>
              {appointment.firstname} {appointment.lastname}
            </p>
          </button>
        ))}
      <AddAppointment />
    </div>
  );
};

export default Appointments;
