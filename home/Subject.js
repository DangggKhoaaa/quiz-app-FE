import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { API_SUBJECT } from '../service/QuizService';
import axios from 'axios';

const Subject = () => {
    const [subjects, setSubjects] = useState([]);
    const route = useRoute();

    const data = route.params?.data;

    useEffect(() => {
        axios(API_SUBJECT + data.id)
            .then(e => {
                setSubjects(e.data)
            }).catch(e => console.log(e.message))
    }, [data.id]);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
            <View>
                <Text style={styles.title}>Vui lòng chọn môn học</Text>
            </View>
            <FlatList
                data={subjects}
                renderItem={({ item }) =>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity key={item.id} style={styles.button}>
                            <Text style={styles.buttonText}>{item.subjectName + " " + data.className}</Text>
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
        width: 170
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default Subject;