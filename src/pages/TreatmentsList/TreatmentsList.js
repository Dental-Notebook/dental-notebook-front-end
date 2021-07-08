import React, { useState, useEffect } from "react";
import axios from "axios";

const TreatmentsList = () => {
  const [treatments, setTreatments] = useState([]);
  const [isAddNewTreatmentShown, setIsAddNewTreatmentShown] = useState(false);
  const [newTreatment, setNewTreatment] = useState({
    name: "",
    price: "",
  });
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const [editTreatment, setEditedTreatment] = useState({
    name: treatments.name,
    price: treatments.price,
  });
  const fetchTreatments = () => {
    axios
      .get("/treatments")
      .then((response) => setTreatments(response.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchTreatments();
  }, []);

  const handleDelete = (treatmentId) => {
    axios
      .delete(`/treatments/${treatmentId}`)
      .then((response) => {
        console.log(response.data);
        const filteredTreatments = treatments.filter(
          (treatment) => treatment.id !== treatmentId
        );
        setTreatments(filteredTreatments);
      })
      .catch((error) => alert(error));
  };

  const handleEdit = () => {
    setIsEditModeActive(true);
  };

  // const handleSubmitEditTreatment = (event, treatmentId) => {
  //   event.preventDefault();
  //   axios
  //     .put(`/treatments/${treatmentId}`, editTreatment)
  //     .then((response) => setTreatments(response.data))
  //     .catch((error) => console.log(error));
  // };

  const handleAddNewTreatment = (event) => {
    const { name, value } = event.target;
    setNewTreatment({ ...newTreatment, [name]: value });
  };

  const handleSubmitNewTreatment = (event) => {
    event.preventDefault();
    axios
      .post(`/treatments`, newTreatment)
      .then((response) => {
        setTreatments([...treatments, response.data]);
        setIsAddNewTreatmentShown(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Price List</h1>
      {treatments.map((treatment) => {
        return (
          <div key={treatment.id}>
            <p>{treatment.name}</p>
            <p>{treatment.price}$</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => handleDelete(treatment.id)}>Delete</button>
          </div>
        );
      })}
      {isAddNewTreatmentShown ? (
        <div>
          <form onSubmit={handleSubmitNewTreatment}>
            <input
              value={newTreatment.name}
              onChange={handleAddNewTreatment}
              name="name"
              placeholder="Treatment"
              type="text"
            />
            <input
              value={newTreatment.price}
              onChange={handleAddNewTreatment}
              name="price"
              placeholder="Price"
              type="number"
            />
            <button type="submit">ADD</button>
            <button onClick={() => setIsAddNewTreatmentShown(false)}>
              CANCEL
            </button>
          </form>
        </div>
      ) : (
        <button onClick={() => setIsAddNewTreatmentShown(true)}>
          Add new treatment
        </button>
      )}
    </div>
  );
};

export default TreatmentsList;
