import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput } from "react-native";
import globalStyles from '../assets/styles'
import Housing from '../components/global/Housing'
import firebase from '../database/firebaseDB'

const db = firebase.firestore()
const auth = firebase.auth()

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errorText, setErrorText] = useState('')

	const login = () => {
		Keyboard.dismiss()
		auth
			.signInWithEmailAndPassword(email, password)
			.then(({userCredential}) => {
				console.log('signed in!')
			})
			.catch((error) => {
				console.log('ERROR')
				setErrorText(error.message)
			})
	}

	return (
		<Housing>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View>
					<Text style={ globalStyles.vbig }>Chat App</Text>
					<View style={styles.inputField}>
						<Text style={ globalStyles.big }>Email</Text>
						<TextInput
							placeholder="Enter Email"
							value={email}
							onChangeText={(text) => setEmail(text)}
						/>
						</View>
					<View style={styles.inputField}>
						<Text style={ globalStyles.big }>Password</Text>
						<TextInput
							placeholder="Enter Password"
							secureTextEntry={true}
							value={password}
							onChangeText={(text) => setPassword(text)}
						/>
					</View>
					<TouchableOpacity onPress={login}>
						<View style={globalStyles.button}>
							<Text style={{ ...globalStyles.big, ...globalStyles.buttonText }}>Log in</Text>
						</View>
					</TouchableOpacity>
					<Text style={styles.errorText}>{errorText}</Text>
				</View>
			</TouchableWithoutFeedback>
		</Housing>
	);
}

const styles = StyleSheet.create({
	inputField: {
		marginTop: 10,
		marginBottom: 10
	},
	errorText: {
		color: 'red',
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
		height: 40
	}
})

export default LoginScreen;
