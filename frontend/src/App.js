import { useState } from 'react';
import axios from 'axios';

function App() {
    const [form, setForm] = useState({});
    const [result, setResult] = useState(null);

    const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

    const handleCalculate = async () => {
        const res = await axios.post('http://localhost:5000/calculate-interest', form);
        setResult(res.data);
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Pawning Loan Interest Calculator</h2>
            <input name="loanAmount" placeholder="Outstanding Amount" onChange={handleChange}/><br/>
            <input name="interestRate" placeholder="Interest Rate %" onChange={handleChange}/><br/>
           
            <h4>Last Paymant Date / Loan open Day</h4><input type="date" name="lastPaymentDate" onChange={handleChange}/><br/>
            <h4>System Date</h4><input type="date" name="today" onChange={handleChange}/><br/>
            <button onClick={handleCalculate}>Calculate</button>

            {result && (
                <div style={{ marginTop: '20px' }}>
                    <p>Days Gap: {result.daysGap}</p>
                    <p>Accrued Interest: {result.accruedInterest}</p>
                    <p>Due Interest: {result.dueInterest}</p>
                    <p>Total Interest: {result.totalInterest}</p>
                </div>
            )}
        </div>
    )
}

export default App;
