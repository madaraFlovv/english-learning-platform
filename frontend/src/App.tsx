import { RouterProvider } from "react-router-dom";
import { ProgressProvider } from "./context/ProgressContext";
import { router } from "./app/router";

const App = () => {
  return (
    <ProgressProvider>
      <RouterProvider router={router} />
    </ProgressProvider>
  );
};

export default App;
