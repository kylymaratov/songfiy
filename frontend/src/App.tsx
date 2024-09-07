import { useAppSelector } from "./store/hooks";
import { Navbar } from "./featues/Navbar/Navbar";
import "./App.css";
import { FloatMenu } from "./featues/FloatMenu/FloatMenu";
import { FixedMenu } from "./featues/FixedMenu/FixedMenu";
import { UsePath } from "./hooks/UsePath";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { StreamPage } from "./pages/StreamPage";
import { HistoryPage } from "./pages/HistoryPage";
import { SavedPage } from "./pages/SavedPage";
import { Player } from "./featues/Player/Player";
import { useEffect, useRef, useState } from "react";

function App() {
    /* Hooks */
    UsePath();

    const [padding, setPadding] = useState<number>(90);
    const playerRef = useRef<HTMLDivElement>(null);
    const navbarRef = useRef<HTMLDivElement>(null);

    const updatePadding = () => {
        if (playerRef.current && navbarRef.current) {
            const playerHeight =
                playerRef.current.getBoundingClientRect().height;
            const navbarHeight =
                navbarRef.current.getBoundingClientRect().height;

            setPadding(playerHeight + navbarHeight);
        }
    };
    useEffect(() => {
        updatePadding();

        const resizeObserver = new ResizeObserver(() => {
            updatePadding();
        });

        if (playerRef.current) {
            resizeObserver.observe(playerRef.current);
        }

        if (navbarRef.current) {
            resizeObserver.observe(navbarRef.current);
        }

        window.addEventListener("resize", updatePadding);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", updatePadding);
        };
    }, []);

    /* Selectors */
    const { darkMode } = useAppSelector((state) => state.app);

    return (
        <div className={darkMode ? "dark" : "light"}>
            <div className="fixed overflow-hidden dark:text-gray-50 w-screen h-screen  object-cover bg-white dark:bg-slate-950">
                <Navbar elementRef={navbarRef} />
                <div
                    className="flex w-full h-full"
                    style={{ paddingBottom: `${padding}px` }}
                >
                    <FixedMenu />
                    <div className="w-full">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/stream" element={<StreamPage />} />
                            <Route path="/history" element={<HistoryPage />} />
                            <Route path="/saved" element={<SavedPage />} />
                        </Routes>
                    </div>
                </div>
                <Player elementRef={playerRef} />
                <FloatMenu />
            </div>
        </div>
    );
}

export default App;
