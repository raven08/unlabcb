import React, {useState, useRef} from 'react';
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

const ChatScreen = ({navigation, route}) => {
  const {jsonData} = route.params;
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const flatListRef = useRef(null);

const sendQuestion = async () => {
  try {
    const response = await fetch('http://103.210.55.63:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: inputText,
      }),
    });
    const responseData = await response.text();
    console.log('Raw Response:', responseData);

    // Mengambil bagian JSON dengan menggunakan regex
    const jsonString = responseData.match(/\{.*\}/)[0];

    // Mengganti tanda kutip tunggal menjadi ganda untuk memenuhi format JSON
    const formattedJsonString = jsonString.replace(/'/g, '"');

    // Parse string JSON menjadi objek JavaScript
    const json_data = JSON.parse(formattedJsonString);

    const res_response = json_data.response;
    const res_threshold = json_data.decision_threshold;
    const res_pred_intent = json_data.predicted_intent;
    const res_confidence = json_data.confidence_score;
    const res_time = json_data.time;
    const res_date = json_data.date;

    // Log extracted data
    console.log('Response:', res_response);
    console.log('Decision Threshold:', res_threshold);
    console.log('Predicted Intent:', res_pred_intent);
    console.log('Confidence Score:', res_confidence);
    console.log('Time:', res_time);
    console.log('Date:', res_date);

    // Update state with response data
    const newMessage = {text: inputText, from: 'user'};
    const serverResponseMessage = {text: res_response, from: 'server'};
    setMessages([...messages, newMessage, serverResponseMessage]);
    setInputText('');
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
      {/* Header */}
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
      />
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
    justifyContent: 'flex-end', // Keep user message position
    alignItems: 'center',
    marginVertical: 5,
    right: 50,
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
    marginRight: 5, // Add space between icon and message text
    marginLeft: 5, // Add space between icon and message text
  },
  robotIcon: {
    marginRight: 5,
    marginLeft: 5,
  },
  backButton: {
    padding: 5,
    marginRight: 30,
  },
});

export default ChatScreen;
