import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { Card } from '@mui/material'
import styles from './chartDoughnut.module.scss'

ChartJS.register(ArcElement, Tooltip, Legend)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'right' as const,
        },
        title: {
            display: true,
            text: 'Cards X Columns',
            font: {
                size: 16,
                color: '#828282',
                font: 'Roboto',
            },
        },
    },
}

export function ChartDoughnut({ chartData }: { chartData: { [key: string]: number } }) {
    const data = {
        labels: Object.keys(chartData),
        datasets: [
            {
                label: 'Columns',
                data: Object.values(chartData),
                backgroundColor: ['#A155B9', '#165BAA', '#F765A3', '#10FFA0'],
            },
        ],
    }

    return (
        <Card className={styles.container}>
            <Doughnut options={options} data={data} width="100%" height="100%" />
        </Card>
    )
    return <Doughnut data={data} />
}
