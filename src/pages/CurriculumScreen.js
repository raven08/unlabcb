// Import statements (unchanged)
import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const CurriculumScreen = ({navigation, route}) => {
  const {jsonData} = route.params;
  const [curriculumData, setCurriculumData] = useState([]);

  // set curriculumData to an empty array on screen focus
  useFocusEffect(
    React.useCallback(() => {
      setCurriculumData([]);
      fetchData(); // Fetch data on screen focus
    }, []),
  );

  const fetchData = () => {
    const apiUrl =
      'http://103.250.10.38/admin/adminchatbot/mobile/viewcurriculum.php';

    const email = jsonData[0].email;

    fetch(`${apiUrl}?email=${email}`)
      .then(response => response.json())
      .then(data => {
        setCurriculumData(data);
      })
      .catch(error => {
        console.error('Error fetching curriculum data:', error);
      });
  };

  const renderTables = () => {
    const semesters = Array.from(
      new Set(curriculumData.map(item => item.semester)),
    );

    return semesters.map((semester, index) => {
      const filteredData = curriculumData.filter(
        item => item.semester === semester,
      );
      const tableHead = ['Code', 'Subject Name', 'Type', 'Pre Requisite'];
      const tableData = filteredData.map(item => [
        item.code,
        `${item.subject_name} (${item.sks})`,
        item.type,
        item.pre_requisite,
      ]);

      return (
        <View key={index}>
          <Text style={styles.semesterHeader}>{`${semester}`}</Text>
          <View style={styles.tableContainer}>
            <Table borderStyle={{borderWidth: 2, borderColor: 'black'}}>
              <Row
                data={tableHead}
                style={styles.head}
                textStyle={styles.text}
              />
              {tableData.map((rowData, rowIndex) => (
                <Row
                  key={rowIndex}
                  data={rowData}
                  style={[
                    styles.row,
                    {
                      backgroundColor: rowIndex % 2 === 1 ? 'white' : 'white',
                    },
                  ]}
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </View>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title2}>View Curriculum</Text>
      <TouchableOpacity
        style={styles.notificationIcon}
        onPress={() => navigation.navigate('HomeScreen', {jsonData})}>
        <Image
          source={require('../assets/icons/backleft.png')}
          style={{...styles.backImage, width: 30, height: 30}}
        />
      </TouchableOpacity>
      <Text style={styles.userProfileEmail}>
        Kurikulum {jsonData[0].curriculum_name}
      </Text>
      <ScrollView>{renderTables()}</ScrollView>
    </View>
  );
};

export default CurriculumScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAF5',
  },
  backImage: {
    width: 24,
    height: 24,
  },
  notificationIcon: {
    position: 'relative',
    right: -10,
    top: -15,
  },
  tableContainer: {
    flex: 1,
    padding: 16,
  },
  userProfileEmail: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#541690',
    marginBottom: -5,
    marginTop: 20,
    marginLeft: 20,
  },
  title2: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#303B3B',
    top: 20,
    borderBottomColor: '#ABABA7',
    borderBottomWidth: 1,
    width: 315,
    textAlign: 'center',
    left: 40,
    paddingBottom: 3,
  },
  semesterHeader: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    marginBottom: -5,
    marginTop: 20,
    marginLeft: 20,
  },
  head: {height: 55, backgroundColor: '#FFCD38', },
  text: {margin: 6, color: 'black', fontFamily: 'Poppins-Bold', fontSize: 10},
  row: {flexDirection: 'row'},
});
