import { useState, useEffect, useRef } from "react";
import { addTransactions } from "../services/transactionService";
import ModalWrapper from "./ModalWrapper";

function PillInput({ id, value, onChange, onClear, placeholder, error, type = "text", children, autoFocus }) {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);
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
            <input ref={inputRef} id={id} type={type} value={value} onChange={onChange}
                placeholder={placeholder}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none"
                autoComplete="off"
            />
            {value ? (
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

function Field({ label, children, error }) {
    return (
        <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
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

function AddTransactionModal({ onClose, onSave }) {
    const [createdAtValue, setCreatedAt] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!createdAtValue) { setError("Tanggal transaksi wajib diisi."); return; }
        setLoading(true); setError("");
        try {
            await onSave(createdAtValue);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ModalWrapper onClose={onClose} maxWidth="max-w-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#dbeafe] dark:bg-blue-900/40 flex items-center justify-center text-[#2563eb]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-base font-bold text-gray-800 dark:text-white">Tambah Transaksi</p>
                            <p className="text-xs text-gray-400">Buat header transaksi baru</p>
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

                <form onSubmit={handleSubmit} className="space-y-5">
                    <Field label="Tanggal Transaksi" error={!createdAtValue && error ? "Tanggal wajib diisi" : ""}>
                        <PillInput
                            id="trx-created-at"
                            type="date"
                            value={createdAtValue}
                            onChange={e => { setCreatedAt(e.target.value); setError(""); }}
                            onClear={() => setCreatedAt("")}
                            placeholder="Pilih tanggal..."
                            error={!!error && !createdAtValue}
                            autoFocus
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </PillInput>
                    </Field>

                    <div className="flex gap-3 pt-1">
                        <button type="button" onClick={onClose}
                            className="flex-1 py-3 rounded-full border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Batal
                        </button>
                        <button type="submit" disabled={loading}
                            className="flex-1 py-3 rounded-full bg-[#2563eb] text-white text-sm font-semibold hover:bg-[#1d4ed8] transition-colors disabled:opacity-60">
                            {loading ? "Menyimpan..." : "Buat Transaksi"}
                        </button>
                    </div>
                </form>
        </ModalWrapper>
    );
}

function fmtCurrency(v) {
    if (v == null) return "–";
    const n = typeof v === "string" ? parseFloat(v) : v;
    if (isNaN(n)) return v;
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}
function fmtDate(v) {
    if (!v) return "–";
    return new Date(v).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

function TransactionHeaderOutput({ data, onOpen, selected }) {
    return (
        <div className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-200 cursor-pointer
            ${selected ? "border-[#2563eb] bg-[#dbeafe] dark:bg-blue-900/30" : "border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-sm hover:-translate-y-0.5 hover:border-gray-200 dark:hover:border-gray-600"}`}
            onClick={() => onOpen(data.id)}
        >
            {/* Icon */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${selected ? "bg-[#2563eb] text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-400"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs px-2 py-0.5 rounded ${selected ? "bg-[#2563eb] text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}>
                        #{data.id}
                    </span>
                    <span className={`text-xs ${selected ? "text-[#2563eb] font-medium" : "text-gray-400"}`}>
                        {fmtDate(data.createdAt)}
                    </span>
                </div>
                <p className={`text-sm font-semibold mt-0.5 ${selected ? "text-[#2563eb]" : "text-gray-800 dark:text-white"}`}>
                    {fmtCurrency(data.totalPrice)}
                </p>
            </div>

            {/* Chevron */}
            <svg xmlns="http://www.w3.org/2000/svg"
                className={`w-4 h-4 transition-transform shrink-0 ${selected ? "rotate-90 text-[#2563eb]" : "text-gray-300"}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </div>
    );
}

function TransactionHeaderComponent({ data, onOpen, onRefresh, selectedId }) {
    const [isFormOpen, setForm] = useState(false);
    const [createdAtValue, setCreatedAt] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });

    function showMessage(type, text) {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }

    async function saveHeader(createdAt) {
        await addTransactions({ createdAt });
        setCreatedAt("");
        showMessage("success", "Transaksi berhasil ditambahkan.");
        onRefresh();
    }

    return (
        <>
            {isFormOpen && (
                <AddTransactionModal onClose={() => setForm(false)} onSave={saveHeader} />
            )}

            <div className="space-y-4">
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

                {/* List */}
                {data && data.length > 0 ? (
                    <div className="space-y-2">
                        {data.map(item => (
                            <TransactionHeaderOutput key={item.id} data={item} onOpen={onOpen} selected={item.id === selectedId} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-2xl py-12 flex flex-col items-center gap-3 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-[#dbeafe] dark:bg-blue-900/40 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Belum ada transaksi</p>
                        <p className="text-xs text-gray-400">Klik tombol di bawah untuk membuat transaksi pertama.</p>
                    </div>
                )}

                {/* Add button */}
                <button
                    type="button"
                    id="add-header-transactions"
                    onClick={() => setForm(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-[#2563eb]/30 text-[#2563eb] text-sm font-medium hover:border-[#2563eb]/60 hover:bg-[#dbeafe]/50 transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Transaksi
                </button>
            </div>
        </>
    );
}

export default TransactionHeaderComponent;
