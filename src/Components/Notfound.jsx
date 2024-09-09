import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div>
      <div>Notfound</div>
      <Link to="/" className=" font-bold text-xl cursor-pointer">
        Back to Home
      </Link>
    </div>
  );
};

export default Notfound;
