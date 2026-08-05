
function IconRevenue() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function IconBox() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
    );
}

function IconTag() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
    );
}

function IconCart() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    );
}

function IconStock() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    );
}

function IconSold() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    );
}

function IconInventory() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
    );
}

function StatCard({ label, value, icon, accent = false, suffix = "" }) {
    return (
        <div
            className={`rounded-2xl p-5 flex flex-col gap-3 card-hover cursor-default ${
                accent
                    ? "bg-[#2563eb] text-white shadow-lg shadow-blue-200 dark:shadow-blue-900"
                    : "bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-white"
            }`}
        >
            <div className="flex items-center justify-between">
                <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        accent ? "bg-white/20 text-white" : "bg-[#dbeafe] text-[#2563eb]"
                    }`}
                >
                    {icon}
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 ${accent ? "text-white/50" : "text-gray-300"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <div>
                <p className={`text-xs font-medium mb-1 ${accent ? "text-white/70" : "text-gray-400 dark:text-gray-400"}`}>
                    {label}
                </p>
                <p className={`text-2xl font-bold tracking-tight ${accent ? "text-white" : "text-gray-800 dark:text-white"}`}>
                    {value != null ? `${value}${suffix}` : "–"}
                </p>
            </div>
        </div>
    );
}

function SummaryItem({ label, value, colorClass }) {
    return (
        <div className="flex items-center justify-between py-2.5 border-b border-gray-100 dark:border-gray-700 last:border-0">
            <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${colorClass}`} />
                <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
            </div>
            <span className="text-sm font-semibold text-gray-800 dark:text-white">{value ?? "–"}</span>
        </div>
    );
}

function StatusBadge({ status }) {
    if (!status) return <span className="text-gray-400 text-xs">–</span>;

    const map = {
        PAID: "bg-blue-100 text-blue-700",
        paid: "bg-blue-100 text-blue-700",
        PENDING: "bg-yellow-100 text-yellow-700",
        pending: "bg-yellow-100 text-yellow-700",
        CANCELLED: "bg-red-100 text-red-700",
        cancelled: "bg-red-100 text-red-700",
    };

    const cls = map[status] ?? "bg-gray-100 text-gray-600";

    return (
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
            {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
        </span>
    );
}

function formatCurrency(value) {
    if (value == null) return "–";
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return value;
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);
}

function formatDate(value) {
    if (!value) return "–";
    return new Date(value).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

function Skeleton({ className }) {
    return <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`} />;
}

function DashboardComponent({ data }) {
    const recentTx = data?.recentTransactions ?? [];

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                    Hi, Welcome Back! 👋
                </h1>
                <p className="text-sm text-gray-400 dark:text-gray-400 mt-0.5">
                    Berikut ringkasan bisnis Anda hari ini.
                </p>
            </div>

            {/* Stat cards — 2 col mobile, 4 col desktop */}
            {data ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        label="Total Revenue"
                        value={formatCurrency(data.totalRevenue)}
                        icon={<IconRevenue />}
                        accent
                    />
                    <StatCard
                        label="Total Orders"
                        value={data.totalOrders}
                        icon={<IconCart />}
                    />
                    <StatCard
                        label="Items Sold"
                        value={data.totalItemsSold}
                        icon={<IconSold />}
                    />
                    <StatCard
                        label="Total Products"
                        value={data.totalProduct}
                        icon={<IconBox />}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32" />)}
                </div>
            )}

            {/* Middle row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Inventory & Stock summary */}
                <div className="bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-2xl p-5 lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-gray-800 dark:text-white">Ringkasan Inventori</h2>
                        <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-full">Overview</span>
                    </div>

                    {data ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                            <SummaryItem
                                label="Total Stok"
                                value={data.totalStock?.toLocaleString("id-ID")}
                                colorClass="bg-[#2563eb]"
                            />
                            <SummaryItem
                                label="Nilai Inventori"
                                value={formatCurrency(data.totalInventory)}
                                colorClass="bg-blue-400"
                            />
                            <SummaryItem
                                label="Jumlah Kategori"
                                value={data.totalCategory}
                                colorClass="bg-teal-400"
                            />
                            <SummaryItem
                                label="Jumlah Produk"
                                value={data.totalProduct}
                                colorClass="bg-blue-300"
                            />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-8" />)}
                        </div>
                    )}

                    {/* Mini bar chart illustration */}
                    {data && (
                        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <p className="text-xs text-gray-400 mb-3">Distribusi stok per kategori (ilustrasi)</p>
                            <div className="flex items-end gap-1.5 h-16">
                                {[65, 45, 80, 55, 70, 40, 90, 60, 75, 50].map((h, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 rounded-t-sm"
                                        style={{
                                            height: `${h}%`,
                                            backgroundColor: i % 3 === 0 ? "#2563eb" : i % 3 === 1 ? "#60a5fa" : "#dbeafe",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick stats sidebar */}
                <div className="bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-2xl p-5 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-gray-800 dark:text-white">Statistik Cepat</h2>
                    </div>

                    {data ? (
                        <>
                            {/* Donut-style illustration */}
                            <div className="flex flex-col items-center py-2">
                                <div className="relative w-28 h-28">
                                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3" />
                                        <circle
                                            cx="18" cy="18" r="15.9" fill="none"
                                            stroke="#2563eb" strokeWidth="3"
                                            strokeDasharray="70 30"
                                            strokeLinecap="round"
                                        />
                                        <circle
                                            cx="18" cy="18" r="15.9" fill="none"
                                            stroke="#60a5fa" strokeWidth="3"
                                            strokeDasharray="20 80"
                                            strokeDashoffset="-70"
                                            strokeLinecap="round"
                                        />
                                        <circle
                                            cx="18" cy="18" r="15.9" fill="none"
                                            stroke="#dbeafe" strokeWidth="3"
                                            strokeDasharray="10 90"
                                            strokeDashoffset="-90"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-xl font-bold text-gray-800 dark:text-white">{data.totalProduct ?? "–"}</span>
                                        <span className="text-xs text-gray-400">Produk</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
                                    <span className="flex-1">Terjual</span>
                                    <span className="font-semibold text-gray-700 dark:text-gray-200">{data.totalItemsSold ?? "–"}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#60a5fa]" />
                                    <span className="flex-1">Kategori</span>
                                    <span className="font-semibold text-gray-700 dark:text-gray-200">{data.totalCategory ?? "–"}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#dbeafe]" />
                                    <span className="flex-1">Stok Total</span>
                                    <span className="font-semibold text-gray-700 dark:text-gray-200">{data.totalStock ?? "–"}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-3">
                            <Skeleton className="h-28 w-28 mx-auto rounded-full" />
                            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-5" />)}
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-gray-800 dark:text-white">Transaksi Terbaru</h2>
                    <a
                        href="/transactions"
                        className="text-xs text-[#2563eb] font-medium hover:underline"
                    >
                        Lihat semua →
                    </a>
                </div>

                {data ? (
                    recentTx.length > 0 ? (
                        <div className="overflow-x-auto -mx-5 px-5">
                            <table className="w-full min-w-125 text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-gray-700">
                                        <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 pr-4">
                                            ID Transaksi
                                        </th>
                                        <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 pr-4">
                                            Tanggal
                                        </th>
                                        <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 pr-4">
                                            Total
                                        </th>
                                        <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                    {recentTx.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-700/40 transition-colors">
                                            <td className="py-3 pr-4">
                                                <span className="font-mono text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                                                    #{tx.id ?? "–"}
                                                </span>
                                            </td>
                                            <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">
                                                {formatDate(tx.createdAt)}
                                            </td>
                                            <td className="py-3 pr-4 text-right font-semibold text-gray-800 dark:text-white">
                                                {formatCurrency(tx.totalPrice)}
                                            </td>
                                            <td className="py-3">
                                                <StatusBadge status={tx.status} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="py-10 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-200 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p className="text-sm">Belum ada transaksi</p>
                        </div>
                    )
                ) : (
                    <div className="space-y-3">
                        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-10" />)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardComponent;
