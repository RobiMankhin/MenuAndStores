import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";
import { GiEmptyWoodBucketHandle } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQnty,
  increaseQnty,
  removeFromcart,
} from "../Features/MenuSlice";

const CartList = ({ open }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, totalAmount } = useSelector((state) => state.food);

  const remove = (e) => {
    dispatch(removeFromcart(e));
  };

  return (
    <div
      className={`absolute py-2 text-teal-950 font-bold text-sm  md:right-10 right-5 md:top-9 top-20 bg-teal-100 rounded-md transition-all duration-500 ${
        open
          ? "bg-opacity-95 scale-100 opacity-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
      style={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      <div className=" flex justify-center px-1 bg-white shadow-blue-300 mx-2 text-xl py-1 shadow-md rounded-lg">
        <h2 className="   ">Total Price: {totalAmount} Taka</h2>
      </div>

      {cart.length ? (
        cart.map((e) => (
          <div
            key={e.id}
            className="bg-blue-100 mt-2 shadow-xl shadow-blue-300 rounded-md w-[300px] md:w-[450px] mx-auto transform transition-all duration-300 ease-in-out"
          >
            <div className="flex items-center md:flex-row gap-4 bg-blue-100 rounded-md p-2">
              <div>
                <img
                  onClick={() =>
                    navigate(`/menu/${e.id}`, {
                      state: { item: e },
                    })
                  }
                  className="rounded-lg transition-transform duration-300 cursor-pointer hover:scale-105"
                  style={{ width: "150px", height: "100px" }}
                  src={e.imgdata}
                  alt={e.rname}
                />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="flex flex-col gap-2 font-bold">
                  <h2>{e.rname}</h2>
                  <h2>
                    Price: <span>{e.price}</span> taka
                  </h2>
                  <h1 className="flex gap-2 items-center">
                    Quantity:
                    <div className="flex bg-neutral-300 gap-2 rounded-md px-1 items-center">
                      <button
                        onClick={() => dispatch(increaseQnty(e))}
                        className="bg-slate-300 px-1 hover:bg-amber-50 rounded-md"
                      >
                        +1
                      </button>
                      <span className="text-base">{e.qnty}</span>
                      <button
                        onClick={() => dispatch(decreaseQnty(e))}
                        className="bg-slate-300 px-1 hover:bg-amber-50 rounded-md"
                      >
                        -1
                      </button>
                    </div>
                  </h1>
                </div>

                <button
                  onClick={() => remove(e)}
                  className="flex items-center mt-auto justify-center font-semibold text-white w-28 md:w-12 h-6 rounded-md hover:bg-red-600 bg-red-800"
                >
                  <FaTrash size={17} />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex px-1 items-center">
          <h2 className="w-36 text-sm">Cart is Empty</h2>
          <GiEmptyWoodBucketHandle size={40} />
        </div>
      )}
    </div>
  );
};
CartList.propTypes = {
  open: PropTypes.bool.isRequired,
};
export default CartList;
