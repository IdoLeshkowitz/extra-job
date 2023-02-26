'use client'
import {useEffect, useState} from 'react'
import JobBoardAccountLayout from '@/partials/JobBoardAccountLayout'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {Area} from "../../../../lib/models/area/schema";
import AddAreaModal from "@/partials/AddAreaModal";
import SignInModalLight from "@/partials/SignInModalLight";

const AreasPanel = () => {
    const [areas, setAreas] = useState<Area[] | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    useEffect(() => {
        fetch('/api/area')
            .then(res => res.json())
            .then(json => setAreas(json.data))

    }, [])

    async function handleDelete(id: string) {
        const currentAreas = areas
        const filteredAreas = areas?.filter((area) => {
            const areaId = area._id as unknown as string
            return areaId !== id
        })
        setAreas(filteredAreas || [])
        const res = await fetch(`/api/area/${id}`, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
        })
        if (!res.ok) {
            setAreas(currentAreas)
            throw new Error('failed to delete area')
        }
    }

    function handleModalOpen() {
        setModalOpen(true)
    }
    function onAdd (area: Area) {
        setAreas([...areas || [], area])
        setModalOpen(false)
    }
    return (
        <>
            {modalOpen &&
                <AddAreaModal
                    onAdd={onAdd}
                    areas = {areas}
                    pillButtons={true}
                    show={() => {}}
                    onHide={() => setModalOpen(false)}
                />}
            <main className="page-wrapper">
                <JobBoardAccountLayout
                    accountPageTitle='אזורים'
                    activeAccountNav='/admin/all-areas'
                >
                    {/* Page title */}
                    <div className='d-flex align-items-center justify-content-between py-4 mt-3 mb-2'>
                        <h1 className='h3 mb-0'>אזורים</h1>
                    </div>

                    <Row>
                        {/* Sidebar */}
                        <Col as='aside' xs={12} md={3} className='mb-4 pb-3 pb-md-0'>
                            <div style={{maxWidth: '13rem'}}>
                                <Button onClick={handleModalOpen} variant='primary rounded-pill w-100'>
                                    <i className='fi-plus fs-sm me-2'></i>
                                    הוסף אזור
                                </Button>
                            </div>
                        </Col>

                        {/* List of areas */}
                        <Col xs={12} md={9} className='mt-n2'>
                            {areas?.map((area) => (
                                <div className="card my-3" key={area._id as unknown as string}>
                                    <div className="card-body">
                                        <h5 className="card-title">{area.name}</h5>
                                        <button onClick={() => handleDelete(area._id as unknown as string)}
                                                className="btn btn-sm btn-primary"><i className='fi-trash me-2'></i>מחק
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </Col>
                    </Row>
                </JobBoardAccountLayout>
            </main>
        </>
    )
}

export default AreasPanel
