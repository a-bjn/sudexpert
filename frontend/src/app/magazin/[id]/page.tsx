"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    stock: number;
};

export default function ProductDetails() {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { addItem } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await api.products.getById(params.id as string);
                setProduct(data);
            } catch (err: any) {
                setError("Nu s-a putut încărca produsul.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchProduct();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                {error || "Produsul nu a fost găsit."}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <Link
                    href="/magazin"
                    className="inline-flex items-center text-sm text-neutral-500 hover:text-orange-600 mb-8"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Înapoi la magazin
                </Link>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
                    {/* Image */}
                    <div className="aspect-square w-full overflow-hidden rounded-lg bg-neutral-100">
                        {product.imageUrl ? (
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="h-full w-full object-cover object-center"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-neutral-400">
                                No Image
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            {product.name}
                        </h1>

                        <div className="mt-3">
                            <p className="text-3xl tracking-tight text-gray-900">
                                {product.price} RON
                            </p>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Descriere</h3>
                            <div className="space-y-6 text-base text-gray-700">
                                <p>{product.description}</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center">
                                <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {product.stock > 0 ? `În stoc (${product.stock} buc.)` : 'Stoc epuizat'}
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 flex">
                            <button
                                onClick={() => addItem(product)}
                                disabled={product.stock <= 0}
                                className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-50 disabled:cursor-not-allowed sm:w-full"
                            >
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Adaugă în coș
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
