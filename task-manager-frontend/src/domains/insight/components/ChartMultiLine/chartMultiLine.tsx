import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Card } from '@mui/material'
import styles from './chartMultiLine.module.scss'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

export const options = {
    responsive: true,
    plugins: {
        legend: {},
        title: {
            display: true,
            text: 'Cards X Users X Month',
            font: {
                size: 16,
                color: '#828282',
                font: 'Roboto',
            },
        },
    },
}

const colorGetter = () => {
    const colors = ['#A155B9', '#165BAA', '#F765A3', '#10FFA0']
    let index = 0
    return () => {
        const color = colors[index]
        index += 1
        if (index >= colors.length) {
            index = 0
        }
        return color
    }
}

const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
const getMonthFromNumber = (month: string) => {
    return months[Number(month)]
}

export function ChartMultiLine({
    chartData,
}: {
    chartData: { [key: string]: { [key: string]: number } }
}) {
    const getColor = colorGetter()

    const formatDataset = ([userName, userData]: [
        userName: string,
        userData: { [key: string]: number }
    ]) => {
        const color = getColor()

        return {
            label: userName,
            data: Object.values(userData),
            backgroundColor: color,
            borderColor: color,
        }
    }

    const data = {
        labels: Object.keys(Object.values(chartData)[0] || {}).map(getMonthFromNumber),
        datasets: Object.entries(chartData).map(formatDataset),
    }

    return (
        <Card className={styles.container}>
            <Line style={{ width: '70%', height: '45%' }} options={options} data={data} />
        </Card>
    )
}
