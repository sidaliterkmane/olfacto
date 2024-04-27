import { IoRemoveCircleOutline } from "react-icons/io5";

interface MinimalFragranceCardProps {
  onCardClick: () => void;
  fragranceId: string;
  fragranceName: string;
  fragranceBrand: string;
  fragranceImage: string;
  onToggleFavorite: (fragranceId: string, isFavorite: boolean) => void;
  isFavorite: boolean;
}

const MinimalFragranceCard: React.FC<MinimalFragranceCardProps> = ({
  onCardClick,
  fragranceId,
  fragranceName,
  fragranceImage,
  fragranceBrand,
  onToggleFavorite,
  isFavorite
}) => {
  return (
    
    <div
      className="relative hover:translate-y-[-5px] hover:brightness-95 shadow hover:shadow-lg transition rounded-lg"
    >
      <button
        className="flex justify-center items-center absolute top-2 right-2 z-20"
        onClick={() => onToggleFavorite(fragranceId, isFavorite)}
      >
        <IoRemoveCircleOutline className="transition dark:text-neutral-600 dark:hover:text-red-400 text-neutral-300 hover:text-red-400" size={"20px"}/>
      </button>
      <div onClick={onCardClick} className="border dark:border-white border-black border-opacity-15 dark:border-opacity-5 w-[281px] h-[90px] bg-neutral-50 dark:bg-neutral-800 rounded-lg overflow-hidden p-[10px] flex gap-2 transition cursor-pointer gap-4">
      <div className="img-container h-full w-[68px] shrink-0">
        <img
          className="object-cover w-full h-full rounded-full"
          src={fragranceImage}
          alt={fragranceName}
        />
      </div>
      <div className="fragrance-info flex flex-col w-full h-full justify-center">
        <p className="font-semibold text-sm dark:text-white">{fragranceName}</p>
        <p className="font-light dark:text-white text-xs ">
          <span className="font-light text-xs text-blue-700">By </span>
          {fragranceBrand}
        </p>
      </div>
      </div>
      
    </div>
  );
};

export default MinimalFragranceCard;
