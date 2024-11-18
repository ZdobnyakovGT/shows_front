import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {T_Topic} from "src/modules/types.ts";
import TopicCard from "components/TopicCard";
import {TopicMocks} from "src/modules/mocks.ts";
import {FormEvent, useEffect} from "react";
import * as React from "react";
import 'src/App.css';


type TopicsPageProps = {
    topics: T_Topic[],
    setTopics: React.Dispatch<React.SetStateAction<T_Topic[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
    topicName: string,
    setTopicName: React.Dispatch<React.SetStateAction<string>>
}

const TopicsPage = ({topics, setTopics, isMock, setIsMock, topicName, setTopicName}:TopicsPageProps) => {

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/topics/search?topic_name=${topicName.toLowerCase()}`,{ signal: AbortSignal.timeout(1000) })
            const data = await response.json()
            setTopics(data.topics)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }


    const createMocks = () => {
        setIsMock(true)
        setTopics(TopicMocks.filter(topic => topic.name.toLowerCase().includes(topicName.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        if (isMock) {
            createMocks()
        } else {
            await fetchData()
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <Container className="container-custom">
            <Row className="justify-content-center mb-5">
                <Col xs="12" md="8" lg="6">
                    <Form onSubmit={handleSubmit} className="d-flex">
                        <Input value={topicName} onChange={(e) => setTopicName(e.target.value)} placeholder="Поиск..." className="me-2 search-input"></Input>
                        <Button color="primary" className="search-button">Поиск</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                {topics?.map(topic => (
                    <Col key={topic.topic_id} xs="3">
                        <TopicCard topic={topic} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default TopicsPage 
