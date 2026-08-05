import { useState, useEffect, useRef } from "react";
import { addDetailedTransactions, deleteDetailedTransactions } from "../services/transactionService";
import ModalWrapper from "./ModalWrapper";

const IcBox = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);
const IcHash = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </svg>
);
const IcX = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const IcTrash = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);
const IcChevDown = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

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

function PillInput({ id, value, onChange, onClear, placeholder, error, type = "text", autoFocus, children }) {
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
            <input ref={inputRef} id={id} type={type} value={value} onChange={onChange} placeholder={placeholder}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none" autoComplete="off" />
            {value ? (
                <button type="button" onMouseDown={e => e.preventDefault()} onClick={onClear}
                    className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Clear">
                    <IcX />
                </button>
            ) : <IcChevDown className="w-4 h-4 text-gray-300" />}
        </div>
    );
}

function PillSelect({ id, value, onChange, error, children }) {
    const [focused, setFocused] = useState(false);
    const ring = error
        ? "border-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.15)]"
        : focused
        ? "border-[#2563eb] shadow-[0_0_0_3px_rgba(37,99,235,0.12)]"
        : "border-gray-200";

    return (
        <div className={`flex items-center gap-3 bg-white dark:bg-gray-700 rounded-full px-4 py-3.5 border transition-all duration-200 ${ring}`}>
            <span className={`shrink-0 transition-colors duration-200 ${error ? "text-red-400" : focused ? "text-[#2563eb]" : "text-gray-400"}`}>
                <IcBox className="w-5 h-5" />
            </span>
            <select id={id} value={value} onChange={onChange}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-100 outline-none appearance-none cursor-pointer">
                {children}
            </select>
            <IcChevDown className="w-4 h-4 text-gray-300 pointer-events-none" />
        </div>
    );
}

function Field({ label, error, children }) {
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

function AddDetailModal({ products, onClose, onSave }) {
    const [productIdValue, setProductId] = useState("");
    const [quantityValue, setQuantity] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!productIdValue) { setError("Pilih produk terlebih dahulu."); return; }
        if (!quantityValue || Number(quantityValue) < 1) { setError("Jumlah harus lebih dari 0."); return; }
        setLoading(true); setError("");
        try {
            await onSave({ productId: Number(productIdValue), quantity: Number(quantityValue) });
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
                            <IcBox className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-base font-bold text-gray-800 dark:text-white">Tambah Item</p>
                            <p className="text-xs text-gray-400">Pilih produk dan jumlah</p>
                        </div>
                    </div>
                    <button type="button" onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <IcX />
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

                <form id="add-detailed-transactions-form" onSubmit={handleSubmit} className="space-y-4">
                    <Field label="Produk">
                        <PillSelect id="detail-product-input" value={productIdValue}
                            onChange={e => { setProductId(e.target.value); setError(""); }}
                            error={!!error && !productIdValue}>
                            <option value="">Pilih Produk</option>
                            {products && products.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </PillSelect>
                    </Field>
                    <Field label="Jumlah">
                        <PillInput id="detail-quantity-input" type="number" value={quantityValue}
                            onChange={e => { setQuantity(e.target.value); setError(""); }}
                            onClear={() => setQuantity("")} placeholder="0" error={!!error && !quantityValue}>
                            <IcHash className="w-5 h-5" />
                        </PillInput>
                    </Field>
                    <div className="flex gap-3 pt-1">
                        <button type="button" onClick={onClose}
                            className="flex-1 py-3 rounded-full border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Batal
                        </button>
                        <button type="submit" id="save-detailed-transactions-button" disabled={loading}
                            className="flex-1 py-3 rounded-full bg-[#2563eb] text-white text-sm font-semibold hover:bg-[#1d4ed8] transition-colors disabled:opacity-60">
                            {loading ? "Menyimpan..." : "Tambah Item"}
                        </button>
                    </div>
                </form>
        </ModalWrapper>
    );
}

function DeleteConfirmModal({ productName, onClose, onConfirm }) {
    return (
        <ModalWrapper onClose={onClose} maxWidth="max-w-sm" contentClassName="p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-900/40 flex items-center justify-center mx-auto mb-4 text-red-500">
                <IcTrash className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-gray-800 dark:text-white mb-1">Hapus Item?</p>
            <p className="text-xs text-gray-400 mb-5">
                <span className="font-semibold text-gray-600 dark:text-gray-300">{productName}</span> akan dihapus dari transaksi ini.
            </p>
            <div className="flex gap-3">
                <button type="button" onClick={onClose}
                    className="flex-1 py-3 rounded-full border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Batal
                </button>
                <button type="button" onClick={onConfirm}
                    className="flex-1 py-3 rounded-full bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors">
                    Hapus
                </button>
            </div>
        </ModalWrapper>
    );
}

function SummaryStat({ label, value }) {
    return (
        <div className="text-center">
            <p className="text-lg font-bold text-gray-800 dark:text-white">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
        </div>
    );
}

function TransactionDetailedComponent({ header, transactionId, products, details, onRefresh, onClose }) {
    const [isOpenForm, setForm] = useState(false);
    const [productIdValue, setProductId] = useState("");
    const [quantityValue, setQuantity] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });
    const [deleteTarget, setDeleteTarget] = useState(null); // { id, name }

    function showMessage(type, text) {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }

    function productName(id) {
        const item = products && products.find(p => p.id === id);
        return item ? item.name : `Produk #${id}`;
    }

    async function saveDetail(body) {
        await addDetailedTransactions(transactionId, body);
        setProductId(""); setQuantity("");
        showMessage("success", "Item berhasil ditambahkan.");
        onRefresh();
    }

    async function handleDelete(id) {
        try {
            await deleteDetailedTransactions(id, transactionId);
            showMessage("success", "Item berhasil dihapus.");
            setDeleteTarget(null);
            onRefresh();
        } catch (err) {
            showMessage("error", err.response?.data?.message || err.message);
            setDeleteTarget(null);
        }
    }

    // Summary stats
    const totalItems = details?.length ?? 0;
    const totalQty = details?.reduce((acc, d) => acc + (d.quantity ?? 0), 0) ?? 0;

    return (
        <>
            {isOpenForm && (
                <AddDetailModal
                    products={products}
                    onClose={() => setForm(false)}
                    onSave={saveDetail}
                />
            )}
            {deleteTarget && (
                <DeleteConfirmModal
                    productName={deleteTarget.name}
                    onClose={() => setDeleteTarget(null)}
                    onConfirm={() => handleDelete(deleteTarget.id)}
                />
            )}

            <div className="bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-3xl overflow-hidden">
                {/* Header strip */}
                <div className="bg-[#2563eb] px-5 py-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">Detail Transaksi</p>
                            <p className="text-white/60 text-xs font-mono">#{transactionId}</p>
                        </div>
                    </div>
                    <button type="button" onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors" aria-label="Tutup">
                        <IcX />
                    </button>
                </div>

                <div className="p-5 space-y-5">
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

                    {/* Info + summary */}
                    {header && (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl px-5 py-4 flex flex-wrap items-center gap-4">
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-400 mb-0.5">Total Harga</p>
                                <p className="text-xl font-bold text-[#2563eb]">{fmtCurrency(header.totalPrice)}</p>
                            </div>
                            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />
                            <SummaryStat label="Jenis Item" value={totalItems} />
                            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />
                            <SummaryStat label="Total Qty" value={totalQty.toLocaleString("id-ID")} />
                            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />
                            <div className="text-center">
                                <p className="text-sm font-bold text-gray-800 dark:text-white">{fmtDate(header.createdAt)}</p>
                                <p className="text-xs text-gray-400 mt-0.5">Tanggal</p>
                            </div>
                        </div>
                    )}

                    {/* Add button */}
                    <button
                        type="button"
                        id="add-detailed-transactions"
                        onClick={() => setForm(true)}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-[#2563eb]/30 text-[#2563eb] text-sm font-medium hover:border-[#2563eb]/60 hover:bg-[#dbeafe]/50 transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Item
                    </button>

                    {/* Detail items */}
                    {details && details.length > 0 ? (
                        <div className="space-y-3">
                            {details.map((item, idx) => (
                                <div key={item.id}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:-translate-y-0.5 transition-all duration-200">
                                    {/* Index bubble */}
                                    <div className="w-8 h-8 rounded-xl bg-[#dbeafe] dark:bg-blue-900/40 text-[#2563eb] flex items-center justify-center text-xs font-bold shrink-0">
                                        {idx + 1}
                                    </div>

                                    {/* Product info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{productName(item.productId)}</p>
                                        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
                                            <span className="text-xs text-gray-400">
                                                Qty: <span className="font-medium text-gray-600 dark:text-gray-300">{item.quantity}</span>
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                Harga: <span className="font-medium text-gray-600 dark:text-gray-300">{fmtCurrency(item.price)}</span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Subtotal */}
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-bold text-gray-800 dark:text-white">{fmtCurrency(item.subtotal)}</p>
                                        <p className="text-xs text-gray-400">subtotal</p>
                                    </div>

                                    {/* Delete */}
                                    <button type="button"
                                        onClick={() => setDeleteTarget({ id: item.id, name: productName(item.productId) })}
                                        className="w-8 h-8 rounded-lg bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-100 transition-colors shrink-0"
                                        aria-label="Hapus item">
                                        <IcTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-10 flex flex-col items-center gap-2 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-300 dark:text-gray-500 mb-1">
                                <IcBox className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Belum ada item</p>
                            <p className="text-xs text-gray-400">Klik "Tambah Item" untuk menambahkan produk ke transaksi ini.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default TransactionDetailedComponent;
