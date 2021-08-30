import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Post from "./views/Post";
import "./App.css";
import { BrowserRouter as Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Header />
      <main role="main">
        <Switch>
          <Route path="/post/:title">
            <Post />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </main>

      <Footer />
    </div>
  );
}

export default App;
