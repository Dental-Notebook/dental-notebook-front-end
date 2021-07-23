import { Link } from "react-router-dom";

const Footer = ({ setIsAddNewAppointmentShown }) => {
  return (
    <div>
      <button onClick={() => setIsAddNewAppointmentShown(true)}>
        Add appointment
      </button>
      <button>
        <Link to="/appointments">Appointments</Link>
      </button>
      <button>
        <Link to="/patients">Patients</Link>
      </button>
    </div>
  );
};

export default Footer;
