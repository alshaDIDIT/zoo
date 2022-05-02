import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IAnimal } from '../models/IAnimal'
import { IAnimalResponse } from '../models/IAnimalResponse'
import './../styles/animals.css'

export const Animals = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([])

  useEffect(() => {
    if(animals.length !== 0) return;

    axios.get('https://animals.azurewebsites.net/api/animals')
    .then((res) => {
      setAnimals(res.data);      
    })
  });



  return (
    <>
    <h1>Hello</h1>
      {
        animals.map((animal) => {
          return(
            <Link key={animal.id} to={"/animal/" + animal.id}>
              <h5>{animal.latinName}</h5>
              <img src={animal.imageUrl} />
            </Link>
          )
        })
      }
    </>
  )
}
