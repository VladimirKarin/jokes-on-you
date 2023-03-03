import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://v2.jokeapi.dev/joke/Programming?amount=10')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <h1>Joke List</h1>
        <div>
          {items.jokes.map((item) => {
            if (item.type === 'single') {
              return (
                <div key={item.id} className='tile'>
                  <p>{item.joke}</p>
                </div>
              );
            } else {
              return (
                <div key={item.id} className='tile'>
                  <p> Setup: {item.setup}</p>
                  <p> Delivery: {item.delivery}</p>
                </div>
              );
            }
          })}
        </div>
      </>
    );
  }
}

export default App;
