'use client';

import useBookStore from '@/store/bookStore';
import { Button, Container, Paper, Text, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const questions = [
    {
        id: 1,
        question: '하루 중 가장 집중되는 시간은?',
        options: [
            { id: 'q1o1', text: '아침', type: 'E', score: 2 },
            { id: 'q1o2', text: '저녁', type: 'I', score: 2 },
        ],
        imgUrl: 'https://cdn.pixabay.com/photo/2023/03/17/14/26/bear-7858736_1280.jpg',
    },
    {
        id: 2,
        question: '책을 고를 때 중요한 기준은?',
        options: [
            { id: 'q2o1', text: '재미', type: 'S', score: 2 },
            { id: 'q2o2', text: '정보', type: 'N', score: 2 },
        ],
        imgUrl: 'https://cdn.pixabay.com/photo/2023/03/17/14/26/bear-7858736_1280.jpg',
    },
    {
        id: 3,
        question: '주말에 더 선호하는 활동은?',
        options: [
            { id: 'q3o1', text: '독서', type: 'T', score: 2 },
            { id: 'q3o2', text: '산책', type: 'F', score: 2 },
        ],
        imgUrl: 'https://cdn.pixabay.com/photo/2023/03/17/14/26/bear-7858736_1280.jpg',
    },
    {
        id: 4,
        question: '모임에서 나는 주로 어떤 역할을 하나요?',
        options: [
            { id: 'q4o1', text: '사교적이며 말이 많다', type: 'E', score: 2 },
            { id: 'q4o2', text: '조용히 관찰하는 편이다', type: 'I', score: 2 },
        ],
        imgUrl: 'https://cdn.pixabay.com/photo/2023/03/17/14/26/bear-7858736_1280.jpg',
    },
    {
        id: 5,
        question: '새로운 정보를 접할 때 나는?',
        options: [
            { id: 'q5o1', text: '사실에 집중한다', type: 'S', score: 2 },
            { id: 'q5o2', text: '가능성과 의미에 집중한다', type: 'N', score: 2 },
        ],
        imgUrl: 'https://cdn.pixabay.com/photo/2023/03/17/14/26/bear-7858736_1280.jpg',
    },
    {
        id: 6,
        question: '결정을 내릴 때 나는?',
        options: [
            { id: 'q6o1', text: '논리적으로 판단한다', type: 'T', score: 2 },
            { id: 'q6o2', text: '감정을 고려한다', type: 'F', score: 2 },
        ],
        imgUrl: 'https://cdn.pixabay.com/photo/2023/03/17/14/26/bear-7858736_1280.jpg',
    },
    {
        id: 7,
        question: '일정과 계획을 어떻게 다루나요?',
        options: [
            { id: 'q7o1', text: '계획적으로 움직인다', type: 'J', score: 2 },
            { id: 'q7o2', text: '즉흥적으로 행동한다', type: 'P', score: 2 },
        ],
        imgUrl: 'https://cdn.pixabay.com/photo/2023/03/17/14/26/bear-7858736_1280.jpg',
    },
    {
        id: 8,
        question: '대화 스타일은 어떤 편인가요?',
        options: [
            { id: 'q8o1', text: '직설적이고 명확하다', type: 'J', score: 2 },
            { id: 'q8o2', text: '느긋하고 유연하다', type: 'P', score: 2 },
        ],
        imgUrl: 'https://cdn.pixabay.com/photo/2023/03/17/14/26/bear-7858736_1280.jpg',
    },
    {
        id: 9,
        question: '스트레스를 받을 때 나는?',
        options: [
            { id: 'q9o1', text: '혼자만의 시간이 필요하다', type: 'I', score: 2 },
            { id: 'q9o2', text: '친구들과 이야기하며 푼다', type: 'E', score: 2 },
        ],
        imgUrl: 'https://cdn.pixabay.com/photo/2023/03/17/14/26/bear-7858736_1280.jpg',
    },
    {
        id: 10,
        question: '나는 보통 어떻게 일을 처리하나요?',
        options: [
            { id: 'q10o1', text: '체계적으로 순서대로 한다', type: 'J', score: 2 },
            { id: 'q10o2', text: '다양한 일들을 동시에 한다', type: 'P', score: 2 },
        ],
        imgUrl: 'https://cdn.pixabay.com/photo/2023/03/17/14/26/bear-7858736_1280.jpg',
    },
];

export default function QuizPage() {
    const router = useRouter();
    const store = useBookStore();

    const { userPersonalityType, setUserPersonalityType } = useBookStore();

    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState<{ type: string; score: number }[]>([]);

    const calculateResult = (answers: { type: string; score: number }[]) => {
        const scores: Record<string, number> = {};

        answers.forEach(({ type, score }) => {
            scores[type] = (scores[type] || 0) + score;
        });

        const result = [
            (scores['E'] || 0) >= (scores['I'] || 0) ? 'E' : 'I',
            (scores['S'] || 0) >= (scores['N'] || 0) ? 'S' : 'N',
            (scores['T'] || 0) >= (scores['F'] || 0) ? 'T' : 'F',
            (scores['J'] || 0) >= (scores['P'] || 0) ? 'J' : 'P',
        ].join('');

        setUserPersonalityType(result);
    };

    const handleAnswer = (answer: { type: string; score: number }) => {
        if (current + 1 < questions.length) {
            setCurrent((prev) => prev + 1);
            setAnswers((prev) => [...prev, answer]);
        } else {
            calculateResult([...answers, answer]);
            router.push(`/result`);
        }
    };

    const q = questions[current];

    return (
        <div
            style={{
                width: '100%',
                minHeight: '100vh',
                backgroundColor: '#f0f4f8',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
            }}
        >
            <Container
                style={{
                    minHeight: '80vh',
                    backgroundColor: 'white',
                    padding: '40px 30px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    maxWidth: 480,
                    width: '100%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {' '}
                <Paper
                    shadow="md"
                    radius="md"
                    p="xl"
                    withBorder
                    style={{
                        backgroundColor: 'white',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Title order={2} mb="sm">
                        질문 {current + 1} / {questions.length}
                    </Title>
                    <Text size="lg" mb="xl">
                        {q.question}
                    </Text>
                    <img
                        src={q.imgUrl}
                        alt="quiz image"
                        style={{
                            width: '100%',
                            maxWidth: '300px',
                            maxHeight: '300px',
                            height: 'auto',
                            borderRadius: '12px',
                            marginBottom: '1.5rem',
                        }}
                    />
                    <div>
                        {q.options.map((opt) => (
                            <Button
                                key={opt.id}
                                fullWidth
                                size="md"
                                variant="light"
                                color="indigo"
                                radius="md"
                                my="sm"
                                onClick={() => handleAnswer(opt)}
                                style={{ fontWeight: 500 }}
                            >
                                {opt.text}
                            </Button>
                        ))}{' '}
                    </div>
                </Paper>
            </Container>
        </div>
    );
}
