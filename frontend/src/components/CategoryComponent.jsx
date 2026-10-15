import { useState, useEffect, useRef } from "react";
import { addCategory, updateCategory, deleteCategory } from "../services/categoryService";
import ModalWrapper from "./ModalWrapper";

function IconTag({ className = "w-5 h-5" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
    );
}

// - Background putih, border tipis abu default
// - Border hijau saat fokus, merah saat error
// - Icon kiri, tombol clear kanan
function PillInput({ id, value, onChange, onClear, placeholder, error, autoFocus }) {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [autoFocus]);

    const ringClass = error
        ? "border-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.15)]"
        : focused
        ? "border-[#2563eb] shadow-[0_0_0_3px_rgba(37,99,235,0.12)]"
        : "border-gray-200";

    return (
        <div
            className={`flex items-center gap-3 bg-white dark:bg-gray-700 rounded-full px-4 py-3.5 border transition-all duration-200 ${ringClass}`}
        >
            <IconTag
                className={`w-5 h-5 shrink-0 transition-colors duration-200 ${
                    error ? "text-red-400" : focused ? "text-[#2563eb]" : "text-gray-400"
                }`}
            />
            <input
                ref={inputRef}
                id={id}
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none"
                autoComplete="off"
            />
            {/* Clear / chevron button di kanan */}
            {value ? (
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={onClear}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Hapus teks"
                >
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

function AddCategoryModal({ onClose, onSave }) {
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!category.trim()) {
            setError("Nama kategori tidak boleh kosong.");
            return;
        }
        setLoading(true);
        try {
            await onSave(category.trim());
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ModalWrapper onClose={onClose} maxWidth="max-w-sm">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#dbeafe] flex items-center justify-center">
                            <IconTag className="w-5 h-5 text-[#2563eb]" />
                        </div>
                        <div>
                            <p className="text-base font-bold text-gray-800 dark:text-white">Tambah Kategori</p>
                            <p className="text-xs text-gray-400">Isi nama kategori baru</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Tutup"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="modal-category-input" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                            Nama Kategori
                        </label>
                        <PillInput
                            id="modal-category-input"
                            value={category}
                            onChange={(e) => { setCategory(e.target.value); setError(""); }}
                            onClear={() => { setCategory(""); setError(""); }}
                            placeholder="Contoh: Elektronik, Pakaian..."
                            error={!!error}
                            autoFocus
                        />
                        {error && (
                            <p className="mt-2 text-xs text-red-500 flex items-center gap-1 pl-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3 pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-full border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 rounded-full bg-[#2563eb] text-white text-sm font-semibold hover:bg-[#1d4ed8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
        </ModalWrapper>
    );
}

function Skeleton() {
    return (
        <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded-2xl" />
            ))}
        </div>
    );
}

function CategoryCard({ item, editingId, editValue, onEditStart, onEditChange, onEditSave, onEditCancel, onDelete }) {
    const isEditing = editingId === item.id;
    const [focused, setFocused] = useState(false);

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-2xl border transition-all duration-200 ${isEditing ? "border-[#2563eb] shadow-md" : "border-gray-100 dark:border-gray-700 hover:shadow-sm hover:-translate-y-0.5"}`}>
            {isEditing ? (
                <div className="p-4 space-y-3">
                    <p className="text-xs font-semibold text-[#2563eb] uppercase tracking-wide">Edit Kategori</p>
                    {/* Pill input inline untuk edit */}
                    <div
                        className={`flex items-center gap-2 bg-white dark:bg-gray-700 rounded-full px-4 py-2.5 border transition-all duration-200 ${
                            focused ? "border-[#2563eb] shadow-[0_0_0_3px_rgba(37,99,235,0.12)]" : "border-gray-200 dark:border-gray-600"
                        }`}
                    >
                        <IconTag className="w-4 h-4 text-[#2563eb] shrink-0" />
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => onEditChange(e.target.value)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-100 outline-none"
                            autoFocus
                        />
                        {editValue && (
                            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => onEditChange("")} className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => onEditSave(item.id)}
                            className="flex-1 bg-[#2563eb] text-white text-sm font-medium py-2 rounded-full hover:bg-[#1d4ed8] transition-colors"
                        >
                            Simpan
                        </button>
                        <button
                            type="button"
                            onClick={onEditCancel}
                            className="flex-1 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm font-medium py-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            Batal
                        </button>
                    </div>
                </div>
            ) : (
                <div className="p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#dbeafe] flex items-center justify-center shrink-0">
                        <IconTag className="w-4 h-4 text-[#2563eb]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{item.category}</p>
                        <p className="text-xs text-gray-400">ID #{item.id}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                        <button
                            type="button"
                            onClick={() => onEditStart(item)}
                            aria-label="Edit kategori"
                            className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center hover:bg-amber-100 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => onDelete(item.id)}
                            aria-label="Hapus kategori"
                            className="w-8 h-8 rounded-lg bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-100 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function CategoryComponent({ data, onRefresh, loading }) {
    const [isOpen, setOpen] = useState(false);
    const [category, setCategory] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });

    function showMessage(type, text) {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }

    async function saveCategory(value) {
        await addCategory({ category: value });
        setCategory("");
        showMessage("success", "Kategori berhasil ditambahkan.");
        onRefresh();
    }

    async function saveEdit(id) {
        try {
            await updateCategory(id, { category: editValue });
            setEditingId(null);
            showMessage("success", "Kategori berhasil diubah.");
            onRefresh();
        } catch (err) {
            showMessage("error", err.response?.data?.message || err.message);
        }
    }

    async function handleDelete(id) {
        try {
            await deleteCategory(id);
            showMessage("success", "Kategori berhasil dihapus.");
            onRefresh();
        } catch (err) {
            showMessage("error", err.response?.data?.message || err.message);
        }
    }

    return (
        <>
            {/* Modal */}
            {isOpen && (
                <AddCategoryModal
                    onClose={() => setOpen(false)}
                    onSave={saveCategory}
                />
            )}

            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Category</h1>
                        <p className="text-sm text-gray-400 mt-0.5">
                            {data ? `${data.length} kategori terdaftar` : "Kelola kategori produk"}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563eb] text-white text-sm font-medium hover:bg-[#1d4ed8] transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Kategori
                    </button>
                </div>

                {/* Toast Notification */}
                {message.text && (
                    <div
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium ${
                            message.type === "error"
                                ? "bg-red-50 dark:bg-red-900/30 text-red-700 border border-red-100 dark:border-red-900/50"
                                : "bg-[#dbeafe] dark:bg-blue-900/40 text-[#2563eb] border border-[#93c5fd]"
                        }`}
                    >
                        {message.type === "error" ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                        {message.text}
                    </div>
                )}

                {/* Category Grid */}
                {loading ? (
                    <Skeleton />
                ) : data && data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {data.map((item) => (
                            <CategoryCard
                                key={item.id}
                                item={item}
                                editingId={editingId}
                                editValue={editValue}
                                onEditStart={(i) => { setEditingId(i.id); setEditValue(i.category); }}
                                onEditChange={(val) => setEditValue(val)}
                                onEditSave={saveEdit}
                                onEditCancel={() => setEditingId(null)}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-2xl py-16 flex flex-col items-center gap-3 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-[#dbeafe] dark:bg-blue-900/40 flex items-center justify-center">
                            <IconTag className="w-7 h-7 text-[#2563eb]" />
                        </div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Belum ada kategori</p>
                        <p className="text-xs text-gray-400 max-w-xs">
                            Klik "Tambah Kategori" di atas untuk mulai menambahkan kategori produk.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

export default CategoryComponent;
