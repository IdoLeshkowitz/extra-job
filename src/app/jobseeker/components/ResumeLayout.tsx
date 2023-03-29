import { useEffect } from 'react'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const JobBoardPostResumeLayout = ({
  activeStep,
  children,
  prevStep,
  nextStep,
  lastStep
}:{
    activeStep: string,
    children: React.ReactNode,
    prevStep?: string,
    nextStep?: string,
    lastStep?: string
}) => {

  // Add class to body to enable gray background
  useEffect(() => {
    const body = document.querySelector('body')
    document.body.classList.add('bg-secondary')
    return () => body?.classList.remove('bg-secondary')
  })

  // Steps
  const steps = [
    'Basic info',
    'Education',
    'Experience',
    'Skills',
    'Review'
  ]

  return (
    <Container className='py-5 mt-5 mb-md-4'>

      <Row className='justify-content-center pb-sm-2'>
        <Col lg={11} xl={10}>

          {/* Page title */}
          <div className='text-center pb-4 mb-3'>
            <h1 className='h2 mb-4'>צור קורות חיים אונליין</h1>
            <p className='mb-4'>במידה וכבר קיים ברשותכם קורות חיים בפורמט, חסכו זמן והעלו אותו לאתר בפורמט PDF</p>
            <Button size='lg' variant='primary rounded-pill'>
              <i className='fi-upload me-2'></i>
              &nbsp;&nbsp;העלה קורות חיים קיימים
            </Button>
          </div>
          
          {/* Page content */}
          <div className='bg-light rounded-3 p-4 p-md-5 mb-3'>
            {children}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default JobBoardPostResumeLayout