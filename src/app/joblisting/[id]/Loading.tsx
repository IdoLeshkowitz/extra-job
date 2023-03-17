export default function Loading() {
    return (
        <div className='container mt-2 border border-light rounded-3 col-md-11' style={{direction: 'rtl'}}>
            <div className="row justify-content-center">
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}