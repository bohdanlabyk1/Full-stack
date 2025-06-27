import React, { useEffect, useState } from 'react'
import { getPopularCategories } from '../component/api/api';
import "./categori.css"
import { useNavigate } from 'react-router-dom';

export const Categorihom = () => {
  const [categori, setCategori] = useState([]);
  const[loadin, setLoadin] = useState(true);
  const [erorr, setErorr] = useState(null)
const navigate = useNavigate();

const handleShowMore = () => {
  navigate('/filter');
};
  useEffect(() =>{
    const fetchcategori = async() => {
      try {
        const data = await getPopularCategories();
        setCategori(data)
      } catch (error) {
       setErorr(erorr.message) 
      }finally{
        setLoadin(false);
      }
    };
    fetchcategori();
  },);

  if(loadin){return <h4>loading...</h4>}
  if(erorr){return <h4>eror</h4>}

  return (
    <div >
      <h1> Каталог</h1>
    <div className='cat-hom'>
        {categori.map((categoris) =>(
      <div key={categoris.id}>
        <img src={categoris.image} alt={categoris.mame}/>
        <p>{categoris.name}</p>
        </div>
      ))}
    </div>
       <button className='btn' onClick={handleShowMore}>Показати більше</button>
    </div>
  )
}
