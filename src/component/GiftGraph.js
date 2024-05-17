import { LineChart } from 'react-native-gifted-charts';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { GlobalStyles } from '@helpers';
import { coinImage } from '@common';
const ChartGraph = ({ data, maxValue }) => {
  return (
    data?.length > 0 && (
      <View
        style={{
          paddingVertical: 30,
          paddingLeft: 20,
          backgroundColor: '#1C1C1C',
        }}>
        <LineChart
          focusEnabled
          isAnimated
          curved
          areaChart
          height={250}
          data={data}
          hideDataPoints
          spacing={8}
          color="#00ff83"
          thickness={2}
          startFillColor="rgba(20,105,81,0.3)"
          endFillColor="rgba(20,85,81,0.01)"
          startOpacity={0.9}
          endOpacity={0.2}
          initialSpacing={0}
          noOfSections={6}
          maxValue={maxValue}
          yAxisColor="white"
          yAxisThickness={0}
          rulesType="solid"
          rulesColor="gray"
          yAxisTextStyle={{ color: 'gray' }}
          yAxisSide="right"
          xAxisColor="lightgray"
          pointerConfig={{
            pointerStripHeight: 220,
            pointerStripColor: 'lightgray',
            pointerColor: 'lightgray',
            pointerLabelComponent: items => {
              return (
                <View
                  style={{
                    height: 90,
                    width: 100,
                    justifyContent: 'center',
                    marginTop: -30,
                    marginLeft: -40,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      marginBottom: 6,
                      textAlign: 'center',
                    }}>
                    {items[0].date}
                  </Text>

                  <View
                    style={{
                      paddingHorizontal: 14,
                      paddingVertical: 6,
                      borderRadius: 16,
                      backgroundColor: 'white',
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={coinImage}
                      style={[GlobalStyles.coinImage]}
                    />
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                      {'$' + items[0].value}
                    </Text>
                  </View>
                </View>
              );
            },
          }}
        />
      </View>
    )
  );
};

export default ChartGraph;
