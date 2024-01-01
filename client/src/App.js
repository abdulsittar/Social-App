import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import FollowersPage from "./pages/Followers/FollowersPage";
import FollowingsPage from "./pages/Followings/FollowingsPage";
import Messenger from './pages/messenger/Messenger';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
    <Switch>
		<Route exact path="/">{user ? <Home /> : <Login />}</Route>
		<Route path="/login"><Login /></Route>
		<Route path="/register"><Register /></Route>
		<Route path="/messenger">{!user ? <Login /> : <Messenger />}</Route>
		<Route path="/profile/:username"><Profile /></Route>
    <Route path="/followerspage/:username"><FollowersPage /></Route>
    <Route path="/followingspage/:username"><FollowingsPage /></Route>
    </Switch>
  </Router>
  );
}

export default App;