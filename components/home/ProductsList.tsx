import ProductCard from '@/components/products/ProductCard';

export default async function ProductsList() {
    const data = await fetch('https://api.escuelajs.co/api/v1/products');
    const products = await data.json();

    return (
        <ul>
            {
                products.map((product: any) => (
                    <ProductCard key={product.id} product={product}/>
                ))
            }
        </ul>
    )
}