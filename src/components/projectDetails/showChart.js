import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register the components with Chart.js
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

const ShowChart = ({ rawData }) => {
    const labels = rawData.map(item => item.first);
    const dates = rawData.map(item => new Date(item.second));

    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Status Timeline',
                data: dates,
                backgroundColor: 'transparent',
                borderColor: '#f26c6d',
                pointBorderColor: 'transparent',
                pointBorderWidth: 4
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'PP',
                },
                min: minDate,
                max: maxDate,
                grid: {
                    display: true
                }
            }
        }
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
};

export default ShowChart;
