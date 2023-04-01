import GraphComponent from "./GraphComponent"
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/deep" element={<GraphComponent />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
