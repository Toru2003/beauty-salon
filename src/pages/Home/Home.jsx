import React from 'react';
import PromotionsBlock from './PromotionsBlock/PromotionsBlock';
import DescriptionBlock from './DescriptionBlock/DescriptionBlock'; 
import DetailedInfoBlock from './DetailedInfoBlock/DetailedInfoBlock'; 

const Home = () => {
  return (
    <div>
      <DescriptionBlock />
      <PromotionsBlock />
      <DetailedInfoBlock /> {/* Добавляем блок подробной информации */}
    </div>
  );
};

export default Home;
