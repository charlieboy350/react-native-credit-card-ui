import { useCallback, useRef, useState } from "react";
import { Animated, Dimensions } from "react-native";
import useRotationHook from "./useRotationHook";
var creditcardutils = require('creditcardutils');


const useSingleModuleHook = (props) => {
    const [cardType, setCardType] = useState();
    
    const [cardNumber, setCardNumber] = useState();
    const [cardHolder, setCardHolder] = useState();
    const [cardExpiry, setCardExpiry] = useState();
    const [cardCvc, setCardCvc] = useState();


    const inputCardNumberRef = useRef();
    const inputCardExpiryRef = useRef();
    const inputCardCvcRef = useRef();

    const [flip, setFlip] = useState(0);

    const rotateInterpolationFrontFace = useRotationHook({
        initialDeg: "-0deg",
        finalDeg: "-180deg"
    });
    const rotateInterpolatioBackFace = useRotationHook({
        initialDeg: "180deg",
        finalDeg: "0deg"
    });

    const rotateInterpolationFrontFaceStyle = { transform: [
        {perspective: Dimensions.get("window").width*2}, 
        { rotateY: rotateInterpolationFrontFace.rotateInterpolation }, 
    ]};

    const rotateInterpolationBackFaceStyle = { transform: [ 
        {perspective: Dimensions.get("window").width*2},
        { rotateY: rotateInterpolatioBackFace.rotateInterpolation }, 
    ]};
    

    const onFlipCards = useCallback((sholudBack = false)=>{
        if(flip === 0) {
            if(!cardNumber) return;
            if(cardNumber?.error) return;
            rotateInterpolationFrontFace?.startAnimation();
            rotateInterpolatioBackFace?.startAnimation();
        } else {
            rotateInterpolationFrontFace?.startAnimation(0); // 0 is initialState
            rotateInterpolatioBackFace?.startAnimation(0); // 0 is initialState
        }
        setFlip(state => state == 0 ? 1 : 0);
    },[flip, cardNumber])


    const onCompleteFunc = useCallback(()=>{
        // console.log(cardNumber, cardCvc, creditcardutils.parseCardExpiry(cardExpiry.value), creditcardutils)
        const {month, year} = creditcardutils.parseCardExpiry(cardExpiry.value);
        const values = {
            number: cardNumber.value,
            expirationMonth: month,
            expirationYear: year,
            expiryText: cardExpiry.value,
            cvv: cardCvc.value,
        }
        onFlipCards();
        props.onComplete(values)
    },[onFlipCards, cardNumber, cardCvc, cardExpiry])


    const onChangeCardCvc = useCallback((e)=>{
       if(!e.length) {
        setCardCvc()
            return 
        } 
        const getCardsMeta = creditcardutils?.cards.find(v=>v.type===cardNumber.type)
        const validatedCvcNumber = creditcardutils.validateCardCVC(e);
        if(e.length > getCardsMeta.cvcLength[0]) {
            setCardCvc(state => ({
                ...state,
                error: !validatedCvcNumber
            }));
            return;
        }
        setCardCvc({
            value: e,
            error: !validatedCvcNumber
        });
    },[cardNumber])
    
    const onChangeCardHolder = useCallback((e)=>{
        setCardHolder(e)
    },[])

    const onChangeCardExpiry = useCallback((e)=>{
        if(!e.length) {
            setCardExpiry()
            return 
        }
        const formatedText = creditcardutils.formatCardExpiry(e);
        setCardExpiry({
            value: formatedText,
        });
    },[])

    const onChangeCardNumber = useCallback((e)=>{
        if(!e.length) {
            setCardNumber()
            setCardType()
            return 
        }
        const formatedText = creditcardutils.formatCardNumber(e);
        setCardNumber({
            value: formatedText,
            error: creditcardutils.parseCardType(formatedText) === null && formatedText.length >= 5,
            type: creditcardutils.parseCardType(formatedText)
        });
        setCardType(creditcardutils.parseCardType(formatedText));
    },[])

    return {
        cardType,

        onChangeCardNumber,
        onChangeCardHolder,
        onChangeCardExpiry,
        onChangeCardCvc,

        cardNumber,
        cardHolder,
        cardExpiry,
        cardCvc,

        inputCardNumberRef,
        inputCardExpiryRef,
        inputCardCvcRef,

        onFlipCards,
        
        flip,

        rotateInterpolationFrontFaceStyle,
        rotateInterpolationBackFaceStyle,

        onCompleteFunc
    }
}

export default useSingleModuleHook;