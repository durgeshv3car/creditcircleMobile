import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Privacy Policy</Text>
      <Text style={styles.subHeading}>Effective Date: 27-06-2025</Text>
      <Text style={styles.paragraph}>
        Credit Circle (“we”, “our”, or “us”) values your privacy. This Privacy Policy outlines how we collect, use, and protect your personal and financial information through the Credit Circle mobile application (“App”). By using the App, you consent to the practices described below.
      </Text>

      <Text style={styles.sectionHeading}>1. Information We Collect</Text>
      <Text style={styles.subSectionHeading}>1.1 Personal Information:</Text>
      <Text style={styles.paragraph}>
  We may collect the following information when you sign up or use our services:
</Text>
<View style={styles.list}>
  <Text style={styles.listItem}>• Name, mobile number, email address</Text>
  <Text style={styles.listItem}>• PAN number, Aadhaar number (as permitted)</Text>
  <Text style={styles.listItem}>• Income details, employment type, credit score, and financial profile</Text>
  <Text style={styles.listItem}>• Bank account statements and KYC documents (uploaded voluntarily)</Text>
</View>

      <Text style={styles.subSectionHeading}>1.2 Device and Usage Information:</Text>
      <Text style={styles.paragraph}>
  We automatically collect:
</Text>
<View style={styles.list}>
  <Text style={styles.listItem}>• Device type, operating system, IP address</Text>
  <Text style={styles.listItem}>• App usage behavior, session duration, referral source</Text>
</View>

      <Text style={styles.subSectionHeading}>1.3 Location:</Text>
      <Text style={styles.paragraph}>
        With your explicit permission, we may collect your approximate location to show region-specific lenders.
      </Text>

      <Text style={styles.sectionHeading}>2. How We Use Your Information</Text>
      <View style={styles.list}>
  <Text style={styles.listItem}>• To assess loan eligibility and show relevant loan offers</Text>
  <Text style={styles.listItem}>• To connect you with banks and NBFCs for personal loan applications</Text>
  <Text style={styles.listItem}>• To improve App performance and personalize user experience</Text>
  <Text style={styles.listItem}>• To send alerts, confirmations, and limited promotional messages (with consent)</Text>
</View>

      <Text style={styles.sectionHeading}>3. Data Sharing & Disclosure</Text>
      <Text style={styles.paragraph}>
        We do <Text style={styles.bold}>not sell your data</Text>. We share information only as needed:
      </Text>

      <Text style={styles.subSectionHeading}>3.1 With Lending Partners:</Text>
      <Text style={styles.paragraph}>
        Your financial profile is securely shared with partnered banks and NBFCs when you apply for a loan.
      </Text>

      <Text style={styles.subSectionHeading}>3.2 With Service Providers:</Text>
      <Text style={styles.paragraph}>
        We may use secure third-party vendors for analytics, customer support, or document processing—under strict confidentiality.
      </Text>

      <Text style={styles.subSectionHeading}>3.3 For Legal Compliance:</Text>
      <Text style={styles.paragraph}>
        We may disclose data if required to comply with applicable laws, court orders, or regulatory requests.
      </Text>

      <Text style={styles.subSectionHeading}>3.4 Business Transfers:</Text>
      <Text style={styles.paragraph}>
        If Credit Circle is involved in a merger or acquisition, user data may be transferred to the new entity.
      </Text>

      <Text style={styles.sectionHeading}>4. Data Storage & Security</Text>
      <View style={styles.list}>
  <Text style={styles.listItem}>
    • All user data is stored on secure servers <Text style={styles.bold}>located in India</Text>, in compliance with applicable data protection regulations.
  </Text>
  <Text style={styles.listItem}>
    • We use SSL encryption, secure APIs, and industry-standard security protocols.
  </Text>
  <Text style={styles.listItem}>
    • While we take reasonable steps to protect data, no system is 100% secure.
  </Text>
</View>

      <Text style={styles.sectionHeading}>5. Your Choices & Rights</Text>
      <View style={styles.list}>
  <Text style={styles.listItem}>
    • <Text style={styles.bold}>Access and Update:</Text> You may access or update your information through the App at any time.
  </Text>
  <Text style={styles.listItem}>
    • <Text style={styles.bold}>Opt-Out:</Text> You can opt-out of marketing messages via in-app settings or unsubscribe links.
  </Text>
  <Text style={styles.listItem}>
    • <Text style={styles.bold}>Withdraw Consent:</Text> You may withdraw your consent by contacting us, though some services may become unavailable.
  </Text>
</View>


      <Text style={styles.sectionHeading}>6. Children’s Privacy</Text>
      <Text style={styles.paragraph}>
        Our services are not intended for children under 18. We do not knowingly collect data from minors.
      </Text>

      <Text style={styles.sectionHeading}>7. Third-Party Links</Text>
      <Text style={styles.paragraph}>
        The App may link to external websites (e.g., lender sites). We are not responsible for their privacy practices. Please review their policies separately.
      </Text>

      <Text style={styles.sectionHeading}>8. Changes to This Policy</Text>
      <Text style={styles.paragraph}>
        We may update this Privacy Policy from time to time. Significant changes will be notified within the App or via email.
      </Text>

      <Text style={styles.sectionHeading}>9. Contact Us</Text>
      <Text style={[styles.paragraph,{paddingBottom: 50}]}>
        For questions about this policy, email us at: <Text style={styles.bold}>support@creditcircle.in</Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 5,
  },
  subSectionHeading: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },

  list: {
  marginVertical: 8,
},
listItem: {
  fontSize: 14,
  lineHeight: 20,
  marginBottom: 4,
  paddingLeft: 10,
},

});

export default PrivacyPolicyScreen;
