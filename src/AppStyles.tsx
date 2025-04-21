import { Appearance, StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  const theme = Appearance.getColorScheme();


const appStyle = StyleSheet.create({
    HeaderBar: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        width:"100%",
    },

    buttonContainer: {
        left: 0,
        right: 0,
        bottom: 0,
        paddingVertical: 10,
        alignItems: "center",
    },
    button: {
        backgroundColor: "#FF4800",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        width: "90%"
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'center'
    },

    HeadingTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
    },
    subHeaderTitle: {
        fontSize: 12,
    },

    planalFontsize: {
        fontSize: hp(1.8),
        fontWeight: 400,
        textAlign: 'center',
        color:  theme === 'dark' ? "#999" : "#9597A0",
    },

    iconContainer: {
        height: hp(4),
    },

    homeAppicon: {
        height: wp(8),
        width: wp(8),
    },
    homeAppiconLine:{
         flex: 1, 
         backgroundColor: theme === 'dark' ? "#333" : "#DDE1FF",
         height: theme === 'dark' ? 1 : 2,
    },

    sectionTitle: {
        fontSize: 16, 
        fontWeight: "bold", 
        marginBottom: 0, 
        color: theme === 'dark' ? "#999" : "#273283",
      },
      scrocontainer: {
        alignItems: 'center',
        filter: theme === 'dark' ? "grayscale(1)" : "",
        zIndex: 999, 
      },

      Sliderimage: {
        width: "100%",
        height: 140,
        resizeMode: "stretch",
        borderRadius: 10,
        marginBottom:20,
        filter:theme === 'dark' ? "Brightness(0.9)" : "",
      },
    
      Emicontainer: {
            flex: 1,
            margin: 16,
            backgroundColor: theme === 'dark' ? "#333" : "#F5F5F5",
            borderRadius: 10,
            padding: 6
        
      },
      bellicon: {
        height: 18,
        right: -16,
        resizeMode: 'contain',
        tintColor: theme === 'dark' ? "#fff" : '#333',
      },
      headerLine: { width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 },

});

export default appStyle;
