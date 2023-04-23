import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
interface Props {
  data: Image[];
}
export type Image = {
  _id: string;
  public_id: string;
  url: string;
};

const Carousel = ({ data }: Props) => {
  console.log('images', data);
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        spaceBetween={20}
        navigation
        pagination={{
          clickable: true,
        }}
        // width={1200}
        // height={1200}
        className="mySwiper"
      >
        {data?.length > 0 ? (
          data?.map((image) => {
            return (
              <>
                <SwiperSlide>
                  <div className="swiper-child w-[400px] m-3 ">
                    <img src={image?.url ?? ''} alt="Alternate " />
                  </div>
                </SwiperSlide>
              </>
            );
          })
        ) : (
          <h1>No Images</h1>
        )}
      </Swiper>
      <div className="review-swiper-button-prev "></div>
      <div className="review-swiper-button-next "></div>
    </>
  );
};

export default Carousel;
