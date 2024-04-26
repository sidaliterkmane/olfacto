interface MinimalFragranceCardProps {
  onCardClick: () => void;
  fragranceName: string;
  fragranceBrand: string;
  fragranceImage: string;
}

const MinimalFragranceCard: React.FC<MinimalFragranceCardProps> = ({
  onCardClick,
  fragranceName,
  fragranceImage,
  fragranceBrand,
}) => {
  return (
    <div
      onClick={onCardClick}
      className="hover:translate-y-[-5px] hover:brightness-95 shadow hover:shadow-lg border dark:border-white border-black border-opacity-15 dark:border-opacity-5 w-[281px] h-[90px] bg-neutral-50 dark:bg-neutral-800 rounded-lg overflow-hidden p-[10px] flex gap-2 transition cursor-pointer gap-4"
    >
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
  );
};

export default MinimalFragranceCard;
