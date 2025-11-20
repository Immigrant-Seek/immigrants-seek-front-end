import Hero from "../components/Sections/Hero";

const Home = () => {
  return (
    <>
      <Hero className="illustration-section-01" />
      <div className="illustration-section-02">
        <div className="mission-statement-container">
          <h3 className="spacing">
            Here at DreamsBridge we aim to bridge the gap between immigrants and
            DACA recipients who are in need of help navigating the complex
            legislation surrounding immigration with people that are willing and
            qualified to help.
          </h3>
        </div>
        <div className="mission-statement-container">
          {/* Embbed chart was not loading and causing max call stack so we revert to static image of chart for now */}
         <img 
            src="https://staticweb.usafacts.org/media/images/daca.original.png"
            alt="DACA chart"
            width={750}
            height={580}
            style={{ border: 'none', maxWidth: '100%', height: 'auto' }}
         />
        </div>
      </div>
    </>
  );
};

export default Home;
