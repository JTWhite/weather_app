import Link from "next/link"

const Navbar = () => {
    return (
        <nav>
            <div>Logo Here</div>
            <Link href="/home">Home</Link>
            <Link href="/home/about">About</Link>
            <Link href="/home/more">More</Link>
        </nav>
    )
}

export default Navbar