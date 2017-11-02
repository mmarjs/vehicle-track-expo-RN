import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAddress } from '../../Services/Orca/Lib/Vehicles';


export default class VehicleStopRow extends React.Component {
  render() {
    const event = this.props.event;
    // console.log(event);
    let eventIcon = '';
    if (event.EventTypeDescription === 'KEY_ON') {
      eventIcon = (<Icon name="play-circle-o" size={30} color="#00ff00" />);
    } else {
      eventIcon = (<Icon name="stop-circle-o" size={30} color="#ff0000" />);
    }

    const address = getAddress(event);

    return (
      <View>
        {eventIcon}
        <Text>{event.GpsDatetime}</Text>
        <Text>{address}</Text>
      </View>
    );
  }
}
