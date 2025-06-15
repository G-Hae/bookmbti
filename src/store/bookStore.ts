import { create } from 'zustand';

interface Book {
    title: string;
    thumbnail: string;
    authors: string[];
    publisher: string;
    contents: string;
    isbn: string;
    url: string;
}

interface BookStoreState {
    userPersonalityType: string | null;
    recommendedBooks: Book[];
}

interface BookStoreActions {
    setUserPersonalityType: (type: string) => void;
    resetTest: () => void;
}

const useBookStore = create<BookStoreState & BookStoreActions>((set) => ({
    userPersonalityType: null,
    recommendedBooks: [],
    setUserPersonalityType: (type) => set({ userPersonalityType: type }),
    resetTest: () =>
        set({
            userPersonalityType: null,
        }),
}));

export default useBookStore;
