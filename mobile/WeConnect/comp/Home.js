import Bubble from './Bubble';

import {io} from 'socket.io/client-dist/socket.io';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Keyboard,
} from 'react-native';
import React from 'react';
import KeyPair from './crypt/KeyPair';
import DerivateKey from './crypt/DerivateKey';
import CryptManager from './crypt/CryptManager';
import SoundComp from "./SoundComp";

export default function Home() {
  const [messages, setMessages] = React.useState([]);
  const scrollRef = React.useRef();
  const inputRef = React.useRef();
  const [text, setText] = React.useState('');

  //const [keypair, setKeyPair] = React.useState('');

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <SafeAreaView />
      <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 17}}>
        <TouchableOpacity
          onPress={async () => {
            if (global.socket) {
              global.socket.disconnect();
            }

            global.keyp = await KeyPair.generateKeyPair();

            //console.log(keyp.publicKey);

            /*            let fkp = await KeyPair.generateKeyPair();

                        global.derived = await DerivateKey.generateDerivate(
                          fkp.publicKey,
                          global.keyp.privateKey,
                        );

                        let res = await CryptManager.encrypt("hey", global.derived);

                        console.log(res);*/

            global.socket = io('ws://167.71.129.58:3000');

            global.socket.on('connect', () => {
              console.log('Successfully connected!');
              //global.socket.emit("pub_key", keyp.publicKey);
            });

            global.socket.on('start', () => {
              global.socket.emit('pub_key', global.keyp.publicKey);
            });

            global.socket.on('key', async otherPub => {
              //global.socket.emit("pub_key", keyp.publicKey);
              console.log('YEYY');

              global.derived = await DerivateKey.generateDerivate(
                otherPub,
                global.keyp.privateKey,
              );

              console.log(otherPub);
              console.log(global.keyp.privateKey);

              console.log(global.derived);
            });

            global.socket.on('response', async msg => {
              console.log(msg);
              let decrypted = await CryptManager.decrypt(msg, global.derived);
              console.log("decrypted: ", decrypted);
              setMessages(messages => [
                ...messages,
                <Bubble direction={true} content={decrypted} />,
              ]);
            });

            console.log(global.socket);
          }}>
          <Text style={{color: 'white', fontSize: 19, marginLeft: 20}}>
            Back
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <Image
          source={require('../assets/Group.png')}
          style={{width: 80, height: 31}}
        />
        <View style={{flex: 1}} />
        <Text
          style={{color: 'white', fontSize: 19, marginLeft: 20, opacity: 0}}>
          Back
        </Text>
      </View>
      <ScrollView style={{width: '100%'}} ref={scrollRef}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 10,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 200,
              width: 90,
              height: 90,
            }}>
            <Image
              source={require('../assets/carlosmatos.jpg')}
              style={{width: '100%', height: '100%', borderRadius: 200}}
            />
          </View>
          <Text style={{color: 'white', marginLeft: 20, fontSize: 24}}>
            Carlos <Text style={{fontWeight: 'bold'}}>Matos</Text>
          </Text>
        </View>
        {messages}
        <SoundComp></SoundComp>

        <View style={{paddingBottom: 20}} />
      </ScrollView>
      <View
        style={{
          backgroundColor: '#27252D',
          height: 65,
          width: '100%',
          shadowColor: 'black',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{padding: 20}}
          onPress={async () => {
          }}>
          <Image source={require("../assets/mic.png")} style={{width: 11, height: 24}}/>

        </TouchableOpacity>
        <View
          style={{
            margin: 10,
            backgroundColor: 'black',
            height: 45,
            borderRadius: 14,
            flex: 1,
            marginRight: 0,
            marginLeft: 0,
          }}>
          <TextInput
            style={{color: 'white', fontSize: 17, padding: 10, height: '100%'}}
            value={text}
            placeholder={'Signed Message...'}
            onChangeText={value => setText(value)}
            onFocus={() => {
              setTimeout(() => {
                scrollRef.current?.scrollTo({
                  y: 999999,
                  animated: true,
                });
              }, 300);
            }}
          />
        </View>
        <TouchableOpacity
          style={{padding: 20}}
          onPress={async () => {
            if (text !== '') {
              setMessages(messages => [
                ...messages,
                <Bubble direction={false} content={text} />,
              ]);
              global.socket.emit(
                'message',
                await CryptManager.encrypt(text, global.derived),
              );
            }
            setTimeout(() => {
              scrollRef.current?.scrollTo({
                y: 999999,
                animated: true,
              });
            }, 200);
            //Keyboard.dismiss();
            setText('');
          }}>
          <Image source={require("../assets/send.png")} style={{width: 20, height: 24}}/>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0914',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});
