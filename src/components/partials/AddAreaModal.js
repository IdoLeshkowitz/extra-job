'use client';
import {Modal} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import CloseButton from 'react-bootstrap/CloseButton'
import {useFormik} from "formik"
import {object, string} from 'yup'
import {useState} from "react";
import Button from "react-bootstrap/Button";
import {useRouter} from "next/navigation";

const validationSchema = object({
    name: string().required('שדה חובה').matches(/^[a-zA-Zא-ת ]+$/, 'שם אזור לא תקין'),
})
const AddAreaModal = ({onHide, pillButtons, areas, onAdd,...props}) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        }
    })
    const handleSubmit =  async (values) => {
        // setLoading(true)
        // const res = await fetch('/api/area', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({data : values})
        // })
        // const {data : Area} = await res.json()
        // setLoading(false)
        // onAdd(Area)
    }

    return (
        <Modal centered size='lg'{...props} className='signin-modal'>
            <Modal.Body className='px-0 py-2 py-sm-0'>
                <CloseButton
                    onClick={onHide}
                    aria-label='Close modal'
                    className='position-absolute top-0 end-0 mt-3 me-3'
                />
                <div className='row mx-0 align-items-center justify-content-center'>
                    <div className='col-md-6 px-4 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5'>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group controlId="name">
                                <Form.Label>הוסף אזור</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="שם אזור"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    isInvalid={formik.touched.name && formik.errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit" className="btn btn-primary btn-lg my-2" disabled={loading}>
                                {loading && <span className="spinner-grow spinner-grow-sm me-2" role="status"
                                                  aria-hidden="true"></span>}
                                הוסף
                            </Button>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddAreaModal
