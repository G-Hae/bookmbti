import { Button, Container, Text, Title } from '@mantine/core';

export default function Home() {
    return (
        <Container>
            <Title order={1} my="md">
                나는 어떤 책일까?
            </Title>
            <Text mb="lg">나를 책으로 표현한다면 나는 어떤 책일까요?</Text>
            <Button>나는 무슨 책인지 알아보기</Button>
        </Container>
    );
}
