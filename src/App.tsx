import {
  ApolloClient,
  gql,
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_EVENT } from './queries';
import './App.css';

function App() {
  const client = useApolloClient();
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();

  setupCache(client);

  const [getEvent] = useLazyQuery(GET_EVENT, {
    fetchPolicy: 'cache-only',
  });

  useEffect(() => {
    (async () => {
      // Hook returns undefined data if fields missing - according to
      // docs this should throw an error?
      // ------------------------------------------------------------
      const { data, error } = await getEvent({
        variables: { id: '20b54069-0055-43a8-931e-e74f9e1b5ce3' },
      });

      // Client returns partial data if fields missing
      // ------------------------------------------------------------
      // const { data, error } = await client.query({
      //   query: GET_EVENT,
      //   variables: {
      //     id: '20b54069-0055-43a8-931e-e74f9e1b5ce3',
      //   },
      //   fetchPolicy: 'cache-only',
      // });

      setData(data);

      // Neither return an error
      // ------------------------------------------------------------
      setError(error);
    })();
  }, []);

  if (error) {
    return <div>Oops something sent wrong</div>;
  }

  return (
    <>
      <div>{data?.getEvent?.name ?? '?'}</div>
      <div>{data?.getEvent?.when ?? '?'}</div>
      <div>{data?.getEvent?.where ?? '?'}</div>
      <div>{data?.getEvent?.description ?? '?'}</div>
    </>
  );
}

function setupCache(client: ApolloClient<any>) {
  const eventData = {
    __typename: 'Event',
    id: '20b54069-0055-43a8-931e-e74f9e1b5ce3',
    name: 'Party',
    when: '2022',
    where: 'Norwich',
    description: 'Come have fun!',
  };

  // Write event data to our cache
  client.writeQuery({
    query: GET_EVENT,
    variables: {
      id: '20b54069-0055-43a8-931e-e74f9e1b5ce3',
    },
    data: {
      getEvent: eventData,
    },
  });

  // Remove when and description from our cache data so cache-only policy
  // does not contain data for all requested fields
  client.cache.modify({
    id: client.cache.identify(eventData),
    fields: {
      where(_, details) {
        return details.DELETE;
      },
      description(_, details) {
        return details.DELETE;
      },
    },
  });
}

export default App;
