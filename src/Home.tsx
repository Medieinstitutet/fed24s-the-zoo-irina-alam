type Animal = {
    id: number;
    name: string;
    imageUrl: string;
    shortDescription: string;
    longDescription: string;
    lastFed: string;
  };  

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    fetch("https://animals.azurewebsites.net/api/animals")
      .then(res => res.json())
      .then(setAnimals);
  }, []);

  const getTimeDifference = (lastFed: string): number => {
    const fedDate = new Date(lastFed);
    const now = new Date();
    return (now.getTime() - fedDate.getTime()) / (1000 * 60 * 60); // hours
  };
  

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {animals.map(animal => (
        <div key={animal.id} className="border p-4 rounded shadow bg-white">
          <Link to={`/animal/${animal.id}`}>
            <img
              src={animal.imageUrl}
              onError={(e) => e.target.src = "https://via.placeholder.com/150"}
              alt={animal.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="text-lg font-bold">{animal.name}</h2>
            <p>{getStatus(animal.lastFed)}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
