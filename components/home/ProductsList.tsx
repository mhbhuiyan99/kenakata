import ProductCard from '@/components/products/ProductCard';

export default async function ProductsList() {
    const data = await fetch('https://dummyjson.com/products');
    const products = await data.json();

    return (
        <ul>
            {
                products.products.map((product: any) => (
                    <ProductCard key={product.id} product={product}/>
                ))
            }
        </ul>
    )
}