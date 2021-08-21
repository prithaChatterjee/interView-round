import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { AuthProvider } from "./context/AuthContext";
import {
  Switch,
  Route,
} from "react-router-dom";
import DashBoard from './pages/Dashboard/DashBoard';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Switch>
        <PrivateRoute path="/" component={DashBoard} exact />
        <Route path="/signup" component={SignUp} exact />
        <Route path="/login" component={SignIn} exact />
      </Switch>
    </AuthProvider>
  );
}

export default App;
