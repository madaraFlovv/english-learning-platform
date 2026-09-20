import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.tsx";
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
