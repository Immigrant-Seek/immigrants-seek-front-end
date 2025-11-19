import { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../Utils/SectionProps';
import ButtonGroup from '../UI/ButtonGroup';
import Button from '../UI/Button';
import Image from '../UI/Image';
import Modal from '../UI/Modal';
import { Link } from 'react-router-dom';

export default function Hero({
  className,
  topOuterDivider = false,
  bottomOuterDivider = false,
  topDivider = false,
  bottomDivider = false,
  hasBgColor = false,
  invertColor = false,
  ...props
}) {

  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }   

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="nav-top">
        <div className={innerClasses}>
          <div className="hero-content sticky-top">
            <h1 className="mt-0 mb-16 reveal-from-bottom dreamsbridge" data-reveal-delay="200">
              DreamsBridge
            </h1>
            <div className="nav-items">
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup>
                  {/* FIX DOM NESTING ERROR */}
                  <Button className="signin-btn" tag={Link} to={"/login"} wideMobile >
                    Sign In
                  </Button>

                  <Button tag={Link} to={"/lawyer/signup"} color="light" wideMobile className="lawyer-signup-btn">
                    Join our platform as a lawyer
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div className='landing-page-container'>
          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
            <a
              data-video="https://www.youtube-nocookie.com/embed/UzYDqQDNFzc"
              href="#0"
              aria-controls="video-modal"
              onClick={openModal}
            >
              <Image
                className="has-shadow"
                src='/dreamsbridge-hero-banner.jpg'
                alt="Hero Img Placeholder"
                width={850}
                height={500} />
            </a>
            <div className='mission-statement'>
          <h1 className="m-0 mb-32 reveal-from-bottom " data-reveal-delay="400">
            Helping DACA recipents through the renewal process.</h1>
          </div>
          </div>
          </div>
          <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://www.youtube-nocookie.com/embed/UzYDqQDNFzc"
            videoTag="iframe" />
            
        </div>
      </div>
    </section>
    
  );
}
