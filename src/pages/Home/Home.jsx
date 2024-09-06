import React, { useRef } from 'react';
import PromotionsBlock from './PromotionsBlock/PromotionsBlock';
import DescriptionBlock from './DescriptionBlock/DescriptionBlock'; 
import DetailedInfoBlock from './DetailedInfoBlock/DetailedInfoBlock'; 
import ServicesBlock from './ServicesBlock/ServicesBlock';
import Footer from './Footer/Footer';

const Home = () => {
  const servicesRef = useRef(null);

  const scrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <DescriptionBlock scrollToServices={scrollToServices} />
      <PromotionsBlock />
      <DetailedInfoBlock /> 
      <ServicesBlock ref={servicesRef} />
      <Footer />
    </div>
  );
};

export default Home;
