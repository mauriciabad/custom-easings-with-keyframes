export function byTestId<T extends string>(testId: T): `[data-test-id="${T}"]` {
  return `[data-test-id="${testId}"]`
}
