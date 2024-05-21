import React from 'react';
import '../../App.css';
import 'animate.css';
import { useLocation } from 'react-router-dom';
import { useState,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import img from "../../assets/images/sample pictures for depression website project/pic 1.jpg"
import Feature from '../HomeComponents/Feature';
import 'font-awesome/css/font-awesome.min.css';
import Testimonial from '../HomeComponents/Testimonial';
import team1 from "../../assets/images/team/team-1.jpg";
import team2 from "../../assets/images/team/team-2.jpg";
import team3 from "../../assets/images/team/team-3.jpg";
import 'boxicons/css/boxicons.min.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import {FiPlus} from "react-icons/fi";
import Carouselmoto from '../HomeComponents/Carouselmoto';
import axios from "axios";


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const getCSRFToken = () => {
  const csrfCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
  return csrfCookie ? csrfCookie.split('=')[1] : null;
};

interface DoctorType {
  id: number;
  first_name: string;
  image: string;
  price: string;
}

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
  headers: {
    'X-CSRFToken': getCSRFToken(), // Ensure you have the getCSRFToken function
  },
});


export default function Home() {


  useEffect(()=>{
    const checkForCanceledParam = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('success') && urlParams.get('success') === 'true') {
                // Run your function here
                // For example:
              const number = urlParams.get('n');
                try {

                  await client.post('api/subscribe_doctor/', {
                    doctor: number
                  });
                }catch(e){
                  console.log(e)
                }
                // You can replace the alert with any function you want to run
            }
        };
    checkForCanceledParam();
  }, [])


  const location = useLocation();
  useEffect(() => {
    const sectionToScrollTo = new URLSearchParams(location.search).get('section');

    if (sectionToScrollTo) {
      const targetSection = document.getElementById(sectionToScrollTo);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }

  }, [location]);
  useEffect(() => {
    Aos.init();
  }, [])
  const [active, setActive] = useState(false);

  const contentRef:any = useRef(null);

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : "0px";
  }, [contentRef, active]);

  const toggleAccordion = () => {
    setActive(!active);
  };
  return (
    <>
    <section id='home' className='home  flex-column  bg-black ' >
    <h1 data-aos="fade-up">Welcome To Soul Talk</h1>
      <h2 data-aos="fade-up">We are the one who provides you the facility of mental therapy for your  <br/> mind thoughts and feelings.</h2>
      </section>



                                                   {/*About Section*/}

      <section id="about-us" className="about">
        
      <div className="container rsa">

<div className="row" >
  <div className="split  col-xl-6 col-lg-5" >
  <img src={img} className="img-fluid split-image" alt=""/>
  </div>
  <div className="col-xl-6  col-lg-7 pt-5 pt-lg-0">
    <h3 data-aos="fade-up" >About the Soul Talk</h3>
    <p  className='fw-light 'data-aos="fade-up">
      The pain itself is the love of the pain, the main ecological problems, but I give this kind of time to fall down, so that some great pain and pain.
    </p>
    <div className="icon-box " data-aos="fade-up">
      <i className="bx bx-receipt"></i>
      <h4>Our Vision</h4>
      <p>Our vision is to provide a safe place of refuge to our people where they can gain admittance to psychosocial support day in and day out according to their flexibility, liberated from and to break the untouchable related with psychological wellness spreading mindfulness across the globe.</p>
    </div>

    <div className="icon-box " data-aos="fade-up" data-aos-delay="100">
      <i className="bx bx-cube-alt "></i>
      <h4 >Our Policy</h4>
      <p >Our policy is to help individuals through our profoundly capable group of Clinical Psychologists/specialists with most extreme privacy and secrecy, holding the nature of our administrations under control by means of normal preparation of our specialist organizations.</p>
    </div>

    <div className="icon-box " data-aos="fade-up" data-aos-delay="200">
      <i className="bx bx-cube-alt "></i>
      <h4 >Privacy</h4>
      <p >Our factor of privacy is basically support for such patients who only due to of reason of the society behaviour towards them cannot take proper treatment we provide them this privacy that they can easily approach to doctors for treatment remotely from any place with full secrecy.</p>
    </div>

  </div>
</div>

</div>
</section>{/*<!-- End About Section -->*/}
      
                                         {/*<!--Start of motto part-->*/}
    <section>
      <div className="container-fluid">
      <div className="row no-gutters" id="motto">
      
      <div className="col-lg-4 col-md-6 content-item ">
        <h2 id="wordop">Our Motto</h2>
            </div>
      </div>
      <div className='row '>
        <div className='col-12'>
        <Carouselmoto/>
        </div>
      </div>
    </div>
    </section>
                                                 {/*Start Step Section*/}
    <section id="steps" className="steps section-bg">
      <div className="container">

        <div className="row no-gutters">

          <div className="col-lg-4 col-md-6 content-item" data-aos="fade-in">
            <span>01</span>
            <h4>Lorem Ipsum</h4>
            <p>Ulamco laboris nisi ut aliquip ex ea commodo consequat. Et consectetur ducimus vero placeat</p>
          </div>

          <div className="col-lg-4 col-md-6 content-item" data-aos="fade-in" data-aos-delay="100">
            <span>02</span>
            <h4>Repellat Nihil</h4>
            <p>Dolorem est fugiat occaecati voluptate velit esse. Dicta veritatis dolor quod et vel dire leno para dest</p>
          </div>

          <div className="col-lg-4 col-md-6 content-item" data-aos="fade-in" data-aos-delay="200">
            <span>03</span>
            <h4> Ad ad velit qui</h4>
            <p>Molestiae officiis omnis illo asperiores. Aut doloribus vitae sunt debitis quo vel nam quis</p>
          </div>

          <div className="col-lg-4 col-md-6 content-item" data-aos="fade-in" data-aos-delay="300">
            <span>04</span>
            <h4>Repellendus molestiae</h4>
            <p>Inventore quo sint a sint rerum. Distinctio blanditiis deserunt quod soluta quod nam mider lando casa</p>
          </div>

          <div className="col-lg-4 col-md-6 content-item" data-aos="fade-in" data-aos-delay="400">
            <span>05</span>
            <h4>Sapiente Magnam</h4>
            <p>Vitae dolorem in deleniti ipsum omnis tempore voluptatem. Qui possimus est repellendus est quibusdam</p>
          </div>

          <div className="col-lg-4 col-md-6 content-item" data-aos="fade-in" data-aos-delay="500">
            <span>06</span>
            <h4>Facilis Impedit</h4>
            <p>Quis eum numquam veniam ea voluptatibus voluptas. Excepturi aut nostrum repudiandae voluptatibus corporis sequi</p>
          </div>

        </div>

      </div>
    </section>{/*<!-- End Steps Section -->*/}
 
                                      {/*<!-- ======= Features Section ======= -->*/}
                                      <section id="features" className="features">
     <Feature/>
    </section>{/*<!-- End Features Section -->*/}
   {/* <!-- ======= Services Section ======= -->*/}
    <section id="services" className="services section-bg">
      <div className="container">

        <div className="section-title" data-aos="fade-up">
          <h2>Services</h2>
          <p>Our services for our users.</p>
        </div>

        <div className="row ">
          <div className=" col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="fade-up">
            <div className="icon-box icon-box-pink">
              <div className="icon "><i className="fa fa-dribbble"></i></div>
              <h4 className="title"><a href="/Psychologist/psychologistList">E-Thearpy</a></h4>
              <p className="description">We provide you opportunity of treatment via online medium from our available doctors on pannel.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="100">
            <div className="icon-box icon-box-cyan">
              <div className="icon"><i className="fa fa-file"></i></div>
              <h4 className="title"><a href="/Psychologist/psychologistList">Sessions</a></h4>
              <p className="description">We can offer you a online session at your flexible time according to your time with a doctor of your choice.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="200">
            <div className="icon-box icon-box-green">
              <div className="icon"><i className="fa fa-tachometer"></i></div>
              <h4 className="title"><a href="/Psychologist/psychologistList">Chat</a></h4>
              <p className="description">Availability of chat platforms with other user in anonymous way.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="300">
            <div className="icon-box icon-box-blue">
              <div className="icon"><i className="bx bx-world"></i></div>
              <h4 className="title"><a href="/Psychologist/psychologistList"><strong>24/7</strong> Availability</a></h4>
              <p className="description">Availability of all pannel full time a week.</p>
            </div>
          </div>

        </div>

      </div>
    </section>{/*<!-- End Services Section -->*/}
                                                   {/*<!--Start Testimonial Section-->*/}
    <section className="container testimonial-section">
      <div className="testimonial-title">
      <h2>Testimonials</h2>
          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
        <div className="testimonial-underline"></div>
      </div>
      <Testimonial />
    </section>
                                             {/*<!--End Testimonial Section-->*/}
                                             {/*<!--Start Awareness Section-->*/}
    <section id="awareness" className="portfolio section-bg">
      <div className="container">

        <div className="section-title" data-aos="fade-up">
          <h2>Awareness</h2>
          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
        </div>
        </div>
    </section>
                                             {/*<!--End Awaremess Section-->*/}
                                            
                                             {/*<!-- ======= Team Section ======= -->*/}
    <section id="team" className="team">
      <div className="container">

        <div className="section-title" data-aos="fade-up">
          <h2>Team</h2>
          <p>Our management team</p>
        </div>

        <div className="row">

          <div className="col-lg-4  col-md-6" data-aos="fade-up">
            <div className="member">
              <img src={team1} className="img-fluid" alt=""/>
              <div className="member-info">
                <div className="member-info-content">
                  <h4>Ahmed</h4>
                  <span>Chief Executive Officer</span>
                </div>
                <div className="social">
                  <a href="/Psychologist/psychologistList"><i className="fa fa-twitter"></i></a>
                  <a href="/Psychologist/psychologistList"><i className="fa fa-facebook"></i></a>
                  <a href="/Psychologist/psychologistList"><i className="fa fa-instagram"></i></a>
                  <a href="/Psychologist/psychologistList"><i className="fa fa-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div className=" col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div className="member">
              <img src={team2} className="img-fluid" alt=""/>
              <div className="member-info">
                <div className="member-info-content">
                  <h4>Nabeel</h4>
                  <span>Product Manager</span>
                </div>
                <div className="social">
                  <a href="/Psychologist/psychologistList"><i className="fa fa-twitter"></i></a>
                  <a href="/Psychologist/psychologistList"><i className="fa fa-facebook"></i></a>
                  <a href="/Psychologist/psychologistList"><i className="fa fa-instagram"></i></a>
                  <a href="/Psychologist/psychologistList"><i className="fa fa-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mx-auto " data-aos="fade-up" data-aos-delay="200">
            <div className="member">
              <img src={team3} className="img-fluid" alt=""/>
              <div className="member-info">
                <div className="member-info-content">
                  <h4>Farrukh</h4>
                  <span>CTO</span>
                </div>
                <div className="social">
                  <a href="/Psychologist/psychologistList"><i className="fa fa-twitter"></i></a>
                  <a href="/Psychologist/psychologistList"><i className="fa fa-facebook"></i></a>
                  <a href="/Psychologist/psychologistList"><i className="fa fa-instagram"></i></a>
                  <a href="/Psychologist/psychologistList"><i className="fa fa-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>


        </div>

      </div>
    </section>{/*<!-- End Team Section -->*/}
     {/*<!--Start faq Section-->*/}
     <section id="faq" className=" section-bg">
      <div className="container-fluid">

        <div className="section-title" data-aos="fade-up">
          <h2>F.A.Q</h2>
          <p>Possible answer question for our user</p>
        </div>
        <div className='faq '>
          <button
            className={`question-section ${active}`}
            onClick={toggleAccordion}
          >
            <div>
              <div className="question-align">
                <h4 className="question-style ">
                <i className="bx bx-help-circle icon-help"></i>
                  Why do you like web developemnt
                </h4>
                <FiPlus
                  className={active ? `question-icon rotate` : `question-icon`}
                />
              </div>
              <div
                ref={contentRef}
                className={active ? `answer answer-divider` : `answer`}
              >
                <p>Because I love coding</p>
              </div>
            </div>
          </button>
        </div>
        </div>
    </section>

                                             {/*<!-- ======= End faq Section ======= -->*/}
    {/*<!-- ======= Contact Section ======= -->*/}
    <section id="contactUs" className="contact">
      <div className="container">

        <div className="section-title" data-aos="fade-up">
          <h2>Contact</h2>
          <p>Our contact details.</p>
        </div>

        <div className="row no-gutters justify-content-center" data-aos="fade-up">

          <div className="col-lg-5 d-flex align-items-stretch">
            <div className="info">
              <div className="address">
                <i className="fa fa-map-marker"></i>
                <h4>Location:</h4>
                <p>PTCL Academy, H-9/4, Islamabad, Pakistan</p>
              </div>

              <div className="email mt-4">
                <i className="fa fa-envelope"></i>
                <h4>Email:</h4>
                <p>info@example.com</p>
              </div>

              <div className="phone mt-4">
                <i className="fa fa-phone"></i>
                <h4>Call:</h4>
                <p>+1 5589 55488 55s</p>
              </div>

            </div>

          </div>

          <div className="col-lg-5 d-flex align-items-stretch">
            <iframe title='map' width="100%" height= "270px" src="https://maps.google.com/maps?q=Islamabad&t=&z=13&ie=UTF8&iwloc=&output=embed"   ></iframe>
          </div>

        </div>

        <div className="row mt-5 justify-content-center" data-aos="fade-up">
          <div className="col-lg-10">
            <form   className="php-email-form">
              <div className="row">
                <div className="col-md-6 form-group">
                  <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required/>
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required/>
                </div>
              </div>
              <div className="form-group mt-3">
                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required/>
              </div>
              <div className="form-group mt-3">
                <textarea className="form-control" name="message" rows={5} placeholder="Message" required></textarea>
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div className="text-center"><button type="submit">Send Message</button></div>
            </form>
          </div>

        </div>

      </div>
    </section>{/*<!-- End Contact Section -->*/}
    <footer id="footer">
  <div className="footer-top">
    <div className="container">
      <div className="row " style={{display:"flex"}}>
        <div className="col-lg-3 col-md-2 col-sm-6">
          <div className="footer-info">
            <h3>Soul Talk</h3>
            <p>
              Air University <br/>
              E-9, Islamabad, Pakistan<br/><br/>
              <strong>Phone:</strong> +1 5589 55488 55<br/>
              <strong>Email:</strong> info@soultalk.com<br/>
            </p>
            <p className="description">Soul Talk provides online therapy services connecting users with professional psychologists.</p>
            <div className="social-links mt-3">
              <a href="#" className="twitter"><i className="fa fa-twitter"></i></a>
              <a href="#" className="facebook"><i className="fa fa-facebook"></i></a>
              <a href="#" className="instagram"><i className="fa fa-instagram"></i></a>
              <a href="#" className="linkedin"><i className="fa fa-linkedin"></i></a>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-4 d-none d-md-block">
          <div className="footer-newsletter">
            <h4>Our Newsletter</h4>
            <p>Subscribe to our newsletter for the latest updates and news.</p>
            <form action="#" method="post">
              <input type="email" name="email" placeholder="Enter your email"/>
              <input type="submit" value="Subscribe"/>
            </form>
          </div>
        </div>

        <div className="col-lg-3 col-md-2 col-sm-6" >
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to='/?section=home' >
            Home
            </Link></li>
              <li><Link to='/?section=about-us' >
            About-us
            </Link></li>
              <li><Link to='/?section=services' >
            Services
            </Link></li>
              <li><Link to='/?section=awareness' >
            Awareness
            </Link></li>
            <li><Link to='/?section=team' >
            Team
            </Link></li>
            <li><Link to='/?section=contactUs' >
            ContactUs
            </Link></li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>

  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="credits">
          Designed by <a href="#">Friendly Developers & 128 Technologies</a>
        </div>
      </div>
    </div>
  </div>
</footer>


    </>
  );
}

