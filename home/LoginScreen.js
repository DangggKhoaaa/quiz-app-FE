import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
            <View>
                <Text style={styles.title}>Đăng nhập</Text>
            </View>
            <View style={styles.form}>
                <View style={styles.group}>
                    <Icon name="user" size={30} color="gray" style={styles.icon} />
                    <TextInput placeholder='Tài khoản' style={styles.input} />
                </View>
                <View style={styles.group}>
                    <Icon name="lock" size={30} color="gray" style={styles.icon} />
                    <TextInput placeholder='Mật khẩu' style={styles.input} secureTextEntry={true} />
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        paddingHorizontal: 50
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    form: {

    },
    group: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingBottom: 5,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    buttonGroup: {
        marginTop: 40,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;