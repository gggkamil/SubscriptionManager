import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { store, StoreContext } from "./app/stores/store";
import { router } from "./app/routes/routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);
