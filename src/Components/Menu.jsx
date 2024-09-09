import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Features/MenuSlice";
import img from "../assets/photo/my.jpg";
import Cardsdata from "../assets/CardsData";

const Menu = () => {
  const dispatch = useDispatch();
  const { isLoading, error, searchData } = useSelector((state) => state.food);

  const add = (item) => {
    dispatch(addToCart(item));
    dispatch(addToCart(item));
    console.log("Item added to cart:", item);
  };

  const filteredData = Cardsdata.filter((user) => {
    if (!searchData) {
      return true;
    } else {
      return user.rname.toLowerCase().includes(searchData.toLowerCase());
    }
  });

  if (isLoading) return <div>Loading..</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-green-400 p-2 md:mx-5 rounded-md flex flex-col items-center justify-center mt-3">
      <h1 className="text-center text-2xl text-stone-800 font-bold font-serif">
        Choose Your Meal
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 mt-4">
        {filteredData &&
          filteredData.map((value) => {
            const imageURL = value.imgdata || img;

            return (
              <div
                className="rounded-lg transition-transform hover:shadow-lg hover:scale-105 duration-200 flex flex-col bg-slate-200 md:w-[260px] w-[250px] p-3"
                key={value.id}
              >
                <img
                  className="rounded-md"
                  style={{ height: "200px" }}
                  src={imageURL}
                  alt={value.rname}
                />
                <div className="mt-2">
                  <h2 className="font-serif font-semibold">{value.rname}</h2>
                </div>
                <div className="flex gap-4 mt-2 items-center">
                  <h1 className="font-semibold">BDT {value.price} Taka</h1>
                  <h1 className="bg-yellow-300 font-bold w-7 rounded-lg text-xs text-center">
                    {value.rating}
                  </h1>
                </div>

                <button
                  onClick={() => add(value)}
                  className="rounded-lg mt-2 text-white hover:bg-orange-500 bg-orange-700 text-sm font-semibold border-2 h-7"
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Menu;
