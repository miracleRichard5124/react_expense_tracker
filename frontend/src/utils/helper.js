import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export const getInitials = (name) => {
  if (!name) return '';

  let words = name.split(' ');
  let initials = '';

  for(let i = 0; i < Math.min(words.length, 2); i++){
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandSeperator = (num) => {
  if(num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {

  const grouped = {};

  data.forEach(item => {
    const month = moment(item.date).format('MMM'); // e.g., "Aug"

    if (!grouped[month]) {
      grouped[month] = 0;
    }

    grouped[month] += item.amount;
  });

  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }
));

  return chartData;
}