import { Link } from "react-router-dom";
import "./Footer.css";
import AddAppointmentBlue from "../../assets/AddAppointmentBlue.svg";
import AppointmentsBlue from "../../assets/AppointmentsBlue.svg";
import PatientsBlue from "../../assets/PatientsBlue.svg";

const Footer = ({ setIsAddNewAppointmentShown }) => {
  return (
    <div className="footer-container">
      <button onClick={() => setIsAddNewAppointmentShown(true)}>
        <img src={AddAppointmentBlue} alt="Add appointment" />
      </button>
      <Link to="/appointments">
        <img src={AppointmentsBlue} alt="Appointments" />
      </Link>
      <Link to="/patients">
        <img src={PatientsBlue} alt="Patients" />
      </Link>
    </div>
  );
};

export default Footer;
