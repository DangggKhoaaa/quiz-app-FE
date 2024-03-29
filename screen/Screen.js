import React from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';

const Screen = () => {
    return (
        <View>
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableOpacity
                    style={{ alignItems: "flex-end", margin: "16" }}
                    onPress={this.props.navigation.openDrawer}>
                    <Text>aaa</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={styles.text}>{this.props.name} Screen</Text>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        color: '#161924',
        fontSize: 20,
        fontWeight: "500"
    },
    image: {
        width: 200,
        height: 200
    }
});

export default Screen;