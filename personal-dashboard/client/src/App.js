import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";

function App() {
  const token = localStorage.getItem("token");
  return (
    <div className="App">
      {token ? <Dashboard/> : <LoginForm/>}
    </div>
  );
}

export default App;
