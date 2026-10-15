import { BrowserRouter, Routes, Route, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, createContext, useContext, useCallback } from "react";
import AuthPage from "./pages/Auth";
import DashboardPage from "./pages/Dashboard";
import CategoryPage from "./pages/Category";
import ProductsPage from "./pages/Products";
import TransactionsPage from "./pages/Transactions";
import UserPage from "./pages/User";

// Any component can call useModalBlur() to signal a modal is open/closed.
// Layout listens and applies blur+pointer-none to the page content.
export const ModalBlurContext = createContext({ open: () => {}, close: () => {} });
export function useModalBlur() { return useContext(ModalBlurContext); }

function useDarkMode() {
    const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
        localStorage.setItem("theme", dark ? "dark" : "light");
    }, [dark]);
    return [dark, setDark];
}

const navItems = [
    {
        to: "/dashboard", label: "Dashboard",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    },
    {
        to: "/category", label: "Category",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
    },
    {
        to: "/products", label: "Products",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
    },
    {
        to: "/transactions", label: "Transactions",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
    },
    {
        to: "/user", label: "Profile",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    },
];

function ThemeToggle({ dark, onToggle }) {
    return (
        <button type="button" onClick={onToggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none bg-gray-200 dark:bg-gray-700">
            <span className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
            </span>
            <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${dark ? "translate-x-7" : "translate-x-0"}`} />
        </button>
    );
}

function Sidebar({ token, onLogout, isOpen, onClose, collapsed, onCollapseToggle, hidden }) {
    return (
        <>
            {/* Mobile overlay */}
            {isOpen && <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={onClose} />}

            <aside className={`
                fixed top-0 left-0 h-full bg-white dark:bg-gray-900
                border-r border-gray-200 dark:border-gray-700 z-30 flex flex-col
                transition-all duration-300 ease-in-out
                w-64
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                ${hidden
                    ? "lg:-translate-x-full lg:z-40"
                    : "lg:translate-x-0 lg:static lg:z-auto"
                }
                ${collapsed ? "lg:w-16" : "lg:w-64"}
            `}>
                {/* Logo */}
                <div className={`flex items-center border-b border-gray-100 dark:border-gray-700 h-16 px-4 shrink-0 ${collapsed ? "justify-center" : "gap-3 px-6"}`}>
                    <div className="w-8 h-8 bg-[#2563eb] rounded-full flex items-center justify-center shrink-0">
                        <div className="w-4 h-4 rounded-full border-2 border-white" />
                    </div>
                    {!collapsed && <span className="font-bold text-lg text-gray-800 dark:text-white truncate">BizDash</span>}
                    {/* Mobile close */}
                    {!collapsed && (
                        <button type="button" onClick={onClose} className="ml-auto lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Nav */}
                <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
                    {navItems.map((item) => (
                        <NavLink key={item.to} to={item.to} onClick={onClose}
                            title={collapsed ? item.label : undefined}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-150
                                ${collapsed ? "justify-center px-0 py-2.5" : "px-4 py-2.5"}
                                ${isActive
                                    ? "bg-[#2563eb] text-white"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-white"
                                }`
                            }>
                            {item.icon}
                            {!collapsed && <span className="truncate">{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                {token && (
                    <div className="px-2 py-4 border-t border-gray-100 dark:border-gray-700 shrink-0">
                        <button type="button" onClick={onLogout}
                            title={collapsed ? "Logout" : undefined}
                            className={`w-full flex items-center gap-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors
                                ${collapsed ? "justify-center px-0 py-2.5" : "px-4 py-2.5"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            {!collapsed && <span>Logout</span>}
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}

function Topbar({ onMenuClick, dark, onThemeToggle, sidebarHidden, onToggleSidebar }) {
    const location = useLocation();
    const currentPage = navItems.find((item) => item.to === location.pathname)?.label ?? "Dashboard";

    return (
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 md:px-6 shrink-0">
            <div className="flex items-center gap-2">
                {/* Desktop show/hide sidebar */}
                <button type="button" onClick={onToggleSidebar}
                    aria-label={sidebarHidden ? "Tampilkan panel kiri" : "Sembunyikan panel kiri"}
                    title={sidebarHidden ? "Tampilkan panel kiri" : "Sembunyikan panel kiri"}
                    className="hidden lg:flex p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    {sidebarHidden ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5v14" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7M19 5v14" />
                        </svg>
                    )}
                </button>
                {/* Mobile hamburger */}
                <button type="button" onClick={onMenuClick}
                    className="lg:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <span className="text-sm hidden sm:block">
                    <span className="text-gray-400">Home</span>
                    <span className="mx-1 text-gray-400">/</span>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">{currentPage}</span>
                </span>
            </div>

            <div className="flex items-center gap-3">
                <ThemeToggle dark={dark} onToggle={onThemeToggle} />
                <NavLink to="/user" className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center text-white text-sm font-semibold">A</div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:block">Admin</span>
                </NavLink>
            </div>
        </header>
    );
}

function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(() => localStorage.getItem("sidebar") === "collapsed");
    const [sidebarHidden, setSidebarHidden] = useState(() => localStorage.getItem("sidebarHidden") === "true");
    const [dark, setDark] = useDarkMode();
    const [modalCount, setModalCount] = useState(0);

    const openModal  = useCallback(() => setModalCount(n => n + 1), []);
    const closeModal = useCallback(() => setModalCount(n => Math.max(0, n - 1)), []);
    const isModalOpen = modalCount > 0;

    useEffect(() => {
        localStorage.setItem("sidebar", collapsed ? "collapsed" : "expanded");
    }, [collapsed]);

    useEffect(() => {
        localStorage.setItem("sidebarHidden", sidebarHidden ? "true" : "false");
    }, [sidebarHidden]);

    useEffect(() => {
        const syncToken = () => setToken(localStorage.getItem("token"));
        window.addEventListener("auth-change", syncToken);
        window.addEventListener("storage", syncToken);
        return () => {
            window.removeEventListener("auth-change", syncToken);
            window.removeEventListener("storage", syncToken);
        };
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        setToken(null);
        window.dispatchEvent(new Event("auth-change"));
        navigate("/auth");
    }

    const isAuthPage = location.pathname === "/auth";

    // Auth page — full screen, no shell
    if (isAuthPage) {
        return (
            <ModalBlurContext.Provider value={{ open: openModal, close: closeModal }}>
                <Routes>
                    <Route path="/auth" element={<AuthPage />} />
                </Routes>
            </ModalBlurContext.Provider>
        );
    }

    return (
        <ModalBlurContext.Provider value={{ open: openModal, close: closeModal }}>
            {/* Blur the entire shell (sidebar + topbar + content) while any modal is open */}
            <div className={`flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden transition-[filter] duration-200 ${isModalOpen ? "blur-sm pointer-events-none select-none" : ""}`}>
                <Sidebar
                    token={token}
                    onLogout={handleLogout}
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    collapsed={collapsed}
                    onCollapseToggle={() => setCollapsed(c => !c)}
                    hidden={sidebarHidden}
                />

                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <Topbar
                        onMenuClick={() => setSidebarOpen(true)}
                        dark={dark}
                        onThemeToggle={() => setDark(d => !d)}
                        sidebarHidden={sidebarHidden}
                        onToggleSidebar={() => setSidebarHidden(h => !h)}
                    />

                    {/* Page content */}
                    <main className="flex-1 overflow-y-auto p-4 md:p-6">
                        <div key={location.pathname} className="animate-fade-up">
                            <Routes>
                                <Route path="/" element={<DashboardPage />} />
                                <Route path="/dashboard" element={<DashboardPage />} />
                                <Route path="/category" element={<CategoryPage />} />
                                <Route path="/products" element={<ProductsPage />} />
                                <Route path="/transactions" element={<TransactionsPage />} />
                                <Route path="/user" element={<UserPage />} />
                            </Routes>
                        </div>
                    </main>
                </div>
            </div>
        </ModalBlurContext.Provider>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}

export default App;
