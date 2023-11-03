import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import Checkshot from './components/Main/Checkshot.jsx'
import Shotcontent from './components/Shotsinfo/Shotcontent.jsx'
import Defense from './components/Shotsinfo/Aboutshot/defense.jsx'
import Cut from './components/Shotsinfo/Aboutshot/Cut.jsx'
import Pull from './components/Shotsinfo/Aboutshot/Pull.jsx'
import Sweep from './components/Shotsinfo/Aboutshot/Sweep.jsx'
import Drive from './components/Shotsinfo/Aboutshot/Drive.jsx'
import Legglance from './components/Shotsinfo/Aboutshot/Legglance.jsx'
import Inno from './components/Shotsinfo/Aboutshot/Inno.jsx'
import Team from './components/Shotsinfo/team.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='Checkshot' element={<Checkshot/>}/>
      <Route path='/Checkshot' element={<Checkshot/>}/>
      <Route path='Shotcontent' element={<Shotcontent/>}/>
      <Route path='defense' element={<Defense/>}/>
      <Route path='Cut' element={<Cut/>}/>
      <Route path='Pull' element={<Pull/>}/>
      <Route path='Sweep' element={<Sweep/>}/>
      <Route path='Drive' element={<Drive/>}/>
      <Route path='Legglance' element={<Legglance/>}/>
      <Route path='Inno' element={<Inno/>}/>
      <Route path='Team' element={<Team/>}/>
      
      
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
