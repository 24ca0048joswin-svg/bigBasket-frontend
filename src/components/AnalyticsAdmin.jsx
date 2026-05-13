import AdminNav from './AdminNav';
import './Analytics.css';
import PieChart from './graph/PieChart';
import LineGraph from './graph/LineGraph';
import axios from 'axios';
import { useEffect, useState } from 'react';

function AnalyticsAdmin() {
    const [data, setData] = useState({});
    const [categories, setCategories] = useState();
    const [salesMonth, setSalesMonth] = useState();
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/admin/getAnalyticsData`);
        console.log(res.data.data);
        setData(res.data.data);
        let category = [];
        for (let d in res.data.data.salesByCategories) {
            category.push(res.data.data.salesByCategories[d]);
        }

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const sales = [];
        for (let d in months) {
            // console.log(res.data.data.salesInEveryMonth)
            sales.push(res.data.data.salesInEveryMonth.month[months[d]]);
        }
        setCategories(category);
        setSalesMonth(sales);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    if (loading) {
        return (<h1>Loading ...</h1>)
    }

    return (<>
        <AdminNav />
        <h1 className='center-text'
            style={{
                margin: '0.5rem',
            }}>Analytics Page</h1>
        <div className='main-log'>
            <div className='sub-log'>
                <span className='text-small'>Total Sales:</span>
                <br />
                <span className='text-large'>Rs. {data.totalSales.toFixed(2)}</span>
            </div>
            <div className='sub-log'>
                <span className='text-small'>Total Orders:</span>

                <br />
                <span className='text-large'>{data.totalOrder}</span>
            </div>
            <div className='sub-log'>
                <span className='text-small'>GST for Govt:</span>

                <br />
                <span className='text-large'>Rs.{data.gstForGovt.toFixed(2)}</span>
            </div>
            <div className='sub-log'>
                <span className='text-small'>Total Products Sold:</span>
                <br />
                <span className='text-large'>{data.totalProductSold}</span>
            </div>
        </div>

        <div className='chart'>
            <div className='chart-component' style={{
                width: '40%'
            }}>
                <span className='text-large center-text'>Sales by Categories</span>
                <PieChart Categorydata={categories} />
            </div>

            <div className='chart-component' style={{
                width: '100%'
            }}>
                <span className='text-large center-text'>Sales In every month</span>
                <LineGraph SalesMonth={salesMonth} />
            </div>
        </div>
    </>);
}

export default AnalyticsAdmin;