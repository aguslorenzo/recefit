import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import RecipeDetail from './pages/RecipeDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
