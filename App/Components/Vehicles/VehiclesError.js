import React from 'react';
import { Text, View } from 'react-native';
import I18n from '../../i18n';

export default class VehiclesError extends React.Component {
  render() {
    return (
      <View>
        <Text>{I18n.t('An error has occured. Please try again.')}</Text>
      </View>
    );
  }
}
