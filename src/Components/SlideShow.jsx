import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SlideShow = ({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === items.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000); //  slide Changing every 3 seconds

    return () => clearInterval(slideInterval);
  }, [items.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-1000"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="min-w-full flex-shrink-0 flex justify-center items-center"
          >
            <div className="bg-amber-100  shadow-xl transition-transform duration-300 hover:scale-95 shadow-blue-300 p-1 rounded-md w-[350px] md:w-[750px] mx-auto">
              <h1 className="font-bold shadow-blue-300 text-2xl shadow-md py-1 rounded-lg text-center">
                Try them out
              </h1>
              <div className="flex items-center flex-col md:flex-row gap-4 mt-3 bg-amber-100 rounded-md p-2">
                <div>
                  <img
                    className="rounded-lg md:h-[200px] h-[150px]"
                    style={{ width: "240px" }}
                    src={item.imgdata}
                    alt={item.name || "Item image"}
                  />
                </div>
                <div className="text-lg flex flex-col gap-2 font-mono">
                  <h2 className="font-semibold">{item.rname}</h2>

                  <h2 className="font-semibold">Address: {item.address}</h2>
                  <h2 className="font-semibold">
                    Rating:{" "}
                    <span className="rounded-md px-1 text-center bg-yellow-300">
                      {item.rating} ★
                    </span>
                  </h2>
                  <h1 className="font-semibold">BDT {item.price} Taka</h1>
                  <h2 className="font-semibold">Overview: {item.somedata}</h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

SlideShow.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      rname: PropTypes.string.isRequired,
      imgdata: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      delimg: PropTypes.string,
      somedata: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.string.isRequired,
      arrimg: PropTypes.string,
      qnty: PropTypes.number,
    })
  ).isRequired,
};
export default SlideShow;
