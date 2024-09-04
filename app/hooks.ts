import { useDispatch as nonTypedUseDispatch, useSelector as nonTypedUseSelector} from 'react-redux'
import type { AppDispatch, RootState } from './store'
import { open, change } from './formSlice'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = nonTypedUseDispatch.withTypes<AppDispatch>()
export const useSelector = nonTypedUseSelector.withTypes<RootState>()

export const useFormState = () => {
    
    const { isOpen: isCardFormOpen } = useSelector((state) => state.formState);
    const dispatch = useDispatch();
    const onCardFormOpen = () => {
        dispatch(open());
    };
    const onCardFormOpenChange = () => {
        dispatch(change());
    };
    return {isCardFormOpen, onCardFormOpen, onCardFormOpenChange}
}