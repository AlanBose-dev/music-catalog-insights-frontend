import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Analytics from "./pages/Analytics";
import AI from "./pages/AI";

function App() {

    const location = useLocation();

    return (
        <>

            {
                location.pathname !== "/" &&
                <Navbar />
            }

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/search" element={<Search />} />

                <Route path="/library" element={<Library />} />

                <Route path="/analytics" element={<Analytics />} />

                <Route path="/ai" element={<AI />} />

            </Routes>

        </>
    );
}

export default App;