import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import I18n from '../../i18n';

export default class VehiclesLoading extends React.Component {
  render() {
    return (
      <View>
        <Text>{I18n.t('Loading')}</Text>
        <ActivityIndicator animating={true} />
      </View>
    );
  }
}
