import * as React from 'react';
import type { ReplicantOptions } from 'nodecg/types/browser';

/**
 * React hook for interacting with [NodeCG's Replicants]{@link https://www.nodecg.dev/docs/classes/replicant/}.
 *
 * @copyright Copyright (c) 2021 York Student Television
 *
 * @param name The name of the replicant.
 * @param namespace The namespace to in which to look for this replicant. Defaults to the name of the current bundle.
 * @param opts The options for this replicant.
 * @returns
 */
export function useReplicant<T>(name: string, namespace?: string, opts?: ReplicantOptions<T>) {
  const replicant = React.useMemo(
    () =>
      typeof namespace === 'string'
        ? nodecg.Replicant(name, namespace, opts)
        : nodecg.Replicant(name, opts),
    [name, namespace, opts]
  );
  const [value, setValue] = React.useState(opts?.defaultValue);

  React.useEffect(() => {
    const listener = (newValue: T) => {
      setValue(newValue);
    };

    replicant.on('change', listener);

    return () => {
      replicant.removeListener('change', listener);
    };
  }, [replicant]);

  const setter = React.useCallback(
    (newValue: T) => {
      replicant.value = newValue;
    },
    [replicant]
  );

  return [value, setter] as const;
}