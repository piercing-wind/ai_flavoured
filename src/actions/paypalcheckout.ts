
 
 // use the orders api to create an order
 export function createOrder() {
   // create accessToken using your clientID and clientSecret
   // for the full stack example, please see the Standard Integration guide
   // https://developer.paypal.com/docs/multiparty/checkout/standard/integrate/
   const accessToken = process.env.NEXT_PUBLIC_PAYPAL_ACCESS_TOKEN;
   return fetch ("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${accessToken}`,
     },
     body: JSON.stringify({
       "purchase_units": [
         {
           "amount": {
             "currency_code": "USD",
             "value": "100.00"
           },
           "reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b"
         }
       ],
       "intent": "CAPTURE",
       "payment_source": {
         "paypal": {
           "experience_context": {
             "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
             "payment_method_selected": "PAYPAL",
             "brand_name": "EXAMPLE INC",
             "locale": "en-US",
             "landing_page": "LOGIN",
             "shipping_preference": "GET_FROM_FILE",
             "user_action": "PAY_NOW",
             "return_url": "https://example.com/returnUrl",
             "cancel_url": "https://example.com/cancelUrl"
           }
         }
       }
     })
   })
   .then((response) => response.json());
 }
             