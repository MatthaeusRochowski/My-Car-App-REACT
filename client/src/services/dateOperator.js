export default function dateOperator(dateString) {
    const year = parseInt(dateString.substring(6, 10));
    const month = parseInt(dateString.substring(3, 5));
    const day = parseInt(dateString.substring(0, 2));
    return {
      year,
      month,
      day
    };
  }
