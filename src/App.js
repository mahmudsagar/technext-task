import "./App.css";
import PostList from "./components/Blog/Post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostDetails from "./components/Blog/PostDetails";
import Login from "./components/Authentication/Login";
import UserProfile from "./components/Users/UserProfile";
function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/posts/:id">
                    <PostDetails />
                </Route>
                <Route path="/users/:id">
                    <UserProfile />
                </Route>
                <Route exact path="/">
                    <PostList />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
