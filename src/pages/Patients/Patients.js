import { useContext } from "react";
import { Link } from "react-router-dom";
import { PatientsContext } from "../../contexts/PatientsContext";
import "./Patients.css";
import CaretRightBlue from "../../assets/CaretRightBlue.svg";

const Patients = (props) => {
  const { patients } = useContext(PatientsContext);

  return (
    <div className="patients-wrapper">
      <h1 className="patients-title">Patients</h1>
      {patients.map((patient) => (
        <div key={patient.patient_id} className="patients-button-wrapper">
          <button
            onClick={() =>
              props.history.push(`/patients/${patient.patient_id}`)
            }
            className="patients-button"
          >
            <div className="patients-info">
              <p className="patients-info-name">
                {patient.firstname} {patient.lastname}
              </p>
              <p className="patients-info-number">
                {patient.phone}{" "}
                <span>
                  <img
                    src={CaretRightBlue}
                    alt="blue arrow"
                    className="patients-info-arrow"
                  />
                </span>
              </p>
            </div>
          </button>
        </div>
      ))}
      <Link to="/add-new-patient" className="patients-add-new-patient">
        +++
      </Link>
    </div>
  );
};

export default Patients;
