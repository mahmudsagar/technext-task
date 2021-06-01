import "./App.css";
import PostList from "./components/Blog/Post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostDetails from "./components/Blog/PostDetails";
function App() {
    return (
        <Router>
            <Switch>
                <Route path="/posts/:id">
                    <PostDetails />
                </Route>
                <Route exact path="/">
                    <PostList />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
