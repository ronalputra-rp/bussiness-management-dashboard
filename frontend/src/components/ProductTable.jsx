import { useState, useEffect, useRef } from "react";
import { creatingProduct, updatingProduct, deletingProduct } from "../services/productService";
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
            <input
                ref={inputRef} id={id} type={type} value={value} onChange={onChange}
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
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
            </span>
            <select id={id} value={value} onChange={onChange}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-100 outline-none appearance-none cursor-pointer">
                {children}
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
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

const IcBox = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);
const IcText = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
    </svg>
);
const IcHash = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </svg>
);
const IcCurrency = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

function AddProductModal({ categories, onClose, onSave }) {
    const [nameValue, setName] = useState("");
    const [categoryIdValue, setCategoryId] = useState("");
    const [descriptionValue, setDescription] = useState("");
    const [stockValue, setStock] = useState("");
    const [priceValue, setPrice] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await onSave({ name: nameValue, categoryId: Number(categoryIdValue), description: descriptionValue, stock: Number(stockValue), price: Number(priceValue) });
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
                        <div className="w-9 h-9 rounded-xl bg-[#dbeafe] dark:bg-blue-900/40 flex items-center justify-center text-[#2563eb]"><IcBox /></div>
                        <div>
                            <p className="text-base font-bold text-gray-800 dark:text-white">Tambah Produk</p>
                            <p className="text-xs text-gray-400">Isi detail produk baru</p>
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
                    <Field label="Nama Produk">
                        <PillInput id="p-name" value={nameValue} onChange={e => setName(e.target.value)}
                            onClear={() => setName("")} placeholder="Masukkan nama produk..." autoFocus>
                            <IcBox />
                        </PillInput>
                    </Field>
                    <Field label="Kategori">
                        <PillSelect id="p-category" value={categoryIdValue} onChange={e => setCategoryId(e.target.value)} error={!categoryIdValue && error ? "Pilih kategori" : ""}>
                            <option value="">Pilih Kategori</option>
                            {categories && categories.map(c => <option key={c.id} value={c.id}>{c.category}</option>)}
                        </PillSelect>
                    </Field>
                    <Field label="Deskripsi">
                        <PillInput id="p-desc" value={descriptionValue} onChange={e => setDescription(e.target.value)}
                            onClear={() => setDescription("")} placeholder="Deskripsi produk (opsional)...">
                            <IcText />
                        </PillInput>
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Stok">
                            <PillInput id="p-stock" value={stockValue} onChange={e => setStock(e.target.value)}
                                onClear={() => setStock("")} placeholder="0" type="number">
                                <IcHash />
                            </PillInput>
                        </Field>
                        <Field label="Harga">
                            <PillInput id="p-price" value={priceValue} onChange={e => setPrice(e.target.value)}
                                onClear={() => setPrice("")} placeholder="0" type="number">
                                <IcCurrency />
                            </PillInput>
                        </Field>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose}
                            className="flex-1 py-3 rounded-full border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Batal
                        </button>
                        <button type="submit" disabled={loading}
                            className="flex-1 py-3 rounded-full bg-[#2563eb] text-white text-sm font-semibold hover:bg-[#1d4ed8] transition-colors disabled:opacity-60">
                            {loading ? "Menyimpan..." : "Simpan Produk"}
                        </button>
                    </div>
                </form>
        </ModalWrapper>
    );
}

function TableSkeleton() {
    return (
        <div className="animate-pulse space-y-2">
            {[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl" />)}
        </div>
    );
}

function fmtCurrency(v) {
    if (v == null) return "–";
    const n = typeof v === "string" ? parseFloat(v) : v;
    if (isNaN(n)) return v;
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

function EditProductModal({ item, onClose, onSave }) {
    const [editName, setEditName] = useState(item.name);
    const [editDescription, setEditDescription] = useState(item.description ?? "");
    const [editStock, setEditStock] = useState(String(item.stock));
    const [editPrice, setEditPrice] = useState(String(item.price));
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await onSave(item.id, { name: editName, description: editDescription, stock: Number(editStock), price: Number(editPrice) });
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ModalWrapper onClose={onClose} maxWidth="max-w-md">
            <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-base font-bold text-gray-800 dark:text-white">Edit Produk</p>
                            <p className="text-xs text-gray-400 truncate max-w-50">{item.name}</p>
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
                    <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-2xl bg-red-50 dark:bg-red-900/30 text-red-700 border border-red-100 dark:border-red-900/50 text-sm">{error}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Field label="Nama Produk">
                        <PillInput id="ep-name" value={editName} onChange={e => setEditName(e.target.value)} onClear={() => setEditName("")} placeholder="Nama produk..." autoFocus>
                            <IcBox />
                        </PillInput>
                    </Field>
                    <Field label="Deskripsi">
                        <PillInput id="ep-desc" value={editDescription} onChange={e => setEditDescription(e.target.value)} onClear={() => setEditDescription("")} placeholder="Deskripsi...">
                            <IcText />
                        </PillInput>
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Stok">
                            <PillInput id="ep-stock" value={editStock} onChange={e => setEditStock(e.target.value)} onClear={() => setEditStock("")} placeholder="0" type="number">
                                <IcHash />
                            </PillInput>
                        </Field>
                        <Field label="Harga">
                            <PillInput id="ep-price" value={editPrice} onChange={e => setEditPrice(e.target.value)} onClear={() => setEditPrice("")} placeholder="0" type="number">
                                <IcCurrency />
                            </PillInput>
                        </Field>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-3 rounded-full border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Batal</button>
                        <button type="submit" disabled={loading} className="flex-1 py-3 rounded-full bg-[#2563eb] text-white text-sm font-semibold hover:bg-[#1d4ed8] transition-colors disabled:opacity-60">
                            {loading ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
        </ModalWrapper>
    );
}

function ProductTableComponents({ data, categories, onRefresh, loading }) {
    const [openForm, setOpenForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [message, setMessage] = useState({ type: "", text: "" });

    const [nameValue, setName] = useState("");
    const [categoryIdValue, setCategoryId] = useState("");
    const [descriptionValue, setDescription] = useState("");
    const [stockValue, setStock] = useState("");
    const [priceValue, setPrice] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editStock, setEditStock] = useState("");
    const [editPrice, setEditPrice] = useState("");

    function showMessage(type, text) {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }

    async function handleCreate(body) {
        await creatingProduct(body);
        setName(""); setCategoryId(""); setDescription(""); setStock(""); setPrice("");
        showMessage("success", "Produk berhasil ditambahkan.");
        onRefresh();
    }

    function startEdit(item) {
        setEditingId(item.id); setEditName(item.name);
        setEditDescription(item.description ?? ""); setEditStock(item.stock); setEditPrice(item.price);
        setEditingItem(item);
    }

    async function handleUpdate(id, body) {
        await updatingProduct(id, body);
        setEditingId(null); setEditingItem(null);
        showMessage("success", "Produk berhasil diubah.");
        onRefresh();
    }

    async function handleDelete(id) {
        try {
            await deletingProduct(id);
            showMessage("success", "Produk berhasil dihapus.");
            onRefresh();
        } catch (err) {
            showMessage("error", err.response?.data?.message || err.message);
        }
    }

    return (
        <>
            {openForm && (
                <AddProductModal categories={categories} onClose={() => setOpenForm(false)} onSave={handleCreate} />
            )}
            {editingItem && (
                <EditProductModal item={editingItem} onClose={() => { setEditingItem(null); setEditingId(null); }} onSave={handleUpdate} />
            )}

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Products</h1>
                        <p className="text-sm text-gray-400 mt-0.5">{data ? `${data.length} produk terdaftar` : "Kelola produk"}</p>
                    </div>
                    <button type="button" onClick={() => setOpenForm(true)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563eb] text-white text-sm font-medium hover:bg-[#1d4ed8] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Produk
                    </button>
                </div>

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

                {/* Table */}
                {loading ? <TableSkeleton /> : (
                    <div className="bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/60">
                                        {["Nama", "Kategori", "Deskripsi", "Stok", "Harga", "Aksi"].map(h => (
                                            <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                    {data && data.length > 0 ? data.map(item => (
                                        <tr key={item.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-700/40 transition-colors">
                                            <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">{item.name}</td>
                                            <td className="px-4 py-3">
                                                <span className="inline-block bg-[#dbeafe] dark:bg-blue-900/40 text-[#2563eb] text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                    {item.category?.category ?? item.categoryId}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 max-w-45 truncate">{item.description || "–"}</td>
                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-200">{item.stock?.toLocaleString("id-ID")}</td>
                                            <td className="px-4 py-3 font-semibold text-gray-800 dark:text-white">{fmtCurrency(item.price)}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1.5">
                                                    <button type="button" onClick={() => startEdit(item)}
                                                        className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center hover:bg-amber-100 transition-colors">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                    </button>
                                                    <button type="button" onClick={() => handleDelete(item.id)}
                                                        className="w-8 h-8 rounded-lg bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-100 transition-colors">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-12 text-center text-gray-400 dark:text-gray-500 text-sm">
                                                Belum ada produk. Klik "Tambah Produk" untuk menambahkan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductTableComponents;
