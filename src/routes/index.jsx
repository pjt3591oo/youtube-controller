import { Routes, Route } from 'react-router-dom';
import Intro from '../pages/intro';
import Controller from '../pages/controller';

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<Intro />}></Route>
      <Route path="/controller" element={<Controller />}></Route>
    </Routes>
  )
}

export default routes;