import { Button, Col, Container, Form, Input, Row } from "reactstrap";
import { T_Topic } from "src/modules/types.ts";
import TopicCard from "components/TopicCard";
import { TopicMocks } from "src/modules/mocks.ts";
import { FormEvent, useEffect } from "react";
import * as React from "react";
import "src/App.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/core/store/store";
import { setTopicName } from "src/core/store/slices/searchSlice";
import { api } from "src/api";
import { useState } from "react";
import { useAppSelector } from "src/core/store/hooks.ts";
import { useNavigate } from "react-router-dom";

type TopicsPageProps = {
    topics: T_Topic[];
    setTopics: React.Dispatch<React.SetStateAction<T_Topic[]>>;
    isMock: boolean;
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopicsPage = ({ topics, setTopics, isMock, setIsMock }: TopicsPageProps) => {
    const navigate = useNavigate();
    const { isAuth } = useAppSelector((state) => state.userAuth);

    const topicName = useSelector((state: RootState) => state.search.topicName);
    const dispatch = useDispatch();
    const [topicsCount, setTopicsCount] = useState<number | null>(null);
    const [draft, setDraft] = useState<number | null>(null);

    const fetchData = async () => {
        try {
            const response = await api.topics.topicsSearchList({
                query: topicName.toLowerCase(),
            });

            setTopics(response.data.topics);
            setTopicsCount(response.data.topics_count);
            setDraft(response.data.draft_show_id);
            setIsMock(false);
        } catch (error) {
            console.error("Error fetching topics:", error);
            createMocks();
        }
    };

    const createMocks = () => {
        setIsMock(true);
        setTopics(
            TopicMocks.filter((topic) =>
                topic.name.toLowerCase().includes(topicName.toLowerCase())
            )
        );
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (isMock) {
            createMocks();
        } else {
            await fetchData();
        }
    };

    const handleAddToShow = async (topicId: number) => {
        try {
            await api.topics.topicsAddToShowCreate(topicId);
            console.log(`Topic ${topicId} added to show`);
        } catch (error) {
            console.error(`Failed to add topic ${topicId} to show:`, error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [handleSubmit]);

    return (
        <Container className="container-custom">
            <Row className="justify-content-center mb-4">
                <Col xs="12" md="8" lg="6">
                    <Form onSubmit={handleSubmit} className="d-flex">
                        <Input
                            value={topicName}
                            onChange={(e) => dispatch(setTopicName(e.target.value))}
                            placeholder="Поиск..."
                            className="me-2 search-input"
                        />
                        <Button color="primary" className="search-button">
                            Поиск
                        </Button>
                        {isAuth && (
                            <Button
                                color="primary"
                                className="search-button"
                                onClick={() => navigate(`/shows/${draft}`)}
                                disabled={topicsCount === 0} // Отключаем кнопку, если количество 0
                            >
                                Корзина: {topicsCount !== null ? topicsCount : 0}
                            </Button>
                        )}
                    </Form>
                </Col>
            </Row>
            <Row>
                {topics?.map((topic) => (
                    <Col
                        key={topic.topic_id}
                        xs="12"
                        sm="6"
                        md="4"
                        lg="3"
                        className="mb-4"
                    >
                        <TopicCard
                            topic={topic}
                            isMock={isMock}
                            onAddToShow={handleAddToShow}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default TopicsPage;
