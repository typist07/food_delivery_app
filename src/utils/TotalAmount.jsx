import { useMemo } from 'react'
import { useGetCartItemsQuery } from '../features/redux/store'

const TotalAmount = () => {
    const { data: cartItems } = useGetCartItemsQuery()
    const totalAmount = useMemo(() => cartItems?.reduce((total, item) => total + (item.price * item.quantity), 0), [cartItems])

    return totalAmount
}

export default TotalAmount