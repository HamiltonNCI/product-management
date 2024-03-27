import "./App.css";
import LoadItems from "./components/LoadItems";
import UserSearch from "./components/UserSearch";

function App() {
  return (
    <div className="App">
      <UserSearch />
      <LoadItems />
    </div>
  );
}

export default App;
