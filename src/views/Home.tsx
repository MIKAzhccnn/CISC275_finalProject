import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container } from "react-bootstrap";
import { Footer } from "../components/Footer";
import "../App.css";
import React, { useState } from 'react';
import Basic from "../views/Basic_Questions"
import Detail from "../views/Detail_Questions"
import Result from "../views/Results"
import "@fontsource/rubik";

function Home() {
  const [currentPage, setCurrentPage] = useState<string>('HomePage');


  function HomePageContent() {
    return (
        <div style = {{position: 'relative', top: '70px', padding: 'none'}} className="text-center">
            <h1 style={{fontSize: '80px', color: 'black'}}>
                FindYourCareer
            </h1>
            <h5>
                for
            </h5>
            <h4>
                UNIVERSITY OF DELAWARE STUDENTS
            </h4>
        
            <Container style = {{position: 'relative', top: '70px', padding: 'none'}}>
                <Row className='text-center' style={{columnGap: '20px'}}>
                    <Col style = {{border: '10px solid Background', backgroundColor: 'burlywood', borderStyle: 'ridge'}}>
                    <button style={{ verticalAlign: 'middle', background: 'none', border: 'none', lineHeight: '1.2', fontWeight: '500', color: 'var(--bs-heading-color)', marginTop: '0', marginBottom: '10px', fontSize: '30px'}}onClick={() => setCurrentPage('BasicPage')}>
                      <span>Basic Questions</span>
                      </button>
                        <h5 style = {{padding: '10px'}}>
                        Discover Your Career Fit with Ease
                        </h5>
                        <h6 style = {{padding: '20px'}}>
                        Our basic questions career assessment is a quick and straightforward way to explore potential career
                        paths based on your interests, skills, and personality. Answer a few simple questions, and
                        get personalized career suggestions that align with your strengths and aspirations. Perfect
                        for those seeking a quick overview of their career options.
                        </h6>
                    </Col>
                    <Col style = {{border: '10px solid black', backgroundColor: 'burlywood', borderStyle: 'groove'}}>
                      <button style={{ verticalAlign: 'middle', background: 'none', border: 'none', lineHeight: '1.2', fontWeight: '500', color: 'var(--bs-heading-color)', marginTop: '0', marginBottom: '10px', fontSize: '30px'}}onClick={() => setCurrentPage('DetailPage')}>
                        <span>Detailed Questions</span>
                        </button>
                        <h5 style = {{padding: '10px'}}>
                        Dive Deep Into Your Career Potential
                        </h5>
                        <h6 style = {{padding: '20px'}}>
                        Our detailed questions career assessment provides an in-depth analysis of your 
                        interests, skills, personality traits, and values to uncover a comprehensive 
                        range of career possibilities. Receive personalized career recommendations, 
                        along with insights into educational paths, certifications, and resources 
                        to support your career journey. Ideal for those seeking a thorough exploration 
                        of their career options.
                        </h6>
                    </Col>
                </Row>
            </Container>
        </div>
    )
  }

  function BasicPageContent() {
    return (
      <div >
        <Basic/>
      </div>
    );
  }

  function DetailedPageContent() {
    return (
      <div>
        <Detail/>
      </div>
    );
  }

  function ResultPageContent() {
    return (
      <div>
        <Result/>
      </div>
    );
  }

  return (
    <div>
      <Container style={{maxWidth: '100%', height: '100%', maxHeight: '100%'}}>
      <svg style={{position: 'absolute', left: '155px', top: '50px', color: 'white'}} xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-lightbulb">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
        <path d="M9 18h6"/>
        <path d="M10 22h4"/>
        </svg>
        <Row>
        <Col style={{maxWidth: '30%', textAlign: 'center', position: 'relative', top: '200px', paddingLeft:'100px', paddingRight:'100px'}}>
        <Row style = {{borderBottom: '2px solid black'}}>
        <span style = {{fontSize: '30px', verticalAlign: 'center', fontWeight: 'bold', padding: '10px'}}>
          FindYourCareer
          </span>
            </Row>
        <Row>
        <button className="button btn1" onClick={() => setCurrentPage('HomePage')}>
            <span>Home Page</span>
          </button>
          </Row>
        <Row>
          <button className="button btn1" onClick={() => setCurrentPage('BasicPage')}>
            <span>Basic Quiz</span>
            </button>
            </Row>
        <Row>
          <button className="button btn1" onClick={() => setCurrentPage('DetailPage')}>
            <span>Detailed Quiz</span>
            </button>
            </Row>
        <Row style = {{borderBottom: '2px solid black'}}>
        <button className="button btn1" onClick={() => setCurrentPage('ResultPage')}>
            <span>Result</span>
            </button>
            </Row>
        </Col>
        <Col style={{position: 'fixed', left: '30%', maxWidth: '70%'}}>
        <div className="page-content" style={{textAlign: 'center'}}>
          {currentPage === 'HomePage' && <HomePageContent />}
          {currentPage === 'BasicPage' && <BasicPageContent />}
          {currentPage === 'DetailPage' && <DetailedPageContent />}
          {currentPage === 'ResultPage' && <ResultPageContent />}
        </div>
        </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  );
}





export default Home;