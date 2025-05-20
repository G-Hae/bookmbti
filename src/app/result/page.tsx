'use client';

import { Button, Container, Text, Title } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ResultPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const result = searchParams.get('type') || '결과 없음';

    const typeDescriptions: Record<string, { category: string; description: string }> = {
        ISTJ: { category: '자기계발서, 역사', description: '체계적이고 책임감 강한 유형, 전통적 가치 중시' },
        ISFJ: { category: '에세이, 인간관계', description: '감성적이고 신중한 유형, 사람과의 조화 중시' },
        INFJ: { category: '철학, 심리학', description: '내향적 직관형, 깊이 있는 통찰과 자기성찰' },
        INTJ: { category: '철학, 전략서', description: '미래지향적이며 분석적인 유형, 체계적 사고와 계획 중시' },
        ISTP: { category: '기술서, 실용서', description: '현실적이고 문제 해결형, 실용적이고 독립적인 성향' },
        ISFP: { category: '예술, 감성 에세이', description: '조용하고 감각적, 예술과 감성 표현을 선호' },
        INFP: { category: '문학, 성장소설', description: '이상주의적이고 감성적, 자기 발견과 성장 이야기 선호' },
        INTP: { category: '과학, 철학', description: '논리적이고 분석적인 사색가, 이론과 개념 탐구 중시' },
        ESTP: { category: '자기계발서, 액션 소설', description: '활동적이고 외향적인 유형, 도전과 성취 지향' },
        ESFP: { category: '에세이, 여행기', description: '즐거움을 추구하는 유형, 감각적 경험과 인간관계 중시' },
        ENFP: { category: '문학, 모험소설', description: '창의적이고 낙천적인 유형, 다양한 경험과 자유 중시' },
        ENTP: { category: '전략서, 토론서', description: '혁신적이고 토론을 즐기는 유형, 새로운 아이디어 탐구' },
        ESTJ: { category: '자기계발서, 경영서', description: '조직적이고 리더십 강한 유형, 현실적 목표 달성 중시' },
        ESFJ: { category: '에세이, 인간관계', description: '따뜻하고 친절한 유형, 공동체와 사람 중심' },
        ENFJ: { category: '리더십, 심리학', description: '카리스마 있고 공감 능력 뛰어난 유형, 사람 이끄는 데 능함' },
        ENTJ: { category: '전략서, 리더십', description: '강한 리더십과 목표 지향적, 전략적 사고 중시' },
    };

    const goHome = () => {
        router.push('/');
    };

    return (
        <Container>
            <Title order={2} my="md">
                당신은 이런 책입니다!
            </Title>
            <Text mb="md" fw="semibold">
                분류: {typeDescriptions[result]?.category || '정보 없음'}
            </Text>
            <Text mb="lg" style={{ whiteSpace: 'pre-line' }}>
                설명: {typeDescriptions[result]?.description || '설명 없음'}
            </Text>
            <Button onClick={goHome}>홈으로 돌아가기</Button>
        </Container>
    );
}
