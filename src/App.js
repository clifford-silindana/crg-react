import './index.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

//page imports
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
      
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
