import { graphql, setupWorker } from 'msw';
import { GET_EVENT } from './queries';

const worker = setupWorker(
  graphql.query(GET_EVENT, (req, res, ctx) => {
    return res(
      ctx.delay(),
      ctx.data({
        getEvent: {
          __typename: 'Event',
          id: '20b54069-0055-43a8-931e-e74f9e1b5ce3',
          name: 'My Birthday Party',
          when: 'December 5th 2022',
          where: 'London',
          description: 'Come have fun!',
        },
      })
    );
  })
);

export { worker };
