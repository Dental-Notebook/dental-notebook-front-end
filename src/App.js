import "./App.css";
import { Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import AddNewPatient from "./pages/AddNewPatient/AddNewPatient";
import Patients from "./pages/Patients/Patients";
import Appointments from "./pages/Appointments/Appointments";
import Earnings from "./pages/Earnings/Earnings";
import TreatmentsList from "./pages/TreatmentsList/TreatmentsList";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/add-new-patient" component={AddNewPatient} />
        <Route path="/patients" component={Patients} />
        <Route path="/appointments" component={Appointments} />
        <Route path="/earnings" component={Earnings} />
        <Route path="/treatments" component={TreatmentsList} />
      </Switch>
    </div>
  );
}

export default App;
