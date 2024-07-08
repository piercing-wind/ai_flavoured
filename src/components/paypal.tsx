'use client'
import React from "react";
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";

import { FUNDING } from "@paypal/react-paypal-js";
import { Toaster } from "./ui/toaster";
import {useToast} from './ui/use-toast'

export const PaypalButton = ({amount = '10'}:{amount ?:string}) => {
   const { toast } = useToast();
  const initialOptions: ReactPayPalScriptOptions = {

    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
    vault: true,
    intent: "subscription",
    environment : 'sandbox',
    
    // Add other options as needed
  };
 const createSubscription :PayPalButtonsComponentProps['createSubscription'] = (data, actions) => {
      return actions.subscription.create({
         plan_id: 'P-46499645GK4268530M2DEU7A',
      });
   }
   const styles: PayPalButtonsComponentProps["style"] = {
      shape: 'rect',
      layout: "vertical",
      'color' : 'blue',
      'height' : 45,
      
  };

const onApprove: PayPalButtonsComponentProps['onApprove'] = async (data) => {
   toast({
      title : 'Subscription Created',
      description : 'You have successfully created subscription ' + data.subscriptionID,
   })
   console.log(data)
   alert('You have successfully created subscription ' + data.subscriptionID);
}
const onError : PayPalButtonsComponentProps['onError'] = (error) => {
   console.log(error)
}

  return (
   <>
      <Toaster/>
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
         message={{
            // 'amount' : 200,
            'position' : 'top',
            'color' : 'black',
            'align' : 'center',
         }}
         style={styles}
         createSubscription={createSubscription}
         onApprove={onApprove}
         onError={onError}
      />
    </PayPalScriptProvider>
    </>);
};
