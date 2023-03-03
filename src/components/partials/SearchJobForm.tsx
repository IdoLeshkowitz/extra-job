'use client'


import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import DropdownSelect from "@/components/DropdownSelect";
import Button from "react-bootstrap/Button";
import {object} from "yup";

const validationSchema = object({
})
export default function SearchJobForm() {
    return (
        <form className='form-group d-block d-md-flex rounded-md-pill mb-2 mb-sm-4'>
            <InputGroup size='lg' className='border-end-md'>
                <InputGroup.Text className='text-muted ps-3'>
                    <i className='fi-search'></i>
                </InputGroup.Text>
                <FormControl aria-label='Search field' placeholder='What are you looking for?'/>
            </InputGroup>
            <hr className='d-md-none my-2'/>
            <div className='d-sm-flex'>
                <DropdownSelect
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
                <DropdownSelect
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
        </form>
    )
}