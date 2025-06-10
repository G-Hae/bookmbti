'use client';

import { Button, Container, Text, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const startHandler = () => {
        router.push('/quiz');
    };

    return (
        <div
            style={{
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #dee2e6 100%)',
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
                <Title
                    order={1}
                    style={{
                        textAlign: 'center',
                        color: '#2f4858',
                        fontWeight: 700,
                        marginBottom: '1rem',
                    }}
                >
                    BookBTI
                </Title>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
                    alt="책 아이콘"
                    style={{ width: 80, height: 80, marginBottom: 10 }}
                />
                <Text
                    style={{
                        textAlign: 'center',
                        color: '#495057',
                        fontSize: '1.1rem',
                        lineHeight: 1.6,
                    }}
                >
                    나는 어떤 책일까? <br />
                    <br />
                    나를 책으로 표현한다면 어떤 장르의 책일까요?
                    <br />몇 가지 질문으로 나의 책 유형을 알아보세요!
                </Text>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '2rem',
                        width: '100%',
                    }}
                >
                    <Button
                        onClick={startHandler}
                        fullWidth
                        size="md"
                        radius="md"
                        style={{
                            border: 'none',
                            backgroundColor: '#4c6ef5',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 18,
                            padding: '20px',
                            borderRadius: '8px',
                        }}
                    >
                        나의 책 유형 알아보기
                    </Button>
                </div>
            </Container>
        </div>
    );
}
