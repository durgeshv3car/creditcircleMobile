import { Appearance, StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  const theme = Appearance.getColorScheme();


const appStyle = StyleSheet.create({
    HeaderBar: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingVertical: -0,
        width:"100%",
        height: 20,
        marginTop: -10,
    },

    buttonContainer: {
        left: 0,
        right: 0,
        bottom: 20,
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
        marginBottom: 6, 
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
            backgroundColor: theme === 'dark' ? "#0F0F0F" : "#F5F5F5",
            borderRadius: 10,
            padding: 10,
            borderColor: theme === 'dark' ? "#2C2B30" : "#F5F5F5",
            borderWidth: 1,

        
      },
      bellicon: {
        height: 18,
        right: -10,
        resizeMode: 'contain',
        tintColor: theme === 'dark' ? "#fff" : '#333',
      },
      headerLine: { width: "20%", height: 2, backgroundColor: "#FF4800", marginTop: 4 },

      calulabel: {
        fontSize: 12,
        fontWeight: '500',
        color: theme === 'dark' ? "#999" : "#1a237e",
        marginBottom: 4,
      },

      resultLabel:{
         fontSize: 10,
        marginBottom: 5,
        fontWeight: '500',
        color: theme === 'dark' ? "#999" : "#1a237e",
      },

      caluinput:{
        color: theme === 'dark' ? "#999" : "#1a237e",
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        textAlign: 'center'
      },
      emiBox: {
        padding: 10,
        borderRadius: 8,
        width:"46%",
        backgroundColor: theme === 'dark' ? "#999" : "#fff"
      },
      caluamount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme === 'dark' ? "#fff" : "#333",
        marginTop:-6
      },

      doblebal:{
          color: theme === 'dark' ? "#fff" : "#273283",
          marginBottom: 0,
        fontSize: 12,
        fontWeight: 'bold',
      },

      dobinput :{
        color: theme === 'dark' ? "#fff" : "#273283", 
        borderColor: '#9597A0',
        borderBottomWidth:1,
        paddingLeft: 0,
        fontSize: 14,
      },

      radiolebal:{
        color: theme === 'dark' ? "#fff" : "#273283", 
      },

      Headingco:{
          color: theme === 'dark' ? "#fff" : "#273283", 
          fontWeight: 'bold',
          fontSize:14
      },

      labelco : {
        color: theme === 'dark' ? "#fff" : "#000", 
        fontSize:12
      },

      gstcraeccontainer:{
        flex:1,
        backgroundColor: theme === "dark" ? "#000" : "#fff"
      },

      banksearchBox : {
        color : theme === 'dark' ? "#fff" : "#000", 
        backgroundColor: theme === "dark" ? "#000" : "#fff"
      },
      gstsearch:{
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 50,
    paddingHorizontal: 15,
    height: 48,
    textAlign: 'center',
     color : theme === 'dark' ? "#fff" : "#000", 
  },

  detailston:{
    color : theme === 'dark' ? "#fff" : "#000", 
  },

  commonStyle:{
color : theme === 'dark' ? "#fff" : " ", 
  fontSize: 14,
},

offerfooter:{
   backgroundColor: theme === "dark" ? "#000" : "#fff"
},

acard: {
     backgroundColor: theme === "dark" ? "#666" : "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  offetitle:{
    color : theme === 'dark' ? "#fff" : "#000", 
  },

  perctvalu:{
      color : theme === 'dark' ? "#fff" : "#000", 
  },

  pickerWrapperdrop:{
   backgroundColor: theme === "dark" ? "#666" : "#fff", 
  },

  filtersContainera:{
    backgroundColor: theme === "dark" ? "#000" : "#fff", 
  },
  searchInputs:{
    color : theme === 'dark' ? "#fff" : "#000", 
  },
  
  offerCardmain:{
       backgroundColor: theme === "dark" ? "#999" : "#fff", 
  },

  incometex:{
        backgroundColor: theme === "dark" ? "#000" : "#fff"
      },

  buttoncont:{
backgroundColor: theme === "dark" ? "#000" : "#fff"
  },

  moneysmarttitle:{
      color : theme === 'dark' ? "#fff" : "#000", 
  }


});

export default appStyle;
