interface DetailedView{
    day: number,
    month: number,
    year: number,
    units: number
}
interface GenericView{
    day: number,
    month: number,
    year: number
}
interface HiddenView{
    inventory: number
}
interface ErrorView{
    errorMessage: string
}
interface ProductError{
    errorMessage: string
}

export { DetailedView, GenericView, HiddenView, ErrorView, ProductError };