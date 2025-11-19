import ClientProfile from "../components/People/ClientProfile";
import Nav from "../components/Layout/Nav";
import LawyerNav from "../components/Layout/NavForLawyers";

function Clients() {
  return (
    <div className="App">
      <Nav />
      <ClientProfile />
    </div>
  );
}

export default Clients;
