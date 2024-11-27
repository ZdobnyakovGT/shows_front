import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter} from "react-router-dom";
import './App.css';
import { Provider } from 'react-redux'; 
import { store } from './core/store/store.ts'; 


createRoot(document.getElementById('root')!).render(
  <Provider store={store}> {/* Оборачиваем Provider */}
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }} basename="/shows_front/">
          <App />
    </BrowserRouter>
  </Provider>
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/shows_front/serviceWorker.js")
      .then(res => console.log("service worker11111111111", res))
      .catch(err => console.log("service worker00000000000d", err))
  })
}