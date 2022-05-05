import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { toggleList } from './configurations/ToggleListOfAnimals';
import { Animal } from './pages/Animal';
import { Animals } from './pages/Animals';
import { Layout } from './pages/Layout';
import { NotFound } from './pages/NotFound';

function App() {
  toggleList();
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Animals />}></Route>
          <Route path='animal/:id' element={<Animal />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
