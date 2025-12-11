import Link from "next/link";
import { ShoppingCart } from "lucide-react";

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
};

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/magazin/${product.id}`} className="group block">
            <div className="relative overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-md">
                <div className="aspect-square w-full overflow-hidden bg-neutral-100">
                    {product.imageUrl ? (
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-neutral-400">
                            No Image
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-medium text-neutral-900 group-hover:text-orange-600">
                        {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500 line-clamp-2">
                        {product.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-xl font-bold text-neutral-900">
                            {product.price} RON
                        </span>
                        <button className="rounded-full bg-neutral-900 p-2 text-white transition-colors hover:bg-orange-600">
                            <ShoppingCart className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
