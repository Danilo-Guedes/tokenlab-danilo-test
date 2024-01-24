import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { ROUTES } from "./utils/routes";
import { Toaster } from "./components/ui/toaster";
import { checkAuth } from "./utils/auth";
import Events from "./pages/Events";
import NewEvent from "./pages/NewEvent";
import { GlobalProvider } from "./context/index";
import EventDetails from "./pages/EventDetails";

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
    {
      path: ROUTES.newEvent,
      element: <NewEvent />,
      loader: () => checkAuth(),
    },
    {
      path: ROUTES.eventDetails(),
      element: <EventDetails />,
      loader: () => checkAuth(),
    }
  ]);

  const queryClient = new QueryClient();

  return (
    <GlobalProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </GlobalProvider>
  );
}

export default App;
