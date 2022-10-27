# @apollo/client bug with cache-only fetchPolicy

## Installation

`npm install` then `npm start`

## Bug

The bug can be found in `App.tsx` where two approaches to data fetching are
found (one is commented out). Both approaches use the `cache-only` fetch policy.

The cache is setup to include one record which has missing fields of `where`
and `description`, according to the [apollo documentation](https://www.apollographql.com/docs/react/data/queries/#cache-only) this should result in an error being thrown if the cache
is missing a field for the requested query.

### useLazyQuery

- data returns `undefined`
- error returns `undefined`
- no error is thrown

### client.query

- data return partial result without missing fields
- error return `undefined`
- no error is thrown

## Expected

They should be consistent in their results (and potentially provide an error
that there are missing fields?)
