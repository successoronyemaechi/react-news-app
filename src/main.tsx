import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import {ContextProvider} from "./context/ContextProvider";
import router from "./router";
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>
      <ContextProvider>
          <RouterProvider router={router} />
      </ContextProvider>
  </React.StrictMode>,
)
