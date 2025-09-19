import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Animal = {
  id: number;
  name: string;
  imageUrl: string;
  shortDescription: string;
  longDescription: string;
  lastFed: string;
  isSick?: boolean;
};

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>([]);

  // Load animals from localStorage or fetch from API
  useEffect(() => {
    const savedAnimals = localStorage.getItem("animals");
    if (savedAnimals) {
      setAnimals(JSON.parse(savedAnimals));
    } else {
      fetch("https://animals.azurewebsites.net/api/animals")
        .then((res) => res.json())
        .then((data: Animal[]) => {
          // initialize lastFed and ensure every animal has an image
          const initialized = data.map(a => ({
            ...a,
            lastFed: a.lastFed || new Date().toISOString(),
            imageUrl: a.imageUrl || "https://via.placeholder.com/150",
          }));
          setAnimals(initialized);
          localStorage.setItem("animals", JSON.stringify(initialized));
        });
    }
  }, []);

  // Update localStorage whenever animals change
  useEffect(() => {
    localStorage.setItem("animals", JSON.stringify(animals));
  }, [animals]);

  // Feed an animal
  const feedAnimal = (id: number) => {
    const updatedAnimals = animals.map(a =>
      a.id === id ? { ...a, lastFed: new Date().toISOString() } : a
    );
    setAnimals(updatedAnimals);
  };

  // Time since last fed in hours
  const getTimeDifference = (lastFed: string) => {
    const fedDate = new Date(lastFed);
    const now = new Date();
    return ((now.getTime() - fedDate.getTime()) / (1000 * 60 * 60)).toFixed(1);
  };

  // Status example
  const getStatus = (animal: Animal) => {
    return animal.isSick ? "Sick" : "Healthy";
  };

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {animals.map(animal => (
        <div key={animal.id} className="border p-4 rounded shadow bg-white">
          <Link to={`/animal/${animal.id}`}>
            <img
              src={animal.imageUrl || "https://via.placeholder.com/150"}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
                (e.currentTarget.src = "https://via.placeholder.com/150")
              }
              alt={animal.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="text-lg font-bold">{animal.name}</h2>
            <p>Status: {getStatus(animal)}</p>
            <p>Last fed: {getTimeDifference(animal.lastFed)} hours ago</p>
          </Link>
          <button
            onClick={() => feedAnimal(animal.id)}
            className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Feed
          </button>
        </div>
      ))}
    </div>
  );
}
