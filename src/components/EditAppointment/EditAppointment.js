import React, { useContext, useState } from "react";
import { AppointmentsContext } from "../../contexts/AppointmentsContext";
import { TreatmentsContext } from "../../contexts/TreatmentsContext";

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
    firstname: props.firstname,
    lastname: props.lastname,
    phone: props.phone,
    treatments: props.treatments,
    appointment_date: props.appointment_date,
  });
  const { appointments, setAppointments } = useContext(AppointmentsContext);
  const { treatments } = useContext(TreatmentsContext);

  console.log("appointment_treatments", props.treatments);
  console.log("treatments", treatments);
  console.log("editedAppointment", editedAppointment);

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

  const handleSubmitEditTreatment = () => {};

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
