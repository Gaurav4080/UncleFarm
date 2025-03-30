import React from 'react';

function SearchRestaurantCard({
  data: {
    card: {
      card: {
        info: {
          id,
          name,
          cloudinaryImageId,
          aggregatedDiscountInfoV3 = {},
          costForTwoMessage,
          cuisines,
          promoted = false,
          avgRating,
          sla: { slaString }
        }
      }
    }
  }
}) {
  return (<div className='bg-white m-4 p-2 flex gap-5 items-center md:max-w-fit'>
    <div className='w-[30%]'>
      <img className='aspect-square rounded-lg ' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_324,c_fill/${cloudinaryImageId}`} alt="" />
    </div>
    <div className='w-[60%]'>
      <p className='font-bold'>{name}</p>
      <div className='flex gap-1 text-[8px] font-semibold'>
        <i className="fi fi-ss-star text-sm mt-1"></i>
        <p className='my-1 text-[12px]'>{avgRating} . </p>
        <p className='my-1 text-[12px]'>{costForTwoMessage} </p>
      </div>
      <p className='line-clamp-1 text-sm text-slate-500'>{cuisines.join(", ")}</p>
    </div>
  </div>);
}

export default SearchRestaurantCard;
