import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Trending from './components/Trending';
import Popular from './components/Popular';
import Movie from './components/Movie';
import Tvshows from './components/Tvshows';
import People from './components/People';
import Moviedetails from './components/Moviedetails';
import Tvdetails from './components/Tvdetails';
import PersonaDetails from './components/PersonaDetails';

function App() {
  return (
    <div className="bg-[#1F1E24] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />

        {/* Movie and Movie Details Route */}
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<Moviedetails />} />

        {/* TV Shows and TV Details Route */}
        <Route path="/tvshows" element={<Tvshows />} />
        <Route path="/tv/details/:id" element={<Tvdetails />} />

        {/* People and Person Details Route */}
        <Route path="/people" element={<People />} />
        <Route path="/people/details/:id" element={<PersonaDetails />} />
      </Routes>
    </div>
  );
}

export default App;
