import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();
    const handleLogin = () => {
        navigation.navigate('Class');
    };
    const data = {}
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
            <View>
                <Text style={styles.title}>Bạn cần đăng nhập để tới trang tiếp theo</Text>
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
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]}>
                        <Text style={styles.buttonText}><Icon name="google" size={25} color="white" style={styles.icon} /> Google</Text>
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
        fontSize: 20,
        textAlign: 'center',
        color: 'red',
    },
    form: {
        marginBottom: 50
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
        marginRight: 15,
    },
    input: {
        flex: 1,
        fontSize: 20,
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
        marginTop: 30
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default LoginScreen;