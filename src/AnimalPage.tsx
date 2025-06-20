type Animal = {
    id: number;
    name: string;
    imageUrl: string;
    shortDescription: string;
    longDescription: string;
    lastFed: string;
  };

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AnimalPage() {
  const { id } = useParams();
  const [animal, setAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    fetch(`https://animals.azurewebsites.net/api/animals/${id}`)
      .then(res => res.json())
      .then(setAnimal);
  }, [id]);

  if (!animal) return <div>Loading...</div>;

  const hoursSinceFed = (Date.now() - new Date(animal.lastFed).getTime()) / (1000 * 60 * 60);
  const canFeed = hoursSinceFed >= 4;
  const warningSoon = hoursSinceFed >= 3 && hoursSinceFed < 4;

  const handleFeed = () => {
    const updatedAnimal = { ...animal, lastFed: new Date().toISOString() };
    setAnimal(updatedAnimal);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = "public/fallback.png"; 
      };
      
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
      <img
        src={animal.imageUrl}
        onError={(e) => e.target.src = "https://via.placeholder.com/300"}
        alt={animal.name}
        className="w-full h-64 object-cover mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{animal.name}</h1>
      <p className="mb-2">{animal.shortDescription}</p>
      <p className="mb-2">{animal.longDescription}</p>
      {warningSoon && <p className="text-yellow-600 font-semibold">⚠️ Will soon need to be fed!</p>}
      <button
        onClick={handleFeed}
        disabled={!canFeed}
        className={`mt-4 px-4 py-2 text-white rounded ${canFeed ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        Feed
      </button>
    </div>
  );
}
