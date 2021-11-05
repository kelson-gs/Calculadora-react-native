import React, {useState} from 'react';
import { StyleSheet, Text, TextInput,View, SafeAreaView, TouchableHighlight } from 'react-native';
import Display from './componentes/Display';
import Btn from './componentes/botao';

let estados ={
  valorTela: '',
  resultado:0,
  operado: false,
  ponto: false
}

export default function App() {

  const [vtela, setVtela] = useState(estados.valorTela);
  const [vres, setVres] = useState(estados.resultado);

  const addDigito=(digito)=>{
    if(digito == '+' || digito == '/' || digito == '*'){
      estados.ponto = false
    }

    if(digito == '.' && !estados.ponto){
      estados.ponto=true;
      estados.operado=false;
    }else if(digito == '.' && estados.ponto){
        return
      
    }
    if((digito == '+' || digito == '/' || digito == '*') && estados.operado){
      estados.valorTela = estados.resultado;
      estados.resultado = 0
    }

    estados.valorTela = estados.valorTela+digito
    setVtela(estados.valorTela)
    setVres(estados.resultado)
    estados.operado = false


  }

  const limparTela=()=>{
    estados ={
      valorTela: '',
      resultado:0,
      operado: false,
      ponto: false
    }
    setVtela(estados.valorTela)
    setVres(estados.resultado)
  }

  const opera=(digito)=>{
    if(digito == 'AC'){
      limparTela()
      return
    }

    if(digito == 'BS'){
      estados.valorTela = vtela.substring(0, (vtela.length-1))
      setVtela(estados.valorTela);
      return
    }

    if(digito == '='){
      try{
        estados.resultado=eval(estados.valorTela);
        estados.operado = true;
        setVres(estados.resultado);
        return
      }catch{
        estados.resultado='Erro';
        estados.operado = true;
        setVres(estados.resultado);
        return
      }
    }
  }

  return (
    <SafeAreaView style={estilos.conteiner}>
      <Text>Calculadora</Text>
      <Display valor={vtela} res={vres} />

      <View style={estilos.botoes}>
        <Btn label="AC" ac aoClicar={()=>{opera('AC')}}/>
        <Btn label="(" aoClicar={()=>{addDigito('(')}}/>
        <Btn label=")" aoClicar={()=>{addDigito(')')}}/>
        <Btn label="/" operacao aoClicar={()=>{addDigito('/')}}/>
        <Btn label="7" aoClicar={()=>{addDigito('7')}}/>
        <Btn label="8" aoClicar={()=>{addDigito('8')}}/>
        <Btn label="9" aoClicar={()=>{addDigito('9')}}/>
        <Btn label="*" operacao aoClicar={()=>{addDigito('*')}}/>
        <Btn label="4" aoClicar={()=>{addDigito('4')}}/>
        <Btn label="5" aoClicar={()=>{addDigito('5')}}/>
        <Btn label="6" aoClicar={()=>{addDigito('6')}}/>
        <Btn label="-" operacao aoClicar={()=>{addDigito('-')}}/>
        <Btn label="1" aoClicar={()=>{addDigito('1')}}/>
        <Btn label="2" aoClicar={()=>{addDigito('2')}}/>
        <Btn label="3" aoClicar={()=>{addDigito('3')}}/>
        <Btn label="+" operacao aoClicar={()=>{addDigito('+')}}/>
        <Btn label="0"  aoClicar={()=>{addDigito('0')}}/>
        <Btn label="." aoClicar={()=>{addDigito('.')}}/>
        <Btn label="<-" bs aoClicar={()=>{opera('BS')}}/>
        <Btn label="=" igual aoClicar={()=>{opera('=')}}/>
      </View>

    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  conteiner:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  botoes:{
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
