import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import firebase from '../database/firebaseDB'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { GiftedChat } from 'react-native-gifted-chat'

const db = firebase.firestore().collection('messages')

const ChatScreen = ({ navigation }) => {
	const [messages, setMessages] = useState([])

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
				navigation.navigate("Chat", { id: user.id, email: user.email })
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

	const see = () => {
		console.log('seeing')
		// console.log(firebase.auth().currentUser)
		console.log(firebase.auth().currentUser.uid)
		console.log(firebase.auth().currentUser.email)
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
				_id: firebase.auth().currentUser.uid,
				name: firebase.auth().currentUser.email
				// _id: 1,
				// name: 'a@a.com'
			}}
		/>
		// <View><Button onPress={see} title='potato'/></View>
	);
}

export default ChatScreen;
