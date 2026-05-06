import { Line } from "react-chartjs-2";
import { Chart as ChartJs, LinearScale, PointElement, CategoryScale, Title, Tooltip, Legend, LineElement} from "chart.js";

ChartJs.register(Tooltip, Legend, LinearScale, PointElement, CategoryScale, LineElement);
function LineGraph({SalesMonth}){
    console.log(SalesMonth);
    const data = {
        labels:[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        datasets:[{
            label: "Sales",
            data: SalesMonth,
            borderColor: "rgb(255, 0, 0)",
        }]
    }

    const options = {}
    return(
        <Line data={data} options={options}/>
    )
}

export default LineGraph;