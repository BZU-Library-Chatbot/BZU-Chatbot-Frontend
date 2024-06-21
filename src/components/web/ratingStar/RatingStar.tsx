import { useState } from "react";
import { FaStar } from "react-icons/fa";
import styles from "./RaitingStar.module.scss";

const RatingStar: React.FC<{
  noOfStar?: number;
  onStarClick: (rating: number) => void;
}> = ({ noOfStar = 5, onStarClick }) => {
  const [rating, setRaitings] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (getCurrentId: any) => {
    setRaitings(getCurrentId);
    onStarClick(getCurrentId);
  };

  const handleMouseEnter = (getCurrentId: any) => {
    setHover(getCurrentId);
  };

  const handleMouseLeave = () => {
    setHover(rating);
  };

  return (
    <div>
      {[...Array(noOfStar)].map((_, index) => {
        index += 1;
        return (
          <FaStar
            key={index}
            className={index <= (hover || rating) ? `${styles.active}` : ""}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
          />
        );
      })}
    </div>
  );
};

export default RatingStar;
