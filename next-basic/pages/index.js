import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page | NextJS</title>

      </Head>
      <main className={styles.container}>
        <h1>Home Page</h1>
        <Image src="/next.svg" alt="Next.js Logo" width={200} height={160} />
      </main>
    </>
  );
}
