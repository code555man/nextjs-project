import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Detail.module.css';

export async function getStaticPaths() {

    const res = await fetch("https://dummyjson.com/products?limit=10");
    const data = await res.json();

    const paths = data.products.map((product) => ({
        params: { id: product.id.toString() },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps(params) {

    const id = params.params.id;
    const res = await fetch("https://dummyjson.com/products/" + id);
    const data = await res.json();
    return {
        props: {
            product: data
        }
    }
}
export default function Product({product}) {

    return (
        <>
            <Head>
                <title>{product.title} | NextJS</title>
            </Head>
            <div className={styles.container}>
                <div>
                    <Image src={product.thumbnail} alt={product.title} width={200} height={200} />
                </div>
                <div className={styles.detail}>
                    <h1>Product {product.title}</h1>
                    <p>Price {product.price}$</p>
                    <p>Category {product.category}</p>
                    <p>Description  {product.description}</p>
                </div>

            </div>
        </>
    )
}