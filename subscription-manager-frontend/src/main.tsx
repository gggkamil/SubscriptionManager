import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { store, StoreContext } from "./app/stores/store";
import { router } from "./app/routes/routes";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
     <ToastContainer position="top-right" autoClose={3000} />
  </StoreContext.Provider>
);
