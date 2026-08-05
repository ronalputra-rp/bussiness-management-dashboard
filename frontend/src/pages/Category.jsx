import { useEffect, useState } from "react";
import CategoryComponent from "../components/CategoryComponent";
import { showCategory } from "../services/categoryService";

function CategoryPage() {
    const [category, setCategory] = useState();
    const [loading, setLoading] = useState(true);

    async function load() {
        setLoading(true);
        try {
            const res = await showCategory();
            setCategory(res.data);
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
        <CategoryComponent data={category} onRefresh={load} loading={loading} />
    );
}

export default CategoryPage;
