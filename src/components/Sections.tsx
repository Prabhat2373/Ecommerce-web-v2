import React from 'react';
import Carousel from './carousel/Carousel';
import HeroCarousel from '../pages/Home/HeroCarousel';

interface SectionProps {
  title: string;
  data?: any;
  subhead?: string;
}
const Sections = ({ title, data, subhead }: SectionProps) => {
  return (
    <section className="trends-section mt-8">
      <div className="m-3">
        <h1 className="font-bold text-4xl ">{title}</h1>
        <h4 className="subhead font-normal text-sm">{subhead}</h4>
        <div className="carousel-container">
          <HeroCarousel data={data} />
        </div>
      </div>
    </section>
  );
};

export default Sections;
