import './App.css';
import PostList from './components/Blog/PostList
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <PostList />
    </Router>
  );
}

export default App;
