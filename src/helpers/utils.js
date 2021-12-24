
export const trimText =(text,length = 8)=>{
    return text.substring(0, length) + '...';
}

export const calculatePrice = (rate, factor)=>{
    const percentage = factor/100;
    return Number(rate * percentage);
}

export const calculateFactor = (price,rate)=>{
    const ratio = price/rate;
    return Number(ratio * 100);
}

