import React, { useContext, useState } from "react";
import moment from "moment";
import { AppointmentsContext } from "../../contexts/AppointmentsContext";
import { TreatmentsContext } from "../../contexts/TreatmentsContext";
import axios from "axios";

const EditAppointment = (props) => {
  /* appointment_id,
  patient_id,
  firstname,
  lastname,
  phone,
  appointment_date,
  setIsEditModeActive,
  handleDeleteTreatmentFromAppointment, */

  const [editedAppointment, setEditedAppointment] = useState({
    patient_id: props.patient_id,
    appointment_id: props.appointment_id,
    firstname: props.firstname,
    lastname: props.lastname,
    phone: props.phone,
    treatments: props.treatments,
    appointment_date: moment(props.appointment_date).format(
      "YYYY-MM-DDTHH:mm:ss"
    ),
  });
  const { appointments, setAppointments } = useContext(AppointmentsContext);
  const { treatments } = useContext(TreatmentsContext);

  /* 
  console.log("appointment_treatments", props.treatments);
  console.log("treatments", treatments);
  console.log("editedAppointment", editedAppointment);
*/

  const handleEditTreatmentToAppointment = (event) => {
    const { name, value } = event.target;

    if (value === "") return;

    const treatmentToAdd = treatments.find(
      (treatment) => treatment.id === Number(value)
    );
    const treatmentExistInAppointment = editedAppointment.treatments.find(
      (item) => item.id === treatmentToAdd.id
    );
    if (!treatmentExistInAppointment) {
      setEditedAppointment({
        ...editedAppointment,
        treatments: [...editedAppointment.treatments, treatmentToAdd],
      });
    }
  };

  const handleSubmitEditTreatment = (event) => {
    event.preventDefault();

    const treatmentsArrayToEdit = editedAppointment.treatments.map(
      (item) => item.id
    );

    const appointmentToPut = {
      treatments: treatmentsArrayToEdit,
      patient_id: props.patient_id,
      appointment_date: editedAppointment.appointment_date,
    };

    axios
      .put(`/appointments/${props.appointments_id}`, appointmentToPut)
      .then((result) => {
        const updatedAppointments = appointments.map((item) =>
          item.appointments_id === props.appointments_id ? result.data : item
        );
        setAppointments(updatedAppointments);
        props.setIsEditModeActive(false);
      })
      .catch((err) => alert(err));
  };

  /* ==============DELETE TREATMENT=============== */
  const handleDeleteTreatmentFromAppointment = (treatmentId) => {
    const filteredAppointmentTreatments = editedAppointment.treatments.filter(
      (treatment) => treatment.treatments_id !== treatmentId
    );

    setEditedAppointment({
      ...editedAppointment,
      treatments: filteredAppointmentTreatments,
    });
  };

  const handleEditAppointmentDate = (event) => {
    const { name, value } = event.target;

    setEditedAppointment({ ...editedAppointment, [name]: value });
  };

  return (
    <div>
      {/* ==============EDIT APPOINTMENT=============== */}

      <div>
        <form onSubmit={handleSubmitEditTreatment}>
          <p>
            {editedAppointment.firstname} {editedAppointment.lastname}
          </p>
          <p>{editedAppointment.phone}</p>

          <label>
            Treatment:
            <select onChange={handleEditTreatmentToAppointment}>
              <option value="">Select treatment</option>
              {treatments.map((treatment) => (
                <option key={treatment.id} value={treatment.id}>
                  {treatment.name}
                </option>
              ))}
            </select>
            <div>
              {editedAppointment.treatments.map((treatment) => (
                <React.Fragment key={treatment.id}>
                  <p>{treatment.name}</p>
                  <button
                    style={{ backgroundColor: "coral" }}
                    onClick={() =>
                      handleDeleteTreatmentFromAppointment(
                        treatment.treatments_id
                      )
                    }
                  >
                    x
                  </button>
                </React.Fragment>
              ))}
            </div>
          </label>
          <input
            onChange={handleEditAppointmentDate}
            value={editedAppointment.appointment_date}
            name="appointment_date"
            type="datetime-local"
            required
          />

          <button type="submit">SAVE</button>
          <button onClick={() => props.setIsEditModeActive(false)}>
            CANCEL
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAppointment;
