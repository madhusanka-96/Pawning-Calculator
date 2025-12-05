const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/calculate-interest', (req, res) => {
    const { loanAmount, interestRate, lastPaymentDate, today } = req.body;

    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const lastPay = new Date(lastPaymentDate);
    const todayDate = new Date(today);

    // Total days since last payment
    let daysGap = Math.floor((todayDate - lastPay) / MS_PER_DAY);
    if (daysGap < 1) daysGap = 1;

    const dailyRate = interestRate / 100 / 365;

    // Calculate complete 365-day blocks
    let completeYears = Math.floor(daysGap / 365);
    let dueDays = completeYears * 365;
    let extraDays = daysGap - dueDays;

    // Due interest = interest for complete 365-day blocks
    let dueInterest = loanAmount * dailyRate * dueDays;

    // Accrued interest = interest for remaining extra days
    let accruedInterest = loanAmount * dailyRate * extraDays;

    // Total interest
    let totalInterest = dueInterest + accruedInterest;

    res.json({
        daysGap,
        completeYears,
        dueDays,
        extraDays,
        accruedInterest: accruedInterest.toFixed(2),
        dueInterest: dueInterest.toFixed(2),
        totalInterest: totalInterest.toFixed(2)
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));
