import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import LoadingImage from '../../Assets/images/load.png';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid';
import {
  useAddToCartMutation,
  useGetAllCartQuery,
  useRemoveCartItemMutation,
} from '../../features/services/RTK/Api';
import { ProductType } from '../../interfaces/Payload';
import { useSelector } from 'react-redux';
import { GetRatings } from '../../Helper/Helper';
interface CarouselProps {
  data?: any;
}
export default function HeroCarousel({ data }: CarouselProps) {
  const navigate = useNavigate();
  const { data: CartArray } = useGetAllCartQuery('');
  const User = useSelector((state: any) => state.user.payload);
  const id = User?._id;
  const [removeCartProduct] = useRemoveCartItemMutation();

  const [AddToCart] = useAddToCartMutation();
  const { data: AllCart, refetch: FetchCart } = useGetAllCartQuery(User?._id);
  const [isLoading, setIsLoading] = useState(false);
  const [CartId, setCartId] = useState('');
  function AddCart(product: ProductType, quantity: string | number) {
    console.log('product hero', product);
    setIsLoading(true);
    AddToCart({
      payload: {
        name: product?.name,
        product: product?._id,
        description: product?.description,
        price: product?.price,
        image: product?.images?.[0]?.url,
        quantity: quantity,
        user: User?._id,
      },
      id,
    }).then(() => {
      FetchCart();
      setIsLoading(false);
    });
  }

  useEffect(() => {}, [AllCart]);
  // CartArray?.filter((element: any, i: number) => {
  //   console.log('element', data[i]?._id === element?.productId)
  //   if (data[i]?._id === element?.productId) {
  //     ProductInCart.push(element)
  //   }
  //   else { }
  // })
  const ProductInCart = data?.filter((el: any, i: number) => {
    console.log('iiii', el);
    console.log('cart', CartArray?.[i]);
    return el?._id === CartArray?.[i]?.productId;
  });
  const RemoveFromCart = (id: number | string) => {
    removeCartProduct(id);
  };
  console.log('isProduct', ProductInCart);
  console.log('data', data);
  console.log('cart', CartArray);

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        spaceBetween={10}
        navigation
        pagination={{
          clickable: true,
        }}
        // width={1200}
        breakpoints={{
          // when window width is >= 320px
          '320': {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 480px
          '480': {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          '680': {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          // when window width is >= 640px
          '840': {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        height={1200}
        className="mySwiper"
        effect="creative"
      >
        {data?.length > 0 ? (
          data?.map((element: ProductType, index: number) => {
            console.log('newwww', element?._id, CartArray?.[index]?.productId);
            return (
              <SwiperSlide>
                <div
                  className="swiper-child w-[400px] bg-[#D9D9D9] m-3 "
                  key={element?._id + 1}
                >
                  <img
                    src={element?.images[0]?.url ?? LoadingImage}
                    alt={'Loading Product Imag'}
                    className="cursor-pointer"
                    width={'400px'}
                    height={'440px'}
                    onClick={() => {
                      navigate(`/view/${element?._id}`);
                    }}
                  />
                  <div className="flex justify-between p-2">
                    <h3>{element?.name ?? 'PRODUCT '}</h3>
                    <p className="flex">
                      {GetRatings(element?.ratings - 1)?.map(
                        (rating: number) => {
                          return (
                            <StarIcon
                              key={rating}
                              className={
                                'text-orange-500 h-5 w-5 flex-shrink-0'
                              }
                              aria-hidden="true"
                            />
                          );
                        }
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between p-2">
                    <h2>₹ {element?.price}</h2>
                    <p
                      className="cursor-pointer"
                      id={element?._id}
                      onClick={(e) => {
                        setCartId(e?.currentTarget?.id);

                        if (element?._id === CartArray?.[index]?.productId) {
                          RemoveFromCart(element?._id);
                          console.log('hit remove api');
                        } else {
                          AddCart(element, 1);
                        }
                      }}
                    >
                      {isLoading && element?._id === CartId ? (
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="mr-2 w-8 h-8 text-white animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#e1f4fecc"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <>
                          {element?._id === CartArray?.[index]?.productId ? (
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 24 24"
                              fill={'red'}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 24 24"
                              fill={'blue'}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <div
            className="swiper-child w-[400px] bg-[#D9D9D9] m-3 "
            key={Math.random()}
          >
            <img
              src={LoadingImage}
              alt={'alter'}
              className="cursor-pointer"
              width={'400px'}
              height={'440px'}
            />
            <div className="flex justify-between p-2">
              <h3>{'PRODUCT '}</h3>
              <p className="flex">
                <StarIcon
                  key={Math.random()}
                  className={'text-orange-500 h-5 w-5 flex-shrink-0'}
                  aria-hidden="true"
                />
                <StarIcon
                  key={Math.random()}
                  className={'text-orange-500 h-5 w-5 flex-shrink-0'}
                  aria-hidden="true"
                />
                <StarIcon
                  key={Math.random()}
                  className={'text-orange-500 h-5 w-5 flex-shrink-0'}
                  aria-hidden="true"
                />
                <StarIcon
                  key={Math.random()}
                  className={'text-orange-500 h-5 w-5 flex-shrink-0'}
                  aria-hidden="true"
                />
                <StarIcon
                  key={Math.random()}
                  className={'text-gray-400 h-5 w-5 flex-shrink-0'}
                  aria-hidden="true"
                />
              </p>
            </div>
            <div className="flex justify-between p-2">
              <h2>₹ price</h2>
              <p
                className="cursor-pointer"
                onClick={() => console.log('ADDING TO CART')}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </p>
            </div>
          </div>
        )}
      </Swiper>
      <div className="review-swiper-button-prev "></div>
      <div className="review-swiper-button-next "></div>
    </>
  );
}
