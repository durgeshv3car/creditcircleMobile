import { StyleSheet } from "react-native";


const appStyle = StyleSheet.create({
    HeaderBar: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        width:"100%"
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
    }



});

export default appStyle;
