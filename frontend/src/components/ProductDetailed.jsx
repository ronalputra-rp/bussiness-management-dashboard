import { useState } from "react";
import { updatingProduct } from "../services/productService";

function ProductDetailedComponents({ data }) {
    const [isEdit, setEdit] = useState(false);
    const [nameValue, setName] = useState(data.name);
    const [descriptionValue, setDescription] = useState(data.description);
    const [stockValue, setStock] = useState(data.stock);
    const [priceValue, setPrice] = useState(data.price);

    async function handleUpdate(event) {
        event.preventDefault();
        await updatingProduct(data.id, {
            name: nameValue,
            description: descriptionValue,
            stock: Number(stockValue),
            price: Number(priceValue),
        });
    }

    return (
        <section id="products-detailed-field">
            <section>
                <p>Nama Produk : {data.name}</p>
            </section>
            <section>Kategori : {data.category?.category ?? data.categoryId}</section>
            <section>Deskripsi Produk : {data.description}</section>
            <section>Stok : {data.stock}</section>
            <section>Harga : {data.price}</section>
            <button type="button" id="edit-product-button" onClick={() => setEdit(!isEdit)}>
                Edit Produk
            </button>
            {isEdit && (
                <form action="" method="post" id="update-product" onSubmit={handleUpdate}>
                    <section id="form-name">
                        <label htmlFor="name">Nama Produk : </label>
                        <input type="text" name="name" value={nameValue} onChange={(e) => setName(e.target.value)} id="name-product-input" />
                    </section>
                    <section id="form-description">
                        <label htmlFor="description">Deskripsi Produk : </label>
                        <input type="text" name="description" value={descriptionValue} onChange={(e) => setDescription(e.target.value)} id="description-product-input" />
                    </section>
                    <section id="form-stock">
                        <label htmlFor="stock">Stok : </label>
                        <input type="number" name="stock" value={stockValue} onChange={(e) => setStock(e.target.value)} id="stock-product-input" />
                    </section>
                    <section id="form-price">
                        <label htmlFor="price">Harga : </label>
                        <input type="number" name="price" value={priceValue} onChange={(e) => setPrice(e.target.value)} id="price-product-input" />
                    </section>
                    <button type="submit" id="save-product-button">Save</button>
                </form>
            )}
        </section>
    );
}

export default ProductDetailedComponents;
