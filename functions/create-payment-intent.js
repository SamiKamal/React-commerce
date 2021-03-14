require("dotenv").config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET)

const calculateOrderAmount = items => {
    let totals = 0
    items.forEach(item => {
        totals += item.price * item.quantity
  
      })
    return totals + 522;
  };
  

exports.handler = async function (event, context) {
    if (event.body){
        const {itemsInCart, total} = JSON.parse(event.body)
        console.log(itemsInCart);

        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculateOrderAmount(itemsInCart),
                currency: 'usd'
            })

            return {
                statusCode: 200,
                body: JSON.stringify({clientSecret: paymentIntent.client_secret})
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({msg: error.message})
            }
        }

    } else {
        return {
            statusCode: 200,
            body: 'Create payment Intent'
        }
    }
}