import { useState, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

export function useAsync<T, Args extends any[]>(
  asyncFunction: (...args: Args) => Promise<T>,
  immediate = false
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const execute = useCallback(
    async (...args: Args) => {
      setState({ data: null, error: null, loading: true });
      try {
        const data = await asyncFunction(...args);
        setState({ data, error: null, loading: false });
        return data;
      } catch (error) {
        setState({ data: null, error: error as Error, loading: false });
        throw error;
      }
    },
    [asyncFunction]
  );

  return {
    ...state,
    execute,
  };
}
