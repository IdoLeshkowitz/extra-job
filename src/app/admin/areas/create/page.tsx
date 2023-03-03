'use client'
import {Button, Form} from "react-bootstrap";
import {useFormik} from "formik";
import {object, string} from "yup";

const validationSchema = object({
    name: string().required('שדה חובה').matches(/^[a-zA-Zא-ת ]+$/, 'שם אזור לא תקין'),
})
export default function CreatePage() {
const loading = false;
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                fetch('/api/areas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                })
            } catch (e) {
                console.log(e)
            }
        }
    })
    return <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="name" className='form-group'>
                <Form.Label>הוסף אזור</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="שם אזור"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="btn btn-primary btn-lg my-2" disabled={loading}>
                {
                    loading &&
                    <span className="spinner-grow spinner-grow-sm me-2"
                          role="status"
                          aria-hidden="true">

                    </span>
                }
                הוסף
            </Button>
        </Form>
}