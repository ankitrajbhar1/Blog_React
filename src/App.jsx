import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import  authService  from './appwrite/auth'
import { login, logout } from './store/authSlice'
import {Header, Footer} from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();   //use when state is changed

  useEffect(() => {
    authService.getCurrentUser()  //from appwrite auth we get the currentuser
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))  //dispatch login to change state
      }else{
        dispatch(logout()) //if there no user dispatch logout to state is changed
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-[#FFCAD4]'>
      <div >
        <Header/>
        <main className='flex-grow'>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App

