import React, { useState, useEffect } from "react";
import axios from "axios";
import EditTreatment from "../../components/EditTreatment/EditTreatment";

const TreatmentsList = () => {
  const [treatments, setTreatments] = useState([]);
  const [isAddNewTreatmentShown, setIsAddNewTreatmentShown] = useState(false);
  const [newTreatment, setNewTreatment] = useState({
    name: "",
    price: "",
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

  /* ==============DELETE TREATMENT=============== */
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

  /* ==============ADD TREATMENT=============== */
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
      .catch((error) => alert(error));
  };

  return (
    <div>
      <h1>Price List</h1>
      {/* ==============MAP TREATMENTS=============== */}
      {treatments.map((treatment) => {
        return (
          <div key={treatment.id}>
            <p>{treatment.name}</p>
            <p>{treatment.price}$</p>
            <EditTreatment
              {...treatment}
              setTreatments={setTreatments}
              treatments={treatments}
            />
            <button onClick={() => handleDelete(treatment.id)}>Delete</button>
          </div>
        );
      })}
      {/* ==============ADD NEW TREATMENT=============== */}
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
      {/* ==============ADD NEW TREATMENT END=============== */}
    </div>
  );
};

export default TreatmentsList;
