import { Route, Routes } from "react-router-dom";

import Details from "./components/Details";
import "./App.css";
import Main from "./components/MainView";

function App() {
    return (
        <Routes>
            <Route path="/" exact element={<Main />} />
            <Route path="/details" exact element={<Details />} />
        </Routes>
    );
}

export default App;
