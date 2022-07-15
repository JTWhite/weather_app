import Link from "next/link"

const Navbar = () => {
    return (
        <nav>
            <div>Logo Here</div>
            <Link href="/home"><a>Home</a></Link>
            <Link href="/home/about"><a>About</a></Link>
            <Link href="/home/more"><a>More</a></Link>
        </nav>
    )
}

export default Navbar