import { BrowserRouter, Route, Routes } from "react-router-dom";
import View from "./Pages/View";
import Add from "./Pages/Add";
import Edit from "./Pages/Edit";

const App = () => {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<View/>}/>
          <Route path="/Add" element={<Add/>}/>
          <Route path="/Edit" element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
