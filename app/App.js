import React, {useEffect, useState, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
  Text,
  Button,
} from 'react-native';
import io from 'socket.io-client';
import OneSignal from 'react-native-onesignal';

const App = () => {
  const [live, setLive] = useState('teste');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [socket, setSocket] = useState();

  useEffect(() => {
    socket && socket.emit('forceDisconnect');
    setSocket(io.connect(`https://socket-chat-ambitus.herokuapp.com/${live}`));
  }, [live]);

  socket && socket.on('messages', (msg) => setChatMessages(msg));

  function submitChatMessage() {
    socket.emit('send_messages', message);
    setMessage('');
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Button
          onPress={() => setLive('teste')}
          title="Live teste"
          color="#841584"
        />
        <Button
          onPress={() => setLive('games')}
          title="Live games"
          color="#841584"
        />
        <Text style={{textAlign: 'center', fontSize: 25}}>{live}</Text>

        <TextInput
          style={{height: 40, borderWidth: 2}}
          autoCorrect={false}
          onChangeText={setMessage}
          value={message}
          onSubmitEditing={submitChatMessage}
        />

        {chatMessages &&
          chatMessages.map((msg) => <Text key={msg}>{msg}</Text>)}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

export default App;
