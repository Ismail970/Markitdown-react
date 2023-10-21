import Header from "./components/Header";
import Main from "./components/Main";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Header />
      <Main />
    </AppProvider>
  );
}

export default App;
