import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// Import types from store library (will be available after store is built)
// For now, we'll use any and update this when integrating
export type RootState = any;
export type AppDispatch = any;

/**
 * Typed version of useDispatch hook
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed version of useSelector hook
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
