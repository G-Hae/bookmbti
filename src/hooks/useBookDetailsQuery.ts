import { useQueries } from '@tanstack/react-query';

interface Book {
    title: string;
    thumbnail: string;
    authors: string[];
    publisher: string;
    contents: string;
    isbn: string;
    url: string;
}

const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

interface BooksQueryResult {
    recommendedBooks: Book[];
    isLoading: boolean;
    isError: boolean;
    errors: string[];
}

export function useBookDetailsQueries(isbns: string[] | null | undefined): BooksQueryResult {
    const validIsbns = Array.isArray(isbns) ? isbns.filter(Boolean) : [];

    const queryResults = useQueries({
        queries: validIsbns.map((isbn) => ({
            queryKey: ['bookDetails', isbn],
            queryFn: async (): Promise<Book> => {
                if (!KAKAO_API_KEY) {
                    throw new Error('KAKAO_REST_API_KEY 환경 변수가 설정되지 않았습니다.');
                }

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
                    return {
                        title: bookData.title,
                        thumbnail: bookData.thumbnail,
                        authors: bookData.authors || [],
                        publisher: bookData.publisher || '정보 없음',
                        contents: bookData.contents || '책 소개가 없습니다.',
                        isbn: bookData.isbn,
                        url: bookData.url,
                    };
                } else {
                    throw new Error(`ISBN '${isbn}'에 해당하는 책을 찾을 수 없습니다.`);
                }
            },
            enabled: true,
        })),
    });

    const isLoading = queryResults.some((query) => query.isLoading);
    const isError = queryResults.some((query) => query.isError);
    const errors = queryResults
        .filter((query) => query.isError)
        .map((query) => query.error?.message)
        .filter(Boolean) as string[];

    const recommendedBooks = queryResults
        .filter((query) => query.isSuccess && query.data)
        .map((query) => query.data as Book);

    return {
        recommendedBooks,
        isLoading,
        isError,
        errors,
    };
}
