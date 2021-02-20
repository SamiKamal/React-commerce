export const formatPrice = (number) => {
    const newNumber = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(number / 100)
    return newNumber
}

export const getUniqueValues = (products, uniqueSection) => {
    let unique = products.map(item => item[uniqueSection]);
    if (uniqueSection === 'colors'){
        unique = unique.flat()
    }
    return ['all', ...new Set(unique)]
}
