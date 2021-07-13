import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import AddNewPatient from "./pages/AddNewPatient/AddNewPatient";
import Patients from "./pages/Patients/Patients";
import Appointments from "./pages/Appointments/Appointments";
import Earnings from "./pages/Earnings/Earnings";
import TreatmentsList from "./pages/TreatmentsList/TreatmentsList";
import AppointmentsProvider from "./contexts/AppointmentsContext";
import TreatmentsProvider from "./contexts/TreatmentsContext";
import PatientsProvider from "./contexts/PatientsContext";

function App() {
  return (
    <div className="App">
      <PatientsProvider>
        <TreatmentsProvider>
          <AppointmentsProvider>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/add-new-patient" component={AddNewPatient} />
              <Route path="/patients" component={Patients} />
              <Route path="/appointments" component={Appointments} />
              <Route path="/earnings" component={Earnings} />
              <Route path="/price-list" component={TreatmentsList} />
              <Redirect to="/" />
            </Switch>
          </AppointmentsProvider>
        </TreatmentsProvider>
      </PatientsProvider>
    </div>
  );
}

export default App;
