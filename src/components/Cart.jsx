import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCartData, deleteItem } from '../utils/cartSlice';
import toast from 'react-hot-toast';
import { toggleLogIn } from '../utils/toggleSlice';

function Cart() {
    let veg = "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png"
    let nonVeg = "https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png"
    const cartData = useSelector((state) => state.cartSlice.cartItems)
    const resInfo = useSelector((state) => state.cartSlice.resInfo)
    const dispatch = useDispatch()
    const [showMoreStates, setShowMoreStates] = useState({});
    const userData = useSelector((state) => state.authSlice.UserData)
    let totalPrize = cartData.reduce((acc, currVal) => acc + (currVal.price ? currVal.price / 100 : currVal.defaultPrice / 100), 0);

    if (cartData.length <= 0) {
        return (
            <div className="flex flex-col items-center mt-12 justify-center min-h-[60vh] text-center p-6">
                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="Cart Empty" className="w-75 h-75 md:w-80 md:h-80 mb-4" />
                <p className="text-xl font-bold text-gray-800">Your Cart is Empty!</p>
                <p className="text-gray-600 text-sm md:text-base max-w-sm mt-2">You can go to home page to view more restaurants</p>
                <Link to={"/"}><button className='m-3 text-white hover:cursor-pointer font-bold bg-orange-600 p-3 w-[300px]'>Restaurants near you!</button></Link>
            </div>
        );
    }

    function handleRemoveFromCart(index) {
        dispatch(deleteItem(index))
        toast.success("Item removed from cart!")
    }

    function clearCart() {
        dispatch(clearCartData())
        toast.success("Cart cleared succesfully!")
    }

    function toggleShowMore(index) {
        setShowMoreStates((prev) => ({ ...prev, [index]: !prev[index] }));
    }

    function handlePlaceOrder() {
        if (!userData) {
            toast.error("You need to login to place an order")
            dispatch(toggleLogIn())
            return
        }
        toast.success("Order Placed Successfully")
    }

    return (
        <div className='w-full'>
            <div className='w-[95%] md:w-[800px] mx-auto'>
                <div className='flex p-10'>
                    <img className='rounded-xl mr-10' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${resInfo.cloudinaryImageId}`} alt="" />
                    <div className='mt-5 mr-20'>
                        <p className='text-5xl border-b-2 border-black pb-3'>{resInfo.name}</p>
                        <p className='mt-3 text-xl'>{resInfo.areaName} {resInfo.avgRating}</p>
                        <p className='flex items-center mt-1 gap-1 font-bold text-green-700'><i className="fi fi-ss-circle-star mt-1 text-green-600 text-lg"></i> {resInfo.avgRating}<span className='mb-2 text'> . </span><span>{resInfo?.sla?.slaString}</span></p>
                        <p className='line-clamp-1 overflow-hidden text-ellipsis'>{resInfo?.cuisines?.join(", ")}</p>
                        <p className='line-clamp-1 overflow-hidden text-ellipsis font-semibold'>{resInfo.locality}</p>
                    </div>

                </div>
                <hr />
                {cartData.map((data, index) => {
                    let trimDes = data.description ? data.description.substring(0, 130) + "..." : "";
                    const isLast = index === cartData.length - 1;
                    const showMore = showMoreStates[index] || false;
                    return (
                        <>
                            <div key={`item-${index}`} className='flex justify-between my-8 p-2'>
                                <div className='w-[55%] md:w-[70%] mt-2'>
                                    {
                                        data.isVeg ? <img className='w-4 h-4' src={veg} /> : <img className='w-4 h-4' src={nonVeg} />
                                    }                                    
                                    <h2 className='font-bold text-lg'>{data.name}</h2>
                                    <p className='font-bold text-lg italic'>₹ {data.defaultPrice / 100 || data.price / 100}</p>{trimDes && (<div><span>{showMore ? data.description : trimDes}</span>{trimDes.length >= 50 && (<button onClick={() => toggleShowMore(index)} className="cursor-pointer mx-1 font-bold text-gray-600">{showMore ? "less" : "more"}</button>)}</div>)}</div>
                                <div className='w-[40%] md:w-[20%] relative'>{data.imageId && (<img className='rounded-xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${data.imageId}`} alt="" />)}
                                    <button onClick={() => handleRemoveFromCart(index)} className={`bg-slate-100 text-base font-bold left-1/2 px-5 -translate-x-1/2 tra border text-green-600 hover:cursor-pointer shadow-slate-600 shadow-2xl rounded-xl absolute py-2 ${data.imageId ? 'bottom-[-20px]' : 'top-[30px]'}`}> Remove </button></div>
                            </div>
                            {!isLast && <hr className="opacity-20" />}
                        </>
                    );
                })}
                <div className="flex">
                    <h1 className='text-xl mr-1'>Total price:</h1>
                    <p className="font-semibold mt-1">{totalPrize}</p>
                </div>
                <div className='flex justify-between'>
                    <button onClick={handlePlaceOrder} className='`bg-slate-100 text-lg font-bold border px-10 mt-5 text-green-600 hover:cursor-pointer drop-shadow-2xl rounded-xl py-2'>Place Order</button>
                    <button onClick={clearCart} className='`bg-slate-100 text-lg font-bold border px-10 mt-5 text-green-600 hover:cursor-pointer drop-shadow-2xl rounded-xl py-2'>Clear Cart</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
