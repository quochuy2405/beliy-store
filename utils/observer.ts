export const onObserverElement = ({
    id,
    condition = true,
    callback,
    listener,
}: {
    id: string
    condition?: boolean
    callback?: () => any
    listener?: (entries?: IntersectionObserverEntry[]) => any
}) => {
    const callbackObserver = async (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && condition) {
            await callback?.()
        }
        listener?.(entries)
    }
    const observer = new IntersectionObserver(callbackObserver, {
        root: document.querySelector(`${id}`),
        threshold: 0.2,
    })

    observer.observe(document.querySelector(`#${id}-lazy`))
}
export const findItemInArray = (array, targetData) => {
    return array.find((item) => {
        return item.id === targetData.id
    })
}
