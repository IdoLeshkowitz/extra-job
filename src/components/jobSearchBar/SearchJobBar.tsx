'use client'


import InputGroup from "react-bootstrap/InputGroup";
import DropdownSelect from "@/components/dropdown/DropdownSelect";
import Button from "react-bootstrap/Button";
import {object, string} from "yup";
import {Form} from "react-bootstrap";
import {useFormik} from "formik";

const validationSchema = object({
    text : string()

})
export default function SearchJobBar() {
    const formik = useFormik({
        initialValues: {
            text: '',
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    })
    return (
        <Form className='form-group d-block d-md-flex rounded-md-pill mb-2 mb-sm-4'>

            {/*TEXT INPUT*/}
            <InputGroup size='lg' className='border-end-md' >
                <InputGroup.Text className='text-muted ps-3'>
                    <i className='fi-search'/>
                </InputGroup.Text>
                <Form.Control
                    aria-label='Search field'
                    type='text'
                    name="text"
                    placeholder='חיפוש חופשי במאגר'
                    value={formik.values.text}
                    onBlur = {formik.handleBlur}
                    onChange = {formik.handleChange}
                />
            </InputGroup>
            <hr className='d-md-none my-2'/>

            {/*AREA SELECT*/}
            <div className='d-sm-flex'>
                <DropdownSelect
                    name="name"
                    darkMenu={true}
                    defaultValue='All categories'
                    icon='fi-list'
                    options={[
                        ['fi-bed', 'Accomodation'],
                        ['fi-cafe', 'Food & Drink'],
                        ['fi-shopping-bag', 'Shopping'],
                        ['fi-museum', 'Art & Hisory'],
                        ['fi-entertainment', 'Entertainment'],
                        ['fi-meds', 'Medicine'],
                        ['fi-makeup', 'Beauty'],
                        ['fi-car', 'Car Rental']
                    ]}
                    variant='link btn-lg ps-2 ps-sm-3'
                    className='w-100 mb-sm-0 mb-3'
                />
                <hr className='d-md-none my-2'/>

                {/*CATEGORY SELECT*/}
                <DropdownSelect
                    darkMenu={true}
                    defaultValue='All categories'
                    icon='fi-list'
                    options={[
                        ['fi-bed', 'Accomodation'],
                        ['fi-cafe', 'Food & Drink'],
                        ['fi-shopping-bag', 'Shopping'],
                        ['fi-museum', 'Art & Hisory'],
                        ['fi-entertainment', 'Entertainment'],
                        ['fi-meds', 'Medicine'],
                        ['fi-makeup', 'Beauty'],
                        ['fi-car', 'Car Rental']
                    ]}
                    variant='link btn-lg ps-2 ps-sm-3'
                    className='w-100 mb-sm-0 mb-3'
                />
                <Button size='lg' className='rounded-pill w-100 w-md-auto ms-sm-3'>Search</Button>
            </div>
        </Form>
    )
}