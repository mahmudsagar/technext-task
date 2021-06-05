import "./App.css";
import PostList from "./components/Blog/Post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostDetails from "./components/Blog/PostDetails";
import Login from "./components/Authentication/Login";
import UserProfile from "./components/Users/UserProfile";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import TopNavigation from "./components/Navigation/TobNavigation/index";
import SideNavigation from "./components/Navigation/SideNavigation/index";
import PostForm from './components/Blog/PostForm/index';
function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <PrivateRoute path="/posts/:id">
                    <TopNavigation />
                    <SideNavigation />
                    <PostDetails />
                </PrivateRoute>
                <PrivateRoute path="/new_post">
                    <TopNavigation />
                    <SideNavigation />
                    <PostForm />
                </PrivateRoute>
                <PrivateRoute path="/edit_post/:id">
                    <TopNavigation />
                    <SideNavigation />
                    <PostForm />
                </PrivateRoute>
                <PrivateRoute path="/user/:id">
                    <TopNavigation />
                    <SideNavigation />
                    <UserProfile />
                </PrivateRoute>
                <PrivateRoute exact path="/">
                    <TopNavigation />
                    <SideNavigation />
                    <PostList />
                </PrivateRoute>
            </Switch>
        </Router>
    );
}

export default App;
