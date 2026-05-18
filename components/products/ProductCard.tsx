import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({product}: {product: any}) {
    
    return (
        <Link href={`/products/${product.id}`}>
            <li>
                <Image 
                    src={product.thumbnail}
                    width={256}
                    height={256}
                    alt={`Image of ${product.title}`}
                />

                <div>
                    <h3>{product.title}</h3>
                    <p>{product.price}</p>
                </div>
            </li>
        </Link>
    )
}