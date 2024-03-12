import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const RAQScreen = () => {
  const [questions, setQuestions] = useState([]);

  // Simulasikan pengambilan data dari database lokal
  useEffect(() => {
    const fetchData = async () => {
      const data = await getQuestionsFromDatabase(); // Ganti dengan fungsi Anda sendiri
      setQuestions(data);
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToAnswer(item)}>
      <Text>{item.question}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text>Recent Ask Questions</Text>
      <FlatList
        data={questions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default RAQScreen;
