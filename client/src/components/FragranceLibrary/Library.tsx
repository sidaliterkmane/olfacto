import React, { useState, useEffect } from 'react'
import axios from 'axios'

import FragranceCard from './FragranceCard'

const Library = () => {
  const [fragrances, setFragrances] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/fragrances')
      .then(response => {
        setFragrances(response.data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setError(error)
      })
  }, [])

  return (
    <div className='w-full flex gap-[1rem] flex-wrap'>
      {fragrances.map(fragrance => (
        <FragranceCard
          fragranceImage={fragrance.image}
          fragranceName={fragrance.name}
          fragranceBrand={fragrance.brand}
        />
      ))}
    </div>
  )
}

export default Library