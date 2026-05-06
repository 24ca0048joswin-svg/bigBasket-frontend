import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from "chart.js";

ChartJs.register(Tooltip, Legend, ArcElement);
function PieChart({ Categorydata }) {
    console.log(Categorydata)
    const data = {
        labels: ["Fruits", "Ghee", "Nandini", "Tea", "Vegetables"],
        datasets: [{
            label: "Sales by categories",
            data: Categorydata,
            backgroundColor: [
                "rgba(255, 0, 0, 1)",
                "rgba(255, 255, 0, 1)",
                "rgba(255, 0, 255, 1)",
                "rgba(0, 255, 0, 1)",
                "rgba(0, 255, 255, 1)",
            ],
            borderColor: [
                "rgba(200, 0, 0, 1)",
                "rgba(200, 200, 100, 1)",
                "rgba(200, 0, 200, 1)",
                "rgba(0, 200, 0, 1)",
                "rgba(0, 200, 200, 1)",
            ],
            hoverOffset: 4,
            radius: '70%',
        }]
    }

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Sales by Categories"
            }
        }
    }

    return (
        <Pie options={options} data={data} />
    );
}

export default PieChart;