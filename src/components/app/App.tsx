import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/notFound/notFound';
import MainPage from './pages/MainPage/MainPage';
import Details from './details/details';
import { useAppSelector } from './hook';

const App: React.FC = () => {

    const id = useAppSelector(store => store.page.id);


    return(
        <Routes>
            <Route path='/' element={<MainPage />} >
                <Route path='details/:id' element={id ? <Details id={id}/> : false}/>
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default App;