import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import firebase from '../database/firebaseDB'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { GiftedChat } from 'react-native-gifted-chat'

const db = firebase.firestore().collection('messages')

const ChatScreen = ({ route, navigation }) => {
	const [messages, setMessages] = useState([])
	let id = ''
	let email = ''
	try {
		id = route.params.id
		email = route.params.email
	} catch { }

	useEffect(() => {

		//------------- setting the db --------------//
		const unsubscribe = db
			.orderBy('createdAt', 'desc')
			.onSnapshot((collectionSnapshot) => {
				const serverMessages = collectionSnapshot.docs.map((doc) => {
					let data = doc.data()
					const jsDate = new Date(data.createdAt.seconds * 1000)

					const newDoc = {
						...data,
						createdAt: jsDate
					}
					return newDoc
				})
				setMessages(serverMessages)
			})

		//-------- auth logic ----------//
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				// logged in 
				console.log(user)
				navigation.navigate("Chat", { id: user.uid, email: user.email })
			} else {
				// logged out, get kicked back to the login page
				navigation.navigate('Login')
			}
		})

		//----------- seting demo messages -----------//
		// setMessages([
		// 	{
		// 		_id: 1,
		// 		text: 'Hello there!',
		// 		createdAt: new Date(),
		// 		user: {
		// 			_id: 2,
		// 			name: 'Demo person',
		// 			avatar: 'https://palceimg.com/140/140/any'
		// 		}
		// 	}
		// ])

		//----------- logout button at top right corner --------------//
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={logout}>
					<MaterialCommunityIcons
						name='logout'
						size={24}
						color='grey'
						style={{ marginRight: 20}}
					/>
				</TouchableOpacity>
			)
		})

		//--------- clean up -----------//
		// return unsubscribe
	}, [])

	const logout = () => {
		firebase.auth().signOut()
	}

	const sendMessages = (newMessages) => {
		// setMessages([...newMessages, ...messages])

		db.add(newMessages[0])
	}
	return (
		<GiftedChat
			messages={messages}
			onSend={(newMessages) => sendMessages(newMessages)}
			renderUsernameOnMessage={true}
			listViewProps={{
				style: {
				  backgroundColor: "#777",
				},
			}}
			user={{
				_id: id,
				name: email
			}}
		/>
	);
}

export default ChatScreen;
