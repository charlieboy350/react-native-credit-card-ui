import { memo } from "react";
import {  Animated, Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import useSingleModuleHook from "./hooks/useSingleModuleHook.js";
import {SvgXml} from "react-native-svg";

import GoBack from '../assets/goBack.js';

import AliPay from '../assets/alipay.js';
import Amex from '../assets/amex.js';
import Visa from '../assets/visa.js';
import Master from '../assets/mastercard.js';
import UnionPay from '../assets/unionpay.js';

import Jcb from '../assets/jcb.js';
import Elo from '../assets/elo.js';
import Maestro from '../assets/maestro.js';
import Discover from '../assets/discover.js';
import Diners from '../assets/diners.js';

const CARD_HEIGHT = 250;
const CARD_WIDTH = 420;
const PLACEHOLDER_COLOR = "#eeeeee80"
const CREDIT_CARD_LOGOS = {
    alipay: {
        type: "alipay",
        name: "Ali Pay",
        description: "",
        src: AliPay
    },
    amex: {
        type: "amex",
        name: "American Express",
        description: "",
        src: Amex
    },
    visa: {
        type: "visa",
        name: "Visa",
        description: "",
        src: Visa
    },
    mastercard: {
        type: "mastercard",
        name: "Master Card",
        description: "",
        src: Master
    },
    unionpay: {
        type: "unionpay",
        name: "UnionPay",
        description: "",
        src: UnionPay
    },
    discover: {
        type: "discover",
        name: "Discover",
        description: "",
        src: Discover
    },
    elo: {
        type: "elo",
        name: "Elo",
        description: "",
        src: Elo
    },
    maestro: {
        type: "maestro",
        name: "Maestro",
        description: "",
        src: Maestro
    },
    jcb: {
        type: "jcb",
        name: "Jcb",
        description: "",
        src: Jcb
    },
    dinersclub: {
        type: "diners",
        name: "diners",
        description: "",
        src: Diners
    }
}

const SingleModule = (props) => {
    const {
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
        getVisibleForAndroid,

        rotateInterpolationFrontFaceStyle,
        rotateInterpolationBackFaceStyle,

        onCompleteFunc
    } = useSingleModuleHook(props);
    
    
    return (
      <View style={[styles.container, props?.container]}>
        <Animated.View style={[styles.cardBgImgContainerFrontFace, rotateInterpolationFrontFaceStyle, {
            zIndex: flip === 0 ? 1 : 0,
        }]}>
            <ImageBackground
                source={require('../assets/creditcardbg.png')}
                style={styles.cardBg}
            >
                <View style={styles.inputContainer}>
                    <View style={styles.header}>
                        {(cardType && CREDIT_CARD_LOGOS[cardType] && CREDIT_CARD_LOGOS[cardType]?.src) ? <SvgXml style={styles.svgContainer} width="100" height="60" xml={CREDIT_CARD_LOGOS[cardType]?.src} />  : <></>}
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.lftFooter}>
                            <TextInput 
                                style={[styles.inputName, props?.inputName]}
                                placeholder="Full Name"
                                keyboardType="default"
                                placeholderTextColor={PLACEHOLDER_COLOR}
                                autoCapitalize="characters"
                                returnKeyType="next"
                                onChangeText={onChangeCardHolder}
                                value={cardHolder}
                                onSubmitEditing={() => {
                                    inputCardNumberRef.current.focus();
                                }}
                                {...props?.inputNameProps}
                            />
                            <TextInput 
                                style={[styles.inputCardNumber, props?.inputCardNumber, styles.isError(cardNumber?.error), props?.isError?.(cardNumber?.error)]}
                                ref={inputCardNumberRef}
                                inputMode="numeric"
                                keyboardType="numeric"
                                placeholder="XXXX XXXX XXXX XXXX"
                                placeholderTextColor={PLACEHOLDER_COLOR}
                                onChangeText={onChangeCardNumber}
                                value={cardNumber?.value || ''}
                                onSubmitEditing={() => {
                                    inputCardExpiryRef.current.focus();
                                }}
                                returnKeyType="done"
                                {...props?.inputCardNumberProps}
                            />
                        </View>
                        <View style={styles.ritFooter}>
                            <Text style={styles.label}>Expiry</Text>
                            <TextInput 
                                style={[styles.inputCardExpiry, props?.inputCardExpiry]}
                                ref={inputCardExpiryRef}
                                placeholder="MM/YY"
                                keyboardType="number-pad"
                                inputMode="numeric"
                                placeholderTextColor={PLACEHOLDER_COLOR}
                                autoCapitalize="characters"
                                returnKeyType="done"
                                onChangeText={onChangeCardExpiry}
                                value={cardExpiry?.value}
                                onSubmitEditing={onFlipCards}
                                {...props?.inputCardExpiry}
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </Animated.View>

        {getVisibleForAndroid === false ? <></> : <Animated.View style={[styles.cardBgImgContainerBackFace, rotateInterpolationBackFaceStyle, {
            zIndex: flip === 0 ? 0 : 1,
        }]}>
            <ImageBackground
                source={require('../assets/creditcardbg.png')}
                style={styles.cardBg}
            >
                <View style={styles.backFaceContainer}> 
                    <View style={styles.goBackContainer}>
                        <TouchableOpacity onPress={()=>onFlipCards()} style={styles.goBackBtn}>
                            <SvgXml style={styles.svgContainer} width="20" height="20" xml={GoBack} /> 
                            <Text style={styles.defaultText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.stripContainer} />
                    <View style={styles.cvcContainer}>
                            {<TextInput 
                                style={[styles.inputCardCvc, props?.inputCardCvc]}
                                ref={inputCardCvcRef}
                                placeholder="CVC"
                                keyboardType="number-pad"
                                inputMode="numeric"
                                placeholderTextColor={PLACEHOLDER_COLOR}
                                autoCapitalize="characters"
                                returnKeyType="done"
                                onChangeText={onChangeCardCvc}
                                value={cardCvc?.value}
                                onSubmitEditing={onCompleteFunc}
                                {...props?.inputCardCvc}
                            />}
                    </View>
                </View>
            </ImageBackground>
        </Animated.View>}
      </View>
    );
  }
 
  
  const styles = StyleSheet.create({
    container: { 
        position:"relative",
        padding: 10,
        marginTop: 20,
        display: "flex",
        alignItems:"center", 
        flex:1
    },
    stripContainer: {
        backgroundColor: "#000",
        marginTop:16,
        display: "flex",
        height:45,
    },
    cvcContainer: {
        marginTop:6,
        padding:10,
        display:"flex",
        alignItems:"flex-end"
    },
    goBackContainer:{
        marginTop:10,
        display:"flex",
        justifyContent:"flex-start",
        paddingHorizontal:10,
        paddingTop:10
    },
    goBackBtn: {
        maxWidth:55,
        display: "flex",
        flexDirection: "row",
        alignItems:"center",
    },
    defaultText: {
        fontSize:12,
        fontWeight:"bold",
        color:"white"
    },
    backFaceContainer: {
        padding:0,
        flex:1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    cardBgImgContainerBackFace: {
        position:"absolute",
        top:0,
        borderRadius:20,
        height: CARD_HEIGHT,
        width: "100%",
        maxWidth: CARD_WIDTH,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00, 
        backfaceVisibility:"hidden",
        elevation:24,
        backgroundColor: 'transparent'
    },
    cardBgImgContainerFrontFace: {
        position:"absolute",
        top:0,
        borderRadius:20,
        height: CARD_HEIGHT,
        width: "100%",
        maxWidth: CARD_WIDTH,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00, 
        elevation:24,
        backfaceVisibility:"hidden",
        backgroundColor: 'transparent'
    },
    cardBg: {
        resizeMode:"cover",
        height:"100%",
        width:"100%",
        display:"flex",
        flex: 1,
        overflow:"hidden",
        borderRadius:12,
    },  
    inputContainer : {
        padding:12,
        flex:1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    header: { display: "flex", alignItems:"flex-end"},
    svgContainer: {},
    footer: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems:"flex-end"
    },
    lftFooter: {
        padding:10,
        flex:1,
        maxWidth:"75%",
    },
    ritFooter: {
        padding:10,
    },
    inputName: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom:5,
        height:26,
        padding:0,
        backgroundColor:"#000"
    },
    inputCardNumber: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
        height:26,
        padding:0,
        backgroundColor:"#000"
    },
    isError: (check) =>  {
        if(check) {
            return {
                color: "red"
            }
        }
        return {}
    },
    
    label: {
        color: "#ffffff",
        fontSize: 12,
        fontWeight: "light",
        textAlign: "right",
        marginBottom: 8
    },
    inputCardExpiry: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "bold", 
        textAlign:"right",
        height:26,
        padding:0,
        backgroundColor:"#000",
    },

    inputCardCvc: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "bold",
        height:26,
        padding:0,
        backgroundColor:"#000"
    }
    
});

export default SingleModule;