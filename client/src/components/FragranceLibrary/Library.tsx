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
    <div className='w-full flex flex-wrap justify-between box-border p-[1.5rem] bg-neutral-100 rounded-2xl'>
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