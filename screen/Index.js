import React from "react";
import Screen from "./Screen";

export const ProfileScreen = ({ navigation }) => <Screen navigation={navigation} name="Thông tin" />
export const ChangePasswordScreen = ({ navigation }) => <Screen navigation={navigation} name="Đổi mật khẩu" />
export const LogoutScreen = ({ navigation }) => <Screen navigation={navigation} name="Đăng xuất" />