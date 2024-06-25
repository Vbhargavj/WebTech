
const GlowingNeonBorder = ({ children }) => {
    return (
      <div className="relative inline-block p-6 bg-black rounded-lg">
        <div className="absolute inset-0 border-4 border-transparent rounded-lg animate-rotate-border border-gradient"></div>
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
    
  };
  export default GlowingNeonBorder;