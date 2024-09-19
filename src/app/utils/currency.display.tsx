import React from 'react';

const CurrencyDisplay: React.FC<{ amount: number }> = ({ amount }) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return <div>{formatter.format(amount)}</div>;
};

export default CurrencyDisplay;
