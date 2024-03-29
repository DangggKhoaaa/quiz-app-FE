import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import RadioButton from "./components/RadioButton";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { API_QUESTION, API_SCORE } from '../service/QuizService';
import axios from 'axios';
import CheckboxButton from './components/CheckboxButton';
import Icon from 'react-native-vector-icons/FontAwesome';

const Question = () => {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [seconds, setSeconds] = useState(10);
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const route = useRoute();
    const navigation = useNavigation();
    const data = route.params?.data;

    const handlePress = (questionId, answerId) => {
        if (submitted) {
            return;
        };
        setSelectedAnswers(prevSelectedAnswers => {
            const updatedSelectedAnswers = [...prevSelectedAnswers];
            const existingAnswer = updatedSelectedAnswers.find(answer => answer.questionId === questionId);

            if (questions.find(question => question.id === questionId)?.type === 'radio') {
                if (existingAnswer) {
                    existingAnswer.answerId = [answerId];
                } else {
                    updatedSelectedAnswers.push({ questionId, answerId: [answerId] });
                }
            } else {
                if (existingAnswer) {
                    const isSelected = existingAnswer.answerId.includes(answerId);
                    if (isSelected) {
                        existingAnswer.answerId = existingAnswer.answerId.filter(id => id !== answerId);
                    } else {
                        existingAnswer.answerId.push(answerId);
                    }
                } else {
                    updatedSelectedAnswers.push({ questionId, answerId: [answerId] });
                }
            }
            return updatedSelectedAnswers;
        });
    };

    useEffect(() => {
        if (seconds > 0) {
            const timer = setTimeout(() => {
                setSeconds(seconds - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            handleSubmit();
        }
    }, [seconds]);

    const formatTime = time => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
    };

    const getAllQuestion = () => {
        axios(API_QUESTION + data.id)
            .then(e => {
                setQuestions(e.data);
            }).catch(e => console.log(e.message))
    }

    useEffect(() => {
        getAllQuestion();
    }, [data.id]);

    const handleSubmit = () => {
        if (selectedAnswers.length === 0 && seconds > 0) {
            Alert.alert('Cảnh báo', 'Bạn phải chọn ít nhất 1 câu trả lời!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ], { textStyle: { fontSize: 30 } });
        } else {
            axios.post(API_SCORE, selectedAnswers)
                .then(response => {
                    Alert.alert('Thông báo', 'Bạn đã đúng ' + response.data.score + '/' + questions.length + ' câu!', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ], { textStyle: { fontSize: 30 } });
                    setScore(response.data.score);
                    setSubmitted(true);
                })
                .catch(error => {
                    console.log(error.message)
                });
        }

    };

    const handleRetry = () => {
        setSelectedAnswers([]);
        setScore(0);
        setSeconds(10);
        setSubmitted(false);
        getAllQuestion();
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                questions.length > 0 ?
                    <View>
                        <Text style={styles.title}>{data.content}</Text>
                        {
                            submitted ?
                                <View style={styles.group}>
                                    <Text style={styles.title}>{"Điểm: " + (score / questions.length * 10).toFixed(1)}</Text>
                                </View>
                                :
                                <View style={styles.group}>
                                    <Icon name="rocket" size={30} color="gray" style={styles.icon} />
                                    <Text style={styles.title}>{formatTime(seconds)}</Text>
                                </View>
                        }
                    </View>
                    :
                    <View>
                        <Text style={styles.title}>Không có dữ liệu</Text>
                    </View>
            }

            <FlatList
                data={questions}
                renderItem={({ item: question, index }) => (
                    <View style={styles.body}>
                        <Text style={[styles.text, { fontWeight: 'bold', padding: 10 }]}>
                            {"Câu " + (index + 1) + ": " + question.content}
                        </Text>
                        {
                            question.type === "radio" ?
                                <Text style={[styles.text, { marginLeft: 20 }]}>Chọn một</Text>
                                :
                                <Text style={[styles.text, { marginLeft: 20 }]}>Chọn một hoặc nhiều</Text>
                        }
                        <FlatList
                            data={question.answerList}
                            renderItem={({ item: answer }) => (
                                <View style={styles.group}>
                                    {question.type === "radio" ?
                                        <RadioButton
                                            selected={selectedAnswers?.find(e => e.questionId === question.id)?.answerId[0] === answer.id}
                                            onPress={() => handlePress(question.id, answer.id)}
                                        />
                                        :
                                        <CheckboxButton
                                            selected={selectedAnswers?.find(e => e.questionId === question.id)?.answerId?.includes(answer.id)}
                                            onPress={() => handlePress(question.id, answer.id)}
                                        />
                                    }
                                    <Text style={styles.text}>{answer.content}</Text>
                                </View>
                            )}
                            keyExtractor={answer => answer.id}
                        />
                    </View>
                )}
                keyExtractor={question => question.id}
                ListFooterComponent={() => (
                    questions.length > 0 ?
                        <View style={styles.buttonGroup}>
                            {
                                submitted ?
                                    <TouchableOpacity style={styles.button} onPress={handleRetry}>
                                        <Text style={styles.buttonText}>Làm lại</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                        <Text style={styles.buttonText}>Nộp bài</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                        :
                        ""
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
    },
    body: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        paddingBottom: 30
    },
    text: {
        fontSize: 20,
    },
    icon: {
        marginRight: 15,
        marginBottom: 30
    },
    group: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 25,
        marginTop: 10,
    },
    buttonGroup: {
        margin: 10,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 30
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Question;