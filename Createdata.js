import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const Createdata = () => {
  const jsonUrl = 'http://10.0.2.2:3000/spklu'; // API untuk mengakses localhost komputer
  const [nama, setNama] = useState('');
  const [jenis_kendaraan, setJenisKendaraan] = useState('');
  const [plat_nomor, setPlatNomor] = useState('');
  const [merk, setMerk] = useState('');
  const [voltase, setVoltase] = useState('');
  const [pengisian, setPengisian] = useState('');

  const submit = () => {
    const data = {
      nama: nama,
      jenis_kendaraan: jenis_kendaraan,
      plat_nomor: plat_nomor,
      merk: merk,
      voltase: voltase,
      pengisian: pengisian,
    };
    fetch('http://10.0.2.2:3000/spklu', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title} >Recharge Vehicle</Text>
        <ScrollView style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nama"
            placeholderTextColor="#999"
            value={nama}
            onChangeText={(value) => setNama(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Jenis Kendaraan"
            placeholderTextColor="#999"
            value={jenis_kendaraan}
            onChangeText={(value) => setJenisKendaraan(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Plat Nomor"
            placeholderTextColor="#999"
            value={plat_nomor}
            onChangeText={(value) => setPlatNomor(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Merk"
            placeholderTextColor="#999"
            value={merk}
            onChangeText={(value) => setMerk(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Voltase"
            placeholderTextColor="#999"
            value={voltase}
            onChangeText={(value) => setVoltase(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Tanggal Pengisian"
            placeholderTextColor="#999"
            value={pengisian}
            onChangeText={(value) => setPengisian(value)}
          />
          
          {/* Redesigned "Save" button with smaller size */}
          <TouchableOpacity style={styles.button} onPress={submit}>
            <FontAwesomeIcon icon={faSave} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Createdata;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF6FF',
  },
  title: {
    paddingVertical: 12,
    backgroundColor: '#ADD8E6',
    fontFamily: 'monospace',
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 8,
    margin: 10,
  },
  form: {
    padding: 10,
    marginHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#1E90FF',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 8,
    fontSize: 16,
  },
  // Smaller button style
  button: {
    backgroundColor: '#2575fc', // Solid blue color
    paddingVertical: 10,  // Padding for button height
    paddingHorizontal: 30, // Padding for button width
    borderRadius: 50, // Circular shape for button
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15, // Adjusted margin
    elevation: 5, // Shadow effect for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, // Less intense shadow
    shadowRadius: 5,
    transform: [{ scale: 1.05 }], // Slight scale-up effect
  },
  
  buttonIcon: {
    color: '#fff',
    marginRight: 8, // Slightly reduced space between icon and text
    fontSize: 18, // Smaller icon size
  },
  buttonText: {
    color: '#fff',
    fontSize: 16, // Reduced font size for a smaller button
    fontWeight: 'bold',
  },
});
