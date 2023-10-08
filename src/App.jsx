import Header from "./components/Header";
import Menu from "./components/Menu";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Header />
      <Menu />
    </AppProvider>
  );
}

export default App;
