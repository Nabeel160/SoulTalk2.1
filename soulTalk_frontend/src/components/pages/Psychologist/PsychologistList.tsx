import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPsychologist, selectPsychologist } from '../../../reduxStore/slice/psychologistSlice';
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
   <div className='stylings container'>
  <div className="row d-flex  flex-wrap gap-2 gap-lg-0">
    {loading ? (
      <div className="loader"></div>
    ) : (
      psychologists?.map((psychologist: { id: React.Key | null | undefined; image: string | undefined; first_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; last_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; user: { email: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }; age: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; qualification: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; reviews: any[]; }) => (
        <div className="col-12 col-sm-6 col-md-5 col-lg-4" key={psychologist.id}>
          <div className="flip-card  ">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img className="title" src={psychologist.image} alt="Psychologist" />
              </div>
              <div className="flip-card-back ">
                <p className="title text-uppercase" ><u>{psychologist.first_name} {psychologist.last_name}</u></p>
                <h5 className="text-uppercase"><u>Details</u></h5>
                <p style={{fontSize:"15px"}}><b>Email:</b> {psychologist.user.email}</p>
                <p style={{fontSize:"15px"}}><b>Age:</b> {psychologist.age}</p>
                <p><b>Qualification:</b> {psychologist.qualification}</p>
                {Array.isArray(psychologist.reviews) && psychologist.reviews.length > 0 && (
                  <h6>Average Rating: {(psychologist.reviews.reduce((total: any, review: { rating: any; }) => total + review.rating, 0) / psychologist.reviews.length).toFixed(2)}</h6>
                )}

                <Link className='btn btn-success btn-view ' style={{fontSize:"20px",backgroundColor:"#19a7ce",textAlign:"center"}} to={`/Psychologist/PsychologistDetail/${psychologist.id}`} onClick={() => handlePsychologistClick(psychologist)}>View</Link>
              </div>
            </div>
          </div>
        </div>
      ))
    )}
  </div>

</div>

  );
};

export default PsychologistList;
