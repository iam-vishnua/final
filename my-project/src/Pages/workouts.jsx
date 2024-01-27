import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Workouts(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/exercises", { withCredentials: true });
        const exercises = response.data;
        console.log(exercises)
        setSearchResults(exercises);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error appropriately
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter exercises based on the search term
    const filteredResults = searchResults.filter(result =>
      result.muscle.toLowerCase().includes(term.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  return (
    <main className='m-8 '>
      <h1 className='flex flex-row justify-center m-3 font-mono text-3xl text-black-200 mb-10 font-bold'>Awesome Exercises You Should Know</h1>
      <div>
        <input
          type="text" 
          placeholder="which muscle do u want to train..."
          value={searchTerm}
          onChange={handleSearch}
          className="mb-8 p-2 w-96 flex flex-row justify-center items-center m-3"
        />
        <ul className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {searchResults.map((result) => (
            <li key={result.id} className='border-solid border-2 border-black-200 p-4 hover:transform hover:scale-110 transition-transform duration-300 '>
              <div>
                <img src={result.image} alt={`${result.name} workout`} />
              </div>
              <div>
                <strong>Name:</strong> {result.name}
              </div>
              <div>
                <strong>Muscle:</strong> {result.muscle}
              </div>
              <div>
                <strong>Equipment:</strong> {result.equipment}
              </div>
              <div>
                <strong>Difficulty:</strong> {result.difficulty}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Workouts;
