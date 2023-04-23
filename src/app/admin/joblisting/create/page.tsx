'use client'
import {Card, Col, Container, Dropdown, Form, Row, SSRProvider} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {Area, PositionScope, Prisma, Profession} from "@prisma/client";
import {useRouter} from "next/navigation";
import {array, number, object, string} from 'yup';
import {useFormik} from "formik";
import PillButton from "@/components/buttons/pillButtons";
import {fetcher} from "../../../../../libs/api/fetcher";
import ToastDismissible from "@/components/toasts/toastDismissible";
import {CustomError} from "@/types/error";

const getAreas = async () => {
    const areaFindManyArgs: Prisma.AreaFindManyArgs = {
        where: {active: true},
    }
    try {
        const {data} = await fetcher<{ areas: Area[] }>({
            url   : `/api/area?areaFindManyArgs=${JSON.stringify(areaFindManyArgs)}`,
            method: 'GET',
            json  : true,
        })
        return data.areas
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
}
const getProfessions = async () => {
    const professionFindManyArgs: Prisma.ProfessionFindManyArgs = {
        where: {active: true},
    }
    try {
        const {data} = await fetcher<{ professions: Profession[] }>({
            url   : `/api/profession?professionFindManyArgs=${JSON.stringify(professionFindManyArgs)}`,
            method: 'GET',
            json  : true,
        })
        return data.professions
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
}

const getPositionScopes = async () => {
    const positionScopeFindManyArgs: Prisma.PositionScopeFindManyArgs = {
        where: {active: true},
    }
    try {
        const {data} = await fetcher<{ positionScopes: PositionScope[] }>({
            url   : `/api/positionscope?positionScopeFindManyArgs=${JSON.stringify(positionScopeFindManyArgs)}`,
            method: 'GET',
            json  : true,
        })
        return data.positionScopes
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
}
const validationSchema = object({
    name           : string().required('שדה חובה').max(50, 'שם יכול להכיל עד 50 תווים'),
    description    : string().required('שדה חובה').max(1000, 'תיאור יכול להכיל עד 1000 תווים'),
    serialNumber   : number().required('שדה חובה'),
    requirements   : array().of(string().required('שדה חובה').max(100, 'דרישה יכולה להכיל עד 100 תווים')),
    areaId         : string().required('שדה חובה'),
    professionId   : string().required('שדה חובה'),
    positionScopeId: string().required('שדה חובה'),
})

interface formDynamicValues {
    professions: Profession[]
    areas: Area[]
    positionScopes: PositionScope[]
}

enum Status {
    Idle = 'idle',
    Loading = 'loading',
    Success = 'success',
}
export default function CreateJobListingPage() {
    const router = useRouter()
    const [formDynamicValues, setFormDynamicValues] = useState<formDynamicValues>({areas: [], professions: [], positionScopes: []})
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<string[]>([])
    useEffect(() => {
        const getFormDynamicValues = async () => {
            try {
                const [areas, professions, positionScopes] = await Promise.all([getAreas(), getProfessions(), getPositionScopes()])
                setFormDynamicValues({areas, professions, positionScopes})
            } catch (e: any) {
                console.log(e)
                setErrors([e.message])
            }
        }
        getFormDynamicValues()
    }, [])
    const formik = useFormik({
        initialValues: {
            name           : '',
            description    : '',
            serialNumber   : '',
            areaId         : '',
            professionId   : '',
            positionScopeId: '',
            requirements   : []
        },
        validationSchema,
        onSubmit     : async (values) => {
            const jobListingCreateArgs = {
                data: {
                    name           : values.name,
                    description    : values.description,
                    serialNumber   : values.serialNumber,
                    jobRequirements: values.requirements,
                    area           : {
                        connect: {id: values.areaId}
                    },
                    profession     : {
                        connect: {id: values.professionId}
                    },
                    positionScope  : {
                        connect: {id: values.positionScopeId}
                    },
                }
            }
            setLoading(true)
            try {
                await fetcher({
                    url   : '/api/joblisting',
                    method: 'POST',
                    body  : {jobListingCreateArgs},
                    json  : true,
                })
                // router.push(`/joblisting/${jobListing.id}`)
                setLoading(false)
            } catch (e: any) {
                const error = e.error as CustomError
                setLoading(false)
                setErrors([error.message])
            }
        }
    })
    if (loading) {
        return (
            <div className="row justify-content-center">
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    return (
        <SSRProvider>
            {
                errors.length > 0 && errors.map((error, index) => {
                    return (
                        <ToastDismissible key={index} text={error} title='שגיאה'/>
                    )
                })
            }
            <Container className='mb-md-4 '>
                <Row>
                    <form onSubmit={formik.handleSubmit} style={{direction: 'rtl'}}>
                        <Col xs={12} lg={12}>
                            {/* Title */}
                            <div className='mb-4'>
                                <h1 className='h2 text-light mb-0'>פרסם משרה</h1>
                            </div>

                            {/* Basic info */}
                            <Card
                                className={`card-light card-body shadow-sm p-4 mb-4 ${(formik.errors.name || formik.errors.description || formik.errors.serialNumber) && 'border-danger'}`}
                            >
                                <h2 className='h4 text-light mb-4'>
                                    פרטים כלליים
                                    <i className='fi-info-circle text-primary me-2'></i>
                                </h2>
                                {/*JOB LISTING NAME*/}
                                <Form.Group controlId='sc-title' className='mb-3'>
                                    <Form.Label className='text-light'>
                                        שם המשרה
                                    </Form.Label>
                                    <Form.Control
                                        className={`form-control-light ${formik.touched.name && formik.errors.name && 'border-danger'}`}
                                        placeholder='הכנס שם'
                                        name="name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                    />
                                </Form.Group>
                                {
                                    formik.touched.name && formik.errors.name &&
                                    <span className='form-text text-danger fs-6'>{formik.errors.name}</span>
                                }
                                {/*JOB LISTING DESCRIPTION*/}
                                <Form.Group controlId='sc-description' className='border-top border-light mt-2 pt-4'>
                                    <Form.Label className='text-light'>
                                        תיאור המשרה
                                    </Form.Label>
                                    <Form.Control
                                        className={`form-control-light ${formik.touched.description && formik.errors.description && 'border-danger'}`}
                                        as='textarea'
                                        rows={8}
                                        placeholder='הכנס תיאור'
                                        name="description"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.description}
                                    />
                                    {
                                        formik.touched.description && formik.errors.description &&
                                        <span className='form-text text-danger fs-6'>{formik.errors.description}</span>
                                    }
                                </Form.Group>

                                {/*JOB LISTING SERIAL NUMBER */}
                                <Form.Group controlId='sc-description' className='border-top border-light mt-2 pt-4'>
                                    <Form.Label className='text-light'>
                                        מספר סידורי
                                    </Form.Label>
                                    <Form.Control
                                        className={`form-control-light ${formik.touched.serialNumber && formik.errors.serialNumber && 'border-danger'}`}
                                        placeholder='הכנס מספר סידורי'
                                        name="serialNumber"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.serialNumber}
                                    />
                                </Form.Group>
                                {
                                    formik.touched.serialNumber && formik.errors.serialNumber &&
                                    <span className='form-text fs-6 text-danger'>
                                        {formik.errors.serialNumber}
                                    </span>
                                }
                            </Card>

                            {/*JOB REQUIREMENTS*/}
                            <Card
                                className={`card-light card-body shadow-sm p-4 mb-4 ${formik.errors.requirements && 'border-danger'} `}
                            >
                                <div className="row justify-content-between align-content-center">
                                    <div className="col">
                                        <h2 className='h4 text-light my-2'>
                                            דרישות המשרה
                                        </h2>
                                    </div>
                                    <div className="col-auto" style={{direction: 'ltr'}}>
                                        <PillButton
                                            onClick={() => {
                                                formik.setFieldValue('requirements', [...formik.values.requirements, ''])
                                            }}
                                            text='הוסף דרישה'
                                            icon="fi-plus"/>
                                    </div>
                                </div>
                                <Form.Group controlId='sc-description' className='border-top border-light mt-2 pt-4'>
                                    {
                                        formik.values.requirements.map((requirement, index) => {
                                            return (
                                                <>
                                                    <div
                                                        className="row justify-content-between align-items-center mb-3"
                                                        key={index}
                                                    >
                                                        <div className="col">
                                                            <Form.Control
                                                                className={`form-control-light ${formik.touched.requirements?.at(index) && formik.errors.requirements?.at(index) && 'border-danger'}`}
                                                                placeholder='הכנס דרישה'
                                                                name={`requirements[${index}]`}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.requirements[index]}
                                                            />
                                                        </div>
                                                        <div className="col-auto" style={{direction: 'ltr'}}>
                                                            <PillButton
                                                                text='הסר דרישה'
                                                                onClick={() => {
                                                                    formik.values.requirements.splice(index, 1);
                                                                    formik.setFieldValue('requirements', formik.values.requirements);
                                                                }}
                                                                icon="fi-x"/>
                                                        </div>
                                                    </div>
                                                    {
                                                        formik.touched.requirements?.at(index) && formik.errors.requirements?.at(index) &&
                                                        <span className='form-text fs-6 text-danger'>
                                                            {formik.errors.requirements.at(index)}
                                                        </span>
                                                    }
                                                </>
                                            )
                                        })
                                    }
                                </Form.Group>
                            </Card>


                            {/* Area */}
                            <Card
                                className={`card-light card-body shadow-sm p-4 mb-4 ${formik.touched.areaId && formik.errors.areaId && 'border-danger'} `}
                            >
                                <h2 className='h4 text-light mb-4'>
                                    <i className='fi-car text-primary fs-5 mt-n1 ms-5'></i>
                                    איזור
                                </h2>
                                <div className='border-top border-light mt-2 pt-4'>
                                    <Row className='pb-2'>
                                        <Col xs={12} md={6}>
                                            <Form.Group className='mb-3'>
                                                <Dropdown onSelect={(e) => {
                                                    formik.setFieldValue('areaId', e)
                                                }}
                                                >
                                                    <Dropdown.Toggle
                                                        className={`bg-none ${formik.touched.areaId && formik.errors.areaId && 'border-danger' || 'border-white'} `}
                                                        dir="ltr"
                                                    >
                                                        {formik.values.areaId && formDynamicValues.areas && formDynamicValues.areas.find(area => area.id === formik.values.areaId)?.name || 'בחר איזור'}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {/*
                                                    default item
                                                    */}
                                                        <Dropdown.Item eventKey={undefined}>
                                                            בחר איזור
                                                        </Dropdown.Item>
                                                        {
                                                            formDynamicValues.areas.map((area, index) => {
                                                                return (
                                                                    <Dropdown.Item eventKey={area.id} key={index}>
                                                                        {area.name}
                                                                    </Dropdown.Item>
                                                                )
                                                            })}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                                {
                                    formik.touched.areaId && formik.errors.areaId &&
                                    <span className='form-text text-danger fs-6'>
                                                    {formik.errors.areaId}
                                                </span>
                                }
                            </Card>

                            {/*Profession*/}
                            <Card
                                className={`card-light card-body shadow-sm p-4 mb-4 ${formik.touched.professionId && formik.errors.professionId && 'border-danger'} `}
                            >
                                <h2 className='h4 text-light mb-4'>
                                    <i className='fi-car text-primary fs-5 mt-n1 me-2'></i>
                                    מקצוע
                                </h2>
                                <div className='border-top border-light mt-2 pt-4'>
                                    <Row className='pb-2'>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId='sc-body' className='mb-3'>
                                                <Dropdown
                                                    onSelect={(e) => {
                                                        formik.setFieldValue('professionId', e)
                                                    }}
                                                >
                                                    <Dropdown.Toggle
                                                        className={`bg-none ${formik.touched.professionId && formik.errors.professionId && 'border-danger'}`}
                                                        dir="ltr"
                                                    >
                                                        {formik.values.professionId && formDynamicValues.professions && formDynamicValues.professions.find(profession => profession.id === formik.values.professionId)?.name || 'בחר מקצוע'}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {/*
                                                    default item
                                                    */}
                                                        <Dropdown.Item eventKey={undefined}>
                                                            בחר מקצוע
                                                        </Dropdown.Item>
                                                        {
                                                            formDynamicValues.professions.map((profession, index) => {
                                                                return (
                                                                    <Dropdown.Item eventKey={profession.id} key={index}>
                                                                        {profession.name}
                                                                    </Dropdown.Item>
                                                                )
                                                            })}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                                {
                                    formik.touched.professionId && formik.errors.professionId &&
                                    <span className='form-text text-danger fs-6'>
                                                    {formik.errors.professionId}
                                                </span>
                                }
                            </Card>

                            {/*Position Scope */}
                            <Card
                                className={`card-light card-body shadow-sm p-4 mb-4 ${formik.touched.positionScopeId && formik.errors.positionScopeId && 'border-danger'} `}
                            >
                                <h2 className='h4 text-light mb-4'>
                                    <i className='fi-car text-primary fs-5 mt-n1 me-2'></i>
                                    היקף משרה
                                </h2>
                                <div className='border-top border-light mt-2 pt-4'>
                                    <Row className='pb-2'>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId='sc-body' className='mb-3'>
                                                <Dropdown
                                                    onSelect={(e) => {
                                                        formik.setFieldValue('positionScopeId', e)
                                                    }}
                                                >
                                                    <Dropdown.Toggle
                                                        className={`bg-none ${formik.touched.positionScopeId && formik.errors.positionScopeId && 'border-danger'}`}
                                                        dir="ltr"
                                                    >
                                                        {formik.values.positionScopeId && formDynamicValues.positionScopes && formDynamicValues.positionScopes.find(positionScope => positionScope.id === formik.values.positionScopeId)?.name || 'בחר היקף משרה'}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {/*
                                                    default item
                                                    */}
                                                        <Dropdown.Item eventKey={undefined}>
                                                            בחר היקף משרה
                                                        </Dropdown.Item>
                                                        {
                                                            formDynamicValues.positionScopes.map((positionScope, index) => {
                                                                return (
                                                                    <Dropdown.Item eventKey={positionScope.id}
                                                                                   key={index}>
                                                                        {positionScope.name}
                                                                    </Dropdown.Item>
                                                                )
                                                            })}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                                {
                                    formik.touched.positionScopeId && formik.errors.positionScopeId &&
                                    <span className='form-text text-danger fs-6'>
                                                    {formik.errors.positionScopeId}
                                                </span>
                                }
                            </Card>

                            {/* Footer (Action buttons) */}
                            <div className='d-sm-flex justify-content-between pt-2'>
                                <Button
                                    size='lg'
                                    variant='outline-light'
                                    className='d-block ps-3 mb-3 mb-sm-2'
                                    style={{direction: 'ltr'}}
                                    type="submit">
                                    <i className='fi-plus-circle me-2'></i>
                                    הוסף משרה
                                </Button
                                >
                            </div>
                        </Col>
                    </form>
                </Row>
            </Container>
        </SSRProvider>
    )

}

