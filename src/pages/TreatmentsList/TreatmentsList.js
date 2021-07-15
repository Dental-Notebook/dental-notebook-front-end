import React, { useContext } from "react";
import EditTreatment from "../../components/EditTreatment/EditTreatment";
import { TreatmentsContext } from "../../contexts/TreatmentsContext";

const TreatmentsList = () => {
  const {
    handleDelete,
    handleAddNewTreatment,
    handleSubmitNewTreatment,
    treatments,
    setTreatments,
    newTreatment,
    isAddNewTreatmentShown,
    setIsAddNewTreatmentShown,
  } = useContext(TreatmentsContext);

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
