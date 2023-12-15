import { useContext } from "react";
import AppContext from "../context/AppContext";
import TextEditor from "./TextEditor";
import Menu from "./Menu";

function Main() {
  const { items } = useContext(AppContext);

  return (
    <main className="main">
      <Menu />

      {items.itemIds.length === 0 && (
        <p className="main__alert">No file is opened</p>
      )}

      <TextEditor />
    </main>
  );
}

export default Main;
