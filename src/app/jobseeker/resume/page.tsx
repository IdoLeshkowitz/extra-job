'use client';

import { useRef, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import JobBoardPostResumeLayout from '../components/ResumeLayout'
  
import { Document, Page, Text, View, StyleSheet, pdf, PDFDownloadLink, Font, PDFViewer } from '@react-pdf/renderer';
import styles from './componenets/styles';
import {ProfileContainer}  from './componenets/ProfileContainer';
import { EmploymentHistoryItem } from './componenets/EmpolymentHistoryItem';

// font register a font that supports Hebrew
Font.register({
  family: 'Rubik',
  fonts: [
    { src: "http://fonts.gstatic.com/s/rubik/v3/4sMyW_teKWHB3K8Hm-Il6A.ttf" }
  ],
});

const Divider = () => (
  <View
    style={{
      height: '1px',
      marginTop: '13px',
      marginBottom: '12px',
      width: '100%',
      backgroundColor: '#084c41',
    }}
  ></View>
)

const Wrapper = ({ heading, ...props } : any) => {
  return (
    <View style={{ marginTop: '25', marginLeft: '15', marginRight: '15' }}>
      <Text
        style={{
          color: '#FFF',
          fontSize: '15',
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
  console.log(props),
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
                  style={{ color: '#fff', fontSize: '12', marginBottom: '8px' }}
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
            color: '#000',
            fontSize: '15',
            }}>   
          תיאור מקצועי
          </Text>
          <Divider />
          <Text style={styles.main__text}>{props.value.about}</Text>
        </View>
        <View style={{ paddingTop: '20px' }}>
          <Text
            style={{
              color: '#000',
              fontSize: '15',
            }}
          >
          ניסיון תעסוקתי
          </Text>
          <Divider />
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


const Resume = () => {

    const [blob, setBlob] = useState<any>(false);
    const [formData, setFormData] = useState<any>(null);

    const handleSubmit = (event: any) => {
      event.preventDefault();
      const data = {
        firstName: event.target.elements['pr-fn'].value,
        lastName: event.target.elements['pr-sn'].value,
        email: event.target.elements['pr-email'].value,
        phone: event.target.elements['pr-phone'].value,
        about: event.target.elements['pr-about'].value,
        title: event.target.elements['pr-title'].value,
        jobTitle: event.target.elements['pr-job-title'].value,
        company: event.target.elements['pr-company'].value,
        monthStart: event.target.elements['pr-month-start'].value,
        yearStart: event.target.elements['pr-year-start'].value,
        monthEnd: event.target.elements['pr-month-end'].value,
        yearEnd: event.target.elements['pr-year-end'].value,
        description: event.target.elements['pr-description'].value,
      };

      console.log(data)
      setFormData(data);
      setBlob(true);
    };

    

    // const generatePdf = async () => {
    //     const blobe = await pdf(<PostResumePDF />).toBlob();
    //     setBlob(blobe);
    // };

    
    return (
      <JobBoardPostResumeLayout activeStep='Basic info'nextStep='/job-board/post-resume-2'>
        <h2 className='h4 mb-4'>
          <i className='fi-info-circle text-primary fs-5 mt-n1 me-2'></i>
          &nbsp;&nbsp;פרטים בסיסיים
        </h2>
        <Form onSubmit={handleSubmit}>
        <Row xs={1} sm={2} className='gy-4 mb-4'>
          <Col as={Form.Group} controlId='pr-fn'>
            <Form.Label>
              שם פרטי
              <span className='text-danger'>&nbsp;*</span>
            </Form.Label>
            <Form.Control size='lg' placeholder='Enter your first name' defaultValue='שחר' required/>
          </Col>
          <Col as={Form.Group} controlId='pr-sn'>
            <Form.Label>
              שם משפחה
              <span className='text-danger'>&nbsp;*</span>
            </Form.Label>
            <Form.Control size='lg' placeholder='Enter your second name' defaultValue='משולם' required/>
          </Col>
          <Col as={Form.Group} controlId='pr-email'>
            <Form.Label>
              אימייל
              <span className='text-danger'>&nbsp;*</span>
            </Form.Label>
            <Form.Control size='lg' type='email' placeholder='Enter your email address' defaultValue='annette_black@email.com' required/>
          </Col>
          <Col as={Form.Group} controlId='pr-phone'>
            <Form.Label>
              פלאפון
              <span className='text-danger'>&nbsp;*</span>
            </Form.Label>
            <Form.Control  size='lg' type='tel' placeholder='Enter your phone number' defaultValue='(302) 555-0107' required/>
          </Col>
          <Col as={Form.Group} controlId='pr-about'>
            <Form.Label>
              ספר על עצמך
              <span className='text-danger'>&nbsp;*</span>
            </Form.Label>
            <Form.Control as='textarea' size='lg' rows={5} placeholder='Describe your position and any significant accomplishments' required/>
            <div className='form-text pt-1'>8,000 characters left</div>
          </Col>
          <Col as={Form.Group} controlId='pr-title'>
            <Form.Label>
              תפקיד \ טייטל מקצועי
            </Form.Label>
            <Form.Control size='lg' placeholder='Enter your first name' defaultValue='מתכנת'/>
          </Col>
          <h2 className='h4 mb-4'>
          <i className='fi-briefcase text-primary mt-n1 me-2'></i>
          &nbsp;&nbsp;ניסיון תעסוקתי
          </h2>
          <br/>
          <Col xs={12} as={Form.Group} controlId='pr-job-title'>
            <Form.Label>
              סוג משרה
              <span className='text-danger'>&nbsp;*</span>
            </Form.Label>
            <Form.Control size='lg' placeholder='Enter company name' required/>
          </Col>
          <Col xs={12} sm={6} as={Form.Group} controlId='pr-company'>
            <Form.Label>
              שם החברה
              <span className='text-danger'>&nbsp;*</span>
            </Form.Label>
            <Form.Control size='lg' placeholder='Enter company name' required/>
          </Col>
          <Col xs={12} lg={6}>
          <Form.Label>
            תאריך התחלה
            <span className='text-danger'>&nbsp;*</span>
          </Form.Label>
          <Row className='gx-2 gx-sm-3'>
            <Col xs={7} sm={8} as={Form.Group} controlId='pr-month-start'>
              <Form.Select size='lg' defaultValue='default' required>
                <option value='default' disabled>Month</option>
                <option value='January'>January</option>
                <option value='February'>February</option>
                <option value='March'>March</option>
                <option value='April'>April</option>
                <option value='May'>May</option>
                <option value='June'>June</option>
                <option value='July'>July</option>
                <option value='August'>August</option>
                <option value='September'>September</option>
                <option value='October'>October</option>
                <option value='November'>November</option>
                <option value='December'>December</option>
              </Form.Select>
            </Col>
            <Col xs={5} sm={4} as={Form.Group} controlId='pr-year-start'>
              <Form.Select size='lg' defaultValue='default' required>
                <option value='default' disabled>Year</option>
                <option value='2021'>2021</option>
                <option value='2020'>2020</option>
                <option value='2019'>2019</option>
                <option value='2018'>2018</option>
                <option value='2017'>2017</option>
                <option value='2016'>2016</option>
                <option value='2015'>2015</option>
                <option value='2014'>2014</option>
                <option value='2013'>2013</option>
                <option value='2012'>2012</option>
                <option value='2011'>2011</option>
                <option value='2010'>2010</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
        <Col xs={12} lg={6}>
          <Form.Label>
            תאריך סיום
            <span className='text-danger'>&nbsp;*</span>
          </Form.Label>
          <Row className='gx-2 gx-sm-3'>
            <Col xs={7} sm={8} as={Form.Group} controlId='pr-month-end'>
              <Form.Select size='lg' defaultValue='default' required>
                <option value='default' disabled>Month</option>
                <option value='January'>January</option>
                <option value='February'>February</option>
                <option value='March'>March</option>
                <option value='April'>April</option>
                <option value='May'>May</option>
                <option value='June'>June</option>
                <option value='July'>July</option>
                <option value='August'>August</option>
                <option value='September'>September</option>
                <option value='October'>October</option>
                <option value='November'>November</option>
                <option value='December'>December</option>
              </Form.Select>
            </Col>
            <Col xs={5} sm={4} as={Form.Group} controlId='pr-year-end'>
              <Form.Select size='lg' defaultValue='default' required>
                <option value='default' disabled>Year</option>
                <option value='2021'>2021</option>
                <option value='2020'>2020</option>
                <option value='2019'>2019</option>
                <option value='2018'>2018</option>
                <option value='2017'>2017</option>
                <option value='2016'>2016</option>
                <option value='2015'>2015</option>
                <option value='2014'>2014</option>
                <option value='2013'>2013</option>
                <option value='2012'>2012</option>
                <option value='2011'>2011</option>
                <option value='2010'>2010</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
        <Row className='gy-4' style={{width: '100%'}}>
        <Col as={Form.Group} controlId='pr-description'>
              <Form.Label>
                תיאור התפקיד
                <span className='text-danger'>&nbsp;*</span>
              </Form.Label>
              <Form.Control as='textarea' size='lg' rows={5} placeholder='Describe your position and any significant accomplishments' required/>
                <div className='form-text pt-1'>8,000 characters left</div>
        </Col>
        </Row>
        <Col xs={12} className="h4 mb-4">
          <Button variant='link text-primary' className='px-0'>
            <i className='fi-plus me-2'></i>
            &nbsp;הוסף מקום עבודה נוסף
          </Button>
        </Col>
        { /* <br/>
        <h2 className='h4 mb-4'>
        <i className='fi-education text-primary mt-n1 me-2'></i>
        &nbsp;&nbsp;השכלה
      </h2>
      <br/>
        <Col xs={12} sm={6} as={Form.Group} controlId='pr-level'>
          <Form.Label>
            רמת השכלה
            <span className='text-danger'>&nbsp;*</span>
          </Form.Label>
          <Form.Select size='lg' defaultValue='default' required>
            <option value='default' disabled>Choose your level of education</option>
            <option value='Associate Degree'>Associate Degree</option>
            <option value='Bachelors Degree'>Bachelor&apos;s Degree</option>
            <option value='Graduate Degree'>Graduate Degree</option>
            <option value='Professional Degree'>Professional Degree</option>
            <option value='Master Degree'>Master Degree</option>
            <option value='PhD'>PhD</option>
          </Form.Select>
        </Col>
        <Col xs={12} sm={6} as={Form.Group} controlId='pr-study-field'>
          <Form.Label>
            תחום לימודים
            <span className='text-danger'>&nbsp;*</span>
          </Form.Label>
          <Form.Control size='lg' placeholder='Enter field of study' required/>
        </Col>
        <Col xs={12} sm={6} as={Form.Group} controlId='pr-college'>
          <Form.Label>
            מוסד לימודים
            <span className='text-danger'>&nbsp;*</span>
          </Form.Label>
          <Form.Control size='lg' placeholder='Enter your college name' required/>
        </Col>
        <Col xs={12} sm={6} as={Form.Group} controlId='pr-country'>
          <Form.Label>
            מיקום מוסד הלימודים
            <span className='text-danger'>&nbsp;*</span>
          </Form.Label>
          <Form.Control size='lg' placeholder='Enter country, city of your college' required/>
        </Col>
        <Col xs={12} lg={6}>
          <Form.Label>
            תאריך התחלה
            <span className='text-danger'>&nbsp;*</span>
          </Form.Label>
          <Row className='gx-2 gx-sm-3'>
            <Col xs={7} sm={8}>
              <Form.Select size='lg' defaultValue='default' required>
                <option value='default' disabled>Month</option>
                <option value='January'>January</option>
                <option value='February'>February</option>
                <option value='March'>March</option>
                <option value='April'>April</option>
                <option value='May'>May</option>
                <option value='June'>June</option>
                <option value='July'>July</option>
                <option value='August'>August</option>
                <option value='September'>September</option>
                <option value='October'>October</option>
                <option value='November'>November</option>
                <option value='December'>December</option>
              </Form.Select>
            </Col>
            <Col xs={5} sm={4}>
              <Form.Select size='lg' defaultValue='default' required>
                <option value='default' disabled>Year</option>
                <option value='2021'>2021</option>
                <option value='2020'>2020</option>
                <option value='2019'>2019</option>
                <option value='2018'>2018</option>
                <option value='2017'>2017</option>
                <option value='2016'>2016</option>
                <option value='2015'>2015</option>
                <option value='2014'>2014</option>
                <option value='2013'>2013</option>
                <option value='2012'>2012</option>
                <option value='2011'>2011</option>
                <option value='2010'>2010</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
        <Col xs={12} lg={6}>
          <Form.Label>
            תאריך סיום
            <span className='text-danger'>&nbsp;*</span>
          </Form.Label>
          <Row className='gx-2 gx-sm-3'>
            <Col xs={7} sm={8}>
              <Form.Select size='lg' defaultValue='default' required>
                <option value='default' disabled>Month</option>
                <option value='January'>January</option>
                <option value='February'>February</option>
                <option value='March'>March</option>
                <option value='April'>April</option>
                <option value='May'>May</option>
                <option value='June'>June</option>
                <option value='July'>July</option>
                <option value='August'>August</option>
                <option value='September'>September</option>
                <option value='October'>October</option>
                <option value='November'>November</option>
                <option value='December'>December</option>
              </Form.Select>
            </Col>
            <Col xs={5} sm={4}>
              <Form.Select size='lg' defaultValue='default' required>
                <option value='default' disabled>Year</option>
                <option value='2021'>2021</option>
                <option value='2020'>2020</option>
                <option value='2019'>2019</option>
                <option value='2018'>2018</option>
                <option value='2017'>2017</option>
                <option value='2016'>2016</option>
                <option value='2015'>2015</option>
                <option value='2014'>2014</option>
                <option value='2013'>2013</option>
                <option value='2012'>2012</option>
                <option value='2011'>2011</option>
                <option value='2010'>2010</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <Form.Check
            type='checkbox'
            id='still-visiting'
            value='Still visiting'
            label='I currently go here'
          />
        </Col>
        <Col xs={12}>
          <Button variant='link text-primary' className='px-0'>
            <i className='fi-plus me-2'></i>
            הוסף תואר נוסף
          </Button>
        </Col> */}
        </Row>
        <div className='d-flex flex-column flex-sm-row bg-light rounded-3 p-4 px-md-5'>
            <Button size='lg' variant='primary rounded-pill ms-auto' className='mt-sm-0 mt-3' type='submit'>Save resume</Button>
        </div>
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
          <div style={{ flexGrow: '1' }}>
            <PDFViewer
              showToolbar={false}
              style={{
                width: '100%',
                height: '100vh',
                // fontFamily: 'Roboto',
              }}
            >
              <PostResumePDF value={formData} />
            </PDFViewer>
            <PDFDownloadLink
              document={<PostResumePDF value={formData} />}
              fileName='somename.pdf'
              className="btn btn-lg btn-outline-primary rounded-pill ms-3 mt-3 mt-sm-0"
            >
              {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
          </div>
        )}
      </div>
    </JobBoardPostResumeLayout>
  )
}

export default Resume
