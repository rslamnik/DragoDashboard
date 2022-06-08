import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";

import { Routes, RoutesProvider } from "./AppRoutes";
import {
  NotificationProvider,
  Notifications,
} from "lib/components/Notifications";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});


function App() {
  return (
    <div className="App">
      <RoutesProvider>
        <QueryClientProvider client={queryClient}>
          <NotificationProvider>
            <Notifications />
            <Routes />
          </NotificationProvider>
        </QueryClientProvider>
      </RoutesProvider>
    </div>
  );
}

export default App;
