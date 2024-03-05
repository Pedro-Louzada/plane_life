import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Modal, Text, Portal} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface ITextInsideModal {
  text: string;
}
function ModalInfo({text}: ITextInsideModal) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={estilos.containerStyle}>
          <Text>{text}</Text>
        </Modal>
      </Portal>
      <AntDesign
        name="infocirlceo"
        onPress={() => setVisible(true)}
        style={estilos.details}
      />
    </>
  );
}

const estilos = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 50,
    borderRadius: 40,
  },
  details: {
    fontSize: 20,
    color: '#1B39FE',
  },
});

export default ModalInfo;
