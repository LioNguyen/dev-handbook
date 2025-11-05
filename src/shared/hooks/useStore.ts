import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux'
import type { AppDispatch, RootState } from '@/modules/redux-demo/store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
