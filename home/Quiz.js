import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { API_QUIZ } from '../service/QuizService';
import axios from 'axios';

const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const route = useRoute();
    const navigation = useNavigation();

    const data = route.params?.data;

    useEffect(() => {
        axios(API_QUIZ + data.id)
            .then(e => {
                setQuizzes(e.data)
            }).catch(e => console.log(e.message))
    }, [data.id]);

    const handleQuizId = (data) => {
        navigation.navigate('Câu hỏi', { data })
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
            {
                quizzes.length > 0 ?
                    <View>
                        <Text style={styles.title}>Vui lòng chọn chương</Text>
                    </View>
                    :
                    <View>
                        <Text style={styles.title}>Không có dữ liệu</Text>
                    </View>
            }
            <FlatList
                data={quizzes}
                renderItem={({ item }) =>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity key={item.id} style={styles.button} onPress={() => handleQuizId(item)}>
                            <Text style={styles.buttonText}>{data.subjectName + " - " + item.content}</Text>
                        </TouchableOpacity>
                    </View>
                }
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
    },
    buttonGroup: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 30,
        width: 220
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default Quiz;