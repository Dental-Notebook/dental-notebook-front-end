const EditAppointment = () => {
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const [editedAppointment, setEditedAppointment] = useState({
    id,
    firstname,
    lastname,
    phone,
    treatment,
    appointment_date,
  });

  return (
    <div>
      {/* ==============EDIT APPOINTMENT=============== */}
      {isEditModeActive ? (
        <div>
          <form onSubmit={handleSubmitEditTreatment}>
            <input
              value={editedAppointment.firstname}
              onChange={handleChangeEdit}
              name="firstname"
              type="text"
            />
            <input
              value={editedAppointment.lastname}
              onChange={handleChangeEdit}
              name="lastname"
              type="text"
            />
            <input
              value={editedAppointment.phone}
              onChange={handleChangeEdit}
              name="phone"
              type="text"
            />
            <button type="submit">SAVE</button>
            <button onClick={() => setIsEditModeActive(false)}>CANCEL</button>
          </form>
        </div>
      ) : (
        <button onClick={() => setIsEditModeActive(true)}>
          Edit treatment
        </button>
      )}
    </div>
  );
};

export default EditAppointment;
