import React, { useState } from "react";
import axios from "axios";

const EditTreatment = (props) => {
  const { name, price, setTreatments, treatments, id } = props;
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const [editTreatment, setEditedTreatment] = useState({
    id: id,
    name: name,
    price: price,
  });

  /* ==============EDIT TREATMENT=============== */
  const handleSubmitEditTreatment = (event) => {
    event.preventDefault();

    axios
      .put(`/treatments/${id}`, editTreatment)
      .then((response) => {
        const listOfEditedTreatments = treatments.map((treatment) => {
          return treatment.id === editTreatment.id ? editTreatment : treatment;
        });
        setTreatments(listOfEditedTreatments);
        setIsEditModeActive(false);
      })
      .catch((error) => console.log(error));
  };

  /* ==============EDIT TREATMENT=============== */

  const handleChangeEdit = (event) => {
    const { name, value } = event.target;
    setEditedTreatment({ ...editTreatment, [name]: value });
  };

  return (
    <div>
      {/* ==============EDIT TREATMENT=============== */}
      {isEditModeActive ? (
        <div>
          <form onSubmit={handleSubmitEditTreatment}>
            <input
              value={editTreatment.name}
              onChange={handleChangeEdit}
              name="name"
              type="text"
            />
            <input
              value={editTreatment.price}
              onChange={handleChangeEdit}
              name="price"
              type="number"
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

export default EditTreatment;
