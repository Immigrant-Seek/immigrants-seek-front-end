import ClientProfile from '../components/elements/ClientProfile';
import Nav from '../components/elements/Nav';
import LawyerNav from '../components/elements/NavForLawyers'

function Clients(){
    return (
      <div className='App'>
        <Nav/>
        <ClientProfile />
        </div>
    );
  }
  
  export default Clients;