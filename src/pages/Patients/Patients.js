import { useContext } from "react";
import { Link } from "react-router-dom";
import { PatientsContext } from "../../contexts/PatientsContext";

const Patients = (props) => {
  const { patients } = useContext(PatientsContext);

  return (
    <div>
      <h1>Patients</h1>
      {patients.map((patient) => (
        <div key={patient.patient_id}>
          <button
            onClick={() =>
              props.history.push(`/patients/${patient.patient_id}`)
            }
          >
            <p>
              <span>
                {patient.firstname} {patient.lastname}
              </span>{" "}
              {patient.phone}
            </p>
          </button>
        </div>
      ))}
      <Link to="/add-new-patient">+++</Link>
    </div>
  );
};

export default Patients;
