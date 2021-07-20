import { useContext } from "react";
import { Link } from "react-router-dom";
import { PatientsContext } from "../../contexts/PatientsContext";

const Patients = () => {
  const { patients } = useContext(PatientsContext);

  return (
    <div>
      <h1>Patients</h1>
      {patients.map((patient) => (
        <div>
          <button>
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
