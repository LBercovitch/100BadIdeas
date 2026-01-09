import HeaderSection from "./components/HeaderSection";
import Ideas from "./components/Ideas";
import "./App.css";

function App() {
  return (
    <div
      className="bg-[size:100px_100px] min-h-screen
      bg-[linear-gradient(to_right,rgba(255,0,191,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,0,191,0.2)_1px,transparent_1px)]"
    >
      <HeaderSection />
      <Ideas />
    </div>
  );
}

export default App;
