import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {iBackgroundchat} from '../assets';
import LinearGradient from 'react-native-linear-gradient';
import Voice from '@react-native-voice/voice';
import Icon from 'react-native-vector-icons/Ionicons';
import Tts from 'react-native-tts';
import soundGif from '../assets/animation.gif';
import mengetikGif from '../assets/mengetik.gif';
import imageGif from '../assets/aichat.gif';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const CustomHeader = ({navigation, jsonData}) => {
  return (
    <LinearGradient colors={['#EAEAF5', '#EAEAF5']} style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen', {jsonData})}
        style={styles.backButton}>
        <Image
          source={require('../assets/icons/backleft.png')}
          style={{width: 24, height: 24}}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>CourseBot</Text>
    </LinearGradient>
  );
};

const ChatScreen = ({navigation, route}) => {
  const {jsonData} = route.params;
   const [chatMessages, setChatMessages] = useState([]);
   const [inputText, setInputText] = useState('');

   const handleSend = () => {
     if (inputText.trim() !== '') {
       setChatMessages([...chatMessages, {text: inputText, sender: 'user'}]);
       // Add your chatbot logic here and update chatMessages accordingly
       setInputText('');
     }
   };
  return (
    <View style={{flex: 1, backgroundColor: '#EAEAF5'}}>
      <CustomHeader navigation={navigation} jsonData={jsonData} />
      <View style={{flex: 1, justifyContent: 'flex-end', marginTop: 50}}>
        <View style={{padding: 10}}>
          <ScrollView>
            {chatMessages.map((message, index) => (
              <View
                key={index}
                style={
                  message.sender === 'user'
                    ? styles.userMessage
                    : styles.botMessage
                }>
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="Write your message"
            placeholderTextColor="black"
            value={inputText}
            onChangeText={text => setInputText(text)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Image
              source={require('../assets/icons/sen1.png')}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    position: 'fixed', // Tambahkan ini
    width: '100%', // Pastikan lebarnya 100% dari tampilan
    zIndex: 2, // Gunakan z-index untuk mengatur tumpukan lapisan
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#303B3B',
    top: 5,
    borderBottomColor: '#ABABA7',
    borderBottomWidth: 1,
    width: 315,
    textAlign: 'center',
    left: -50,
    paddingBottom: 3,
  },
  backButton: {
    padding: 5,
    marginRight: 50,
  },

  messageBubble: {
    maxWidth: '70%',
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
  },
  userMessage: {
    backgroundColor: 'rgba(133, 87, 177, 0.38)',
    alignSelf: 'flex-end',
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '70%',
  },
  botMessage: {
    backgroundColor: 'rgba(255, 205, 56, 0.5)',
    alignSelf: 'flex-start',
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '70%',
  },
  messageText: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    padding: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  audioButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: 'center',
    marginLeft: 10,
    justifyContent: 'center',
  },
  inputBox: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderRadius: 20,
    color: 'black',
    backgroundColor: '#FFCD38',
  },
  voiceButton: {
    marginLeft: 10,
    fontSize: 24,
  },
  voiceButtonText: {
    fontSize: 24,
    height: 45,
  },
  sendButton: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  voiceOutput: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
  },
  gifContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    zIndex: 1,
  },
  gifImage: {
    width: 200,
    height: 200,
  },
  recentQuestionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginLeft: 35,
  },
  recentQuestionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0000CD',
    borderRadius: 13,
    padding: 5,
    margin: 7,
  },
  recentQuestionText: {
    color: 'black',
    fontSize: 13,
  },
});

export default ChatScreen;
