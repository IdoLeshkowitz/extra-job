'use client'


import InputGroup from "react-bootstrap/InputGroup";
import DropdownSelect from "@/components/DropdownSelect";
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

    function mockArea() {
        return [
            {id: 1, name: 'השרון', createdAt: '2021-01-01', active: true},
            {id: 2, name: 'השפלה', createdAt: '2021-01-01', active: true},
            {id: 3, name: 'הצפון', createdAt: '2021-01-01', active: true},
            {id: 4, name: 'המרכז', createdAt: '2021-01-01', active: true},
            {id: 5, name: 'הדרום', createdAt: '2021-01-01', active: true},
            {id: 6, name: 'ירושלים', createdAt: '2021-01-01', active: false}, 

        ]
    }

    function mockProffesion() {
        return [
            {id: 1, name: 'ניקיון', createdAt: '2021-01-01', active: true},
            {id: 2, name: 'תחזוקה', createdAt: '2021-01-01', active: true},
            {id: 3, name: 'אבטחה', createdAt: '2021-01-01', active: true},
            {id: 4, name: 'לוגיסטיקה', createdAt: '2021-01-01', active: true},
            {id: 5, name: 'מזון', createdAt: '2021-01-01', active: false},
        ]
    }

    const proffesions = mockProffesion().filter(proffesion => proffesion.active).map(proffesion => {
        return ['fi-work', proffesion.name]
    })

    const areas = mockArea().filter(area => area.active).map(area => {
        return ['fi-house', area.name]
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
                    defaultValue='בחר איזור'
                    icon='fi-list'
                    options={areas}
                    variant='link btn-lg ps-2 ps-sm-3'
                    className='w-100 mb-sm-0 mb-3'
                />
                <hr className='d-md-none my-2'/>

                {/*CATEGORY SELECT*/}
                <DropdownSelect
                    darkMenu={true}
                    defaultValue='בחר מקצוע'
                    icon='fi-list'
                    options={proffesions}
                    variant='link btn-lg ps-2 ps-sm-3'
                    className='w-100 mb-sm-0 mb-3'
                />
                <Button size='lg' className='rounded-pill w-100 w-md-auto ms-sm-3'>Search</Button>
            </div>
        </Form>
    )
}