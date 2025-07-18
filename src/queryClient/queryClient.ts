import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";

const queryClient = new QueryClient();

const localStoragePersistor = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister: localStoragePersistor,
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => query.queryKey[0] === "/login",
  },
  maxAge:  60 * 60 * 1000 ,
});

export { queryClient, localStoragePersistor };
