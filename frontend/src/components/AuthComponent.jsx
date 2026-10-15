import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister, userLogin } from "../services/authService";

const IcMail = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);
const IcLock = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);
const IcUser = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);
const IcEye = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);
const IcEyeOff = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
);

function PillInput({ id, value, onChange, placeholder, error, type = "text", autoFocus, children }) {
    const [focused, setFocused] = useState(false);
    const [showPwd, setShowPwd] = useState(false);
    const inputRef = useRef(null);
    const isPassword = type === "password";

    useEffect(() => {
        if (autoFocus && inputRef.current) setTimeout(() => inputRef.current?.focus(), 120);
    }, [autoFocus]);

    const ring = error
        ? "border-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.15)]"
        : focused
        ? "border-[#2563eb] shadow-[0_0_0_3px_rgba(37,99,235,0.12)]"
        : "border-gray-200 dark:border-gray-700";

    return (
        <div className={`flex items-center gap-3 bg-white dark:bg-gray-800 rounded-full px-4 py-3.5 border transition-all duration-200 ${ring}`}>
            <span className={`shrink-0 transition-colors duration-200 ${error ? "text-red-400" : focused ? "text-[#2563eb]" : "text-gray-400"}`}>
                {children}
            </span>
            <input
                ref={inputRef} id={id}
                type={isPassword ? (showPwd ? "text" : "password") : type}
                value={value} onChange={onChange} placeholder={placeholder}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none"
                autoComplete="off"
            />
            {isPassword ? (
                <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => setShowPwd(p => !p)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    {showPwd ? <IcEyeOff /> : <IcEye />}
                </button>
            ) : value ? (
                <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => onChange({ target: { value: "" } })}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            )}
        </div>
    );
}

function Field({ label, htmlFor, error, children }) {
    return (
        <div className="space-y-1.5 animate-fade-up">
            <label htmlFor={htmlFor} className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {label}
            </label>
            {children}
            {error && (
                <p className="text-xs text-red-500 flex items-center gap-1 pl-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
}

function AuthComponent() {
    const navigate = useNavigate();
    const [isLogin, setLogin] = useState(true);
    const [nameValue, setName] = useState("");
    const [emailValue, setEmail] = useState("");
    const [passwordValue, setPassword] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });
    const [loading, setLoading] = useState(false);
    const [animKey, setAnimKey] = useState(0);

    function switchMode(toLogin) {
        setLogin(toLogin);
        setMessage({ type: "", text: "" });
        setName(""); setEmail(""); setPassword("");
        setAnimKey(k => k + 1);
    }

    async function handleRegister(event) {
        event.preventDefault();
        setMessage({ type: "", text: "" });
        setLoading(true);
        try {
            await userRegister({ name: nameValue, email: emailValue, password: passwordValue });
            setMessage({ type: "success", text: "Registrasi berhasil! Silakan login." });
            switchMode(true);
        } catch (err) {
            setMessage({ type: "error", text: err.response?.data?.message || err.message });
        } finally {
            setLoading(false);
        }
    }

    async function handleLogin(event) {
        event.preventDefault();
        setMessage({ type: "", text: "" });
        setLoading(true);
        try {
            await userLogin({ email: emailValue, password: passwordValue });
            window.dispatchEvent(new Event("auth-change"));
            navigate("/dashboard");
        } catch (err) {
            setMessage({ type: "error", text: err.response?.data?.message || err.message });
        } finally {
            setLoading(false);
        }
    }

    return (
        /* Full-page centering — auth page renders outside the main layout shell */
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-scale-in">

                {/* Card */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl shadow-gray-200/60 dark:shadow-gray-950/60 overflow-hidden">

                    {/* Top accent bar */}
                    <div className="h-1.5 bg-linear-to-r from-[#2563eb] via-[#60a5fa] to-[#93c5fd]" />

                    <div className="p-8">
                        {/* Logo + heading */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-12 h-12 bg-[#2563eb] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-200 dark:shadow-blue-900">
                                <div className="w-6 h-6 rounded-full border-2 border-white/80" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
                                {isLogin ? "Selamat Datang" : "Buat Akun"}
                            </h1>
                            <p className="text-sm text-gray-400 mt-1">
                                {isLogin ? "Masuk ke dashboard Anda" : "Daftar untuk mulai menggunakan BizDash"}
                            </p>
                        </div>

                        {/* Tab switcher */}
                        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-7">
                            {[{ label: "Masuk", val: true }, { label: "Daftar", val: false }].map(tab => (
                                <button
                                    key={String(tab.val)}
                                    type="button"
                                    onClick={() => switchMode(tab.val)}
                                    className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-250 btn-press
                                        ${isLogin === tab.val
                                            ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm"
                                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Alert */}
                        {message.text && (
                            <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-medium mb-5 animate-slide-down
                                ${message.type === "error"
                                    ? "bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900"
                                    : "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900"
                                }`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    {message.type === "error"
                                        ? <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        : <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                                </svg>
                                {message.text}
                            </div>
                        )}

                        {/* Form */}
                        <form
                            key={animKey}
                            onSubmit={isLogin ? handleLogin : handleRegister}
                            className="space-y-4 stagger-children"
                        >
                            {!isLogin && (
                                <Field label="Nama" htmlFor="auth-name">
                                    <PillInput id="auth-name" value={nameValue}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="Nama lengkap Anda..." autoFocus={!isLogin}>
                                        <IcUser />
                                    </PillInput>
                                </Field>
                            )}

                            <Field label="Email" htmlFor="auth-email">
                                <PillInput id="auth-email" type="email" value={emailValue}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="nama@email.com..." autoFocus={isLogin}>
                                    <IcMail />
                                </PillInput>
                            </Field>

                            <Field label="Password" htmlFor="auth-password">
                                <PillInput id="auth-password" type="password" value={passwordValue}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Kata sandi Anda...">
                                    <IcLock />
                                </PillInput>
                            </Field>

                            <div className="pt-2 animate-fade-up">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3.5 rounded-full bg-[#2563eb] text-white text-sm font-bold
                                        hover:bg-[#1d4ed8] active:scale-[0.98] transition-all duration-200
                                        disabled:opacity-60 disabled:cursor-not-allowed
                                        shadow-md shadow-blue-200 dark:shadow-blue-900 hover:shadow-lg hover:shadow-blue-300 dark:hover:shadow-blue-800"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                            </svg>
                                            Memproses...
                                        </span>
                                    ) : isLogin ? "Masuk" : "Buat Akun"}
                                </button>
                            </div>
                        </form>

                        {/* Footer link */}
                        <p className="text-center text-sm text-gray-400 mt-6">
                            {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
                            <button type="button" onClick={() => switchMode(!isLogin)}
                                className="text-[#2563eb] font-semibold hover:underline transition-colors">
                                {isLogin ? "Daftar sekarang" : "Masuk"}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-6">
                    © {new Date().getFullYear()} BizDash. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default AuthComponent;
