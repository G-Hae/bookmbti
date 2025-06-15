'use client';

import { useBookDetailsQueries } from '@/hooks/useBookDetailsQuery';
import useBookStore from '@/store/bookStore';
import { Button, Card, Container, Group, Loader, Image as MantineImage, Space, Text, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';

const typeDescriptions: Record<string, { category: string; description: string; isbns: string[] }> = {
    ISTJ: {
        category: '자기계발서, 역사',
        description: '체계적이고 책임감 강한 유형, 전통적 가치 중시',
        isbns: ['9791186560655', '9788908060401'],
    },
    ISFJ: {
        category: '에세이, 인간관계',
        description: '감성적이고 신중한 유형, 사람과의 조화 중시',
        isbns: ['9791186560655', '9788908060401'],
    },
    INFJ: {
        category: '철학, 심리학',
        description: '내향적 직관형, 깊이 있는 통찰과 자기성찰',
        isbns: ['9791186560655', '9788908060401'],
    },
    INTJ: {
        category: '철학, 전략서',
        description: '미래지향적이며 분석적인 유형, 체계적 사고와 계획 중시',
        isbns: ['9791186560655', '9788908060401'],
    },
    ISTP: {
        category: '기술서, 실용서',
        description: '현실적이고 문제 해결형, 실용적이고 독립적인 성향',
        isbns: ['9791186560655', '9788908060401'],
    },
    ISFP: {
        category: '예술, 감성 에세이',
        description: '조용하고 감각적, 예술과 감성 표현을 선호',
        isbns: ['9791186560655', '9788908060401'],
    },
    INFP: {
        category: '문학, 성장소설',
        description: '이상주의적이고 감성적, 자기 발견과 성장 이야기 선호',
        isbns: ['9791186560655', '9788908060401'],
    },
    INTP: {
        category: '과학, 철학',
        description: '논리적이고 분석적인 사색가, 이론과 개념 탐구 중시',
        isbns: ['9791186560655', '9788908060401'],
    },
    ESTP: {
        category: '자기계발서, 액션 소설',
        description: '활동적이고 외향적인 유형, 도전과 성취 지향',
        isbns: ['9791186560655', '9788908060401'],
    },
    ESFP: {
        category: '에세이, 여행기',
        description: '즐거움을 추구하는 유형, 감각적 경험과 인간관계 중시',
        isbns: ['9791186560655', '9788908060401'],
    },
    ENFP: {
        category: '문학, 모험소설',
        description: '창의적이고 낙천적인 유형, 다양한 경험과 자유 중시',
        isbns: ['9791186560655', '9788908060401'],
    },
    ENTP: {
        category: '전략서, 토론서',
        description: '혁신적이고 토론을 즐기는 유형, 새로운 아이디어 탐구',
        isbns: ['9791186560655', '9788908060401'],
    },
    ESTJ: {
        category: '자기계발서, 경영서',
        description: '조직적이고 리더십 강한 유형, 현실적 목표 달성 중시',
        isbns: ['9791186560655', '9788908060401'],
    },
    ESFJ: {
        category: '에세이, 인간관계',
        description: '따뜻하고 친절한 유형, 공동체와 사람 중심',
        isbns: ['9791186560655', '9788908060401'],
    },
    ENFJ: {
        category: '리더십, 심리학',
        description: '카리스마 있고 공감 능력 뛰어난 유형, 사람 이끄는 데 능함',
        isbns: ['9791186560655', '9788908060401'],
    },
    ENTJ: {
        category: '전략서, 리더십',
        description: '강한 리더십과 목표 지향적, 전략적 사고 중시',
        isbns: ['9791186560655', '9788908060401'],
    },
};

export default function ResultPage() {
    const router = useRouter();
    const { resetTest, userPersonalityType } = useBookStore();

    const currentTypeDescription = userPersonalityType ? typeDescriptions[userPersonalityType] : undefined;

    const isbnsToFetch = currentTypeDescription?.isbns;
    const { recommendedBooks, isLoading, isError, errors } = useBookDetailsQueries(isbnsToFetch);

    const containerStyle = {
        minHeight: '80vh',
        backgroundColor: 'white',
        padding: '40px 30px',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        maxWidth: 480,
        width: '100%',
        boxSizing: 'border-box' as const,
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
    };

    const pageWrapperStyle = {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        background: 'linear-gradient(135deg, #f8f9fa 0%, #dee2e6 100%)',
    };

    const handleRetryTest = () => {
        resetTest();
        router.push('/');
    };

    if (!userPersonalityType || !typeDescriptions[userPersonalityType]) {
        return (
            <div style={pageWrapperStyle}>
                <Container style={{ ...containerStyle, justifyContent: 'center' as const }}>
                    <Title order={2} my="md" ta="center">
                        테스트 결과가 없습니다.
                    </Title>
                    <Text mb="lg" ta="center">
                        다시 테스트를 진행해 주세요!
                    </Text>
                    <Space h="50px" />
                    <Button onClick={handleRetryTest} size="lg">
                        테스트 다시 시작하기
                    </Button>
                </Container>
            </div>
        );
    }

    const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

    return (
        <div style={pageWrapperStyle}>
            <Container style={containerStyle}>
                <Title order={2} my="md" ta="center">
                    당신은 {currentTypeDescription?.category} 유형입니다!
                </Title>
                <Text mb="lg" style={{ whiteSpace: 'pre-line' }} ta="center">
                    {currentTypeDescription?.description || '설명 없음'}
                </Text>
                <Space h="lg" />
                {isLoading && (
                    <Group justify="center" my="md">
                        <Loader />
                        <Text>추천 도서를 불러오는 중...</Text>
                    </Group>
                )}
                {isError && (
                    <Text c="red" my="md" ta="center">
                        도서 정보를 가져오는 데 실패했습니다: {errors.join(', ') || '알 수 없는 오류'}
                    </Text>
                )}
                {recommendedBooks.length > 0 && !isLoading && !isError && (
                    <>
                        <Title order={3} my="md" ta="center" fw={600}>
                            추천 도서
                        </Title>
                        <Space style={{ marginBottom: '1rem' }} />
                        {recommendedBooks.map((book) => (
                            <Card key={book.isbn}>
                                <Card.Section style={{ display: 'flex', flexDirection: 'row', marginBottom: '25px' }}>
                                    {book.thumbnail && (
                                        <MantineImage
                                            src={book.thumbnail}
                                            height={120}
                                            width={80}
                                            alt={book.title}
                                            fit="contain"
                                        />
                                    )}
                                    <div style={{ margin: '0 0 0 0', display: 'flex', flexDirection: 'column' }}>
                                        <Text fw={500} style={{ margin: '0 15px 0 15px' }}>
                                            {book.title}
                                        </Text>
                                        <Text style={{ margin: '0 15px 0 15px' }}>저자: {book.authors.join(', ')}</Text>
                                        <Text style={{ margin: '0 15px 0 15px' }}>출판사:{book.publisher}</Text>
                                        <Text style={{ margin: '0 15px 0 15px' }} size="sm" my="xs">
                                            {book.contents || '책 소개가 없습니다.'}
                                        </Text>
                                        {book.url && (
                                            <Button
                                                style={{ margin: '0 15px 0 15px' }}
                                                component="a"
                                                href={book.url}
                                                target="_blank"
                                                variant="light"
                                                color="blue"
                                                fullWidth
                                                mt="xs"
                                                radius="md"
                                            >
                                                자세히 보기
                                            </Button>
                                        )}
                                    </div>
                                </Card.Section>
                            </Card>
                        ))}
                    </>
                )}
                {recommendedBooks.length === 0 && !isLoading && !isError && userPersonalityType && (
                    <Text c="dimmed" my="md" ta="center">
                        추천 도서를 찾을 수 없습니다. (모든 ISBN에 대한 검색 실패 또는 결과 없음)
                    </Text>
                )}
                <Space h="50px" />
                <Button onClick={handleRetryTest} size="lg">
                    테스트 다시 시작하기
                </Button>
            </Container>
        </div>
    );
}
