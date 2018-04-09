/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: '0',//当前显示的结果值
      active: '',//运算符号是否是激活状态
      method: '',//存储的运算符号
      oldres: '',//存储的上一个值
      isPreMethod: false,//上一个按键是否是运算符号
    };
  }

  formatFloat(f, digit) {
    var m = Math.pow(10, digit);
    var a = Math.round(f * m, 10) / m;
    console.log(a)
    return a
  }

  numberFloat(number) {

    if (number.toString().length > 11) {
      number = number.toExponential(3)
      number = number.replace('+', '')
      return number
    }
    let num = number.toString()
    num = num.split("").reverse().join("");
    if (num.indexOf('.') > -1) {
      num = num.replace(/(\d+\.)(\d{3})/g, "$1$2,");
    } else {
      num = num.replace(/(\d{3})/g, "$1,");
    }
    num = num.split("").reverse().join("");
    if (num.indexOf(',') == 0) {
      num = num.replace(/,/, '')
    }
    // num = num.replace('/,\./','.');
    return num;
  }

  press(val, type) {

    if (val == 'ac') { //清空（AC）
      this.setState({
        res: 0,
        active: '',
      })

    } else if (/\d/.test(val) || val == '.') { //数字(1234567890.)

      if (this.state.isPreMethod) {//如果上一个按键是运算符号就把res值重置
        this.setState({
          res: val,
          active: '',
        }, () => {
          this.setState({
            isPreMethod: false
          })
        })
      } else {

        if (this.state.res.toString().length >= 10) {
          return
        }

        let value = this.state.res + '' + val
        if (/^0\d/.test(value)) {
          value = Number(value)
        }

        this.setState({
          res: value,
          active: '',
        })
      }

    } else if (val) { //运算符号 ( + - x ÷ +/- % = )

      if (val == '+/-') {
        this.setState({
          res: -this.state.res
        })
      } else if (val == '%') {

        // if(this.state.res.toString().length>=10){
        //   return
        // }
        this.setState({
          res: this.state.res / 100
        })
      } else if (val == '=') { //计算结果

        this.setState({
          isPreMethod: true,
        })

        if (this.state.method == '+') {
          this.setState({
            res: this.formatFloat(Number(this.state.oldres) + Number(this.state.res), 10),
            method: ''
          })
        } else if (this.state.method == '-') {
          this.setState({
            res: this.formatFloat(Number(this.state.oldres) - Number(this.state.res), 10),
            method: ''
          })
        } else if (this.state.method == 'x') {
          this.setState({
            res: this.formatFloat(Number(this.state.oldres) * Number(this.state.res), 10),
            method: ''
          })
        } else if (this.state.method == '÷') {
          this.setState({
            res: this.formatFloat(Number(this.state.oldres) / Number(this.state.res), 10),
            method: ''
          })
        }

      } else {//( + - x ÷)
        this.setState({
          oldres: this.state.res,
          method: val,
          isPreMethod: true,
        })
      }
      this.setState({
        active: val
      })
    }

  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <Text style={[styles.inputText, this.state.res.toString().length > 7 && styles.zoomFontSize]} numberOfLines={1} >
            {
              this.numberFloat(this.state.res)
            }</Text>
        </View>
        <View style={styles.itemView}>
          <View style={styles.keyWrap}>
            <TouchableHighlight onPress={() => { this.press('ac') }} style={[styles.touchBtn, styles.gray]}>
              <Text style={styles.key}>
                AC
            </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.keyWrap}>
            <TouchableHighlight onPress={() => { this.press('+/-') }} style={[styles.touchBtn, styles.gray]}>
              <Text style={styles.key} >
                +/-
            </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.keyWrap}>
            <TouchableHighlight onPress={() => { this.press('%') }} style={[styles.touchBtn, styles.gray]}>
              <Text style={styles.key} >
                %
            </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.keyWrap}>
            <TouchableHighlight onPress={() => { this.press('÷') }} style={styles.touchBtn}>
              <Text style={[styles.key, styles.yellow, this.state.active == '÷' && styles.active]} >
                ÷
            </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.itemView}>
          <View style={styles.keyWrap}>
            <TouchableHighlight onPress={() => { this.press('7') }} style={styles.touchBtn}>
              <Text style={styles.key}>
                7
          </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.keyWrap}>
            <TouchableHighlight onPress={() => { this.press('8') }} style={styles.touchBtn}>
              <Text style={styles.key}>
                8
          </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.keyWrap}>
            <TouchableHighlight onPress={() => { this.press('9') }} style={styles.touchBtn}>
              <Text style={styles.key} >
                9
          </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.keyWrap}>
            <TouchableHighlight onPress={() => { this.press('x') }} style={styles.touchBtn}>
              <Text style={[styles.key, styles.yellow, this.state.active == 'x' && styles.active]} >
                x
          </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.itemView}>
          <View style={styles.keyWrap}>
            <TouchableHighlight onPress={() => { this.press('4') }} style={styles.touchBtn}>
              <Text style={styles.key}>
                4
        </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.keyWrap}>
            <TouchableHighlight onPress={() => { this.press('5') }} style={styles.touchBtn}>
              <Text style={styles.key}>
                5
        </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.keyWrap}>
            <TouchableHighlight onPress={() => { this.press('6') }} style={styles.touchBtn}>
              <Text style={styles.key} >
                6
        </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.keyWrap}>
            <TouchableHighlight onPress={() => { this.press('-') }} style={styles.touchBtn}>
              <Text style={[styles.key, styles.yellow, this.state.active == '-' && styles.active]} >
                -
        </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.itemView}>
          <View style={styles.keyWrap}>
            <TouchableHighlight onPress={() => { this.press('1') }} style={styles.touchBtn}>
              <Text style={styles.key}>
                1
      </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.keyWrap}>
            <TouchableHighlight onPress={() => { this.press('2') }} style={styles.touchBtn}>
              <Text style={styles.key}>
                2
      </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.keyWrap}>
            <TouchableHighlight onPress={() => { this.press('3') }} style={styles.touchBtn}>
              <Text style={styles.key}>
                3
      </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.keyWrap}>
            <TouchableHighlight onPress={() => { this.press('+') }} style={styles.touchBtn}>
              <Text style={[styles.key, styles.yellow, this.state.active == '+' && styles.active]}>
                +
      </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.itemView}>
          <View style={styles.keyWrap1}>
            <TouchableHighlight onPress={() => { this.press('0') }} style={styles.touchBtn1}>
              <Text style={styles.key}>
                0
            </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.keyWrap}>
            <TouchableHighlight onPress={() => { this.press('.') }} style={styles.touchBtn}>
              <Text style={styles.key} >
                .
            </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.keyWrap}>
            <TouchableHighlight onPress={() => { this.press('=') }} style={[styles.touchBtn, styles.yellow]}>
              <Text style={styles.key} >
                =
            </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000',
    justifyContent: 'flex-end',
  },
  input: {
  },
  inputText: {
    color: '#fff',
    fontSize: 60,
    textAlign: 'right',
    paddingRight: 15,
  },
  zoomFontSize: {
    fontSize: 40,
  },
  itemView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  touchBtn: {
    height: 70,
    width: 70,
    backgroundColor: '#333',
    borderRadius: 70,
    overflow: 'hidden',
  },
  touchBtn1: {
    height: 70,
    backgroundColor: '#333',
    borderRadius: 70,
    width: '90%',
  },
  keyWrap: {
    flex: 1,
    alignItems: 'center',
  },
  keyWrap1: {
    flex: 2,
    alignItems: 'center',
  },
  key: {
    fontSize: 30,
    textAlign: 'center',
    color: '#fff',
    lineHeight: 70,
  },
  key1: {
    fontSize: 30,
    textAlign: 'center',
    color: '#fff',
    lineHeight: 70,
  },
  yellow: {
    backgroundColor: '#ff9500',
    height: 70
  },
  active: {
    color: '#ff9500',
    backgroundColor: '#fff',
  },
  gray: {
    backgroundColor: '#a6a6a6',
  }
});
