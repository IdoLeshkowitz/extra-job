'use client'
import {Button, Form} from "react-bootstrap";
import {useFormik} from "formik";
import {object, string} from "yup";
import {log} from "next/dist/server/typescript/utils";

const validationSchema = object({
    name: string().required('שדה חובה').matches(/^[a-zA-Zא-ת ]+$/, 'שם אזור לא תקין'),
})
export default function AddAreaCard() {
    const loading = false;
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const createdUSer = await fetch('http://localhost:3000/api/areas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({data : values}),
                })
                console.log(createdUSer)
            } catch (e) {
                console.log(e)
            }
        }
    })
    return (
        <div className="card bg-secondary card-hover mb-2">
            <div className="card-body">
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="name" className='form-group'>
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
                                  aria-hidden="true"/>
                        }
                        הוסף
                    </Button>
                </Form>
            </div>
        </div>
    )
}