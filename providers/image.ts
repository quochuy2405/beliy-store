import { joinURL } from 'ufo'
// import {} from '#image'

export const getImage = (
    src,
    { modifiers = null, baseURL = '/' } = {},
    { options, $img },
) => {
    const { width, height, format, fit, ...providerModifiers } = modifiers
    const operations = []
    // process modifiers
    const operationsString = operations.join(',')
    return {
        url: joinURL(
            baseURL,
            operationsString,
            src.replace(
                'https://firebasestorage.googleapis.com/v0/b/beliystoreadmin.appspot.com',
                '',
            ),
        ),
    }
}
