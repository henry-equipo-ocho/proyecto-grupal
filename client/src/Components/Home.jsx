import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import LoginForm from './LoginForm';
import Filter from './Filter';
import Footer from './Footer';
import ActivityCard from './ActivityCard';
import ActivityDetail from './ActivityDetail';
import Pagination from './Pagination';
import SearchBarCopy from './SearchBar/SearchBarCopy';
import { getActivities, setLoading, getCountries, getCities } from './Redux/Actions/actions';
import './Css/ActivityCard.css';
import './Css/Home.css'
//import search from '../Media/search.jpg'
import RenderMap from './GoogleMap/RenderMap/RenderMap.jsx';
import Loading from './Loading/Loading';


export default function Home() {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState(null);
  const [detail, setDetail] = useState(null);
  const userName = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')).email : 'viajero';
  const activities = useSelector(state => state.allActivities);
  const loading = useSelector(((state) => state.loading));
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfFirstActivity = (currentPage - 1) * 10;
  const currentActivities = activities.slice(
    (indexOfFirstActivity), indexOfFirstActivity + 12
  );

  useEffect(() => dispatch(getActivities()), [dispatch]);
  useEffect(() => dispatch(getCountries()), [dispatch]);
  useEffect(() => dispatch(getCities()), [dispatch])
  useEffect(() => {
    return activities.length
      ? dispatch(setLoading(false))
      : dispatch(setLoading(true));
  }, [activities, dispatch]);

  return (
    <div className='page'>
      <NavBar handleLoginForm={setLoginForm} />

      <div className='searchImage'>
        <div className='searchBarContainer'>
          <SearchBarCopy />
        </div>
      </div>

      <div className='bodyContainer'>
        <div className='filter'>
          <Filter handleChangeCurrentPage={setCurrentPage} />
        </div>

        {loading ?
          <center>
            <p className='loader' style={{ fontSize: '50px' }}></p>
          </center> :
          <>
          <div className='tier1'>
            Actividades top
          </div>

          <div className='tier2'>
            nuestros recomendados
          </div>

          <div className='tier3'>
            ultimas agregadas
          </div>


            <div className='cardsDisplay'>
              <div className='cardsContainer'>
                {currentActivities.length ? currentActivities.map((a) => (
                  <ActivityCard
                    handleDetail={() => setDetail(a)}
                    nombre={a.name}
                    imagen={a.picture}
                    id={a._id}
                    key={a._id}
                  />
                )) : <p className='loader' style={{ fontSize: '50px' }}> </p>}
              </div>
            </div>
          </>}
        </div>

        <Pagination
          activitiesPerPage={10}
          allActivities={activities.length}
          paginado={(pageNumber) => setCurrentPage(pageNumber)}
        />
      {loginForm &&
        <LoginForm activity={loginForm} close={() => setLoginForm(null)} abierto={true} />}

      {detail &&
        <ActivityDetail activity={detail} close={() => setDetail(null)} />}
    <Footer />
    </div>
  );
};