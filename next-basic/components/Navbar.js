import Link from "next/link";
import Image from "next/image";
export default function Navbar() {
    return (
        <nav>
            <div className="vercelLogo">
                <Link href="/">
                    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                </Link>
            </div>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/products">Products</Link>  
        </nav>
    );
}