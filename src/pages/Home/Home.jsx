import React from 'react';
import PromotionsBlock from './PromotionsBlock/PromotionsBlock';
import DescriptionBlock from './DescriptionBlock/DescriptionBlock'; 
import DetailedInfoBlock from './DetailedInfoBlock/DetailedInfoBlock'; 
import ServicesBlock from './ServicesBlock/ServicesBlock';

const Home = () => {
  return (
    <div>
      <DescriptionBlock />
      <PromotionsBlock />
      <DetailedInfoBlock /> 
      <ServicesBlock />
    </div>
  );
};

export default Home;
