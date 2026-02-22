import ChatPage from './components/ChatPage/ChatPage';
import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import MapPage from "./components/MapPage/MapPage";
import Header from "./components/Header";
import "./App.css";

export default function App() {
    return (
        <>
            <div className="page">
                <div className="bgGrain"/>

                <Header/>
                <div className="body">
                    <main className="main">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/map" element={<MapPage/>}/>
                            <Route path="/chat" element={<ChatPage/>}/>
                        </Routes>
                        <footer className="footerLinks">
                            <h3>Relevant Resources:</h3>

                            <a
                                    href="https://nlgmass.org"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="link"
                                >
                                    NLG MA
                                </a>
                                <span className="linkDot">·</span>
                                <a href="https://aclum.org" target="_blank" rel="noreferrer" className="link">
                                    ACLU MA
                                </a>
                                <span className="linkDot">·</span>
                                <a href="https://macdl.com" target="_blank" rel="noreferrer" className="link">
                                    MACDL
                                </a>
                        </footer>
                    </main>


                </div>
            </div>
        </>

    );
}