import React, { useContext, useState } from "react";
import axios from "axios";
import moment from "moment";
import { PatientsContext } from "../../contexts/PatientsContext";
import teethmap from "../../assets/teethmap.png";
import { TreatmentsContext } from "../../contexts/TreatmentsContext";

const AddNewPatient = (props) => {
  const { patients, setPatients } = useContext(PatientsContext);
  const { treatments } = useContext(TreatmentsContext);

  const [newPatient, setNewPatient] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    occupation: "",
    birth_date: "",
    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    gender: "",
    has_hbd: false,
    has_diabetes: false,
    has_active_medication: false,
    has_alergies: false,
    active_medication: "",
    alergies: "",
  });

  const [newPatientTreatments, setNewPatientTreatments] = useState([]);
  const [newPatientTreatmentsForm, setNewPatientTreatmentsForm] = useState({
    teeth_map_id: "",
    treatments_id: "",
    tooth: "",
    dental_status: "",
  });

  const teethTreatmentsArrDropdown = [
    11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33,
    34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48,
  ];
  {
    /*------------- New patient --------------*/
  }
  const handleSubmitNewPatient = (event) => {
    event.preventDefault();
    axios
      .post("/patients", newPatient)
      .then((response) => {
        const newPatient = response.data[0];
        const newPatientTeethTreatmentsPromises = [];

        newPatientTreatments.map((treatment) => {
          const newTreatment = {
            ...treatment,
            teeth_map_id: response.data[0].teeth_map_id,
          };

          const teethTreatmentPost = axios.post(
            "/patients/teeth-treatments",
            newTreatment
          );

          newPatientTeethTreatmentsPromises.push(teethTreatmentPost);
        });

        Promise.all(newPatientTeethTreatmentsPromises).then((items) => {
          const newPatientTeethTreatments = items.map((item) => item.data);
          newPatient.teeth_treatments = newPatientTeethTreatments;
          setPatients([...patients, newPatient]);
          props.history.push("/patients");
        });
      })
      .catch((error) => alert(error));
    //console.log(newPatient);
  };

  const handleChangeNewPatient = (event) => {
    const { name, value } = event.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleCheckBox = (event) => {
    const { name, checked } = event.target;
    setNewPatient({ ...newPatient, [name]: checked });
  };
  {
    /*------------- Teeth Map --------------*/
  }
  const handleSubmitNewPatientTeethMap = (event) => {
    event.preventDefault();
    newPatientTreatments.push(newPatientTreatmentsForm);
    setNewPatientTreatmentsForm({
      teeth_map_id: "",
      treatments_id: "",
      tooth: "",
      dental_status: "",
    });
  };

  const handleChangeNewPatientTeethMap = (event) => {
    const { name, value } = event.target;
    setNewPatientTreatmentsForm({ ...newPatientTreatmentsForm, [name]: value });
  };

  return (
    <div>
      <div>
        {/*------------- New patient --------------*/}
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
          <label htmlFor="birth_date">Date of Birth</label>
          <input
            name="birth_date"
            value={newPatient.birth_date}
            placeholder="Birth Date"
            type="date"
            onChange={handleChangeNewPatient}
            required
            id="birth_date"
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
        {/*------------- Teeth Map --------------*/}
        <div>
          <h3>Teeth Map</h3>
          <img src={teethmap} alt="teeth map" />
          {newPatientTreatments.map((treatment) => (
            <div>
              <p>{treatment.tooth}</p>
              <p>{treatment.dental_status}</p>
              {treatments.map((item) =>
                Number(treatment.treatments_id) === item.id ? (
                  <p>{item.name}</p>
                ) : null
              )}
            </div>
          ))}

          <form onSubmit={handleSubmitNewPatientTeethMap}>
            <select
              name="tooth"
              value={newPatientTreatmentsForm.tooth}
              onChange={handleChangeNewPatientTeethMap}
            >
              <option value="">Tooth</option>
              {teethTreatmentsArrDropdown.map((teeth) => (
                <option key={teeth.id} value={teeth}>
                  {teeth}
                </option>
              ))}
            </select>
            <input
              name="dental_status"
              value={newPatientTreatmentsForm.dental_status}
              placeholder="Dental status"
              onChange={handleChangeNewPatientTeethMap}
            />
            <select
              value={newPatientTreatmentsForm.treatments_id}
              name="treatments_id"
              onChange={handleChangeNewPatientTeethMap}
            >
              <option value="">Treatment</option>
              {treatments.map((treatment) => (
                <option key={treatment.id} value={treatment.id}>
                  {treatment.name}
                </option>
              ))}
            </select>
            <button type="submit">+ New Line</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewPatient;
