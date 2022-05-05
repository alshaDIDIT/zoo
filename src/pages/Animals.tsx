import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { animalList, getDateFromStorage, now } from '../configurations/ToggleListOfAnimals'
import { IAnimal } from '../models/IAnimal'
import './../styles/animals.css'

export const Animals = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  let isAnimalHungry: boolean;
  let isSameDay: boolean;
  let timeSinceAnimalAte: number;
  let lastAte: Date;

  useEffect(() => {
    if (animals.length !== 0) return;
    setAnimals(animalList);
  });

  return (
    <>
      <h1>Animal Z..(oO,)</h1>
      <div className='container'>
        {
          animals.map((animal) => {
            lastAte = getDateFromStorage(lastAte, animal);
            timeSinceAnimalAte = now.valueOf() - lastAte.valueOf();
            isSameDay = lastAte.getUTCDate() == now.getUTCDate();
            isAnimalHungry = timeSinceAnimalAte >= 3600000 * 4;

            if (isAnimalHungry) {
              return (
                <div key={animal.id} className='img-container'>
                  <Link to={"/animal/" + animal.id}>
                    <h3>{animal.name} (behöver matas)</h3>
                    <img src={animal.imageUrl} alt={animal.latinName} />
                    <p>{animal.shortDescription}</p>
                  </Link>
                </div>
              )
            } else {
              return (
                <div key={animal.id} className='img-container'>
                  <Link to={"/animal/" + animal.id}>
                    <h3>{animal.name}</h3>
                    <img src={animal.imageUrl} alt={animal.latinName} />
                    <p>{animal.shortDescription}</p>
                  </Link>
                </div>
              )
            }
          })
        }
      </div>
    </>
  )
}
