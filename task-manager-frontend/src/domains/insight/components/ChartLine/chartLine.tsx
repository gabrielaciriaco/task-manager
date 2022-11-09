import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Card } from '@mui/material'
import styles from './chartLine.module.scss'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Cards X Month',
            font: {
                size: 16,
                color: '#828282',
                font: 'Roboto',
            },
        },
    },
}

const getMonthFromNumber = (month: string) => {
    const months = [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
    ]
    return months[Number(month)]
}

export function ChartLine({ chartData }: { chartData: { [key: string]: number } }) {
    const data = {
        labels: Object.keys(chartData).map(getMonthFromNumber),
        datasets: [
            {
                label: 'Cards',
                data: Object.values(chartData),
                borderColor: '#165BAA',
                backgroundColor: '#165BAA',
            },
        ],
    }

    return (
        <Card className={styles.container}>
            <Line options={options} data={data} width="100%" height="100%" />
        </Card>
    )
}
