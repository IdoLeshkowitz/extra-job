'use client'
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {Area, JobListing, PositionScope, Profession} from "@prisma/client";
import {useRouter} from "next/navigation";
import {number, object, string} from 'yup';
import {useFormik} from "formik";
import {fetcher} from "@/lib/api/fetcher";

const getAreas = async (): Promise<{ data: { areas: Area[] } }> => {
    const res = await fetch('/api/area')
    if (!res.ok) {
        return Promise.reject(await res.json())
    }
    return await res.json()
}
const getProfessions = async (): Promise<{ data: { professions: Profession[] } }> => {
    const res = await fetch('/api/profession')
    if (!res.ok) {
        return Promise.reject(await res.json())
    }
    return await res.json()
}
const getPositionScopes = async (): Promise<{ data: { positionScopes: PositionScope[] } }> => {
    const res = await fetch('/api/positionscope')
    if (!res.ok) {
        return Promise.reject(await res.json())
    }
    return await res.json()
}
const validationSchema = object({
    name           : string().required('שדה חובה').max(20, 'שם יכול להכיל עד 20 תווים'),
    description    : string().required('שדה חובה').max(1000, 'תיאור יכול להכיל עד 1000 תווים'),
    serialNumber   : number().required('שדה חובה'),
    areaId         : string().required('שדה חובה'),
    professionId   : string().required('שדה חובה'),
    positionScopeId: string().required('שדה חובה'),
})
export default function CreateJobListingPage() {
    const router = useRouter()
    const [areas, setAreas] = useState<Area[]>([])
    const [professions, setProfessions] = useState<Profession[]>([])
    const [positionScopes, setPositionScopes] = useState<PositionScope[]>([])
    useEffect(() => {
        Promise.all([getAreas(), getProfessions(), getPositionScopes()])
            .then(([{data: {areas}}, {data: {professions}}, {data: {positionScopes}}]) => {
                setAreas(areas)
                setProfessions(professions)
                setPositionScopes(positionScopes)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])
    const formik = useFormik({
        initialValues: {
            name           : '',
            description    : '',
            serialNumber   : '',
            areaId         : '',
            professionId   : '',
            positionScopeId: '',
        },
        validationSchema,
        onSubmit     : async (values) => {
            try {
                const {data} = await fetcher({
                    url   : '/api/joblisting',
                    method: 'POST',
                    body  : {...values},
                    json  : true,
                }) as { data: { jobListing: JobListing } }
            } catch (e) {
                console.log(e)
            }
        }
    })
    console.log(formik.errors)
    return (
        <Container className='mb-md-4 '>
            <Row>
                <form onSubmit={formik.handleSubmit}>
                    <Col xs={12} lg={12}>
                        {/* Title */}
                        <div className='mb-4'>
                            <h1 className='h2 text-light mb-0'>פרסם משרה</h1>
                        </div>

                        {/* Basic info */}
                        <Card className='card-light card-body border-0 shadow-sm p-4 mb-4' id='basic-info'>
                            <h2 className='h4 text-light mb-4'>
                                <i className='fi-info-circle text-primary fs-5 mt-n1 me-2'></i>
                                פרטים כלליים
                            </h2>
                            {/*JOB LISTING NAME*/}
                            <Form.Group controlId='sc-title' className='mb-3'>
                                <Form.Label className='text-light'>
                                    שם המשרה
                                    <span className='ms-1 text-danger'>*</span>
                                </Form.Label>
                                <Form.Control
                                    className='form-control-light'
                                    placeholder='הכנס שם'
                                    name="name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                                {
                                    formik.touched.name && formik.errors.name &&
                                    <span className='form-text text-light opacity-50'>{formik.errors.name}</span>
                                }
                            </Form.Group>

                            {/*JOB LISTING DESCRIPTION*/}
                            <Form.Group controlId='sc-description' className='border-top border-light mt-2 pt-4'>
                                <Form.Label className='text-light'>
                                    תיאור המשרה
                                </Form.Label>
                                <Form.Control
                                    className='form-control-light'
                                    as='textarea'
                                    rows={5}
                                    placeholder='הכנס תיאור'
                                    name="description"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                />
                                {
                                    formik.touched.description && formik.errors.description &&
                                    <span className='form-text text-light opacity-50'>{formik.errors.name}</span>
                                }
                            </Form.Group>

                            {/*JOB LISTING SERIAL NUMBER */}
                            <Form.Group controlId='sc-description' className='border-top border-light mt-2 pt-4'>
                                <Form.Label className='text-light'>
                                    מספר סידורי
                                </Form.Label>
                                <Form.Control
                                    className='form-control-light'
                                    placeholder='הכנס מספר סידורי'
                                    name="serialNumber"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.serialNumber}
                                />
                                {
                                    formik.touched.serialNumber && formik.errors.serialNumber &&
                                    <span className='form-text text-light opacity-50'>
                                        {formik.errors.serialNumber}
                                    </span>
                                }
                            </Form.Group>
                        </Card>


                        {/* Area */}
                        <Card className='card-light card-body border-0 shadow-sm p-4 mb-4' id='vehicle-info'>
                            <h2 className='h4 text-light mb-4'>
                                <i className='fi-car text-primary fs-5 mt-n1 me-2'></i>
                                איזור
                            </h2>
                            <div className='border-top border-light mt-2 pt-4'>
                                <Row className='pb-2'>
                                    <Col xs={12} md={6}>
                                        <Form.Group controlId='sc-body' className='mb-3'>
                                            <Form.Select
                                                className='form-select-light'
                                                placeholder='בחר איזור'
                                                name="areaId"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.areaId}
                                            >
                                                <option value='' disabled>בחר איזור</option>
                                                {
                                                    areas.map((area, index) =>
                                                        <option key={index} value={area.id}>{area.name}</option>)
                                                }
                                            </Form.Select>
                                            {
                                                formik.touched.areaId && formik.errors.areaId &&
                                                <span className='form-text text-light opacity-50'>
                                                    {formik.errors.areaId}
                                                </span>
                                            }
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        </Card>

                        {/*Profession*/}
                        <Card className='card-light card-body border-0 shadow-sm p-4 mb-4' id='vehicle-info'>
                            <h2 className='h4 text-light mb-4'>
                                <i className='fi-car text-primary fs-5 mt-n1 me-2'></i>
                                מקצוע
                            </h2>
                            <div className='border-top border-light mt-2 pt-4'>
                                <Row className='pb-2'>
                                    <Col xs={12} md={6}>
                                        <Form.Group controlId='sc-body' className='mb-3'>
                                            <Form.Select
                                                className='form-select-light'
                                                name="professionId"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.professionId}
                                                placeholder='בחר מקצוע'
                                            >
                                                <option value='' disabled>בחר מקצוע</option>
                                                {
                                                    professions.map((profession, index) =>
                                                        <option key={index} value={profession.id}>
                                                            {profession.name}
                                                        </option>
                                                    )
                                                }
                                            </Form.Select>
                                            {
                                                formik.touched.professionId && formik.errors.professionId &&
                                                <span className='form-text text-light opacity-50'>
                                                        {formik.errors.professionId}
                                                        </span>
                                            }
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        </Card>

                        {/*Employment Scope */}
                        <Card className='card-light card-body border-0 shadow-sm p-4 mb-4' id='vehicle-info'>
                            <h2 className='h4 text-light mb-4'>
                                <i className='fi-car text-primary fs-5 mt-n1 me-2'></i>
                                היקף משרה
                            </h2>
                            <div className='border-top border-light mt-2 pt-4'>
                                <Row className='pb-2'>
                                    <Col xs={12} md={6}>
                                        <Form.Group controlId='sc-body' className='mb-3'>
                                            <Form.Select
                                                className='form-select-light'
                                                name="positionScopeId"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.positionScopeId}
                                                placeholder='בחר היקף משרה'
                                            >
                                                <option value='' disabled>בחר היקף משרה</option>
                                                {
                                                    positionScopes.map((positionScope, index) =>
                                                        <option key={index} value={positionScope.id}>
                                                            {positionScope.name}
                                                        </option>
                                                    )
                                                }
                                                {
                                                    formik.touched.positionScopeId && formik.errors.positionScopeId &&
                                                    <span className='form-text text-light opacity-50'>
                                                        {formik.errors.positionScopeId}
                                                        </span>
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                        {/* Footer (Action buttons) */}
                        <div className='d-sm-flex justify-content-between pt-2'>
                            <Button size='lg' variant='outline-light' className='d-block ps-3 mb-3 mb-sm-2'
                                    type="submit">
                                <i className='fi-plus-circle me-2'></i>
                                הוסף משרה
                            </Button>
                        </div>
                    </Col>
                </form>
            </Row>
        </Container>
    )

}