// Sample transaction data 
const transaction = {
    id: '123456',
    amount: 15000,
  
  };
  
  // Fraud detection rules including new rules
  const fraudRules = [
    {
      ruleId: '1',
      description: 'Transaction amount exceeds limit',
      field: 'amount',
      operator: '>',
      value: 10000
    },
    // {
    //   ruleId: '2',
    //   description: 'Transaction from unusual location',
    //   field: 'location',
    //   operator: 'not-in',
    //   value: ['New York', 'Los Angeles', 'San Francisco']
    // },
    {
      ruleId: '3',
      description: 'Transaction during odd hours',
      field: 'timestamp',
      operator: 'time-range',
      value: { start: '12:00', end: '16:00' }
    },
    {
      ruleId: '4',
      description: 'Too many transactions in a short period',
      field: 'velocity',
      operator: '>',
      value: 2  // More than 5 transactions in a short window
    },
    // {
    //   ruleId: '5',
    //   description: 'Currency mismatch',
    //   field: 'currency',
    //   operator: '!=',
    //   value: 'USD'  // Assuming user regularly transacts in USD
    // },
    // {
    //   ruleId: '6',
    //   description: 'Unusual device/browser',
    //   field: 'device',
    //   operator: 'not-in',
    //   value: ['iPhone', 'Chrome', 'Firefox']  // User's common devices or browsers
    // },
    // {
    //   ruleId: '7',
    //   description: 'Card not present for physical purchase',
    //   field: 'cardPresent',
    //   operator: '==',
    //   value: false  // Card must be present for physical purchase
    // },
    // {
    //   ruleId: '8',
    //   description: 'IP address location mismatch',
    //   field: 'ipLocation',
    //   operator: '!=',
    //   value: 'USA'  // User's registered billing address
    // }
  ];
  
  // Updated function to evaluate rules
  function evaluateRule(rule, transaction) {
    const fieldValue = transaction[rule.field];
  
    switch (rule.operator) {
      case '>':
        return fieldValue > rule.value;
      case '!=':
        return fieldValue !== rule.value;
      case 'not-in':
        return !rule.value.includes(fieldValue);  // Check if not in the allowed list
      case '==':
        return fieldValue === rule.value;
      case 'time-range': {
        const transactionTime = new Date(transaction.timestamp).toLocaleTimeString('en-GB', { hour12: false });
        return transactionTime >= rule.value.start || transactionTime <= rule.value.end;
      }
      default:
        return false;
    }
  }
  
  // Function to check all rules for fraud detection
  function checkFraud(transaction, rules) {
    let suspicious = false;
    const violatedRules = [];
  
    rules.forEach(rule => {
      if (evaluateRule(rule, transaction)) {
        suspicious = true;
        violatedRules.push(rule.description);
      }
    });
  
    return {
      isFraud: suspicious,
      violatedRules: violatedRules
    };
  }
  
  // Evaluate the transaction
  // const result = checkFraud(transaction, fraudRules);
  // if (result.isFraud) {
  //   console.log(`Transaction flagged as suspicious. Violated rules: ${result.violatedRules.join(', ')}`);
  // } else {
  //   console.log('Transaction is clean.');
  // }

 module.exports = {checkFraud, fraudRules};
