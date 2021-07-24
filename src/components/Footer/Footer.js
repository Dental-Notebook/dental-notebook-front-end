import { Link } from "react-router-dom";

const Footer = ({ setIsAddNewAppointmentShown }) => {
  return (
    <div>
      <button onClick={() => setIsAddNewAppointmentShown(true)}>
        Add appointment
      </button>
      <Link to="/appointments">Appointments</Link>
      <Link to="/patients">Patients</Link>
    </div>
  );
};

export default Footer;
