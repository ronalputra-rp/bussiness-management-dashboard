import { useEffect, useState } from "react";
import ProductTableComponents from "../components/ProductTable";
import { showProducts } from "../services/productService";
import { showCategory } from "../services/categoryService";

function ProductsPage() {
    const [products, setProducts] = useState();
    const [categories, setCategories] = useState();
    const [loading, setLoading] = useState(true);

    async function load() {
        setLoading(true);
        try {
            const [productRes, categoryRes] = await Promise.all([showProducts(), showCategory()]);
            setProducts(productRes.data);
            setCategories(categoryRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <ProductTableComponents data={products} categories={categories} onRefresh={load} loading={loading} />
    );
}

export default ProductsPage;
