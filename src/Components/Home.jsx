import SlideShow from "./SlideShow";
import Cardsdata from "../assets/CardsData";

const Home = () => {
  return (
    <div className=" bg-[#00df9a] p-2 md:mx-5 rounded-md flex flex-col h-screen mt-4">
      <h1 className="text-center mt-2 text-2xl text-stone-800 font-bold font-serif">
        We show different Foods and Restaurants
      </h1>
      {Cardsdata.length > 0 && (
        <div className="mt-12">
          <SlideShow items={Cardsdata} />
        </div>
      )}
    </div>
  );
};

export default Home;
