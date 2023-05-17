
'use client'
import { ProductOverview } from "@/components/organisms";
import { addCart } from "@/redux/features/slices/cart";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";

export default function ProductOverviewPage() {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar()

    const addToCart = () => {
        enqueueSnackbar('Đã thêm sản phẩm', { variant: 'success' })
        dispatch(addCart({ id: 1, quantity: 1 }));
    };

    const props = {
        addToCart
    }
    return (
        <ProductOverview {...props} />
    )
}
