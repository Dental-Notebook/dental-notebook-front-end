import { useState, useContext } from "react";
import axios from "axios";
import moment from "moment";
import { TreatmentsContext } from "../../contexts/TreatmentsContext";
import { AppointmentsContext } from "../../contexts/AppointmentsContext";

const AddAppointment = () => {
  const [isAddNewAppointmentShown, setIsAddNewAppointmentShown] =
    useState(false);
  const [newAppointment, setNewAppointment] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    treatment: [],
    appointment_date: "",
  });

  const { treatments } = useContext(TreatmentsContext);
  const { appointments, setAppointments } = useContext(AppointmentsContext);

  const handleAddNewAppointment = (event) => {
    const { name, value } = event.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  const handleSubmitAddAppointment = (event) => {
    event.preventDefault();
    axios
      .post(`/appointments`, newAppointment)
      .then((response) => {
        setAppointments([...appointments, response.data]);
        setIsAddNewAppointmentShown(false);
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      {/* ==============ADD APPOINTMENT=============== */}
      {isAddNewAppointmentShown ? (
        <div>
          <h1>Add New Appointment</h1>
          <form onSubmit={handleSubmitAddAppointment}>
            <input
              value={newAppointment.firstname}
              onChange={handleAddNewAppointment}
              name="firstname"
              type="text"
              placeholder="First name"
            />
            <input
              value={newAppointment.lastname}
              onChange={handleAddNewAppointment}
              name="lastname"
              type="text"
              placeholder="Last name"
            />
            <input
              value={newAppointment.phone}
              onChange={handleAddNewAppointment}
              name="phone"
              type="text"
              placeholder="Phone number"
            />
            <label>
              Treatment:
              <select onChange={handleAddNewAppointment}>
                {treatments.map((treatment) => (
                  <option value={treatment.id}>{treatment.name}</option>
                ))}
              </select>
            </label>
            <input
              value={newAppointment.appointment_date}
              onChange={handleAddNewAppointment}
              name="appointment_date"
              type="datetime-local"
            />
            <button type="submit">SAVE</button>
            <button onClick={() => setIsAddNewAppointmentShown(false)}>
              CANCEL
            </button>
          </form>
        </div>
      ) : (
        <button onClick={() => setIsAddNewAppointmentShown(true)}>
          ADD APPOINTMENT
        </button>
      )}
    </div>
  );
};

export default AddAppointment;
