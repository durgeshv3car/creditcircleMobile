import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationIndependentTree, ThemeProvider } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '@/components/screen/HomeScreen';
import CustomHeader from '@/components/common/CustomHeader';
import SideMenuScreen from '@/components/screen/SideMenuScreen';
import SplashScreen from '@/components/screen/SplashScreen';
import { useColorScheme } from 'react-native';
import { Image } from 'react-native';
import LoginScreen from '@/components/screen/LoginAllScreen/LoginScreen';
import PersonalDetailsOne from '@/components/screen/Forms/PersonalDetailsOne';
import CustomFormHeader from '@/components/common/CustomFormHeader';
import OtpScreen from '../components/screen/HomeScreen';
import PanLocationInformation from '@/components/screen/Forms/PanLocationInformation';
import AddressInformation from '@/components/screen/Forms/AddressInformation';
import PersonalBackground from '@/components/screen/Forms/PersonalBackground';
import LoanRequirements from '@/components/screen/Forms/LoanRequirements';
import EmploymentInformation from '@/components/screen/Forms/EmploymentInformation';
import IncomeandSalaryDetails from '@/components/screen/Forms/IncomeandSalaryDetails';
import BankAccount from '@/components/screen/Forms/BankAccount';
import EmploymentDetails from '@/components/screen/Forms/EmploymentDetails';
import OfficeAddressInformation from '@/components/screen/Forms/OfficeAddressInformation';
import SalariedReasontoApplyforLoan from '@/components/screen/Forms/SalariedReasontoApplyforLoan';
import RevenueIncomeDetails from '@/components/screen/Forms/RevenueIncomeDetails';
import SelfReasontoApplyforLoan from '@/components/screen/Forms/SelfReasontoApplyforLoan';
import YesGSTBusinessDetail from '@/components/screen/Forms/YesGSTBusinessDetail';
import BusinessDetailSearch from '@/components/screen/Forms/BusinessDetailSearch';
import NoGSTBusinessDetail from '@/components/screen/Forms/NoGSTBusinessDetail';
import Professionaldetails from '@/components/screen/Forms/Professionaldetails';
import RevenueIncomeDetailsProfessional from '@/components/screen/Forms/RevenueIncomeDetailsProfessional';
import IncomeTaxCalculator from '@/components/screen/IncomeTaxCalculator';
import EMICalculatorScreen from '@/components/screen/EMICalculatorScreen';
import NotificationScreen from '@/components/screen/Notification';
import DetailScreen from '@/components/screen/DetailScreen';
import FAQScreen from '@/components/screen/FAQScreen';
import PrivacyPolicyScreen from '@/components/screen/PrivacyPolicyScreen';
import ContactUsScreen from '@/components/screen/ContactUsScreen';
import MoneySmartListing from '@/components/screen/MoneySmartListing';
import MoneySmart from '@/components/screen/MoneySmart';
import ProfileScreen from '@/components/screen/ProfileScreen';
import LoanOffer from '@/components/screen/LoanOffer';
import BankAccountSelfEmployedBusiness from '@/components/screen/Forms/BankAccountSelfEmployedBusiness';
import YesGSTBusinessDetailProfessional from '@/components/screen/Forms/YesGSTBusinessDetailProfessional';
import NoGSTBusinessDetailProfessional from '@/components/screen/Forms/NoGSTBusinessDetailProfessional';
import BusinessDetailSearchProfessional from '@/components/screen/Forms/BusinessDetailSearchProfessional';
import BankAccountSelfEmployedProfessional from '@/components/screen/Forms/BankAccountSelfEmployedProfessional';
import ProfessionalReasontoApplyforLoan from '@/components/screen/Forms/ProfessionalReasontoApplyforLoan';
import IncomeDetails from '@/components/screen/Forms/StudentIncomeDetails';
import StudentBankAccount from '@/components/screen/Forms/StudentBankAccount';
import FamilyDetails from '@/components/screen/Forms/FamilyDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGuard from '@/components/common/AuthGuard';
import withAuthCheck from '@/components/common/withAuthCheck';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DefaultThemes = {}; // Define your DefaultTheme



// Define the color schemes for both dark and light mode
const DarkTheme = {

  tabBar: '#000000',
  activeTab: '#FF4800',
};

const LightTheme = {
  tabBar: '#FFFFFF',
  activeTab: '#000000',
};


export function useThemeColor(lightColor: any, darkColor: any) {

  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkColor : lightColor;
}




const Routes = () => {
  const [splashVisible, setSplashVisible] = useState(true);
  const colorScheme = useColorScheme(); // Automatically get the system theme (dark or light)


  useEffect(() => {
    const timeout = setTimeout(() => {
      setSplashVisible(false);
    }, 4400);

    return () => clearTimeout(timeout);
  }, []);




  useEffect(() => {
    // const token = AsyncStorage.getItem('userToken');
    // console.log(token, "userToken1")
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      console.log(token, "userToken1")
      if (token) {
        // Verify token with API
        try {
          setUserToken(token);
        } catch (error) {
          console.error('Token validation failed:', error);
          await AsyncStorage.removeItem('userToken');
        }
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  const [userToken, setUserToken] = useState(null);
  

  console.log(userToken, "Hello Durgesh dd")


  console.log(withAuthCheck.userToken, "withAuthCheck")


  const BottomTabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? DarkTheme.tabBar : LightTheme.tabBar,
          paddingBottom: 10, // Adjust the value as needed for padding inside the tab bar
          height: 60
        },
        tabBarInactiveTintColor: '#333',
        tabBarActiveTintColor: DarkTheme.activeTab,
        tabBarIcon: ({ focused }) => {
          let iconSource;

          // Assign image sources based on the route name
          if (route.name === 'Loan Offers') {
            iconSource = focused
              ? require('../assets/icons/Loan-Offers.png')  // Active state image
              : require('../assets/icons/Loan-Offers.png'); // Default state image
          } else if (route.name === 'Deals') {
            iconSource = focused
              ? require('../assets/icons/Deals.png')
              : require('../assets/icons/Deals.png');
          } else if (route.name === 'Tax Calculator') {
            iconSource = focused
              ? require('../assets/icons/Tax-Calculator.png')
              : require('../assets/icons/Tax-Calculator.png');
          } else if (route.name === 'Profile') {
            iconSource = focused
              ? require('../assets/icons/Profile.png')
              : require('../assets/icons/Profile.png');
          }

          // Return the Image component
          return (
            <Image
              source={iconSource}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: focused ? DarkTheme.activeTab : 'gray',
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Loan Offers" component={LoanOffer} />
      <Tab.Screen name="Deals" component={SideMenuScreen} />
      <Tab.Screen name="Tax Calculator" component={IncomeTaxCalculator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultThemes}>
      <NavigationIndependentTree>
        <NavigationContainer>

          {/* <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: true }} /> */}
          {splashVisible ? (<SplashScreen />) 
          : 
          (
            <Stack.Navigator 
            initialRouteName={userToken ? "Home" : "LoginScreen"} // Use string names
              screenOptions={{
                header: ({ route }) => <CustomHeader />,
                // title={route.name}
              }}
              >

{/* options={{ gestureEnabled: false, headerLeft: () => null }}  */}

              <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false,  gestureEnabled: false, headerLeft: () => null }} />
             
              <Stack.Screen name="Home" component={withAuthCheck(BottomTabs)} options={{ headerShown: true }} />
              <Stack.Screen name="side" component={SideMenuScreen} options={{ headerShown: true }} />
              <Stack.Screen name="NotFound">
                {() => <View><Text>Data Not Found</Text></View>}
              </Stack.Screen>
              <Stack.Screen name="SideMenuScreen" component={SideMenuScreen} options={{ headerShown: false }} />
              <Stack.Screen name="PersonalDetailsOne"  component={PersonalDetailsOne} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Login" step="1/6" />,
              }} />
              <Stack.Screen name="OtpScreen" component={OtpScreen} options={{ headerShown: false }} />
              <Stack.Screen name="PanLocationInformation" component={PanLocationInformation} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Personal Details" step="2/6" />,
              }} />
              <Stack.Screen name="AddressInformation" component={AddressInformation} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="PAN & Location Information " step="3/6" />,
              }} />
              <Stack.Screen name="PersonalBackground" component={PersonalBackground} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Address Information " step="4/6" />,
              }} />
              <Stack.Screen name="LoanRequirements" component={LoanRequirements} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Personal Background " step="5/6" />,
              }} />

              <Stack.Screen name="EmploymentInformation" component={EmploymentInformation} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Loan Requirements" step="6/6" />,
              }} />

              <Stack.Screen name="IncomeandSalaryDetails" component={IncomeandSalaryDetails} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Salaried" step="7/11" />,
              }} />

              <Stack.Screen name="BankAccount" component={BankAccount} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Income & Salary Details" step="8/11" />,
              }} />
              <Stack.Screen name="EmploymentDetails" component={EmploymentDetails} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Salary Bank Account" step="9/11" />,
              }} />

              <Stack.Screen name="OfficeAddressInformation" component={OfficeAddressInformation} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Employment Details" step="10/11" />,
              }} />
              <Stack.Screen name="SalariedReasontoApplyforLoan" component={SalariedReasontoApplyforLoan} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Office Address Information" step="11/11" />,
              }} />
              <Stack.Screen name="BusinessDetailSearch" component={BusinessDetailSearch} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Employment Information" step="7/11" />,
              }} />

              <Stack.Screen name="YesGSTBusinessDetail" component={YesGSTBusinessDetail} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="GST Details" step="8/11" />,
              }} />

              <Stack.Screen name="NoGSTBusinessDetail" component={NoGSTBusinessDetail} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="GST Details" step="8/11" />,
              }} />


              <Stack.Screen name="RevenueIncomeDetails" component={RevenueIncomeDetails} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Business Details" step="9/11" />,
              }} />

              <Stack.Screen name="BankAccountSEB" component={BankAccountSelfEmployedBusiness} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Revenue & Income Details" step="10/11" />,
              }} />

              <Stack.Screen name="SelfReasontoApplyforLoan" component={SelfReasontoApplyforLoan} options={{
                header: ({ route }) => <CustomFormHeader titleName="Bank Account" step="11/11" />,
              }} />


              <Stack.Screen name="Professionaldetails" component={Professionaldetails} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Employment Information" step="7/12" />,
              }} />

              <Stack.Screen name="BusinessDetailSearchProfessional" component={BusinessDetailSearchProfessional} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Employment Information" step="8/12" />,
              }} />

              <Stack.Screen name="YesGSTBusinessDetailProfessional" component={YesGSTBusinessDetailProfessional} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="GST Details" step="9/12" />,
              }} />

              <Stack.Screen name="NoGSTBusinessDetailProfessional" component={NoGSTBusinessDetailProfessional} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="GST Details" step="9/12" />,
              }} />

              <Stack.Screen name="RevenueIncomeDetailsProfessional" component={RevenueIncomeDetailsProfessional} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Business Details" step="10/12" />,
              }} />


              <Stack.Screen name="BankAccountSelfEmployedProfessional" component={BankAccountSelfEmployedProfessional} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Revenue & Income Details" step="11/12" />,
              }} />

              <Stack.Screen name="ProfessionalReasontoApplyforLoan" component={ProfessionalReasontoApplyforLoan} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Bank Account" step="12/12" />,
              }} />



              <Stack.Screen name="StudentIncomeDetails" component={IncomeDetails} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Student" step="7/9" />,
              }} />


              <Stack.Screen name="StudentBankAccount" component={StudentBankAccount} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Income Details" step="8/9" />,
              }} />


              <Stack.Screen name="FamilyDetails" component={FamilyDetails} options={{
                header: ({ route }) =>
                  <CustomFormHeader titleName="Bank Account" step="9/9" />,
              }} />




              <Stack.Screen name="IncomeTaxCalculator" component={IncomeTaxCalculator} options={{
                header: ({ route }) =>
                  <CustomFormHeader />,
              }} />

              <Stack.Screen name="EMICalculatorScreen" component={EMICalculatorScreen} options={{ header: ({ route }) => <CustomHeader />, }} />

              <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ header: ({ route }) => <CustomHeader />, }} />


              <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ header: ({ route }) => <CustomHeader />, }} />

              <Stack.Screen name="FAQScreen" component={FAQScreen} options={{ header: ({ route }) => <CustomHeader />, }} />

              <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} options={{ header: ({ route }) => <CustomHeader />, }} />

              <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} options={{ header: ({ route }) => <CustomHeader />, }} />

              <Stack.Screen name="MoneySmart" component={MoneySmart} />

              <Stack.Screen name="MoneySmartListing" component={MoneySmartListing} options={{ header: ({ route }) => <CustomHeader />, }} />

              <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ header: ({ route }) => <CustomHeader />, }} />

        
 



            </Stack.Navigator>
          )}
          <StatusBar style="auto" />
        </NavigationContainer>
      </NavigationIndependentTree>
    </ThemeProvider>
  );
}

export default Routes 