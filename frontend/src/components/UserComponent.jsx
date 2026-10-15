import { useState, useEffect, useRef } from "react";
import { updateUser, deleteUser } from "../services/userService";
import ModalWrapper from "./ModalWrapper";

const IcUser = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);
const IcMail = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);
const IcLock = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);
const IcEdit = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
);
const IcTrash = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);
const IcEye = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);
const IcEyeOff = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
);

function PillInput({ id, value, onChange, onClear, placeholder, error, type = "text", autoFocus, children }) {
    const [focused, setFocused] = useState(false);
    const [showPwd, setShowPwd] = useState(false);
    const inputRef = useRef(null);
    const isPassword = type === "password";

    useEffect(() => {
        if (autoFocus && inputRef.current) setTimeout(() => inputRef.current?.focus(), 80);
    }, [autoFocus]);

    const ring = error
        ? "border-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.15)]"
        : focused
        ? "border-[#2563eb] shadow-[0_0_0_3px_rgba(37,99,235,0.12)]"
        : "border-gray-200";

    return (
        <div className={`flex items-center gap-3 bg-white dark:bg-gray-700 rounded-full px-4 py-3.5 border transition-all duration-200 ${ring}`}>
            <span className={`shrink-0 transition-colors duration-200 ${error ? "text-red-400" : focused ? "text-[#2563eb]" : "text-gray-400"}`}>
                {children}
            </span>
            <input
                ref={inputRef} id={id}
                type={isPassword ? (showPwd ? "text" : "password") : type}
                value={value} onChange={onChange} placeholder={placeholder}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none"
                autoComplete="off"
            />
            {isPassword ? (
                <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => setShowPwd(p => !p)}
                    className="text-gray-400 hover:text-gray-600 transition-colors">
                    {showPwd ? <IcEyeOff /> : <IcEye />}
                </button>
            ) : value ? (
                <button type="button" onMouseDown={e => e.preventDefault()} onClick={onClear}
                    className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Clear">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            )}
        </div>
    );
}

function FieldLabel({ children }) {
    return <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">{children}</label>;
}

function EditProfileModal({ data, onClose, onSave }) {
    const [nameVal, setName] = useState(data?.name ?? "");
    const [emailVal, setEmail] = useState(data?.email ?? "");
    const [pwdVal, setPwd] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true); setError("");
        const body = {};
        if (nameVal !== data?.name) body.name = nameVal;
        if (emailVal !== data?.email) body.email = emailVal;
        if (pwdVal) body.password = pwdVal;
        if (Object.keys(body).length === 0) { onClose(); return; }
        try {
            await onSave(body);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ModalWrapper onClose={onClose} maxWidth="max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#dbeafe] dark:bg-blue-900/40 flex items-center justify-center text-[#2563eb]">
                            <IcEdit className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-base font-bold text-gray-800 dark:text-white">Edit Profil</p>
                            <p className="text-xs text-gray-400">Kosongkan password jika tidak ingin mengubah</p>
                        </div>
                    </div>
                    <button type="button" onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {error && (
                    <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-2xl bg-red-50 dark:bg-red-900/30 text-red-700 border border-red-100 dark:border-red-900/50 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <FieldLabel>Nama</FieldLabel>
                        <PillInput id="edit-name" value={nameVal} onChange={e => setName(e.target.value)}
                            onClear={() => setName("")} placeholder="Nama lengkap..." autoFocus>
                            <IcUser />
                        </PillInput>
                    </div>
                    <div>
                        <FieldLabel>Email</FieldLabel>
                        <PillInput id="edit-email" value={emailVal} onChange={e => setEmail(e.target.value)}
                            onClear={() => setEmail("")} placeholder="Email...">
                            <IcMail />
                        </PillInput>
                    </div>
                    <div>
                        <FieldLabel>Password Baru</FieldLabel>
                        <PillInput id="edit-pwd" value={pwdVal} onChange={e => setPwd(e.target.value)}
                            onClear={() => setPwd("")} placeholder="Kosongkan jika tidak diubah..." type="password">
                            <IcLock />
                        </PillInput>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose}
                            className="flex-1 py-3 rounded-full border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Batal
                        </button>
                        <button type="submit" disabled={loading}
                            className="flex-1 py-3 rounded-full bg-[#2563eb] text-white text-sm font-semibold hover:bg-[#1d4ed8] transition-colors disabled:opacity-60">
                            {loading ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </form>
        </ModalWrapper>
    );
}

function DeleteConfirmModal({ onClose, onConfirm }) {
    return (
        <ModalWrapper onClose={onClose} maxWidth="max-w-sm" contentClassName="p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/40 flex items-center justify-center mx-auto mb-4 text-red-500">
                <IcTrash className="w-7 h-7" />
            </div>
            <p className="text-base font-bold text-gray-800 dark:text-white mb-1">Hapus Akun</p>
            <p className="text-sm text-gray-400 mb-6">Tindakan ini tidak dapat dibatalkan. Akun Anda akan dihapus secara permanen.</p>
            <div className="flex gap-3">
                <button type="button" onClick={onClose}
                    className="flex-1 py-3 rounded-full border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Batal
                </button>
                <button type="button" onClick={onConfirm}
                    className="flex-1 py-3 rounded-full bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors">
                    Ya, Hapus
                </button>
            </div>
        </ModalWrapper>
    );
}

function DetailField({ icon, label, value, masked }) {
    const [show, setShow] = useState(false);
    return (
        <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 shrink-0 mt-0.5">
                {icon}
            </div>
            <div>
                <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                        {masked ? (show ? value : "••••••••") : (value || "–")}
                    </p>
                    {masked && (
                        <button type="button" onClick={() => setShow(p => !p)}
                            className="text-gray-400 hover:text-[#2563eb] transition-colors">
                            {show ? <IcEyeOff className="w-3.5 h-3.5" /> : <IcEye className="w-3.5 h-3.5" />}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function getInitials(name) {
    if (!name) return "?";
    return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

function UserProfileComponent({ data, onRefresh }) {
    const [message, setMessage] = useState({ type: "", text: "" });
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    function showMessage(type, text) {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }

    async function updateProfile(body) {
        try {
            await updateUser(body);
            showMessage("success", "Profil berhasil diperbarui.");
            onRefresh();
        } catch (err) {
            showMessage("error", err.response?.data?.message || err.message);
        }
    }

    async function handleDelete() {
        try {
            await deleteUser();
            localStorage.removeItem("token");
            window.location.href = "/auth";
        } catch (err) {
            showMessage("error", err.response?.data?.message || err.message);
            setShowDelete(false);
        }
    }

    // Skeleton
    if (!data) {
        return (
            <div className="space-y-4 animate-pulse">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
            </div>
        );
    }

    return (
        <>
            {showEdit && (
                <EditProfileModal data={data} onClose={() => setShowEdit(false)} onSave={updateProfile} />
            )}
            {showDelete && (
                <DeleteConfirmModal onClose={() => setShowDelete(false)} onConfirm={handleDelete} />
            )}

            <div className="space-y-4 max-w-2xl">
                {/* Toast */}
                {message.text && (
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium ${message.type === "error" ? "bg-red-50 dark:bg-red-900/30 text-red-700 border border-red-100 dark:border-red-900/50" : "bg-[#dbeafe] dark:bg-blue-900/40 text-[#2563eb] border border-[#93c5fd]"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            {message.type === "error"
                                ? <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                : <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                        </svg>
                        {message.text}
                    </div>
                )}

                {/* Hero Card */}
                <div className="relative bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-3xl overflow-hidden card-hover">
                    {/* Gradient banner */}
                    <div className="h-28 bg-linear-to-br from-[#2563eb] via-[#60a5fa] to-[#bfdbfe]" />

                    {/* Avatar */}
                    <div className="absolute top-12 left-6">
                        <div className="w-20 h-20 rounded-full border-4 border-white bg-[#2563eb] flex items-center justify-center shadow-md">
                            <span className="text-white text-2xl font-bold select-none">
                                {getInitials(data.name)}
                            </span>
                        </div>
                    </div>

                    {/* Edit Profile button — top right */}
                    <div className="absolute top-4 right-4">
                        <button type="button" onClick={() => setShowEdit(true)}
                            className="flex items-center gap-1.5 px-3.5 py-2 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 border border-white/60 hover:bg-white transition-colors shadow-sm">
                            <IcEdit className="w-3.5 h-3.5" />
                            Edit Profil
                        </button>
                    </div>

                    {/* Name & info below banner */}
                    <div className="pt-14 pb-5 px-6">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="text-xl font-bold text-gray-800 dark:text-white">{data.name || "–"}</h1>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#dbeafe] dark:bg-blue-900/40 text-[#2563eb] text-xs font-semibold border border-[#93c5fd]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
                                Admin
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1 flex items-center gap-1.5">
                            <IcMail className="w-3.5 h-3.5" />
                            {data.email || "–"}
                        </p>
                    </div>
                </div>

                {/* Profile Details Card */}
                <div className="bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-5">
                        <p className="text-sm font-bold text-gray-800 dark:text-white">Profile Details</p>
                        <button type="button" onClick={() => setShowEdit(true)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-[#2563eb] hover:underline">
                            <IcEdit className="w-3.5 h-3.5" />
                            Edit
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-5">
                        <DetailField
                            icon={<IcUser className="w-4 h-4" />}
                            label="Nama"
                            value={data.name}
                        />
                        <DetailField
                            icon={<IcMail className="w-4 h-4" />}
                            label="Email"
                            value={data.email}
                        />
                        <DetailField
                            icon={<IcLock className="w-4 h-4" />}
                            label="Password"
                            value="password-tersimpan"
                            masked
                        />
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white border border-red-100 dark:bg-gray-800 dark:border-red-900/50 rounded-3xl p-5 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">Hapus Akun</p>
                        <p className="text-xs text-gray-400 mt-0.5">Menghapus akun secara permanen dan tidak dapat dipulihkan.</p>
                    </div>
                    <button
                        type="button"
                        id="delete-button"
                        onClick={() => setShowDelete(true)}
                        className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors border border-red-100 dark:border-red-900/50"
                    >
                        <IcTrash />
                        Hapus Akun
                    </button>
                </div>
            </div>
        </>
    );
}

export default UserProfileComponent;
