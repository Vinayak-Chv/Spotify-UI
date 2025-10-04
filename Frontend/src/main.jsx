import { createRoot } from 'react-dom/client'
import { SongData } from './context/Song.jsx'
import { UserData } from './context/User.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <UserData>
    <SongData>
      <App />
    </SongData>
  </UserData>
)
