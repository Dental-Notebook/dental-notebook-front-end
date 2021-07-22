import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { PatientsContext } from "../../contexts/PatientsContext";
import teethmap from "../../assets/teethmap.png";
import { TreatmentsContext } from "../../contexts/TreatmentsContext";

const EditViewPatient = (props) => {
  const { patients, setPatients } = useContext(PatientsContext);
  const { treatments } = useContext(TreatmentsContext);

  const [viewEditPatient, setViewEditPatient] = useState({
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

  const [viewEditPatientTreatments, setViewEditPatientTreatments] = useState(
    []
  );
  const [viewEditPatientTreatmentsForm, setViewEditPatientTreatmentsForm] =
    useState({
      teeth_map_id: "",
      treatments_id: "",
      tooth: "",
      dental_status: "",
    });

  const teethTreatmentsArrDropdown = [
    11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33,
    34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48,
  ];

  useEffect(() => {
    let patientViewEditId = Number(props.match.params.id);
    const foundPatient = patients.find(
      (patient) => patient.patient_id === patientViewEditId
    );
    if (foundPatient) {
      const { teeth_treatments, ...patientInfo } = foundPatient;
      setViewEditPatient(patientInfo);
      setViewEditPatientTreatments(teeth_treatments);
    }
  }, [patients]);

  const handleSubmitViewEditPatient = (event) => {
    event.preventDefault();
  };
  const handleChangeViewEditPatient = (event) => {
    const { name, value } = event.target;
    setViewEditPatient({ ...viewEditPatient, [name]: value });
  };

  const handleCheckBox = (event) => {
    const { name, checked } = event.target;
    setViewEditPatient({ ...viewEditPatient, [name]: checked });
  };

  {
    /*------------- Teeth Map --------------*/
  }

  const handleChangeViewEditPatientTeethMap = (event) => {
    const { name, value } = event.target;
    setViewEditPatientTreatmentsForm({
      ...viewEditPatientTreatmentsForm,
      [name]: value,
    });
  };

  const handleSubmitViewEditPatientTeethMap = (event) => {
    event.preventDefault();
    viewEditPatientTreatments.push(viewEditPatientTreatmentsForm);
    setViewEditPatientTreatmentsForm({
      teeth_map_id: "",
      treatments_id: "",
      tooth: "",
      dental_status: "",
    });
  };

  const deleteTeethTreatmentHandler = (teethTreatmentId) => {
    axios
      .delete(`/patients/teeth-treatments/${teethTreatmentId}`)
      .then((response) => {
        const filteredTeethTreatments = viewEditPatientTreatments.filter(
          (treatment) =>
            treatment.teeth_treatment_id !== Number(teethTreatmentId)
        );
        setViewEditPatientTreatments(filteredTeethTreatments);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmitViewEditPatient}>
        <h3>Personal information</h3>
        <input
          name="firstname"
          value={viewEditPatient.firstname}
          placeholder="First name"
          onChange={handleChangeViewEditPatient}
          required
        />
        <input
          name="lastname"
          value={viewEditPatient.lastname}
          placeholder="Last name"
          onChange={handleChangeViewEditPatient}
          required
        />
        <input
          name="phone"
          value={viewEditPatient.phone}
          placeholder="Phone number"
          onChange={handleChangeViewEditPatient}
          required
        />
        <input
          name="email"
          value={viewEditPatient.email}
          placeholder="E-mail"
          onChange={handleChangeViewEditPatient}
          required
        />
        <input
          name="occupation"
          value={viewEditPatient.occupation}
          placeholder="Occupation"
          onChange={handleChangeViewEditPatient}
          required
        />
        <label htmlFor="birth_date">Date of Birth</label>
        <input
          name="birth_date"
          value={moment(viewEditPatient.birth_date).format("YYYY-MM-DD")}
          type="date"
          onChange={handleChangeViewEditPatient}
          required
          id="birth_date"
        />
        <select
          name="gender"
          value={viewEditPatient.gender}
          onChange={handleChangeViewEditPatient}
          required
        >
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
          checked={viewEditPatient.has_hbd}
          id="hbp"
        />
        <label htmlFor="diabetes">Diabetes</label>
        <input
          name="has_diabetes"
          type="checkbox"
          onChange={handleCheckBox}
          checked={viewEditPatient.has_diabetes}
          id="diabetes"
        />
        <label htmlFor="active_medication">Active Medication</label>
        <input
          name="has_active_medication"
          type="checkbox"
          onChange={handleCheckBox}
          checked={viewEditPatient.has_active_medication}
          id="active_medication"
        />
        <label htmlFor="allergies">Allergies</label>
        <input
          name="has_alergies"
          type="checkbox"
          onChange={handleCheckBox}
          checked={viewEditPatient.has_alergies}
          id="allergies"
        />
        <input
          name="alergies"
          value={viewEditPatient.alergies}
          placeholder="Allergies"
          onChange={handleChangeViewEditPatient}
        />
        <input
          name="active_medication"
          value={viewEditPatient.active_medication}
          placeholder="Active Medication"
          onChange={handleChangeViewEditPatient}
        />
        <button type="submit">Save Changes</button>
      </form>
      {/*------------- Teeth Map --------------*/}
      <div>
        <h3>Teeth Map</h3>
        <img src={teethmap} alt="teeth map" />
        {viewEditPatientTreatments.map((treatment) => (
          <div>
            <p>{treatment.tooth}</p>
            <p>{treatment.dental_status}</p>
            {treatments.map((item) =>
              Number(treatment.treatments_id) === item.id ? (
                <p>{item.name}</p>
              ) : null
            )}
            <button
              onClick={() =>
                deleteTeethTreatmentHandler(treatment.teeth_treatment_id)
              }
            >
              X
            </button>
          </div>
        ))}

        <form onSubmit={handleSubmitViewEditPatientTeethMap}>
          <select
            name="tooth"
            value={viewEditPatientTreatmentsForm.tooth}
            onChange={handleChangeViewEditPatientTeethMap}
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
            value={viewEditPatientTreatmentsForm.dental_status}
            placeholder="Dental status"
            onChange={handleChangeViewEditPatientTeethMap}
          />
          <select
            value={viewEditPatientTreatmentsForm.treatments_id}
            name="treatments_id"
            onChange={handleChangeViewEditPatientTeethMap}
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
  );
};

export default EditViewPatient;
