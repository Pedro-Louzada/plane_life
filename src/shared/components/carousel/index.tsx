/* eslint-disable react/react-in-jsx-scope */
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {IDetailUser} from '../../interfaces/IDetailUser';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {
  IDataUserContextProviderValues,
  useDataUser,
} from '../../context/ContextDataUser';
import {AxiosError, AxiosResponse} from 'axios';
import IDataUser from '../../interfaces/IDataUser';
import axiosInstance from '../../../shared/config_axios';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {useRef, useState} from 'react';
import Paginator from './Paginator';

interface ICarouselProps {
  data: IDetailUser[];
}

const HandlePassedNextPage = async (
  {tipo}: IDetailUser,
  {dataUser, setDataUser}: IDataUserContextProviderValues,
) => {
  setDataUser({...dataUser, type_profile: tipo});
  console.log(dataUser);
  const id = dataUser.id;

  try {
    const response: AxiosResponse<IDataUser> = await axiosInstance.put(
      `/users/update-type-profile/${id}`,
      {type_profile: tipo},
    );
    console.log(response);
    let status = response.status;

    if (status === 202) {
      console.log(dataUser);
      return true;
    } else {
      console.log(response);
      return false;
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log('passou aqui');
      // O servidor respondeu com um código de status diferente de 2xx
      console.error(error.response?.data);
    }
    console.log(error);
    return false;
  }
};

function CardCarouselItem({id, tipo, descricao}: IDetailUser) {
  const {dataUser, setDataUser} = useDataUser();
  const navigation = useNavigation();
  let first = tipo.split(' ')[0][0].toUpperCase();
  let sign = `${first}`;

  return (
    <View key={id} style={estilos.viewMainCard}>
      <View style={estilos.cardView}>
        <View>
          <View style={estilos.sign}>
            <Text style={estilos.textSign}>{sign}</Text>
          </View>
          <View>
            <Text style={estilos.typeTitle}>{tipo}</Text>
            <Text style={estilos.descriptionTitle}>{descricao}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={estilos.choicePerfil}
          onPress={async () => {
            const updateUser = await HandlePassedNextPage(
              {
                tipo,
                id,
                descricao,
              },
              {dataUser, setDataUser},
            );
            if (updateUser) {
              navigation.navigate('TelaHome' as never);
            } else {
              Snackbar.show({text: 'Erro ao selecionar o perfil'});
            }
          }}>
          <Text style={estilos.textButton}>Selecionar perfil</Text>
          <MaterialIcons name="arrow-forward-ios" style={estilos.arrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CarouselCard({data}: ICarouselProps) {
  const [, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({viewableItems}: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  return (
    <View style={estilos.container}>
      <FlatList
        data={data}
        renderItem={({item}) => <CardCarouselItem {...item} />}
        keyExtractor={item => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
      <Paginator data={data} scrollX={scrollX} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewMainCard: {
    width: Dimensions.get('window').width * 0.8,
    marginTop: 30,
    marginHorizontal: 30,
    paddingHorizontal: 20,
    height: 365,
    borderRadius: 30,
    backgroundColor: '#FFF',
    elevation: 4,
  },
  sign: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#1534FF',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  textSign: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1534FF',
  },
  typeTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#1534FF',
  },
  descriptionTitle: {
    color: '#3A3A3A',
    fontSize: 14,
    lineHeight: 20,
  },
  cardView: {
    flex: 1,
    justifyContent: 'space-around',
  },
  choicePerfil: {
    backgroundColor: '#1937FE',
    borderRadius: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  textButton: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 20,
    color: '#FFF',
  },
});

export default CarouselCard;
