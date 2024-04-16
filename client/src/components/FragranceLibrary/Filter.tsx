import { useState } from 'react';

interface FilterProps {
    brands: Array<string>;
    onFilter: (brand: string) => void;
}

const Filter: React.FC<FilterProps> = ({ brands, onFilter }) => {
    const [selectedBrand, setSelectedBrand] = useState("All");

    const handleClick = (brand: string) => {
        setSelectedBrand(brand);
        onFilter(brand);
    }

  return (
    <div className=''>

    </div>
  )
}

export default Filter