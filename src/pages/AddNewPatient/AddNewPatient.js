import React, { useContext, useState } from "react";
import axios from "axios";
import moment from "moment";
import { PatientsContext } from "../../contexts/PatientsContext";

const AddNewPatient = () => {
  const { patients, setPatients } = useContext(PatientsContext);

  const [newPatient, setNewPatient] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    occupation: "",
    age: "",
    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    gender: "",
    has_hbd: false,
    has_diabetes: false,
    has_active_medication: false,
    has_alergies: false,
    active_medication: "",
    alergies: "",
  });

  const handleSubmitNewPatient = (event) => {
    event.preventDefault();
    /* axios
      .post("/patients", newPatient)
      .then((response) => {
        setPatients([...patients, response.data]);
      })
      .catch((error) => alert(error)); */
    console.log(newPatient);
  };

  const handleChangeNewPatient = (event) => {
    const { name, value } = event.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleCheckBox = (event) => {
    const { name, checked } = event.target;
    setNewPatient({ ...newPatient, [name]: checked });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmitNewPatient}>
          <h3>Personal information</h3>
          <input
            name="firstname"
            value={newPatient.firstname}
            placeholder="First name"
            onChange={handleChangeNewPatient}
            required
          />
          <input
            name="lastname"
            value={newPatient.lastname}
            placeholder="Last name"
            onChange={handleChangeNewPatient}
            required
          />
          <input
            name="phone"
            value={newPatient.phone}
            placeholder="Phone number"
            onChange={handleChangeNewPatient}
            required
          />
          <input
            name="email"
            value={newPatient.email}
            placeholder="E-mail"
            onChange={handleChangeNewPatient}
            required
          />
          <input
            name="occupation"
            value={newPatient.occupation}
            placeholder="Occupation"
            onChange={handleChangeNewPatient}
            required
          />
          <input
            name="age"
            value={newPatient.age}
            placeholder="Age"
            type="number"
            onChange={handleChangeNewPatient}
            required
            min="0"
          />
          <select name="gender" onChange={handleChangeNewPatient} required>
            <option value="">Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
          <h3>Medical background</h3>
          <label htmlFor="hbp">High Blood Pressure</label>
          <input
            name="has_hbd"
            type="checkbox"
            onChange={handleCheckBox}
            checked={newPatient.has_hbd}
            id="hbp"
          />
          <label htmlFor="diabetes">Diabetes</label>
          <input
            name="has_diabetes"
            type="checkbox"
            onChange={handleCheckBox}
            checked={newPatient.has_diabetes}
            id="diabetes"
          />
          <label htmlFor="active_medication">Active Medication</label>
          <input
            name="has_active_medication"
            type="checkbox"
            onChange={handleCheckBox}
            checked={newPatient.has_active_medication}
            id="active_medication"
          />
          <label htmlFor="allergies">Allergies</label>
          <input
            name="has_alergies"
            type="checkbox"
            onChange={handleCheckBox}
            checked={newPatient.has_alergies}
            id="allergies"
          />
          <input
            name="alergies"
            value={newPatient.alergies}
            placeholder="Allergies"
            onChange={handleChangeNewPatient}
          />
          <input
            name="active_medication"
            value={newPatient.active_medication}
            placeholder="Active Medication"
            onChange={handleChangeNewPatient}
          />

          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewPatient;
