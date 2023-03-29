'use client';

import { useRef, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import JobBoardPostResumeLayout from '../components/ResumeLayout'
  
import { Document, Page, Text, View, StyleSheet, pdf, PDFDownloadLink,Font } from '@react-pdf/renderer';

Font.register({ family : 'Arial', src: 'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0bf8pkAp6a.woff2' });
const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      padding: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
});

const PostResumePDF = () => (
  <Document >
    <Page size='A4' style={styles.page}>
      <View>
        <Text>אחת שתיים שלוש</Text>
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
      };

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
          Basic info
        </h2>
        <Form onSubmit={handleSubmit}>
        <Row xs={1} sm={2} className='gy-4 mb-4'>
          <Col as={Form.Group} controlId='pr-fn'>
            <Form.Label>
              First name
              <span className='text-danger'>&nbsp;*</span>
            </Form.Label>
            <Form.Control size='lg' placeholder='Enter your first name' defaultValue='Annette' required/>
          </Col>
          <Col as={Form.Group} controlId='pr-sn'>
            <Form.Label>
              Second name
              <span className='text-danger'>&nbsp;*</span>
            </Form.Label>
            <Form.Control size='lg' placeholder='Enter your second name' defaultValue='Black' required/>
          </Col>
          <Col as={Form.Group} controlId='pr-email'>
            <Form.Label>
              Email address
              <span className='text-danger'>&nbsp;*</span>
            </Form.Label>
            <Form.Control size='lg' type='email' placeholder='Enter your email address' defaultValue='annette_black@email.com' required/>
          </Col>
          <Col as={Form.Group} controlId='pr-phone'>
            <Form.Label>
              Phone
            </Form.Label>
            <Form.Control  size='lg' type='tel' placeholder='Enter your phone number' defaultValue='(302) 555-0107' />
          </Col>
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
          <PDFDownloadLink
            document={<PostResumePDF/>}
            fileName="somename.pdf"
            className="btn btn-lg btn-outline-primary rounded-pill ms-3 mt-3 mt-sm-0"
          >
            {({ loading }) =>
              loading ? 'Loading document...' : 'Download now!'
            }
          </PDFDownloadLink>
        )}
      </div>
    </JobBoardPostResumeLayout>
  )
}

export default Resume
