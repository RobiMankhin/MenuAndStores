import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import img from "../assets/photo/my.jpg";
import {
  decreaseQnty,
  increaseQnty,
  removeFromcart,
} from "../Features/MenuSlice";

const ItemDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { totalAmount, cart } = useSelector((state) => state.food);

  const cartitem = cart.find((item) => item.id === parseInt(id));
  const { item } = location.state || {}; // Default to an empty object if state is not available
  console.log("item :", item);
  const activeItem = cartitem || item;

  // Ensure item is defined and has necessary properties
  const imageURL = activeItem?.imgdata || img;

  const handleDecreaseQnty = () => {
    if (cartitem) {
      if (cartitem.qnty > 1) {
        dispatch(decreaseQnty(cartitem));
      } else {
        dispatch(removeFromcart(cartitem));
        navigate("/menu");
      }
    } else {
      console.error("Cart item not found.");
    }
  };

  const handleRemovefromcart = () => {
    if (cartitem) {
      dispatch(removeFromcart(cartitem));
      navigate("/menu");
    } else {
      console.error("Cart item not found.");
    }
  };

  if (!item) {
    return <p>sent item not found</p>; // Handling case where item is not available
  }

  if (!cartitem) {
    return <p>Item not found in cart</p>; // Handling case where item is not in the cart
  }

  return (
    <div className="bg-blue-100 shadow-xl transition-transform duration-300 hover:scale-105 shadow-blue-300 mt-9 p-1 rounded-md w-[350px] md:w-[750px] mx-auto">
      <h1 className="font-bold shadow-blue-300 text-2xl shadow-md py-1 rounded-lg text-center">
        Item Detail
      </h1>
      <div className="flex flex-col items-center md:flex-row gap-4 mt-3 bg-blue-100 rounded-md p-2">
        <div>
          <img
            className="rounded-lg"
            style={{ width: "240px", height: "200px" }}
            src={imageURL}
            alt={item.name || "Item image"} // Use a more descriptive alt text
          />
        </div>
        <div>
          <h2 className="font-semibold text-lg"> {item.rname}</h2>
          <div className="flex gap-3 mt-3">
            <div className="flex flex-col w-[250px] gap-4">
              <h2 className="font-semibold">
                {/* Price : <span>{item.price}</span> taka */}
              </h2>
              <h2 className="font-semibold">Address: {item.address}</h2>
              <h1 className="flex gap-2 items-center">
                Quantity:
                <div className="flex bg-neutral-300 gap-2 rounded-md px-1 items-center">
                  <button
                    onClick={() => dispatch(increaseQnty(cartitem))}
                    className="bg-slate-300 px-1 hover:bg-amber-50 rounded-md"
                  >
                    +1
                  </button>
                  <span className="text-base">{cartitem.qnty}</span>
                  <button
                    onClick={handleDecreaseQnty}
                    className="bg-slate-300 px-1 hover:bg-amber-50 rounded-md"
                  >
                    -1
                  </button>
                </div>
              </h1>
              <h2 className="font-semibold">Total: {totalAmount}</h2>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold">
                Rating:{" "}
                <span className="rounded-md px-2 text-center bg-yellow-300">
                  {item.rating} ★
                </span>
              </h2>
              <h2 className="font-semibold">Overview: {item.somedata}</h2>
              <button
                onClick={handleRemovefromcart}
                className="flex items-center text-sm gap-1 font-semibold text-white w-20 px-2 rounded-md hover:bg-red-600 bg-red-800"
              >
                Remove <FaRegTrashAlt />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
