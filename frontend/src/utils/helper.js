import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  let words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandSeperator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  const today = moment();
  const last30days = moment().subtract(30, "days");

  const recentData = data.filter((item) => {
    const date = moment(item.date);
    return date.isBetween(last30days, today, null, []);
  });

  const grouped = {};

  recentData.forEach((item) => {
    const formattedDate = moment(item.date).format("MMM D");

    if (!grouped[formattedDate]) {
      grouped[formattedDate] = {
        date: formattedDate,
        amount: 0,
      };
    }

    grouped[formattedDate].amount += item.amount;
  });

  const chartData = Object.values(grouped);

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))

  const chartData = sortedData.map((item) => ({
    date: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    source: item?.source,
  }));
  return chartData;
};

export const prepareExpenseLineChartData = ((data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('Dd MMM'),
    amount: item?.amount,
    category: item?.category,
  }));

  return chartData;
});