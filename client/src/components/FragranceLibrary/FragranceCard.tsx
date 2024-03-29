import React from 'react'

interface FragranceCardProps {
    fragranceName: string;
    fragranceBrand: string;
    fragranceImage: string;
}

const FragranceCard: React.FC<FragranceCardProps> = ({fragranceName, fragranceBrand, fragranceImage}) => {
  return (
    <div className='card w-[300px] h-[400px] bg-neutral-100 rounded-lg overflow-hidden'>
      <div className="img-container h-[60%] w-full">
        <img  className="object-cover w-full h-full" src={fragranceImage} alt={fragranceName} />
      </div>
      <p>{fragranceBrand}</p>
      <p>{fragranceName}</p>
    </div>
  )
}

export default FragranceCard