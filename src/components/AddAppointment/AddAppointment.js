import React, { useState, useContext } from "react";
import axios from "axios";
import moment from "moment";
import { TreatmentsContext } from "../../contexts/TreatmentsContext";
import { AppointmentsContext } from "../../contexts/AppointmentsContext";
import { PatientsContext } from "../../contexts/PatientsContext";

const AddAppointment = () => {
  const [isAddNewAppointmentShown, setIsAddNewAppointmentShown] =
    useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patient_id: 0,
    appointment_treatments: [],
    appointment_date: "",
  });

  const { treatments } = useContext(TreatmentsContext);
  const { appointments, setAppointments } = useContext(AppointmentsContext);
  const { patients } = useContext(PatientsContext);

  const handleAddNewAppointment = (event) => {
    const { name, value } = event.target;
    console.log("name", name);
    console.log("value", value);
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  const handleSubmitAddAppointment = (event) => {
    event.preventDefault();

    newAppointment.appointment_date = moment
      .utc(newAppointment.appointment_date)
      .format("YYYY-MM-DD HH:mm:ss");

    axios
      .post(`/appointments`, newAppointment)
      .then((response) => {
        setAppointments([...appointments, response.data]);
        setIsAddNewAppointmentShown(false);
      })
      .catch((error) => alert(error));

    setNewAppointment({
      patient_id: 0,
      appointment_treatments: [],
      appointment_date: "",
    });
  };

  const handleAddTreatmentToAppointment = (event) => {
    const treatmentNotInAppointments =
      !newAppointment.appointment_treatments.includes(event.target.value);

    if (event.target.value !== "" && treatmentNotInAppointments) {
      setNewAppointment({
        ...newAppointment,
        appointment_treatments: [
          ...newAppointment.appointment_treatments,
          event.target.value,
        ],
      });
    }
  };

  const handleCancel = () => {
    setIsAddNewAppointmentShown(false);

    setNewAppointment({
      patient_id: 0,
      appointment_treatments: [],
      appointment_date: "",
    });
  };
  /* ==============DELETE TREATMENT=============== */
  const handleDeleteTreatmentFromAppointment = (treatmentId) => {
    const filteredAppointmentTreatments =
      newAppointment.appointment_treatments.filter(
        (treatment) => treatment !== treatmentId.toString()
      );
    setNewAppointment({
      ...newAppointment,
      appointment_treatments: filteredAppointmentTreatments,
    });
  };

  return (
    <div>
      {/* ==============ADD APPOINTMENT=============== */}
      {isAddNewAppointmentShown ? (
        <div>
          <h1>Add New Appointment</h1>
          <form onSubmit={handleSubmitAddAppointment}>
            <select
              name="patient_id"
              onChange={handleAddNewAppointment}
              required
            >
              <option value="">Select patient</option>
              {patients.map((patient) => (
                <option key={patient.patient_id} value={patient.patient_id}>
                  {patient.firstname} {patient.lastname} | {patient.phone}
                </option>
              ))}
            </select>

            <label>
              Treatment:
              <select onChange={handleAddTreatmentToAppointment} required>
                <option value="">Select treatment</option>
                {treatments.map((treatment) => (
                  <option key={treatment.id} value={treatment.id}>
                    {treatment.name}
                  </option>
                ))}
              </select>
              <div>
                {treatments.map(
                  (treatment) =>
                    newAppointment.appointment_treatments.includes(
                      treatment.id.toString()
                    ) && (
                      <React.Fragment key={treatment.id}>
                        <p>{treatment.name}</p>
                        <button
                          style={{ backgroundColor: "coral" }}
                          onClick={() =>
                            handleDeleteTreatmentFromAppointment(treatment.id)
                          }
                        >
                          x
                        </button>
                      </React.Fragment>
                    )
                )}
              </div>
            </label>
            <input
              value={newAppointment.appointment_date}
              onChange={handleAddNewAppointment}
              name="appointment_date"
              type="datetime-local"
              required
            />
            <button type="submit">SAVE</button>
            <button onClick={handleCancel}>CANCEL</button>
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
