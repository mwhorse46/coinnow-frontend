import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, Pressable } from 'react-native';
import { Input } from 'native-base';
import { OtrixContainer } from '../component';
import getApi from '@apis/getApi';
function Withdraw(props) {
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [bkashNumber, setBkashNumber] = useState('');
  const [bkashNumberError, setBkashNumberError] = useState('');
  const [userId, setUserId] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = () => {
    getApi.getData('seller/getSeller', []).then((response) => {
      console.error('response', response);
      if (response.status === 1) {
        setUserId(response.data.id);
        setBalance(response.data.balance);
      }
    });
  };

  const onSubmit = async () => {
    if (!amount || amount == 0) {
      setAmountError('Amount is required');
      return;
    } else {
      setAmountError('');
    }
    if (!bkashNumber) {
      setBkashNumberError('Bkash Number is required');
      return;
    } else {
      setBkashNumberError('');
    }
    if (balance < amount) {
      setAmountError('Insufficient balance');
      return;
    } else {
      setAmountError('');
    }
    if (amount.match(/^[0-9]+$/) == null) {
      setAmountError('Amount must be a number');
      return;
    }

    let postData = new FormData();
    postData.append('user_id', userId);
    postData.append('is_chat', 0);
    postData.append('content', amount);
    postData.append('funds', bkashNumber);
    await getApi.postData('postComment', postData);
    props.navigation.navigate('MainScreen', {
      screen: 'Support',
    });
  };

  return (
    <OtrixContainer
      customStyles={{
        backgroundColor: '#0A0A0A',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 50,
        }}>
        <Text style={{ color: 'white' }}>ACCOUNT BALANCE</Text>
        <Text style={{ color: 'white' }}>{balance}</Text>
        <View style={{ width: '80%', margin: 20 }}>
          <Input
            value={amount}
            onChange={(e) => setAmount(e.nativeEvent.text)}
            placeholder="Withdraw Amount"
            style={{
              color: 'white',
              textAlign: 'center',
              backgroundColor: '#36393E',
            }}
          />
          {amountError ? (
            <Text style={{ color: 'red', marginTop: 5 }}>{amountError}</Text>
          ) : (
            <></>
          )}
          <View style={{ height: 20 }}></View>
          <Input
            value={bkashNumber}
            onChange={(e) => setBkashNumber(e.nativeEvent.text)}
            placeholder="Bkash Number"
            style={{
              color: 'white',
              textAlign: 'center',
              backgroundColor: '#36393E',
            }}
          />
          {bkashNumberError ? (
            <Text style={{ color: 'red', marginTop: 5 }}>
              {bkashNumberError}
            </Text>
          ) : (
            <></>
          )}
          <View style={{ height: 20 }}></View>
          <Pressable onPress={onSubmit}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                backgroundColor: '#000B42',
                padding: 10,
                borderRadius: 10,
              }}>
              Submit
            </Text>
          </Pressable>
        </View>
      </View>
    </OtrixContainer>
  );
}

export default Withdraw;
