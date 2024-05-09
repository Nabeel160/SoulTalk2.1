import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPsychologist, selectPsychologist } from '../../../reduxStore/slice/psychologistSlice';
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from "axios";
import "../../../styles/psychologist.css";

const PsychologistList = () => {
  const psychologists = useSelector((state:any) => state?.psychologists?.Psychologists);
  const loading = useSelector((state:any) => state?.psychologists?.loading);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/doctors/');
    dispatch(setPsychologist(response.data));
    console.log("DATA FETCHED", response.data);
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handlePsychologistClick = (psychologist: any) => {
    dispatch(selectPsychologist(psychologist));
  };

  return (
    <Container className='stylings'>
      <Row>
        {loading ? (
          <div className="loader"></div>
        ) : (
          psychologists?.map((psychologist: { id: React.Key | null | undefined; image: string | undefined; first_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; last_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; user: { email: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }; age: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; qualification: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; reviews: any[]; }) => (
            <Col xs={12} md={6} lg={4} key={psychologist.id}>
              <Card className="psychologist-card">
                <Card.Img variant="top" src={psychologist.image} />
                <Card.Body className="card-body-custom">
                  <Card.Title>{psychologist.first_name} {psychologist.last_name}</Card.Title>
                  <Card.Text><b>Email:</b> {psychologist.user.email}</Card.Text>
                  <Card.Text><b>Age:</b> {psychologist.age}</Card.Text>
                  <Card.Text><b>Qualification:</b> {psychologist.qualification}</Card.Text>
                  {Array.isArray(psychologist.reviews) && psychologist.reviews.length > 0 && (
                    <h6>Average Rating: {(psychologist.reviews.reduce((total: any, review: { rating: any; }) => total + review.rating, 0) / psychologist.reviews.length).toFixed(2)}</h6>
                  )}
                  <hr />
                  <Link  className='btn btn-success btn-view' to={`/Psychologist/PsychologistDetail/${psychologist.id}`} onClick={() => handlePsychologistClick(psychologist)}>View</Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default PsychologistList;