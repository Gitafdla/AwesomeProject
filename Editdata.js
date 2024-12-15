import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, Button, StyleSheet, Text, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faChargingStation } from '@fortawesome/free-solid-svg-icons';

const Createdata = () => {
    const jsonUrl = 'http://10.0.2.2:3000/spklu'; // API yang digunakan emulator untuk akses localhost komputer
    const [nama, setNama] = useState('');
    const [jenis_kendaraan, setJenisKendaraan] = useState('');
    const [plat_nomor, setPlatNomor] = useState('');
    const [merk, setMerk] = useState('');
    const [voltase, setVoltase] = useState('');
    const [pengisian, setPengisian] = useState('');

    const [selectedUser, setSelectedUser] = useState({}); // Simpan data dari fitur edit
    const [isLoading, setLoading] = useState(true);
    const [dataUser, setDataUser] = useState([]); // Data pengguna yang telah diambil dari API

    const [refresh, setRefresh] = useState(false);

    // Ambil Data
    useEffect(() => {
        fetch(jsonUrl) // Ambil data dari JsonUrl
            .then((response) => response.json()) // Respon dikonversi menjadi format Json
            .then((json) => {
                console.log(json); // Cetak data ke konsol untuk Debugging
                setDataUser(json); // Simpan data ke DataUser
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    function refreshPage() {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setDataUser(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    const selectItem = (item) => {  // Menangani pemilihan item
        setSelectedUser(item);  // Memperbarui beberapa state menggunakan fungsi setter dari useState.
        setNama(item.nama);
        setJenisKendaraan(item.jenis_kendaraan);
        setPlatNomor(item.plat_nomor);
        setMerk(item.merk);
        setVoltase(item.voltase);  
        setPengisian(item.pengisian);  
    }
    
    const submit = () => {
        const data = {
            nama: nama,
            jenis_kendaraan: jenis_kendaraan,
            plat_nomor: plat_nomor,
            merk: merk,
            voltase: voltase,
            pengisian: pengisian,
        };
        fetch(`http://10.0.2.2:3000/spklu/${selectedUser.id}`, {
            method: 'PATCH', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              alert('Data tersimpan');
              setNama('');
              setJenisKendaraan('');
              setPlatNomor('');
              setMerk('');
              setVoltase('');
              setPengisian('');
              refreshPage();
            })       
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <SafeAreaView style={{ flex: 1 }}>
                {isLoading ? (
                    <Text>Loading...</Text>
                ) : (
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>Edit History</Text>
                        <View style={styles.form}>
                            <TextInput style={styles.input} placeholder="Nama" value={nama} onChangeText={(value) => setNama(value)} />
                            <TextInput style={styles.input} placeholder="Jenis Kendaraan" value={jenis_kendaraan} onChangeText={(value) => setJenisKendaraan(value)} />
                            <TextInput style={styles.input} placeholder="Plat Nomor" value={plat_nomor} onChangeText={(value) => setPlatNomor(value)} />
                            <TextInput style={styles.input} placeholder="Merk" value={merk} onChangeText={(value) => setMerk(value)} />
                            <TextInput style={styles.input} placeholder="Voltase" value={voltase} onChangeText={(value) => setVoltase(value)} />
                            <TextInput style={styles.input} placeholder="Tanggal Pengisian" value={pengisian} onChangeText={(value) => setPengisian(value)} />
                            <Button title="Save" style={styles.button} onPress={submit} />
                        </View>
                        <FlatList
                            style={{ marginBottom: 10 }}
                            data={dataUser}
                            onRefresh={refreshPage}
                            refreshing={refresh}
                            keyExtractor={({ id }) => id}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => selectItem(item)}>
                                    <View style={styles.card}>
                                        <View style={styles.avatar}>
                                             <FontAwesomeIcon icon={faChargingStation} size={50} color="#1E90FF" />
                                        </View>
                                        <View style={styles.cardContent}>
                                            <View style={styles.cardRow}>
                                                <Text style={styles.cardtitle}>Nama:</Text>
                                                <Text>{item.nama}</Text>
                                            </View>
                                            <View style={styles.cardRow}>
                                                <Text style={styles.cardtitle}>Jenis Kendaraan:</Text>
                                                <Text>{item.jenis_kendaraan}</Text>
                                            </View>
                                            <View style={styles.cardRow}>
                                                <Text style={styles.cardtitle}>Plat:</Text>
                                                <Text>{item.plat_nomor}</Text>
                                            </View>
                                            <View style={styles.cardRow}>
                                                <Text style={styles.cardtitle}>Merk:</Text>
                                                <Text>{item.merk}</Text>
                                            </View>
                                            <View style={styles.cardRow}>
                                                <Text style={styles.cardtitle}>Voltase:</Text>
                                                <Text>{item.voltase}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                            <FontAwesomeIcon icon={faPenToSquare} size={20} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    title: {
        paddingVertical: 12,
        backgroundColor: '#ADD8E6',
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    form: {
        padding: 10,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#1E90FF',
        borderRadius: 8,
        padding: 5,
        width: '100%',
        marginVertical: 5,
    },
    button: {
        marginVertical: 10,
    },
    avatar: {
        borderRadius: 100,
        width: 80,
    },
    cardtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 5,
    },
    card: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#ADD8E6',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginHorizontal: 20,
        marginVertical: 7,
    },
    cardContent: {
        flex: 1,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
});

export default Createdata;



//2222222222222222222222222
// import React, {useState, useEffect} from 'react'
// import { SafeAreaView, View, TextInput, Button, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
// import { ScrollView } from 'react-native-virtualized-view';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faPenToSquare, faChargingStation } from '@fortawesome/free-solid-svg-icons';
// import { Platform } from 'react-native';



// const Createdata = () => {
//     const jsonUrl = 'http://10.0.2.2:3000/spklu'; //API yg digunakan emulator untuk akses localhost komputer
//     const [nama, setNama] = useState('');
//     const [jenis_kendaraan, setJenisKendaraan] = useState('');
//     const [plat_nomor, setPlatNomor] = useState('');
//     const [merk, setMerk] = useState('');
//     const [voltase, setVoltase] = useState('');
//     const [pengisian, setPengisian] = useState('');

//     const [selectedUser, setSelectedUser] = useState({}); //Simpan data dari fitur edit
//     const [isLoading, setLoading] = useState(true);
//     const [dataUser, setDataUser] = useState({}); //data pengguna yang telah diambil dari API.

//     const [refresh, setRefresh] = useState(false);
  

//     //Ambil Data
//     useEffect(() => {
//       fetch(jsonUrl) //Ambil data dari JsonUrl
//         .then((response) => response.json()) //Respon dikonversi menjadi format Json
//         .then((json) => {
//           console.log(json) //Cetak data ke konsol untuk Debugging
//           setDataUser(json) //Simpan data ke DataUser
//         })
//         .catch((error) => console.error(error))
//         .finally(() => setLoading(false));
//     }, []);

//     function refreshPage() {
//       fetch(jsonUrl)
//         .then((response) => response.json())
//         .then((json) => {
//           console.log(json)
//           setDataUser(json)
//         })
//         .catch((error) => console.error(error))
//         .finally(() => setLoading(false));
//     }

//     const selectItem = (item) => {  //Menangani pemilihan item
//         setSelectedUser(item);  //memperbarui beberapa state menggunakan fungsi setter dari useState.
//         setNama(item.nama);
//         setJenisKendaraan(item.jenis_kendaraan);
//         setPlatNomor(item.plat_nomor);
//         setMerk(item.merk);
//         setVoltase(item.voltase);  
//         setPengisian(item.pengisian);  
//     }
    
//     const submit = () => {
//         const data = {
//             nama: nama,
//             jenis_kendaraan: jenis_kendaraan,
//             plat_nomor: plat_nomor,
//             merk: merk,
//             voltase: voltase,
//             pengisian: pengisian,
//         };
//         fetch(`http://10.0.2.2:3000/spklu/${selectedUser.id}`, {
//             method: 'PATCH', 
//             headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//           })
//             .then((response) => response.json())
//             .then((json) => {
//               console.log(json);
//               alert('Data tersimpan');
//               setNama('');
//               setJenisKendaraan('');
//               setPlatNomor('');
//               setMerk('');
//               setVoltase('');
//               setPengisian('');
//               refreshPage();
//               FlatList.refresh();
//             })       
//     }

//     return (
//         <SafeAreaView>
//             <View>
//                 {isLoading ? (
//                         <Text >Loading...</Text>
//                 ) : (
//                     <ScrollView style={styles.form} >
//                         <View>
//                             <View>
//                                 <Text style={styles.title}>Edit History</Text>
//                                 <View style={styles.form}>
//                                     <TextInput style={ styles.input } placeholder="Nama" value={nama} onChangeText={(value) => setNama(value)} />
//                                             <TextInput style={ styles.input } placeholder="Jenis Kendaraan" value={jenis_kendaraan} onChangeText={(value) => setJenisKendaraan(value)}/>
//                                             <TextInput style={ styles.input } placeholder="Plat Nomor" value={plat_nomor} onChangeText={(value) => setPlatNomor(value)} />
//                                             <TextInput style={ styles.input } placeholder="Merk" value={merk} onChangeText={(value) => setMerk(value)} />
//                                             <TextInput style={ styles.input } placeholder="Voltase" value={voltase} onChangeText={(value) => setVoltase(value)} />
//                                             <TextInput style={ styles.input } placeholder="Tanggal Pengisian" value={pengisian} onChangeText={(value) => setPengisian(value)} />
//                                             <Button title="Simpan" style={styles.button} onPress={submit} />
//                                 </View>

//                             </View>
//                             <View style={styles.devider}></View>
                        
//                             <FlatList
//                                 style={{ marginBottom: 10 }}
//                                 data={dataUser}
//                                 onRefresh={() => { refreshPage() }}
//                                 refreshing={refresh}
//                                 keyExtractor={({ id }, index) => id}
//                                 renderItem={({ item }) => (

//                                     <View>
//                                         <TouchableOpacity onPress={() => selectItem(item)}>
//                                             <View style={styles.card}>
//                                                 <View style={styles.avatar}>
//                                                     <FontAwesomeIcon icon={faChargingStation} size={50} />
//                                                 </View>

//                                                 <View>
//                                                                       <Text style={styles.cardtitle}>Nama:</Text>
//                                                                       <Text>{item.nama}</Text>
                                                
//                                                                        <Text style={styles.cardtitle}>Jenis Kendaraan:</Text>
//                                                                       <Text>{item.jenis_kendaraan}</Text>
                                                
//                                                                       <Text style={styles.cardtitle}>Plat:</Text>
//                                                                       <Text>{item.plat_nomor}</Text>
                                                
//                                                                       <Text style={styles.cardtitle}>Merk:</Text>
//                                                                       <Text>{item.merk}</Text>
                                                
//                                                                       <Text style={styles.cardtitle}>Voltase:</Text>
//                                                                       <Text>{item.voltase}</Text>
//                                                                     </View>
                                                
//                                                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
//                                                     <FontAwesomeIcon icon={faPenToSquare} size={20} />
//                                                 </View>
//                                             </View>
//                                         </TouchableOpacity>
//                                     </View>
//                                 )}
//                             />
                        
//                         </View>
//                     </ScrollView>    
//                 )}
//             </View>
//         </SafeAreaView>
//     )
// }

// export default Createdata

// const styles = StyleSheet.create({
//     title: {
//         paddingVertical: 12,
//         backgroundColor: '#ADD8E6',
//         color: 'black',
//         fontSize: 20,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     form: {
//         padding: 10,
//         marginBottom: 20,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#1E90FF',
//         borderRadius: 8,
//         padding: 8,
//         width: '100%',
//         marginVertical: 5,
//     },
//     button: {
//         marginVertical: 10,
//     },
//     avatar: {
//         borderRadius: 100,
//         width: 80,
//       },
//       cardtitle: {
//         fontSize: 14,
//         fontWeight: 'bold',
//       },
//       card: {
//         flexDirection: 'row',
//         padding: 20,
//         borderRadius: 10,
//         backgroundColor: 'white', // Latar belakang tetap putih
//         borderWidth: 2, // Menambahkan border dengan lebar 2
//         borderColor: '#ADD8E6', // Warna border biru muda
//         shadowColor: '#000',
//         shadowOffset: {
//           width: 1,
//           height: 1,
//         },
//         shadowOpacity: 0.20,
//         shadowRadius: 1.41,
//         elevation: 2,
//         marginHorizontal: 20,
//         marginVertical: 7,
//     },
// })





//333333333333333333

// const Createdata = () => {
//     const jsonUrl = 'http://10.0.2.2:3000/mahasiswa'; //API untuk mengakses localhost komputer
// const [first_name, setFirstName] = useState('');
// const [last_name, setLastName] = useState('');
// const [kelas, setKelas] = useState('');
// const [gender, setGender] = useState('');
// const [email, setEmail] = useState('');
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

// const submit = () => {
//     const data = {
//       first_name: first_name,
//       last_name: last_name,
//       email: email,
//       kelas: kelas,
//       gender: gender,
//     };

//    fetch(`http://10.0.2.2:3000/mahasiswa/${selectedUser.id}`, {
//      method: 'PATCH',
//      headers: {
//        'Accept': 'application/json',
//        'Content-Type': 'application/json'
//      },
//      body: JSON.stringify(data)
//    })
//      .then((response) => response.json())
//      .then((json) => {
//        console.log(json);
//        alert('Data tersimpan');
//        setFirstName('');
//        setLastName('');
//        setKelas('');
//        setGender('');
//        setEmail('');
//        refreshPage();
//        FlatList.refresh();
//      })

    
//    .then((response) => response.json())
//    .then((json) => {
//      console.log(json);
//      alert('Data tersimpan');
//      setFirstName('');
//      setLastName('');
//      setEmail('');
//      setKelas('');
//      setGender('');
//    })
//  }

//  const [selectedUser, setSelectedUser] = useState({});

//  const selectItem = (item) => {
//    setSelectedUser(item);
//    setFirstName(item.first_name);
//    setLastName(item.last_name);
//    setKelas(item.kelas);
//    setGender(item.gender);
//    setEmail(item.email);
//  }


// return (
//     <SafeAreaView>
//     <View>
//       {isLoading ? (
//         <View style={{ alignItems: 'center', marginTop: 20 }}>
//           <Text style={styles.cardtitle}>Loading...</Text>
//         </View>
//       ) : (
//         <View>
          
//           <View>
//             <Text style={styles.title}>Edit Data Mahasiswa</Text>
//             <View style={styles.form}>
//               <TextInput style={ styles.input } placeholder="Nama Depan" value={first_name} onChangeText={(value) => setFirstName(value)} />
//               <TextInput style={ styles.input } placeholder="Nama Belakang" value={last_name} onChangeText={(value) => setLastName(value)} />
//               <TextInput style={ styles.input } placeholder="Kelas" value={kelas} onChangeText={(value) => setKelas(value)} />
//               <TextInput style={ styles.input } placeholder="Jenis Kelamin" value={gender} onChangeText={(value) => setGender(value)} />
//               <TextInput style={ styles.input } placeholder="Email" value={email} onChangeText={(value) => setEmail(value)} />
//               <Button title="Edit" style={styles.button} onPress={submit} />
//             </View>
//           </View>
//           <View style={styles.devider}></View>
//           <ScrollView>
//           <FlatList
//              style={{ marginBottom: 10 }}
//              data={dataUser}
//              onRefresh={() => { refreshPage() }}
//              refreshing={refresh}
//              keyExtractor={({ id }, index) => id}
//              renderItem={({ item }) => (
//                <View>
//                  <TouchableOpacity onPress={() => selectItem(item)}>
//                    <View style={styles.card}>
//                      <View style={styles.avatar}>
//                        <FontAwesomeIcon icon={faGraduationCap} size={50} />
//                      </View>
//                      <View>
//                        <Text style={styles.cardtitle}>{item.first_name} {item.first_name}</Text>
//                        <Text>{item.kelas}</Text>
//                        <Text>{item.gender}</Text>
//                      </View>
//                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
//                        <FontAwesomeIcon icon={faPenToSquare} size={20} />
//                      </View>
//                    </View>
//                  </TouchableOpacity>
//                </View>
//              )}
//            />
//            </ScrollView>
//          </View>
//        )}
//      </View>
//    </SafeAreaView>
// )}

// export default Createdata

// const styles = StyleSheet.create({
//     title: {
//       paddingVertical: 12,
//       backgroundColor: '#333',
//       color: 'white',
//       fontSize: 20,
//       fontWeight: 'bold',
//       textAlign: 'center',
//     },
//     form: {
//       padding: 10,
//       marginBottom: 100,
//     },

//     input: {
//         borderWidth: 1,
//         borderColor: '#777',
//         borderRadius: 8,
//         padding: 8,
//         width: '100%',
//         marginVertical: 5,
//       },
//       button: {
//         marginVertical: 10,
//       }
//      })
     