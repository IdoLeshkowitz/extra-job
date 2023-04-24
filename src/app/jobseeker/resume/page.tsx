'use client';

import {useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import JobBoardPostResumeLayout from '../components/resumeLayout'

import {Document, Font, Page, PDFDownloadLink, PDFViewer, Text, View} from '@react-pdf/renderer';
import styles from './componenets/styles';
import {ProfileContainer} from './componenets/ProfileContainer';
import {EmploymentHistoryItem} from './componenets/EmpolymentHistoryItem';
import {array, object, string} from "yup";
import {useFormik} from "formik";
import {InputGroup} from "react-bootstrap";

// font register a font that supports Hebrew
Font.register({
    family: 'Rubik',
    fonts : [
        {src: "http://fonts.gstatic.com/s/rubik/v3/4sMyW_teKWHB3K8Hm-Il6A.ttf"}
    ],
});

const Divider = () => (
    <View
        style={{
            height         : '1px',
            marginTop      : '13px',
            marginBottom   : '12px',
            width          : '100%',
            backgroundColor: '#084c41',
        }}
    ></View>
)

const Wrapper = ({heading, ...props}: any) => {
    return (
        <View style={{marginTop: '25', marginLeft: '15', marginRight: '15'}}>
            <Text
                style={{
                    color        : '#FFF',
                    fontSize     : '15',
                    paddingBottom: '10',
                }}
            >
                {heading}
            </Text>
            {props.children}
        </View>
    )
}

const PostResumePDF = (props: any) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section__left}>
                <ProfileContainer
                    name={props.value.firstName + ' ' + props.value.lastName}
                    profession={props.value.title}
                    url={'https://i.imgur.com/oU0RCge.png'}
                    display={true}
                />
                <View>
                    <Wrapper heading={'יצירת קשר'}>
                        {[props.value.email, props.value.phone].map((item, index) => (
                            <Text
                                key={index}
                                style={{color: '#fff', fontSize: '12', marginBottom: '8px'}}
                            >
                                {item}
                            </Text>
                        ))}
                    </Wrapper>
                </View>
            </View>
            <View style={styles.section__right}>
                <View>
                    <Text
                        style={{
                            color   : '#000',
                            fontSize: '15',
                        }}>
                        תיאור מקצועי
                    </Text>
                    <Divider/>
                    <Text style={styles.main__text}>{props.value.about}</Text>
                </View>
                <View style={{paddingTop: '20px'}}>
                    <Text
                        style={{
                            color   : '#000',
                            fontSize: '15',
                        }}
                    >
                        ניסיון תעסוקתי
                    </Text>
                    <Divider/>
                    <EmploymentHistoryItem
                        title={props.value.jobTitle}
                        company={props.value.company}
                        monthStart={props.value.monthStart}
                        yearStart={props.value.yearStart}
                        monthEnd={props.value.monthEnd}
                        yearEnd={props.value.yearEnd}
                        description={props.value.description}
                    />
                </View>
            </View>
        </Page>
    </Document>
);

const validationSchema = async () => object({
    firstName: string().required('שדה חובה').max(50, 'מקסימום 50 תווים'),
    lastName : string().required('שדה חובה').max(50, 'מקסימום 50 תווים'),
    email    : string().required('שדה חובה').email('כתובת מייל לא תקינה'),
    phone    : string().required('שדה חובה').matches(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/, 'מספר טלפון לא תקין'),
    about    : string().required('שדה חובה').max(800, 'מקסימום 8000 תווים'),
    title    : string().required('שדה חובה').max(50, 'מקסימום 50 תווים'),

    pastJob: array().of(object({
        jobTitle   : string().required('שדה חובה').max(50, 'מקסימום 50 תווים'),
        company    : string().required('שדה חובה').max(50, 'מקסימום 50 תווים'),
        startMonth : string().required('שדה חובה'),
        startYear  : string().required('שדה חובה'),
        endMonth   : string().required('שדה חובה'),
        description: string().required('שדה חובה').max(800, 'מקסימום 8000 תווים'),
    }))
})
const Resume = () => {

    const [blob, setBlob] = useState<any>(false);
    const [formData, setFormData] = useState<any>(null);

    const formik = useFormik({
        initialValues   : {
            firstName: '',
            lastName : '',
            email    : '',
            phone    : '',
            about    : '',
            title    : '',
            pastJob  : []
        },
        validationSchema: validationSchema,
        onSubmit        : (values) => {
            console.log(values)
        }
    })

    return (
        <JobBoardPostResumeLayout activeStep='Basic info' nextStep='/job-board/post-resume-2'>
            <h2 className='h4 mb-4'>
                <i className='fi-info-circle text-primary fs-5 mt-n1 me-2'></i>
                &nbsp;&nbsp;פרטים בסיסיים
            </h2>
            <Form onSubmit={formik.handleSubmit} style={{direction: 'rtl'}}>
                <Row>
                    <Col md={6}>
                        {/*First Name*/}
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>שם פרטי</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="שם פרטי"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName}
                                name="firstName"
                            />
                        </Form.Group>
                        {
                            formik.touched.firstName && formik.errors.firstName ?
                                <div className='text-danger'>{formik.errors.firstName}</div> : null
                        }

                        {/*Last Name*/}
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>שם משפחה</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="שם משפחה"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                                name="lastName"
                            />
                        </Form.Group>
                        {
                            formik.touched.lastName && formik.errors.lastName ?
                                <div className='text-danger'>{formik.errors.lastName}</div> : null
                        }

                        {/*Email*/}
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>כתובת מייל</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="כתובת מייל"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                name="email"
                            />
                        </Form.Group>
                        {
                            formik.touched.email && formik.errors.email ?
                                <div className='text-danger'>{formik.errors.email}</div> : null
                        }

                        {/*Phone*/}
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>מספר טלפון</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="מספר טלפון"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                name="phone"
                            />
                        </Form.Group>
                        {
                            formik.touched.phone && formik.errors.phone ?
                                <div className='text-danger'>{formik.errors.phone}</div> : null
                        }

                        {/*About*/}
                        <Form.Group className="mb-3" controlId="about">
                            <Form.Label>קצת על עצמך</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="קצת על עצמך"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.about}
                                name="about"
                            />
                        </Form.Group>
                        {
                            formik.touched.about && formik.errors.about ?
                                <div className='text-danger'>{formik.errors.about}</div> : null
                        }

                        {/*Title*/}
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>קצת על עצמך</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="קצת על עצמך"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.title}
                                name="title"
                            />
                        </Form.Group>
                        {
                            formik.touched.title && formik.errors.title ?
                                <div className='text-danger'>{formik.errors.title}</div> : null
                        }

                        {/*PastJob*/}
                        {
                            formik.values.pastJob.map((pastJob: any, index: number) => (
                                <div
                                    key={index}
                                    className="d-flex flex-column flex-sm-row bg-light rounded-3 p-4 px-md-5"
                                >
                                    <div className="col">
                                        <Form.Group className="mb-3" controlId="pastJob">
                                            {/*Job Title*/}
                                            <Form.Label>שם המשרה</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="ספר על המשרה"
                                                onChange={formik.handleChange}
                                                value={pastJob.jobTitle}
                                                onBlur={formik.handleBlur}
                                                name="jobTitle"
                                            />
                                            {
                                                pastJob.touched.jobTitle && pastJob.errors.jobTitle ?
                                                    <div className='text-danger'>{pastJob.errors.jobTitle}</div> : null
                                            }

                                            {/*Company Name*/}
                                            <Form.Label>שם החברה</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="ספר על החברה"
                                                onChange={formik.handleChange}
                                                value={pastJob.companyName}
                                                onBlur={formik.handleBlur}
                                                name="companyName"
                                            />
                                            {
                                                pastJob.touched.companyName && pastJob.errors.companyName ?
                                                    <div
                                                        className='text-danger'>{pastJob.errors.companyName}</div> : null
                                            }

                                            {/*Date Range*/}
                                            <Form.Label>Date range</Form.Label>
                                            {/*<InputGroup className='flex-nowrap'>*/}
                                            {/*    <InputGroup.Text>*/}
                                            {/*        <i className='fi-calendar'></i>*/}
                                            {/*    </InputGroup.Text>*/}
                                            {/*    <Form.Control*/}
                                            {/*        as={DatePicker}*/}
                                            {/*        selected={startDate}*/}
                                            {/*        onChange={(date) => setStartDate4(date)}*/}
                                            {/*        selectsStart*/}
                                            {/*        startDate={startDate}*/}
                                            {/*        endDate={endDate}*/}
                                            {/*        placeholderText='To date'*/}
                                            {/*        className='rounded-0'*/}
                                            {/*    />*/}
                                            {/*    <Form.Control*/}
                                            {/*        as={DatePicker}*/}
                                            {/*        selected={endDate}*/}
                                            {/*        onChange={(date) => setEndDate(date)}*/}
                                            {/*        selectsEnd*/}
                                            {/*        startDate={startDate4}*/}
                                            {/*        endDate={endDate}*/}
                                            {/*        minDate={startDate4}*/}
                                            {/*        placeholderText='To date'*/}
                                            {/*        className='rounded-start-0'*/}
                                            {/*    />*/}
                                            {/*</InputGroup>*/}

                                        </Form.Group>
                                    </div>
                                </div>
                            ))
                        }


                    </Col>
                </Row>
            </Form>
            <div className="d-flex flex-column flex-sm-row bg-light rounded-3 p-4 px-md-5">
                {/* <Button
          size="lg"
          variant="primary rounded-pill ms-auto"
          className="mt-sm-0 mt-3"
          onClick={generatePdf}
        >
          Save and generate PDF
        </Button> */}
                {blob && (
                    <div style={{flexGrow: '1'}}>
                        <PDFViewer
                            showToolbar={false}
                            style={{
                                width : '100%',
                                height: '100vh',
                                // fontFamily: 'Roboto',
                            }}
                        >
                            <PostResumePDF value={formData}/>
                        </PDFViewer>
                        <PDFDownloadLink
                            document={<PostResumePDF value={formData}/>}
                            fileName='somename.pdf'
                            className="btn btn-lg btn-outline-primary rounded-pill ms-3 mt-3 mt-sm-0"
                        >
                            {({loading}) => (loading ? 'Loading document...' : 'Download now!')}
                        </PDFDownloadLink>
                    </div>
                )}
            </div>
        </JobBoardPostResumeLayout>
    )
}

export default Resume
