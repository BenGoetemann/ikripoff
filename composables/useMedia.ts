export const useLocalAsset = (path: string): string => {
    const assets = import.meta.glob('~/assets/**/*', {
      eager: true,
      import: 'default',
    })
    // @ts-expect-error: wrong type info
    return assets['/assets/' + path]
  }

export const useCacheInvalidatonUrl = (path: string, invalidationString: string) => {
  return  path + "?updated=" + invalidationString;
}