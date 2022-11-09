import React, { ReactElement, useEffect, useState } from 'react'
import PageHeader from 'components/PageHeader'
import { getMetrics } from 'infra'
import { ChartBar } from '../components/ChartBar/chartBar'
import { ChartLine } from '../components/ChartLine/chartLine'
import { ChartMultiLine } from '../components/ChartMultiLine/chartMultiLine'
import { ChartDoughnut } from '../components/ChartDoughnut/chartDoughnut'
import { Metrics } from '../models/Metric'
import styles from './index.module.scss'

export function Insight(): ReactElement {
    const [metrics, setMetrics] = useState<Metrics | null>(null)

    useEffect(() => {
        getMetrics().then((response) => {
            setMetrics(response)
        })
    }, [])

    const cardsByUser = metrics?.cardsByUser || {}
    const lastSemesterCards = metrics?.lastSemesterCards || {}
    const cardsByColumn = metrics?.cardsByColumn || {}
    const cardsByUserInLastSemester = metrics?.cardsByUserInLastSemester || {}

    return (
        <div>
            <PageHeader />
            <div className={styles.simpleGraph}>
                <ChartBar chartData={cardsByUser} />
                <ChartLine chartData={lastSemesterCards} />
                <ChartDoughnut chartData={cardsByColumn} />
            </div>
            <ChartMultiLine chartData={cardsByUserInLastSemester} />
        </div>
    )
}
