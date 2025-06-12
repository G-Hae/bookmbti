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
    isLoadingBooks: boolean;
    bookFetchError: string | null;
}

interface BookStoreActions {
    setUserPersonalityType: (type: string) => void;
    resetTest: () => void;
    fetchBookDetails: (isbn: string) => Promise<void>;
}

const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

const useBookStore = create<BookStoreState & BookStoreActions>((set) => ({
    userPersonalityType: null,
    recommendedBooks: [],
    isLoadingBooks: false,
    bookFetchError: null,
    setUserPersonalityType: (type) => set({ userPersonalityType: type }),
    resetTest: () =>
        set({
            userPersonalityType: null,
        }),
    fetchBookDetails: async (isbn: string) => {
        if (!KAKAO_API_KEY) {
            console.error('KAKAO_REST_API_KEY 환경 변수가 설정되지 않았습니다.');
            set({ bookFetchError: 'API 키가 설정되지 않았습니다. 개발자에게 문의하세요.' });
            return;
        }

        set({ isLoadingBooks: true, bookFetchError: null });
        try {
            const response = await fetch(`https://dapi.kakao.com/v3/search/book?query=${isbn}&target=isbn`, {
                headers: {
                    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API 호출 실패: ${response.status} ${response.statusText} - ${errorData.message}`);
            }

            const data = await response.json();

            if (data.documents && data.documents.length > 0) {
                const bookData = data.documents[0];
                const newBook: Book = {
                    title: bookData.title,
                    thumbnail: bookData.thumbnail,
                    authors: bookData.authors || [],
                    publisher: bookData.publisher || '정보 없음',
                    contents: bookData.contents || '책 소개가 없습니다.',
                    isbn: bookData.isbn,
                    url: bookData.url,
                };
                set({
                    recommendedBooks: [newBook],
                    isLoadingBooks: false,
                });
            } else {
                set({
                    bookFetchError: `ISBN '${isbn}'에 해당하는 책을 찾을 수 없습니다.`,
                    recommendedBooks: [],
                    isLoadingBooks: false,
                });
            }
        } catch (error: any) {
            console.error('도서 정보 가져오기 실패:', error);
            set({
                bookFetchError: `도서 정보를 가져오는 데 실패했습니다: ${error.message || '알 수 없는 오류'}`,
                recommendedBooks: [],
                isLoadingBooks: false,
            });
        }
    },
}));

export default useBookStore;
