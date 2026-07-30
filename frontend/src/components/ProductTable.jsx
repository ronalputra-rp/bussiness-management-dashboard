import { useState } from "react";
import { creatingProduct } from "../services/productService";
import { EditableRoot,EditableArea,EditablePreview,EditableInput } from "@inline-edit/react";

function ProductTableComponents({ data }) {
    const [openForm, isOpenForm] = useState(false);
    const [nameValue, setName] = useState(data.name);
    const [categoryValue, setCategory] = useState(data.categoryId);
    const [descriptionValue, setDescription] = useState(data.descriptionValue);
    const [stockValue, setStock] = useState(data.stock);
    const [priceValue, setPrice] = useState(data.price);
    const [createdAt, setCreate] = useState(data.createdAt);
    const [updatedAt, setUpdate] = useState(data.updatedAt);
    async function handleCreate() {
        await creatingProduct({
            name: nameValue,
            category: categoryValue,
            description: descriptionValue,
            stock: stockValue,
            price: priceValue,
            createdAt: createdAt,
            updatedAt: updatedAt,
        });
    }

    // ada dua macam output, product without id dan product with id
    // nanti dibuat semacam row thumbnail, jika di klik endpoint ganti ke product with id,
    // kalau tidak stay di tampilan product without id
    return (
        <section>
            <section id="products-create">
                <button type="button" id="add-product-button" onClick={() => isOpenForm(!openForm)}>
                    Add Product
                </button>
                {openForm && (
                    <form action="" method="post" id="create-product">
                        <section id="form-name">
                            <label htmlFor="name">Nama Produk</label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) => setName(e.target.value)}
                                id="name-product-input"
                                required
                            />
                        </section>
                        <section id="category-selection">
                            <label htmlFor="category">Kategori</label>
                            {/* harus buat category service terlebih dahulu */}
                            <select name="category" id="category-option">
                                <option value={data.categoryId} onChange={(e) => setCategory(e.target.value)}>
                                    Makanan
                                </option>
                            </select>
                        </section>
                        <section id="form-description">
                            <label htmlFor="description">Deskripsi</label>
                            <input
                                type="text"
                                name="description"
                                value={data.description}
                                onChange={(e) => setDescription(e.target.value)}
                                id="description-product-input"
                            />
                        </section>
                        <section id="form-stock">
                            <label htmlFor="stock">Stok</label>
                            <input
                                type="number"
                                name="stock"
                                value={data.stock}
                                onChange={(e) => setStock(e.target.value)}
                                id="stock-product-input"
                            />
                        </section>
                        <section id="form-price">
                            <label htmlFor="price">Harga</label>
                            <input
                                type="number"
                                name="price"
                                value={data.price}
                                onChange={(e) => setPrice(e.target.value)}
                                id="price-product-input"
                            />
                        </section>
                        <section id="form-created-at">
                            <label htmlFor="created-at">Dibuat pada</label>
                            <input
                                type="date"
                                name="createdAt"
                                value={data.createdAt}
                                onChange={(e) => setCreate(e.target.value)}
                                id="create-product-input"
                            />
                        </section>
                        <section id="form-updated-at">
                            <label htmlFor="updated-at">Diubah pada</label>
                            <input
                                type="date"
                                name="updatedAt"
                                value={data.updatedAt}
                                onChange={(e) => setUpdate(e.target.value)}
                                id="update-product-input"
                            />
                        </section>
                        <button type="submit" onSubmit={handleCreate}>
                            Save Product
                        </button>
                    </form>
                )}
            </section>

            <a id="products-field">
                <section>
                    <p>Nama Produk : {data.name}</p>
                </section>
                <section>Kategori : {data.categoryId}</section>
                <section>Deskripsi Produk : {data.description}</section>
                <section>Stok : {data.stock}</section>
                <section>Harga : {data.price}</section>
                <section>Dibuat pada : {data.createdAt}</section>
                <section>Diubah pada : {data.updatedAt}</section>
            </a>
        </section>
    );
}

export default ProductTableComponents;
