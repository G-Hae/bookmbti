import { create } from 'zustand';

interface BookStoreState {
    userPersonalityType: string | null;
}

interface BookStoreActions {
    setUserPersonalityType: (type: string) => void;
    resetTest: () => void;
}

const useBookStore = create<BookStoreState & BookStoreActions>((set) => ({
    userPersonalityType: null,
    setUserPersonalityType: (type) => set({ userPersonalityType: type }),
    resetTest: () =>
        set({
            userPersonalityType: null,
        }),
}));

export default useBookStore;
