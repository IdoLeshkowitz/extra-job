'use client'
import Form from "react-bootstrap/Form";
import {FC, FormEventHandler, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {Area} from "lib/models/area/schema";

interface NewAreaFormParams {
    allAreas: Area[]
}

const NewAreaForm: FC<NewAreaFormParams> = (props) => {
    const {allAreas}= props
    const [newArea, setNewArea] = useState<Area | null>(null)
    const router = useRouter()
    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault()
        if (!newArea) {
            return
        }
        const res = await fetch('http://localhost:3001/api/area', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({...newArea})
        })
        if (!res.ok) {
            throw new Error('failed to add area')
        }
        setNewArea(null)
        router.refresh()
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5><label htmlFor="new-area-input" className="card-title">הוסף אזור</label></h5>
                    <form className="needs-validation p-3" noValidate onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <input className="form-control" type="text" id="new-area-input" placeholder="אזור חדש"
                                       value={newArea?.name || ''} required onChange={(event)=>setNewArea({name: event.target.value})} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>
                        </div>
                        <button className="btn btn-sm btn-primary" type="submit">Submit Form</button>
                    </form>
                </div>
            </div>
            </>)}
export default NewAreaForm