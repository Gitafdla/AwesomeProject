import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChargingStation, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Listdata = () => {
  const jsonUrl = 'http://10.0.2.2:3000/spklu';
  //10.0.2.2
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => setDataUser(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const refreshPage = () => {
    setRefresh(true);
    fetchData();
    setRefresh(false);
  };

  const deleteData = (id) => {
    fetch(`${jsonUrl}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        Alert.alert('Sukses', 'Data berhasil dihapus');
        fetchData();
      })
      .catch((error) => console.error(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SPKLU History</Text>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#1E90FF" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={dataUser}
          keyExtractor={({ id }) => id.toString()}
          refreshing={refresh}
          onRefresh={refreshPage}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Avatar and Content */}
              <View style={styles.cardHeader}>
                <View style={styles.avatarContainer}>
                  <FontAwesomeIcon icon={faChargingStation} size={30} color="#1E90FF" />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.nama}</Text>
                  <Text style={styles.cardSubtitle}>{item.pengisian}</Text>
                </View>
                {/* Delete Button */}
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() =>
                    Alert.alert('Hapus data', 'Yakin akan menghapus data ini?', [
                      { text: 'Tidak', style: 'cancel' },
                      { text: 'Ya', onPress: () => deleteData(item.id) },
                    ])
                  }
                >
                  <FontAwesomeIcon icon={faTrashAlt} size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Listdata;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  title: {
    backgroundColor: '#ADD8E6',
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
    borderRadius: 40,
    padding: 10,
    backgroundColor: '#E6F2FF',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#FF4C4C',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});





//3333333333333333333333333333333

// import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Alert } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faGraduationCap, faChevronRight } from '@fortawesome/free-solid-svg-icons'

// const Listdata = () => {

// const jsonUrl = 'http://10.0.2.2:3000/mahasiswa';
// const [isLoading, setLoading] = useState(true);
// const [dataUser, setDataUser] = useState({});
// const [refresh, setRefresh] = useState(false);

// useEffect(() => {
//   //useEffect adalah hook React yang menjalankan fungsi efek samping dalam komponen fungsional.
//     fetch(jsonUrl)
//       .then((response) => response.json())
//       .then((json) => {
//         console.log(json)
//         setDataUser(json)
//       })
//       .catch((error) => console.error(error))
//       .finally(() => setLoading(false));
//   }, []);
 
//   function refreshPage() {
//     fetch(jsonUrl)
//       .then((response) => response.json())
//       .then((json) => {
//         console.log(json)
//         setDataUser(json)
//       })
//       .catch((error) => console.error(error))
//       .finally(() => setLoading(false));
//   }

//   function deleteData(id) {
//     fetch(jsonUrl + '/' + id, {
//       method: 'DELETE',
//     })
//       .then((response) => response.json())
//       .then((json) => {
//         console.log(json);
//         alert('Data terhapus');
//         refreshPage();
//       })
//    }
   
//  return (
//     <c>
//  {isLoading ? (
//    <View style={{ alignItems: 'center', marginTop: 20 }}>
//      <Text style={styles.cardtitle}>Loading...</Text>
//    </View>
//  ) : (
//    <View>
//      <FlatList
//        style={{ marginBottom: 0 }}
//        data={dataUser}
//        onRefresh={() => { refreshPage() }}
//        refreshing={refresh}
//        keyExtractor={({ id }, index) => id}
//        renderItem={({ item }) => (
//          <View>

// <TouchableOpacity>
//              <View style={styles.card}>
//                <View style={styles.avatar}>
//                  <FontAwesomeIcon icon={faGraduationCap} size={50} color={item.color} />
//                </View>
//                <View>
//                  <Text style={styles.cardtitle}>{item.first_name} {item.last_name}</Text>
//                  <Text>{item.kelas}</Text>
//                  <Text>{item.gender}</Text>
//                </View>
//                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
//                  <FontAwesomeIcon icon={faChevronRight} size={20} />
//                </View>
//              </View>
//            </TouchableOpacity>

//            <View style={styles.form}>
//             <Button title="Hapus"
//               onPress={() => Alert.alert('Hapus data', 'Yakin akan menghapus data ini?', [
//                 { text: 'Tidak', onPress: () => console.log('button tidak') },
//                 { text: 'Ya', onPress: () => deleteData(item.id) },
//               ])}
//               color={'red'}
//             />
//         </View>

//          </View>
//        )}
//      />
//    </View>
//  )}
// </c>


//  )
// }

// export default Listdata

// const styles = StyleSheet.create({
//     title: {
//       paddingVertical: 12,
//       backgroundColor: '#333',
//       color: 'white',
//       fontSize: 20,
//       fontWeight: 'bold',
//       textAlign: 'center',
//     },
//     avatar: {
//       borderRadius: 100,
//       width: 80,
//     },
//     cardtitle: {
//       fontSize: 14,
//       fontWeight: 'bold',
//     },

//     card: {
//         flexDirection: 'row',
//         padding: 20,
//         borderRadius: 10,
//         backgroundColor: 'white',
//         shadowColor: '#000',
//         shadowOffset: {
//           width: 1,
//           height: 1,
//         },
//         shadowOpacity: 0.20,
//         shadowRadius: 1.41,
//         elevation: 2,
//         marginHorizontal: 20,
//         marginVertical: 7
//       },
//       form: {
//         paddingHorizontal: 20,
//         paddingTop: 5,
//         paddingBottom: 20,
//       },
//      })
     
