import './index.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

//page imports
import Home from './Pages/Home';
import Images from './Pages/Images';
import Audios from './Pages/Audios';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route
              path="images"
              element={<Images />}
            />
            <Route path="audios" element={<Audios />} />
          </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
