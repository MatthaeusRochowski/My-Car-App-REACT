export default function dateOperator(dateString) {
    const year = parseInt(dateString.substring(0, 4));
    const month = parseInt(dateString.substring(6, 7));
    const day = parseInt(dateString.substring(9, 10));
    return {
      year,
      month,
      day
    };
  }
