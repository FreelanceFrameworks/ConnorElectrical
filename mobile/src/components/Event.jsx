// BookingScreen.jsx
import React, {useState, useEffect} from 'react';
import {View, Text, Button, TextInput, Alert, ScrollView} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useStripe } from '@stripe/stripe-react-native';

const API_BASE = 'https://your-api.example.com'; // adapt

const servicesCatalog = [
  { id: 's1', name: 'Service A', price_cents: 5000 },
  { id: 's2', name: 'Service B', price_cents: 3000 },
  { id: 's3', name: 'Extra Add-on', price_cents: 1000 },
];

export default function BookingScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [quoteItems, setQuoteItems] = useState([]); // array of service ids
  const { control, handleSubmit } = useForm();
  const stripe = useStripe();

  const toggleItem = (id) => {
    setQuoteItems(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  };

  const totalCents = quoteItems.reduce((s, id) => {
    const svc = servicesCatalog.find(x=>x.id===id);
    return s + (svc ? svc.price_cents : 0);
  }, 0);

  const onSubmit = async (data) => {
    if (!selectedDate) return Alert.alert('Choose a date first');
    try {
      // 1) request payment intent from server
      const resp = await axios.post(`${API_BASE}/create-payment-intent`, {
        amount_cents: totalCents,
        currency: 'aud',
        customer: { name: data.name, email: data.email, phone: data.phone },
        booking: {
          date: selectedDate,
          services: quoteItems
        }
      });
      const { clientSecret } = resp.data;

      // 2) present Stripe PaymentSheet
      const initRes = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Your Business',
      });
      if (initRes.error) throw initRes.error;

      const presentRes = await stripe.presentPaymentSheet();
      if (presentRes.error) {
        Alert.alert('Payment failed', presentRes.error.message);
      } else {
        // Payment will be confirmed server-side via webhook; show provisional success
        Alert.alert('Payment complete', 'You will get confirmation shortly.');
        navigation.navigate('BookingSuccess');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', err?.message || 'Something went wrong');
    }
  };

  return (
    <ScrollView contentContainerStyle={{padding:20}}>
      <Text style={{fontSize:20, marginBottom:10}}>Pick a date</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={selectedDate ? { [selectedDate]: {selected:true} } : {}}
      />
      <Text style={{fontSize:20, marginTop:20}}>Build your quote</Text>
      {servicesCatalog.map(s => (
        <View key={s.id} style={{flexDirection:'row', justifyContent:'space-between', paddingVertical:8}}>
          <Text>{s.name} — ${(s.price_cents/100).toFixed(2)}</Text>
          <Button title={quoteItems.includes(s.id)?'Remove':'Add'} onPress={()=>toggleItem(s.id)} />
        </View>
      ))}
      <Text style={{fontSize:18, marginTop:10}}>Total: ${(totalCents/100).toFixed(2)}</Text>

      <Text style={{fontSize:20, marginTop:20}}>Your details</Text>
      <Controller control={control} name="name" defaultValue="" render={({field:{onChange,value}})=>(
        <TextInput placeholder="Name" value={value} onChangeText={onChange} style={{borderWidth:1, padding:8, marginVertical:6}} />
      )} />
      <Controller control={control} name="email" defaultValue="" render={({field:{onChange,value}})=>(
        <TextInput placeholder="Email" value={value} onChangeText={onChange} keyboardType="email-address" style={{borderWidth:1, padding:8, marginVertical:6}} />
      )} />
      <Controller control={control} name="phone" defaultValue="" render={({field:{onChange,value}})=>(
        <TextInput placeholder="Phone" value={value} onChangeText={onChange} keyboardType="phone-pad" style={{borderWidth:1, padding:8, marginVertical:6}} />
      )} />

      <Button title="Proceed to payment" onPress={handleSubmit(onSubmit)} disabled={totalCents===0} />
    </ScrollView>
  );
}
