import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { animalList, getDateFromStorage, now } from '../configurations/ToggleListOfAnimals';
import { IAnimal } from '../models/IAnimal'

export const Animal = () => {
  const [animal, setAnimal] = useState<IAnimal>({
    id: 0,
    imageUrl: '',
    isFed: false,
    lastFed: new Date(),
    latinName: '',
    longDescription: '',
    medicine: '',
    name: '',
    shortDescription: '',
    yearOfBirth: 0
  });
  const [time, setTime] = useState<Date>(new Date())

  let params = useParams();
  let lastAte: Date;

  let theAnimal: IAnimal = animalList.filter(function (thisAnimal) {
    return thisAnimal.id.toString() == params.id;
  })[0];
  const index: number = animalList.findIndex(i => i.id === theAnimal.id);

  useEffect(() => {
    setAnimal(theAnimal);
    lastAte = getDateFromStorage(lastAte, theAnimal);
    setTime(lastAte);

    console.log(now.valueOf() - lastAte.valueOf());
    if (now.valueOf() - lastAte.valueOf() > 3600000 * 3) {
      animalList[index].isFed = false;
      localStorage.setItem('listOfAnimals', JSON.stringify(animalList));
      return;
    }
  }, []);


  const feed = () => {
    if (!animal.isFed) {
      setAnimal({ ...animal, isFed: true, lastFed: new Date() });
      setTime(new Date());
      animalList[index].isFed = true;
      animalList[index].lastFed = new Date();
      localStorage.setItem('listOfAnimals', JSON.stringify(animalList));
      return;
    }
  }

  return (
    <div>
      <h4>{animal.latinName}</h4>
      <img src={animal.imageUrl} alt={animal.latinName} />
      <p>{animal.longDescription}</p>
      <p>{time.toUTCString()}</p>
      <button
        onClick={feed}
      >
        Mata {animal.name}
      </button>
    </div>
  )
}
