import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TermsandConditions = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Terms and Conditions</Text>

      <Text style={styles.title}>1. Acceptance of Terms</Text>
      <Text style={styles.paragraph}>
        By accessing, browsing, or using this Website, you acknowledge that you have read, understood, and agree to these Terms. CreditCircle reserves the right to update or modify these Terms at any time without prior notice.
      </Text>

      <Text style={styles.title}>2. Eligibility</Text>
      <Text style={styles.paragraph}>
        You must be at least 18 years old and capable of entering into a legally binding agreement to use our Website. By using the Website, you represent and warrant that you meet these requirements.
      </Text>

      <Text style={styles.title}>3. Use of the Website</Text>
      <Text style={styles.paragraph}>
        You agree to use the Website solely for lawful purposes and in compliance with all applicable laws and regulations. You shall not:
      </Text>
      <Text style={styles.list}>• Use the Website for fraudulent, abusive, or illegal activities.</Text>
      <Text style={styles.list}>• Attempt to disrupt the Website's functionality, including introducing viruses or harmful code.</Text>
      <Text style={styles.list}>• Use automated tools or bots to access or interact with the Website.</Text>

      <Text style={styles.title}>4. Account Registration</Text>
      <Text style={styles.paragraph}>
        Some features of the Website may require you to register an account. You agree to provide accurate, complete, and current information and to keep your account details confidential. You are responsible for all activities under your account.
      </Text>

      <Text style={styles.title}>5. Intellectual Property</Text>
      <Text style={styles.paragraph}>
        All content, design, graphics, logos, and trademarks on the Website are owned by CreditCircle or its licensors and are protected by applicable copyright and trademark laws. You may not reproduce, distribute, or create derivative works based on this content without prior written consent from CreditCircle.
      </Text>

      <Text style={styles.title}>6. Third-Party Links</Text>
      <Text style={styles.paragraph}>
        The Website may contain links to third-party websites for your convenience. CreditCircle is not responsible for the content, policies, or practices of these third-party sites. Access them at your own risk.
      </Text>

      <Text style={styles.title}>7. Limitation of Liability</Text>
      <Text style={styles.paragraph}>
        CreditCircle is not liable for any direct, indirect, incidental, or consequential damages arising from your use or inability to use the Website. This includes damages resulting from errors, interruptions, or unauthorized access.
      </Text>

      <Text style={styles.title}>8. Privacy Policy</Text>
      <Text style={styles.paragraph}>
        Your use of the Website is also governed by our Privacy Policy. By using the Website, you consent to the collection and use of your data as described in the Privacy Policy. For details, please visit: Privacy Policy.
      </Text>

      <Text style={styles.title}>9. Termination</Text>
      <Text style={styles.paragraph}>
        We reserve the right to terminate or suspend your access to the Website without notice for any reason, including a violation of these Terms.
      </Text>

      <Text style={styles.title}>10. Governing Law</Text>
      <Text style={styles.paragraph}>
        These Terms shall be governed and construed in accordance with the laws of the Information Technology Act, 2000 (IT Act), without regard to its conflict of law principles. Any disputes will be subject to the exclusive jurisdiction of the courts in India.
      </Text>
    </ScrollView>
  )
}

export default TermsandConditions

const styles = StyleSheet.create({

  container: {
    paddingHorizontal:15,
    backgroundColor: '#fff',
    paddingBottom:150
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  list: {
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 5,
  }

})