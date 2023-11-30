export function formatVND(amount : number) {
    if (typeof amount !== 'number') {
      // Handle invalid input, e.g., non-numeric values
      return 'Invalid input';
    }
  
    const formattedAmount = amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  
    return formattedAmount;
  }