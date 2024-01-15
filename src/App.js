import React from 'react';
import { Collection } from './Collection';
import { useState, useEffect } from 'react';
import './style.css';

const category = [
  { "name": "All" },
  { "name": "Sea" },
  { "name": "Mountain" },
  { "name": "Arhitecture" },
  { "name": "Cities" }
];

function App() {

  const [collections, setCollections] = useState([]),
        [isLoading, setIsLoading] = useState(true),
        [searchValue, setSearchValue] = useState(''),
        [categoryId, setCategoryId] = useState(),
        [page, setPage] = useState(1);
  
useEffect(() => {

  setIsLoading(true);
  const category = categoryId ? `category=${categoryId}` : '';

  fetch(`https://65a22f8242ecd7d7f0a736b9.mockapi.io/collectionGall?page=${page}&limit=4&${category}`)
  .then((res) => res.json())
  .then((json) => {
    setCollections(json);
  })
  .catch((err) => {
    console.warn(err);
    alert('Error while fetching data!')
  })
  .finally(() => setIsLoading(false));
}, [categoryId, page]);

  return (
    <div className="App">
      <h1>My collection of photographs</h1>
      <div className="top">
        <ul className="tags">
         {category.map((obj, i) => (
          <li 
          key={obj.name}
          className={categoryId === i ? 'active' : ''}
          onClick={() => setCategoryId(i)}>
          {obj.name}</li>
          ))}
        </ul>
        <input
         value={searchValue}
         onChange={(e) => setSearchValue(e.target.value)}
         className="search-input" placeholder="Search by the name" />
      </div>
      <div className="content">
         {isLoading ? <h2>Loading...</h2> : (
          collections
          .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
          .map((obj, index) => (
           <Collection key={index} name={obj.name} images={obj.photos} />
          ))
         )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li 
          key={i}
          onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
