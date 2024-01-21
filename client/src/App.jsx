import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { ROUTES } from "./utils/routes";
import { Toaster } from "./components/ui/toaster";
import { checkAuth } from "./utils/auth";
import Events from "./pages/Events";

function App() {
  const router = createBrowserRouter([
    {
      path: ROUTES.home,
      element: <Home />,
    },
    {
      path: ROUTES.signup,
      element: <SignUp />,
    },
    {
      path: ROUTES.events,
      element: <Events />,
      loader: () => checkAuth(),
    },
  
  ]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
