export default async function ProfessionPage({searchParams}: { searchParams: any }) {
    // const [skip, take]: number[] = [searchParams.skip ?? 0, searchParams.take ?? 5].map((param) => parseInt(param))
    // const {data : {professions,count}} = await getProfessionsAndCount({skip, take})
    // return (
    //     <>
    //         <h1 className='h2 text-light'>מקצועות</h1>
    //         <div className="row pt-2 bg-dark">
    //             <div className="col-sm-12 col-md-12 col-lg-11 bg-dark">
    //                 <div className="card bg-dark">
    //                     <ul className="list-group list-group-flush">
    //                         <AddProfessionRow/>
    //                         {professions.map((profession) => (
    //                             <ProfessionRow key={profession.id} profession={{...profession, createdAt: profession.createdAt.toISOString()}}/>
    //                         ))}
    //                     </ul>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="row pt-2 bg-dark"><CustomPagination count={count} skip={skip} take={take}/></div>
    //     </>
    // )
}