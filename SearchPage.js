'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';

import ApiUtils from './ApiUtils'


// function urlForQueryAndPage(key, value, pageNumber) {
//     const data = {
//         country: 'uk',
//         pretty: '1',
//         encoding: 'json',
//         listing_type: 'buy',
//         action: 'search_listings',
//         page: pageNumber,
//     };
//     data[key] = value;
//
//     const querystring = Object.keys(data)
//       .map(key => key + '=' + encodeURIComponent(data[key]))
//       .join('&');
//
//     return 'https://api.nestoria.co.uk/api?' + querystring;
//   }

function urlForQueryAndPage(querystring) {
    return 'http://dichvu.khachmuaxe.com/index.php/admincp/api/' + querystring;
  }


export default class SearchPage extends Component<{}> {
    static navigationOptions = {
      title: 'Tìm kiếm người cần mua xe',
    };

    constructor(props) {
        super(props);
        this.state = {
          searchString: 'Honda',
          isLoading: false,
          message: '',
        };

      }

    _onSearchTextChanged = (event) => {
        console.log('_onSearchTextChanged');
        this.setState({ searchString: event.nativeEvent.text });
        console.log('Current: '+this.state.searchString+', Next: '+event.nativeEvent.text);
    };

    _executeQuery = (query) => {
        console.log(query);
        this.setState({ isLoading: true });
        fetch(query)
            .then(ApiUtils.checkStatus)
            .then(response => response.json())
            .then(json => this._handleResponse(json.response))
            .catch(error =>
                this.setState({
                isLoading: false,
                message: 'Something bad happened ' + error
            }));
    };

    _onSearchPressed = () => {
        const query = urlForQueryAndPage(this.state.searchString);
        this._executeQuery(query);
    };


    _handleResponse = (response) => {
        this.setState({ isLoading: false , message: '' });
        // if (response.application_response_code.substr(0, 1) === '1') {
        //     // console.log('Properties found: ' + response.listings.length);
        //     // this.props.navigation.navigate('Results', {listings: response.listings});
        //     // this.props.navigation.navigate('Results', {listings: response});
        // } else {
        //     this.setState({ message: 'Location not recognized; please try again.'});
        // }
        // console.log('Propertiesfound: ' + response.length);
        this.props.navigation.navigate('Results', {listings: response});
    };




    render() {
        const spinner = this.state.isLoading ?
        <ActivityIndicator size='large'/> : null;
        console.log('SearchPage.render');
      return (

        <View style={styles.container}>
            <Text style={styles.description}> Nhập loại xe  </Text>
            <Text style={styles.description}> Hoặc địa điểm </Text>

            <View style={styles.flowRight}>
            <TextInput
                underlineColorAndroid={'transparent'}
                style={styles.searchInput}
                value={this.state.searchString}
                onChange={this._onSearchTextChanged}
                placeholder='Bỏ trống hoặc nhập loại xe hoặc địa điểm '/>
            <Button
                onPress={this._onSearchPressed}
                color='#48BBEC'
                title='Tìm kiếm'
            />
            </View>

            <Image source={require('./Resources/house.png')} style={styles.image}/>
            {spinner}
            <Text style={styles.description}>{this.state.message}</Text>

      </View>


      );
    }
  }


  const styles = StyleSheet.create({
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
      },
      searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
      },
      description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
      },
      container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
      },
      image: {
        width: 217,
        height: 138,
      },
  });
