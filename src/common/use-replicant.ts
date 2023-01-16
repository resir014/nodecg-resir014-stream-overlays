import * as React from 'react';
import type NodeCG from '@alvancamp/test-nodecg-types';

export type UseReplicantHookReturnValue<T> = [T | undefined, (val: T | ((curr: T) => T)) => void];

/**
 * React hook for to get the value of a {@link https://www.nodecg.dev/docs/classes/replicant/ Replicants}.
 *
 * @copyright Copyright (c) 2021 York Student Television
 *
 * @param name The name of the replicant.
 * @param namespaceOrOpts The namespace to in which to look for this replicant. Defaults to the
 * name of the current bundle. This can also be replaced with the replicant options.
 * @param opts The options for this replicant.
 * @returns
 */
export function useReplicantValue<T>(
  name: string,
  namespaceOrOpts?: string | NodeCG.Replicant.Options<T>,
  opts?: NodeCG.Replicant.Options<T>
) {
  const replicant = React.useMemo(
    () =>
      typeof namespaceOrOpts === 'string'
        ? nodecg.Replicant<T>(name, namespaceOrOpts, opts)
        : nodecg.Replicant<T>(name, namespaceOrOpts ?? opts),
    [name, namespaceOrOpts, opts]
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
      // @ts-expect-error - type mismatch between current and new replicant handlers
      replicant.removeListener('change', listener);
    };
  }, [replicant]);

  return value;
}

/**
 * React hook for interacting with {@link https://www.nodecg.dev/docs/classes/replicant/ NodeCG's Replicants}.
 *
 * @copyright Copyright (c) 2021 York Student Television
 *
 * @param name The name of the replicant.
 * @param namespaceOrOpts The namespace to in which to look for this replicant. Defaults to the
 * name of the current bundle. This can also be replaced with the replicant options.
 * @param opts The options for this replicant.
 * @returns
 */
export function useReplicant<T>(
  name: string,
  namespaceOrOpts?: string | NodeCG.Replicant.Options<T>,
  opts?: NodeCG.Replicant.Options<T>
) {
  const replicant = React.useMemo(
    () =>
      typeof namespaceOrOpts === 'string'
        ? nodecg.Replicant<T>(name, namespaceOrOpts, opts)
        : nodecg.Replicant<T>(name, namespaceOrOpts ?? opts),
    [name, namespaceOrOpts, opts]
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
      // @ts-expect-error - type mismatch between current and new replicant handlers
      replicant.removeListener('change', listener);
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
