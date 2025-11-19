import LawyerPage from "../components/People/LawyerPage";
import Context from "../context/Context";
import NavigationBar from "../components/Layout/Nav";
import { useContext } from "react";

function Lawyers() {
  let { lawyers } = useContext(Context);

  return (
    <div className="App">
      <NavigationBar />
      <LawyerPage lawyers={lawyers} />
    </div>
  );
}

export default Lawyers;
