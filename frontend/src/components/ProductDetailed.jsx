import { useState } from "react";
import { updatingProduct } from "../services/productService";
import { EditableRoot, EditableArea, EditablePreview, EditableInput } from "@inline-edit/react";

function ProductDetailedComponents({ data }) {
    return (
        <section id="products-detailed-field">
            <section>
                <p>Nama Produk : {data.name}</p>
                <EditableRoot
                    defaultValue={String(data.name)}
                    activationMode="dblclick"
                    submitMode="both"
                    onSubmit={(val) => updatingProduct(data.id, { name: val })}
                >
                    <EditableArea>
                        <EditablePreview />
                        <EditableInput />
                    </EditableArea>
                </EditableRoot>
            </section>
            <section>
                <p>Kategori : {data.categoryId}</p>
                <EditableRoot
                    defaultValue={data.categoryId}
                    activationMode="dblclick"
                    submitMode="both"
                    onSubmit={(val) => updatingProduct(data.id, { NumbcategoryId: Number(val) })}
                >
                    <EditableArea>
                        <EditablePreview />
                        <EditableInput />
                    </EditableArea>
                </EditableRoot>
            </section>
            <section>
                <p>Deskripsi Produk : {data.description}</p>
                <EditableRoot
                    defaultValue={String(data.description)}
                    activationMode="dblclick"
                    submitMode="both"
                    onSubmit={(val) => updatingProduct(data.id, { description: val })}
                >
                    <EditableArea>
                        <EditablePreview />
                        <EditableInput />
                    </EditableArea>
                </EditableRoot>
            </section>
            <section>
                <p>Stok : {data.stock}</p>
                <EditableRoot
                    defaultValue={data.stock}
                    activationMode="dblclick"
                    submitMode="both"
                    onSubmit={(val) => updatingProduct(data.id, { stock: Number(val) })}
                >
                    <EditableArea>
                        <EditablePreview />
                        <EditableInput />
                    </EditableArea>
                </EditableRoot>
            </section>
            <section>
                <p>Harga : {data.price}</p>
                <EditableRoot
                    defaultValue={data.price}
                    activationMode="dblclick"
                    submitMode="both"
                    onSubmit={(val) => updatingProduct(data.id, { price: Number(val) })}
                >
                    <EditableArea>
                        <EditablePreview />
                        <EditableInput />
                    </EditableArea>
                </EditableRoot>
            </section>
            <section>
                <p>Dibuat pada : {data.createdAt}</p>
                <EditableRoot
                    defaultValue={data.createdAt}
                    activationMode="dblclick"
                    submitMode="both"
                    onSubmit={(val) => updatingProduct(data.id, { createdAt: val })}
                >
                    <EditableArea>
                        <EditablePreview />
                        <EditableInput />
                    </EditableArea>
                </EditableRoot>
            </section>
            <section>
                <p>Diubah pada : {data.updatedAt}</p>
                <EditableRoot
                    defaultValue={data.updatedAt}
                    activationMode="dblclick"
                    submitMode="both"
                    onSubmit={(val) => updatingProduct(data.id, { updatedAt: val })}
                >
                    <EditableArea>
                        <EditablePreview />
                        <EditableInput />
                    </EditableArea>
                </EditableRoot>
            </section>
        </section>
    );
}
