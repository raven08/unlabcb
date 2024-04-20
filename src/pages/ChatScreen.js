import React, {useState, useRef ,useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ChatScreen = ({navigation, route}) => {
   const {jsonData} = route.params;
   const email = jsonData[0].email;
   const [inputText, setInputText] = useState('');
   const [messages, setMessages] = useState([]);
   const [recentQuestions, setRecentQuestions] = useState([]);

  const flatListRef = useRef(null);
  useEffect(() => {
    // Load recent questions from AsyncStorage on component mount
    loadRecentQuestions();
  }, []);

  const loadRecentQuestions = async () => {
    try {
      const storedQuestions = await AsyncStorage.getItem('recentQuestions');
      if (storedQuestions !== null) {
        setRecentQuestions(JSON.parse(storedQuestions));
      }
    } catch (error) {
      console.error('Error loading recent questions:', error);
    }
  };

  const saveRecentQuestions = async questions => {
    try {
      await AsyncStorage.setItem('recentQuestions', JSON.stringify(questions));
    } catch (error) {
      console.error('Error saving recent questions:', error);
    }
  };
  const sendQuestion = async () => {
    try {
      const response = await fetch('https://coursebot.online:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: inputText,
          email: email, // Menggunakan email yang diambil dari jsonData
        }),
      });
      const responseData = await response.text();
      console.log('Raw Response:', responseData);

      const jsonString = responseData.match(/\{.*\}/)[0];
      const formattedJsonString = jsonString.replace(/'/g, '"');
      const json_data = JSON.parse(formattedJsonString);

      const res_response = json_data.response;
      const res_threshold = json_data.decision_threshold;
      const res_pred_intent = json_data.predicted_intent;
      const res_confidence = json_data.confidence_score;
      const res_time = json_data.time;
      const res_date = json_data.date;

      console.log('Email:', email); // Log email di sini
      console.log('Category:', res_pred_intent);
      console.log('Question:', inputText);
      console.log('Answer:', res_response);
      console.log('Confidence Score:', res_confidence);
      console.log('Decision Threshold:', res_threshold);
      console.log('Time:', res_time);
      console.log('Date:', res_date);

      const uploadResponse = await fetch(
        'https://coursebot.online:8000/save-to-database',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            category: res_pred_intent,
            user_question: inputText,
            chatbot_answer: res_response,
            decision_threshold: res_threshold,
            time: res_time,
            date: res_date,
          }),
        },
      );

      const newMessage = {text: inputText, from: 'user'};
      const serverResponseMessage = {text: res_response, from: 'server'};
      setMessages([...messages, newMessage, serverResponseMessage]);
      setInputText('');
      const uploadResponseData = await uploadResponse.json();
      console.log('Upload Response:', uploadResponseData);

      await saveRecentQuestions([inputText, ...recentQuestions]); // Menambah pertanyaan baru ke awal daftar
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderItem = ({item}) => (
    <View
      style={
        item.from === 'user'
          ? styles.userMessageContainer
          : styles.serverMessageContainer
      }>
      {item.from === 'server' && (
        <FontAwesome5
          name="robot"
          size={24}
          style={[styles.robotIcon, {color: '#7E4AB2'}]}
        />
      )}
      <Text
        style={
          item.from === 'user' ? styles.userMessage : styles.serverMessage
        }>
        {item.text}
      </Text>
      {item.from === 'user' && (
        <Icon
          name="user"
          size={24}
          style={[styles.userIcon, {color: '#7E4AB2'}]}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen', {jsonData})}
          style={styles.backButton}>
          <Image
            source={require('../assets/icons/backleft.png')}
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Poppins-Bold',
            color: '#303B3B',
            top: -5,
            borderBottomColor: '#ABABA7',
            borderBottomWidth: 1,
            width: 315,
            textAlign: 'center',
            left: -20,
            paddingBottom: 3,
          }}>
          CourseBot
        </Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onContentSizeChange={() =>
          flatListRef.current.scrollToEnd({animated: true})
        }
        style={{flex: 1, width: '100%'}}
      />
      <View style={styles.recentQuestionsContainer}>
        <FlatList
          horizontal
          data={recentQuestions}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => setInputText(item)}
              style={[styles.recentQuestionItem, {width: item.length * 10}]}>
              <Text style={styles.recentQuestionText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setInputText}
          value={inputText}
          placeholder="Write your message"
          placeholderTextColor="#000000"
        />
        <TouchableOpacity onPress={sendQuestion}>
          <Image
            source={require('../assets/icons/sen1.png')}
            size={20}
            elevation={10}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#FFCD38',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 30,
    width: 273,
    backgroundColor: '#FFCD38',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    elevation: 10,
  },
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 5,

    marginLeft: 100,
  },
  serverMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginRight: 100,
  },
  userMessage: {
    backgroundColor: 'rgba(133, 87, 177, 0.38)',
    color: '#000000',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    padding: 10,
    borderRadius: 10,
  },
  serverMessage: {
    backgroundColor: 'rgba(255, 205, 56, 0.5)',
    color: '#000000',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    padding: 10,
    borderRadius: 10,
  },
  userIcon: {
    marginRight: 5,
    marginLeft: 5,
  },
  robotIcon: {
    marginRight: 5,
    marginLeft: 5,
  },
  backButton: {
    padding: 5,
    marginRight: 30,
  },
  recentQuestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginLeft: 35,
  },
  recentQuestionItem: {
    padding: 10,
    backgroundColor: 'transparent', // Make background transparent
    borderColor: '#FFCD38', // Set border color to #FFCD38
    borderWidth: 1, // Add border
    borderRadius: 30,
    marginBottom: 5,
    marginRight: 5,
    padding: 5,
    margin: 7, // Add margin right to separate items
  },
  recentQuestionText: {
    fontSize: 16,
    color: 'black',
  },
});

export default ChatScreen;
