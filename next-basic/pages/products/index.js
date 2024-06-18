import styles from "@/styles/Product.module.css";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
// https://dummyjson.com/products?limit=10
export async function getStaticProps() {
    const res = await fetch("https://dummyjson.com/products?limit=10");
    const data = await res.json();
    return {
        props: {
            products: data.products
        }
    }
}
export default function Index({ products }) {
    return (
    <>
        <Head>
            <title>Products | NextJS</title>
        </Head>
        <div className={styles.container}>
            {products.map((product) => (
                <div className={styles.card} key={product.id}>
                    <Link href={`/products/${product.id}`}>
                        <h2>{product.title}</h2>
                        <Image src={product.thumbnail} alt={product.title} width={200} height={200} />
                        <p>{product.description}</p>
                        <p>{product.price}$</p>
                    </Link>
                </div>
            ))}
        </div>
    </>
    );
}