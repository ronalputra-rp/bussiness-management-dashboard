import { useEffect, useState } from "react";
import TransactionHeaderComponent from "../components/TransactionHeader";
import TransactionDetailedComponent from "../components/TransactionsDetailed";
import { getHeaderTransactions, getDetailedTransactions } from "../services/transactionService";
import { showProducts } from "../services/productService";

function TransactionsPage() {
    const [headers, setHeaders] = useState();
    const [products, setProducts] = useState();
    const [selectedId, setSelectedId] = useState();
    const [details, setDetails] = useState();

    async function refreshHeaders() {
        try {
            const res = await getHeaderTransactions();
            setHeaders(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    async function refreshDetails() {
        if (selectedId === undefined) return;
        try {
            const res = await getDetailedTransactions(selectedId);
            setDetails(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        refreshHeaders();
        showProducts()
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));
    }, []);

    function openTransaction(id) {
        setSelectedId(id);
        setDetails(undefined);
        getDetailedTransactions(id)
            .then((res) => setDetails(res.data))
            .catch((err) => {
                console.error(err);
                return err;
            });
    }

    function closeTransaction() {
        setSelectedId(undefined);
        setDetails(undefined);
    }

    const selectedHeader = selectedId !== undefined && headers
        ? headers.find((item) => item.id === selectedId)
        : undefined;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-bold text-gray-800">Transactions</h1>
                <p className="text-sm text-gray-400 mt-0.5">Kelola dan pantau transaksi</p>
            </div>
            <div className={selectedId !== undefined ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : ""}>
                <TransactionHeaderComponent data={headers} selectedId={selectedId} onOpen={openTransaction} onRefresh={refreshHeaders} />
                {selectedId !== undefined && (
                    <TransactionDetailedComponent
                        header={selectedHeader}
                        transactionId={selectedId}
                        products={products}
                        details={details}
                        onRefresh={refreshDetails}
                        onClose={closeTransaction}
                    />
                )}
            </div>
        </div>
    );
}

export default TransactionsPage;
