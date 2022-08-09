import Link from "next/link"

const Navbar = () => {
    return (
        <nav>
            <div>Logo Here</div>
            <Link href="/home"><a>Home</a></Link>
            <Link href="/home/about"><a>About</a></Link>
            <Link href="/home/more"><a>More</a></Link>
            <Link href="/home/Todo/todo"><a>ToDo</a></Link>
            <Link href="/home/Todo/add-todo"><a>Add ToDo</a></Link>
        </nav>
    )
}

export default Navbar