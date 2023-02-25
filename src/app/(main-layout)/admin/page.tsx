import Link from "next/link";

export default function Admin(){
    return (
        <div className="admin">
            <h1>Hello Admin</h1>
            <ul className="btn-group">
                <Link href='admin/area'><li className="btn btn-primary">area</li></Link>
                <li className="btn btn-primary">Categories table</li>
                <li className="btn btn-primary">Job Providers table</li>
                <li className="btn btn-primary">Job listing table</li>
            </ul>
        </div>
    )
}