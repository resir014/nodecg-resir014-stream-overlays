import * as React from 'react';
import type NodeCG from '@alvancamp/test-nodecg-types';

/**
 * React hook for to get the value of a {@link http://www.nodecg.dev/docs/classes/replicant/ Replicants}.
 *
 * @copyright Copyright (c) 2021 York Student Television
 *
 * @param name The name of the replicant.
 * @param namespace The namespace to in which to look for this replicant. Defaults to the name of the current bundle.
 * @param opts The options for this replicant.
 * @returns
 */
export function useReplicantValue<T>(
  name: string,
  namespace?: string,
  opts?: NodeCG.Replicant.Options<T>
) {
  const replicant = React.useMemo(
    () =>
      typeof namespace === 'string'
        ? nodecg.Replicant<T>(name, namespace, opts)
        : nodecg.Replicant<T>(name, opts),
    [name, namespace, opts]
  );
  const [value, setValue] = React.useState<T | undefined>(
    opts && 'defaultValue' in opts ? opts.defaultValue : undefined
  );

  React.useEffect(() => {
    const listener = (newVal: T | undefined) => {
      setValue(newVal);
    };

    replicant.on('change', listener);

    return () => {
      replicant.off('change', listener);
    };
  }, [replicant]);

  return value;
}

/**
 * React hook for interacting with {@link http://www.nodecg.dev/docs/classes/replicant/ NodeCG's Replicants}.
 *
 * @copyright Copyright (c) 2021 York Student Television
 *
 * @param name The name of the replicant.
 * @param namespace The namespace to in which to look for this replicant. Defaults to the name of the current bundle.
 * @param opts The options for this replicant.
 * @returns
 */
export function useReplicant<T>(
  name: string,
  namespace?: string,
  opts?: NodeCG.Replicant.Options<T>
) {
  const replicant = React.useMemo(
    () =>
      typeof namespace === 'string'
        ? nodecg.Replicant<T>(name, namespace, opts)
        : nodecg.Replicant<T>(name, opts),
    [name, namespace, opts]
  );
  const [value, setValue] = React.useState<T | undefined>(
    opts && 'defaultValue' in opts ? opts.defaultValue : undefined
  );

  React.useEffect(() => {
    const listener = (newValue: T | undefined) => {
      setValue(newValue);
    };

    replicant.on('change', listener);

    return () => {
      replicant.off('change', listener);
    };
  }, [replicant]);

  const setter = React.useCallback(
    (newValue: T | undefined) => {
      replicant.value = newValue;
    },
    [replicant]
  );

  return [value, setter] as const;
}
