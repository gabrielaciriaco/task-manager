import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Card } from '@mui/material'
import styles from './chartBar.module.scss'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
    responsive: true,
    plugins: {
        paddingBelowLegends: false,
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Cards X Users',
            font: {
                size: 16,
                color: '#828282',
                font: 'Roboto',
            },
        },
    },
}

export function ChartBar({ chartData }: { chartData: { [key: string]: number } }) {
    const data = {
        labels: Object.keys(chartData),
        datasets: [
            {
                label: 'Cards',
                data: Object.values(chartData),
                backgroundColor: '#63ABFD',
                borderColor: '#165BAA',
                borderWidth: 2,
            },
        ],
    }

    return (
        <Card className={styles.container}>
            <Bar options={options} data={data} width="100%" height="100%" />
        </Card>
    )
}
