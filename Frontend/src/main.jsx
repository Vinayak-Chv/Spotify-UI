import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/User.jsx'
import { SongProvider } from './context/Song.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <SongProvider>
      <App />
    </SongProvider>
  </UserProvider>
)
