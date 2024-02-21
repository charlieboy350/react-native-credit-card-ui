# react-native-credit-card-ui-pkg

Credit card UI module

This is a fully functional and animated credit card form library, and it's ready to use 🚀

![Demo](./assets/demo.gif)
<img src="./assets/img1.png" width="208">
<img src="./assets/img2.png" width="208">


## Support
iOS & Android

## Installation

```sh
npm i react-native-credit-card-ui-pkg
```

## Usage

```js
import ReactNativeCreditCardUi from 'react-native-credit-card-ui-pkg';


// ...
return (
    //...
    // must set minimum height to 350 units
    // onComplete will trigger once the whole card is filled name, card number, cvv number and expiry date  
    <View style={{height:350}}> 
        <ReactNativeCreditCardUi onComplete={ (todo) => {
                    //...
                    todo = {...todo, number: todo.number.replaceAll(" ",'')}
                    console.log(todo);
                    /**
                     * this will be the return of the onComplate callback
                     {
                        number: XXXX XXXX XXXX XXXX [XXX],
                        expirationMonth: month,
                        expirationYear: year,
                        expiryText: month/year,
                        cvv: XXX[X],
                    }
                    */
                    //...
        }} />
    </View>
)
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT © [Naeem ur rehman](https://naeemurrehman.com)

