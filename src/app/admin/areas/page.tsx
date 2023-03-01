'use client'

import {Field, Form, Formik} from "formik";

export default function AreasPage() {
    return (
        <>
            {/*<Formik*/}
            {/*    initialValues={{*/}
            {/*        firstName: '',*/}
            {/*        lastName: '',*/}
            {/*        email: '',*/}
            {/*    }}*/}
            {/*    validationSchema={SignupSchema}*/}
            {/*    onSubmit={values => {*/}
            {/*        // same shape as initial values*/}
            {/*        console.log(values);*/}
            {/*    }}*/}
            {/*>*/}
            {/*    {({errors, touched}) => (*/}
            {/*        <Form>*/}
            {/*            <Field name="firstName"/>*/}
            {/*            {errors.firstName && touched.firstName ? (*/}
            {/*                <div>{errors.firstName}</div>*/}
            {/*            ) : null}*/}
            {/*            <Field name="lastName"/>*/}
            {/*            {errors.lastName && touched.lastName ? (*/}
            {/*                <div>{errors.lastName}</div>*/}
            {/*            ) : null}*/}
            {/*            <Field name="email" type="email"/>*/}
            {/*            {errors.email && touched.email ? <div>{errors.email}</div> : null}*/}
            {/*            <button type="submit">Submit</button>*/}
            {/*        </Form>*/}
            {/*    )}*/}
            {/*</Formik>*/}
        </>
    )
}